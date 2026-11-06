import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSourceIndex,
  readCompleteTree,
} from '../src/core/catalog/build.ts';
import {
  loadSourceIndex,
  getIndexedFiles,
  getIndexTags,
  groupTags,
  getTagSnapshot,
  createRepositoryIndex,
} from '../src/core/catalog/index.ts';
import { sourceRepositories } from '../src/core/catalog/repositories.ts';
import { base, t11, t12 } from './fixtures.ts';

test('truncated trees expand subtrees and preserve their prefixes', async () => {
  const calls: string[] = [];
  const runtime = {
    tags: async () => ({}),
    tree: async (_repo: string, ref: string, recursive: boolean) => {
      calls.push(`${ref}:${recursive}`);
      if (ref === 'tag')
        return {
          sha: 'root',
          truncated: true,
          tree: [{ path: 'partial.java', type: 'blob', sha: 'partial' }],
        };
      if (ref === 'root')
        return {
          sha: 'root',
          truncated: false,
          tree: [{ path: 'framework', type: 'tree', sha: 'child' }],
        };
      return {
        sha: 'child',
        truncated: false,
        tree: [{ path: 'Example.java', type: 'blob', sha: 'file' }],
      };
    },
  };
  const tree = await readCompleteTree(runtime, base, 'tag');
  assert.equal(tree.truncated, false);
  assert.deepEqual(
    tree.tree.map((e) => e.path),
    ['framework', 'framework/Example.java'],
  );
  assert.deepEqual(calls, ['tag:true', 'root:false', 'child:true']);
});
test('builder filters snapshots and tests, preserves aidl-export and deduplicates commits', async () => {
  let calls = 0;
  const result = await buildSourceIndex(
    {
      tags: async () => ({ [t11]: 'commit', [t12]: 'commit', main: 'ignore' }),
      tree: async () => {
        calls++;
        return {
          sha: 'tree',
          truncated: false,
          tree: [
            'framework/java/a/Foo.java',
            'framework/aidl-export/a/Foo.aidl',
            'framework/aidl_api/a/Foo.aidl',
            'framework/tests/a/Test.java',
            'other/No.java',
            'framework/icon.png',
          ].map((path) => ({ path, type: 'blob', sha: path })),
        };
      },
    },
    {
      revision: 'one',
      repositories: [{ repo: base, includePrefixes: ['framework/'] }],
    },
  );
  assert.equal(calls, 1);
  assert.equal(result.repositories[0]!.snapshots.length, 1);
  assert.deepEqual(getIndexedFiles(result, result.repositories[0]!, t11), [
    'framework/aidl-export/a/Foo.aidl',
    'framework/java/a/Foo.java',
  ]);
});
test('selective builds do not claim unscanned tags are ready', async () => {
  const index = await buildSourceIndex(
    {
      tags: async () => ({ [t11]: 'a', [t12]: 'b' }),
      tree: async () => ({ sha: 'root', truncated: false, tree: [] }),
    },
    {
      revision: 'sample',
      tags: [t12],
      repositories: [{ repo: base, includePrefixes: [''] }],
    },
  );
  assert.deepEqual(getIndexTags(index), [t11, t12]);
  assert.equal(getIndexedFiles(index, index.repositories[0]!, t11), undefined);
  assert.deepEqual(getIndexedFiles(index, index.repositories[0]!, t12), []);
});
test('remote manifest resolves immutable repository shards and checks identity', async () => {
  const shard = {
    repo: base,
    paths: [],
    snapshots: [[]],
    tagSnapshots: [0],
  };
  const requested: string[] = [];
  const runtime = {
    indexUrl: 'https://example.org/index/manifest.json',
    fetchText: async (url: string) => {
      requested.push(url);
      return JSON.stringify(
        url.endsWith('manifest.json')
          ? {
              schemaVersion: 3,
              revision: 'r',
              versions: groupTags([t11]),
              repositories: [{ repo: base, indexUrl: 'r/base.json' }],
            }
          : shard,
      );
    },
  };
  assert.equal((await loadSourceIndex(runtime)).repositories[0]?.repo, base);
  assert.deepEqual(requested, [
    'https://example.org/index/manifest.json',
    'https://example.org/index/r/base.json',
  ]);
  shard.repo = 'different';
  await assert.rejects(loadSourceIndex(runtime), /mismatch/);
});
test('bundled audited index contains exactly the 24 enabled repositories and real migration paths', async () => {
  const index = await loadSourceIndex({
    fetchText: async (url) => {
      assert.equal(new URL(url).protocol, 'file:');
      return readFile(new URL(url), 'utf8');
    },
  });
  assert.equal(index.repositories.length, 24);
  assert.deepEqual(
    new Set(index.repositories.map((r) => r.repo)),
    new Set(sourceRepositories.map((r) => r.repo)),
  );
  const baseIndex = index.repositories.find((r) => r.repo === base)!;
  assert.ok(
    getIndexedFiles(index, baseIndex, 'android-11.0.0_r48')?.some((path) =>
      path.endsWith('/IConnectivityManager.aidl'),
    ),
  );
  assert.equal(
    getIndexedFiles(index, baseIndex, 'android-17.0.0_r1')?.some((path) =>
      path.endsWith('/IConnectivityManager.aidl'),
    ),
    false,
  );
  assert.ok(
    getIndexedFiles(
      index,
      index.repositories.find((r) => r.repo.endsWith('/Connectivity'))!,
      'android-17.0.0_r1',
    )?.some(
      (path) => path === 'framework/src/android/net/IConnectivityManager.aidl',
    ),
  );
});

test('bundled Android 16 r2 index covers every repository that publishes the tag', async () => {
  const index = await loadSourceIndex({
    fetchText: (url) => readFile(new URL(url), 'utf8'),
  });
  const tag = 'android-16.0.0_r2';
  assert.ok(getIndexTags(index).includes(tag));
  for (const repo of index.repositories) {
    if (getTagSnapshot(index, repo, tag) === -1) continue;
    assert.ok(getTagSnapshot(index, repo, tag) >= 0, repo.repo);
    assert.ok(getIndexedFiles(index, repo, tag), repo.repo);
  }
  const framework = index.repositories.find((r) => r.repo === base)!;
  assert.ok(
    getIndexedFiles(index, framework, tag)!.includes(
      'core/java/android/app/IActivityManager.aidl',
    ),
  );
});

test('different Git trees share a path snapshot only when their indexed paths match', async () => {
  const third = 'android-13.0.0_r1';
  const index = await buildSourceIndex(
    {
      tags: async () => ({ [t11]: 'a', [t12]: 'b', [third]: 'c' }),
      tree: async (_repo, ref) => ({
        sha: `tree-${ref}`,
        truncated: false,
        tree: [
          { path: 'framework/Foo.aidl', type: 'blob', sha: `content-${ref}` },
          ...(ref === 'c'
            ? [{ path: 'framework/Bar.aidl', type: 'blob', sha: 'new' }]
            : []),
        ],
      }),
    },
    {
      revision: 'paths',
      repositories: [{ repo: base, includePrefixes: ['framework/'] }],
    },
  );
  const repo = index.repositories[0]!;
  assert.deepEqual(
    getTagSnapshot(index, repo, t11),
    getTagSnapshot(index, repo, t12),
  );
  assert.notDeepEqual(
    getTagSnapshot(index, repo, t12),
    getTagSnapshot(index, repo, third),
  );
  assert.equal(repo.snapshots.length, 2);
  assert.deepEqual(getIndexedFiles(index, repo, third), [
    'framework/Bar.aidl',
    'framework/Foo.aidl',
  ]);
});

test('bundled index covers every published tag of every enabled repository', async () => {
  const index = await loadSourceIndex({
    fetchText: (url) => readFile(new URL(url), 'utf8'),
  });
  for (const repo of index.repositories) {
    for (const tag of getIndexTags(index)) {
      if (getTagSnapshot(index, repo, tag) === -1) continue;
      assert.ok(getIndexTags(index).includes(tag), tag);
      assert.ok(getTagSnapshot(index, repo, tag) >= 0, `${repo.repo} ${tag}`);
      assert.ok(getIndexedFiles(index, repo, tag), `${repo.repo} ${tag}`);
    }
  }
});

test('compact tags preserve minor/patch versions and numeric revision order', () => {
  const versions = groupTags([
    'android-11.0.0_r48',
    'android-8.1.0_r10',
    'android-8.0.0_r2',
    'android-8.1.0_r2',
    'android-8.1.1_r1',
    'android-8.0.0_r2',
  ]);
  assert.deepEqual(versions, [
    { version: '8.0.0', revisions: [2] },
    { version: '8.1.0', revisions: [2, 10] },
    { version: '8.1.1', revisions: [1] },
    { version: '11.0.0', revisions: [48] },
  ]);
  assert.deepEqual(getIndexTags({ versions }), [
    'android-8.0.0_r2',
    'android-8.1.0_r2',
    'android-8.1.0_r10',
    'android-8.1.1_r1',
    'android-11.0.0_r48',
  ]);
});

test('numeric snapshot references distinguish unavailable, unscanned and empty snapshots', () => {
  const tags = [
    t11,
    t12,
    'android-13.0.0_r1',
    'android-14.0.0_r1',
    'android-15.0.0_r1',
  ];
  const index = { versions: groupTags(tags) };
  const repo = createRepositoryIndex(
    base,
    tags,
    new Map([
      [t12, null],
      [tags[2]!, []],
      [tags[3]!, ['b.java', 'a.java']],
      [tags[4]!, ['a.java', 'b.java']],
    ]),
  );
  assert.deepEqual(repo.paths, ['a.java', 'b.java']);
  assert.deepEqual(repo.snapshots, [[], [0, 1]]);
  assert.deepEqual(repo.tagSnapshots, [-1, -2, 0, 1, 1]);
  assert.equal(getTagSnapshot(index, repo, t11), -1);
  assert.equal(getTagSnapshot(index, repo, t12), -2);
  assert.equal(getIndexedFiles(index, repo, t12), undefined);
  assert.deepEqual(getIndexedFiles(index, repo, tags[2]!), []);
  assert.deepEqual(getIndexedFiles(index, repo, tags[4]!), [
    'a.java',
    'b.java',
  ]);
});

test('bundled compact dictionaries and numeric references are valid and deduplicated', async () => {
  const index = await loadSourceIndex({
    fetchText: (url) => readFile(new URL(url), 'utf8'),
  });
  assert.equal(index.schemaVersion, 3);
  assert.ok(!('tags' in index));
  for (const repo of index.repositories) {
    assert.equal(repo.tagSnapshots.length, getIndexTags(index).length);
    assert.equal(new Set(repo.paths).size, repo.paths.length);
    assert.equal(
      new Set(repo.snapshots.map((s) => JSON.stringify(s))).size,
      repo.snapshots.length,
    );
    for (const id of repo.tagSnapshots)
      assert.ok(Number.isInteger(id) && id >= -2 && id < repo.snapshots.length);
    for (const snapshot of repo.snapshots) {
      assert.equal(new Set(snapshot).size, snapshot.length);
      for (const id of snapshot)
        assert.ok(Number.isInteger(id) && id >= 0 && id < repo.paths.length);
    }
    assert.deepEqual(Object.keys(repo).sort(), [
      'paths',
      'repo',
      'snapshots',
      'tagSnapshots',
    ]);
  }
});

test('builder aligns repositories with different tag sets to the global version order', async () => {
  const other = 'platform/packages/modules/Connectivity';
  const index = await buildSourceIndex(
    {
      tags: async (repo) =>
        repo === base ? { [t12]: 'b', [t11]: 'a' } : { [t12]: 'c' },
      tree: async () => ({ sha: 'tree', truncated: false, tree: [] }),
    },
    {
      revision: 'alignment',
      tags: [t12],
      repositories: [
        { repo: base, includePrefixes: [''] },
        { repo: other, includePrefixes: [''] },
      ],
    },
  );
  assert.deepEqual(getIndexTags(index), [t11, t12]);
  assert.deepEqual(index.repositories[0]!.tagSnapshots, [-2, 0]);
  assert.deepEqual(index.repositories[1]!.tagSnapshots, [-1, 0]);
  assert.deepEqual(getIndexedFiles(index, index.repositories[1]!, t12), []);
});

test('bundled JSON reads are deduplicated per runtime and a failed read can retry', async () => {
  let calls = 0;
  const runtime = {
    fetchText: async () => {
      calls++;
      if (calls === 1) throw new Error('asset unavailable');
      return JSON.stringify({
        schemaVersion: 3,
        revision: 'asset',
        versions: [],
        repositories: [],
      });
    },
  };
  await assert.rejects(loadSourceIndex(runtime), /asset unavailable/);
  const [first, second] = await Promise.all([
    loadSourceIndex(runtime),
    loadSourceIndex(runtime),
  ]);
  assert.equal(calls, 2);
  assert.equal(first, second);
  assert.equal(await loadSourceIndex(runtime), first);
  assert.equal(calls, 2);
});
