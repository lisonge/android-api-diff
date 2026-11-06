import { getIndexTags } from '../src/core/catalog/index.ts';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { queryAndroidApi, loadParsedSource } from '../src/core/query.ts';
import { generateAndroidApiCode } from '../src/core/code.ts';
import {
  searchSources,
  loadAndroidSourceFile,
  getMirrorContentUrl,
} from '../src/core/index.ts';
import {
  fixture,
  movedFixture,
  base,
  connectivity,
  oldPath,
  newPath,
  aidl,
  t11,
  t12,
} from './fixtures.ts';
const name = {
  mode: 'name' as const,
  text: 'android.net.IConnectivityManager.ping',
};

test('a failed candidate does not prevent another candidate from resolving', async () => {
  for (const failure of ['network', 'parse']) {
    const { runtime, contents, queries } = movedFixture();
    const url = getMirrorContentUrl({ repo: connectivity, path: newPath }, t12);
    if (failure === 'parse')
      contents.set(url, 'interface IConnectivityManager { broken( ; }');
    else {
      const fetch = runtime.fetchText;
      runtime.fetchText = async (requested, signal) => {
        if (requested === url) throw new Error('offline');
        return fetch(requested, signal);
      };
    }
    const result = await queryAndroidApi(runtime, { input: name });
    assert.equal(result.tags[0]?.status, 'found');
    assert.equal(result.tags[1]?.status, 'error');
    assert.equal(result.candidateErrors?.[0]?.reason, `${failure}-error`);
    assert.equal(queries.size, 0);
  }
});

test('all failed candidates remain execution failures instead of empty results', async () => {
  const { runtime, requests } = movedFixture();
  runtime.fetchText = async (url) => {
    requests.push(url);
    throw new Error('offline');
  };
  await assert.rejects(
    queryAndroidApi(runtime, { input: name }),
    (error: unknown) => {
      assert.ok(error instanceof AggregateError);
      assert.equal(error.errors.length, 2);
      return true;
    },
  );
  assert.equal(requests.length, 2);
});

test('file-name member references resolve the same target as class references', async () => {
  const baseline = await queryAndroidApi(movedFixture().runtime, {
    input: name,
  });
  for (const text of [
    'IConnectivityManager.aidl.ping',
    'IConnectivityManager.aidl#ping',
    'android.net.IConnectivityManager.aidl.ping',
    'framework/src/android/net/IConnectivityManager.aidl.ping',
  ]) {
    const result = await queryAndroidApi(movedFixture().runtime, {
      input: { mode: 'name', text },
    });
    assert.deepEqual(result.resolvedTarget, baseline.resolvedTarget, text);
    assert.deepEqual(result.tags, baseline.tags, text);
  }
});

test('exact reference search returns repository-qualified historical candidates', () => {
  const { index } = movedFixture();
  const exact = searchSources(index, 'android.net.IConnectivityManager');
  assert.equal(exact.length, 2);
  assert.deepEqual(
    new Set(exact.map((c) => c.repo)),
    new Set([base, connectivity]),
  );
  assert.equal(searchSources(index, 'connectivitymanag').length, 0);
  assert.equal(searchSources(index, 'no-such-file').length, 0);
  assert.deepEqual(exact.find((c) => c.repo === base)?.availableTags, [t11]);
});
test('class identity follows cross-repository moves without inventing a signature change', async () => {
  const { runtime } = movedFixture();
  const result = await queryAndroidApi(runtime, { input: name });
  assert.deepEqual(
    result.tags.map((t) => [t.status, t.source?.repo]),
    [
      ['found', base],
      ['found', connectivity],
    ],
  );
  assert.equal(result.overloads.length, 1);
  assert.equal(result.ranges.length, 1);
  assert.equal(
    result.resolvedTarget?.paths.join('.'),
    'IConnectivityManager.ping',
  );
});
test('exact old source selects a type and still follows its move', async () => {
  const { runtime } = movedFixture();
  const result = await queryAndroidApi(runtime, {
    input: {
      mode: 'source',
      source: { repo: base, path: oldPath },
      target: 'IConnectivityManager.ping',
      anchorTag: t11,
    },
  });
  assert.equal(result.selection?.repo, base);
  assert.equal(result.tags[1]?.source?.repo, connectivity);
});
test('file queries and source reads pin the repository and path', async () => {
  const { runtime } = movedFixture();
  const result = await queryAndroidApi(runtime, {
    input: {
      mode: 'source',
      source: { repo: base, path: oldPath },
      anchorTag: t11,
    },
  });
  assert.equal(result.tags[1]?.reason, 'source-file-not-found');
  assert.equal(
    (await loadAndroidSourceFile(runtime, t12, { repo: base, path: oldPath }))
      .status,
    'not-found',
  );
  assert.equal(
    (
      await loadAndroidSourceFile(runtime, t12, {
        repo: connectivity,
        path: newPath,
      })
    ).content,
    aidl,
  );
});
test('same-repository path migration is resolved by qualified type', async () => {
  const repo = 'platform/packages/modules/SdkExtensions';
  const { runtime } = fixture([
    {
      repo,
      tag: t11,
      path: 'framework/java/android/os/ext/SdkExtensions.java',
      content: 'package android.os.ext; public class SdkExtensions {}',
    },
    {
      repo,
      tag: t12,
      path: 'java/android/os/ext/SdkExtensions.java',
      content: 'package android.os.ext; public class SdkExtensions {}',
    },
  ]);
  const result = await queryAndroidApi(runtime, {
    input: { mode: 'name', text: 'android.os.ext.SdkExtensions' },
  });
  assert.equal(result.summary.foundTags, 2);
  assert.notEqual(result.tags[0]?.source?.path, result.tags[1]?.source?.path);
});
test('embedded types require an explicit source instead of a built-in association', async () => {
  const t8 = 'android-8.0.0_r1';
  const { runtime } = fixture([
    {
      repo: base,
      tag: t8,
      path: 'core/java/android/os/Binder.java',
      content:
        'package android.os; public class Binder {} class BinderProxy { public boolean pingBinder() { return true; } }',
    },
    {
      repo: base,
      tag: t11,
      path: 'core/java/android/os/BinderProxy.java',
      content:
        'package android.os; public class BinderProxy { public boolean pingBinder() { return true; } }',
    },
  ]);
  const result = await queryAndroidApi(runtime, {
    input: { mode: 'name', text: 'BinderProxy.pingBinder' },
  });
  assert.equal(result.summary.foundTags, 1);
  assert.equal(result.tags[0]?.status, 'not-found');
  const explicit = await queryAndroidApi(runtime, {
    input: {
      mode: 'source',
      source: { repo: base, path: 'core/java/android/os/Binder.java' },
      anchorTag: t8,
      target: 'BinderProxy.pingBinder',
    },
  });
  assert.equal(explicit.tags[0]?.status, 'found');
  assert.equal(
    explicit.tags[0]?.source?.path,
    'core/java/android/os/Binder.java',
  );
});
test('unindexed tags are unknown and prevent generating version guards', async () => {
  const { runtime, index } = movedFixture();
  index.repositories[0]!.tagSnapshots[getIndexTags(index).indexOf(t11)] = -2;
  const result = await queryAndroidApi(runtime, { input: name });
  assert.equal(result.tags[0]?.status, 'error');
  assert.equal(result.tags[0]?.reason, 'index-unavailable');
  await assert.rejects(
    generateAndroidApiCode(runtime, { input: name }),
    /source queries have errors/,
  );
});
test('missing mirror tags remain unknown instead of unsupported', async () => {
  const { runtime, index } = movedFixture();
  index.repositories[0]!.tagSnapshots[getIndexTags(index).indexOf(t11)] = -1;
  const result = await queryAndroidApi(runtime, { input: name });
  assert.equal(result.tags[0]?.reason, 'index-unavailable');
});

test('unrelated repository coverage does not change an absent type into an error', async () => {
  const { runtime, index } = fixture([
    {
      repo: base,
      path: 'core/java/a/Example.java',
      tag: t12,
      content: 'package a; public class Example {}',
    },
    {
      repo: connectivity,
      path: 'framework/src/a/Other.java',
      tag: t11,
      content: 'package a; public class Other {}',
    },
  ]);
  index.repositories[1]!.tagSnapshots.fill(-2);
  const result = await queryAndroidApi(runtime, {
    input: { mode: 'name', text: 'Example' },
  });
  assert.equal(result.tags[0]?.status, 'not-found');
  assert.equal(result.tags[1]?.status, 'found');
});

test('missing names and missing types in selected files produce empty results', async () => {
  const { runtime } = movedFixture();
  for (const input of [
    { mode: 'name' as const, text: 'Absent' },
    {
      mode: 'source' as const,
      source: { repo: connectivity, path: newPath },
      target: 'Absent',
    },
  ]) {
    const result = await queryAndroidApi(runtime, { input });
    assert.deepEqual(result.tags, []);
    assert.equal(result.selection, undefined);
    assert.equal(result.summary.foundTags, 0);
  }
});
test('simple names select the highest ranked package', async () => {
  const { runtime } = fixture([
    {
      repo: base,
      tag: t11,
      path: 'core/java/a/Example.java',
      content: 'package a; public class Example {}',
    },
    {
      repo: connectivity,
      tag: t11,
      path: 'framework/src/b/Example.java',
      content: 'package b; public class Example {}',
    },
  ]);
  const simple = await queryAndroidApi(runtime, {
    input: { mode: 'name', text: 'Example' },
  });
  assert.equal(simple.package, 'a');
  const result = await queryAndroidApi(runtime, {
    input: { mode: 'name', text: 'a.Example' },
  });
  assert.equal(result.package, 'a');
});
test('multiple definitions select the preferred path', async () => {
  const { runtime } = fixture([
    { repo: base, tag: t11, path: oldPath, content: aidl },
    { repo: base, tag: t11, path: newPath, content: aidl },
  ]);
  const result = await queryAndroidApi(runtime, { input: name });
  assert.equal(result.tags[0]?.status, 'found');
  assert.equal(result.tags[0]?.source?.path, oldPath);
});
test('class exists but member is absent yields confirmed not-found', async () => {
  const { runtime } = movedFixture();
  const result = await queryAndroidApi(runtime, {
    input: { mode: 'name', text: 'IConnectivityManager.missing' },
  });
  assert.ok(
    result.tags.every(
      (t) => t.status === 'not-found' && t.reason === 'api-not-found',
    ),
  );
});
test('package changes are not assumed to be API migrations', async () => {
  const { runtime } = fixture([
    {
      repo: base,
      tag: t11,
      path: oldPath,
      content: aidl.replace('android.net', 'different.namespace'),
    },
    { repo: connectivity, tag: t12, path: newPath, content: aidl },
  ]);
  const result = await queryAndroidApi(runtime, {
    input: {
      mode: 'source',
      source: { repo: connectivity, path: newPath },
      target: 'IConnectivityManager',
    },
  });
  assert.equal(result.tags[0]?.status, 'not-found');
  assert.equal(result.tags[1]?.status, 'found');
});
test('failed historical download is unknown and not cached as a missing API', async () => {
  const { runtime, queries } = movedFixture();
  const fetch = runtime.fetchText;
  runtime.fetchText = async (url, signal) => {
    if (url.includes(t11)) throw new Error('Connection failed');
    return fetch(url, signal);
  };
  const result = await queryAndroidApi(runtime, {
    input: {
      mode: 'source',
      source: { repo: connectivity, path: newPath },
      target: 'IConnectivityManager',
    },
  });
  assert.equal(result.tags[0]?.reason, 'network-error');
  assert.equal(queries.size, 0);
});

test('malformed historical AIDL stays unknown and is never cached as a partial structure', async () => {
  const { runtime, contents, structures } = movedFixture();
  contents.set(
    getMirrorContentUrl({ repo: base, path: oldPath }, t11),
    'package android.net; interface IConnectivityManager { int ping(); void broken( ; }',
  );
  const input = {
    mode: 'source' as const,
    source: { repo: connectivity, path: newPath },
    target: 'IConnectivityManager.ping',
    anchorTag: t12,
  };
  const result = await queryAndroidApi(runtime, { input });
  assert.equal(result.tags[0]?.status, 'error');
  assert.equal(result.tags[0]?.reason, 'parse-error');
  assert.equal(result.tags[1]?.status, 'found');
  assert.ok([...structures.keys()].every((key) => !key.includes(t11)));
  await assert.rejects(generateAndroidApiCode(runtime, { input }));
});
test('nested types, constructors and overloads are parsed after source selection', async () => {
  const path = 'core/java/a/Outer.java';
  const { runtime } = fixture([
    {
      repo: base,
      tag: t11,
      path,
      content:
        'package a; public class Outer { public static class Inner { public Inner() {} public Inner(int value) {} public void ping() {} public void ping(int value) {} } }',
    },
  ]);
  const result = await queryAndroidApi(runtime, {
    input: { mode: 'name', text: 'a.Outer.Inner()' },
  });
  assert.equal(result.overloads.length, 2);
  assert.ok(result.overloads.every((o) => o.member.kind === 'constructor'));
  const methods = await queryAndroidApi(runtime, {
    input: { mode: 'name', text: 'a.Outer.Inner.ping' },
  });
  assert.equal(methods.overloads.length, 2);
});
test('same path in different repositories does not collide in caches', async () => {
  const path = 'src/a/Example.java';
  const { runtime } = fixture([
    {
      repo: base,
      tag: t11,
      path,
      content: 'package a; public class Example { public int a; }',
    },
    {
      repo: connectivity,
      tag: t11,
      path,
      content: 'package a; public class Example { public int b; }',
    },
  ]);
  assert.equal(
    (await loadParsedSource(runtime, { repo: base, path }, t11)).structs[0]
      ?.members[0]?.name,
    'a',
  );
  assert.equal(
    (await loadParsedSource(runtime, { repo: connectivity, path }, t11))
      .structs[0]?.members[0]?.name,
    'b',
  );
});
test('index revision participates in query cache keys', async () => {
  const { runtime, index, queries } = movedFixture();
  await queryAndroidApi(runtime, { input: name });
  index.revision = 'test-2';
  await queryAndroidApi(runtime, { input: name });
  assert.equal(queries.size, 2);
});
test('strict source input rejects unknown repositories and traversal', async () => {
  const { runtime } = movedFixture();
  await assert.rejects(
    loadAndroidSourceFile(runtime, t11, {
      repo: base,
      path: '../outside.java',
    }),
    /Invalid/,
  );
  await assert.rejects(
    loadAndroidSourceFile(runtime, t11, { repo: 'other/repo', path: 'a.java' }),
    /not enabled/,
  );
  await assert.rejects(
    queryAndroidApi(runtime, { input: name, signal: AbortSignal.abort() }),
  );
});

test('explicit source and anchor work even when the anchor tree is unindexed', async () => {
  const { runtime, index } = movedFixture();
  index.repositories.find((r) => r.repo === connectivity)!.tagSnapshots[
    getIndexTags(index).indexOf(t12)
  ] = -2;
  const result = await queryAndroidApi(runtime, {
    input: {
      mode: 'source',
      source: { repo: connectivity, path: newPath },
      target: 'IConnectivityManager',
      anchorTag: t12,
    },
  });
  assert.equal(result.tags.find((t) => t.tag === t12)?.status, 'found');
  assert.equal(result.tags.find((t) => t.tag === t11)?.source?.repo, base);
});

test('explicit source overrides the default repository preference', async () => {
  const { runtime } = fixture([
    { repo: base, tag: t11, path: oldPath, content: aidl },
    { repo: connectivity, tag: t11, path: newPath, content: aidl },
  ]);
  const result = await queryAndroidApi(runtime, {
    input: {
      mode: 'source',
      source: { repo: connectivity, path: newPath },
      target: 'IConnectivityManager',
    },
  });
  assert.equal(result.tags[0]?.status, 'found');
  assert.equal(result.tags[0]?.source?.repo, connectivity);
});

test('overload identities survive parameter renames while preserving definition history across moves', async () => {
  const t13 = 'android-13.0.0_r1';
  const { runtime } = fixture([
    {
      repo: base,
      tag: t11,
      path: 'core/java/a/Example.java',
      content:
        'package a; public class Example { public void ping(int oldName) {} }',
    },
    {
      repo: connectivity,
      tag: t12,
      path: 'framework/src/a/Example.java',
      content:
        'package a; public class Example { public void ping(int newName) {} public void ping(String value) {} }',
    },
    {
      repo: connectivity,
      tag: t13,
      path: 'framework/src/a/Example.java',
      content:
        'package a; public class Example { public void ping(int value) {} }',
    },
  ]);
  const result = await queryAndroidApi(runtime, {
    input: { mode: 'name', text: 'a.Example.ping' },
  });
  assert.equal(result.overloads.length, 2);
  const intOverload = result.overloads.find((o) =>
    o.signature.includes('int'),
  )!;
  assert.equal(intOverload.ranges.length, 3);
  assert.ok(intOverload.ranges.every((r) => !r.missingReason));
  assert.equal(intOverload.ranges[0]?.fromTag, t11);
  assert.equal(intOverload.ranges.at(-1)?.toTag, t13);
  const stringOverload = result.overloads.find((o) =>
    o.signature.includes('String'),
  )!;
  assert.deepEqual(
    stringOverload.ranges.map((r) => r.missingReason),
    ['overload-not-found', undefined, 'overload-not-found'],
  );
});

test('tag ordering includes patch versions even when a custom version list is unsorted', async () => {
  const tags = ['android-8.0.1_r1', 'android-8.0.0_r2', 'android-8.0.0_r1'];
  const { runtime } = fixture(
    tags.map((tag) => ({ repo: base, tag, path: oldPath, content: aidl })),
  );
  runtime.loadAndroidVersionList = async () => [
    { version: '8', alias: 'O', apiVersion: 26, tags, futureTags: [] },
  ];
  const result = await queryAndroidApi(runtime, { input: name });
  assert.deepEqual(
    result.tags.map((t) => t.tag),
    ['android-8.0.0_r1', 'android-8.0.0_r2', 'android-8.0.1_r1'],
  );
  assert.equal(result.summary.firstFoundTag, 'android-8.0.0_r1');
  assert.equal(result.summary.lastFoundTag, 'android-8.0.1_r1');
});

test('identical source contents reuse parsed structures across repository moves', async () => {
  const { runtime } = movedFixture();
  const old = await loadParsedSource(
    runtime,
    { repo: base, path: oldPath },
    t11,
  );
  const next = await loadParsedSource(
    runtime,
    { repo: connectivity, path: newPath },
    t12,
  );
  assert.equal(old, next);
});

for (const tag of [
  'android-12.1.0_r1',
  'android-12.1.0_r13',
  'android-12.1.0_r27',
])
  test(`Connectivity duplicates use generic priority and preserve explicit paths: ${tag}`, async () => {
    const legacy = 'core/java/android/net/IConnectivityManager.aidl';
    const current = 'framework/src/android/net/IConnectivityManager.aidl';
    const content = (method: string) =>
      `package android.net; interface IConnectivityManager { void ${method}(); }`;
    const entries = [
      { repo: connectivity, tag, path: legacy, content: content('oldOnly') },
      {
        repo: connectivity,
        tag,
        path: current,
        content: content('currentOnly'),
      },
    ];
    for (const order of [entries, [...entries].reverse()]) {
      const { runtime } = fixture(order);
      const result = await queryAndroidApi(runtime, {
        input: {
          mode: 'name',
          text: 'android.net.IConnectivityManager.currentOnly',
        },
      });
      assert.equal(result.tags[0]?.status, 'not-found');
      assert.equal(result.tags[0]?.source?.path, legacy);
      await generateAndroidApiCode(runtime, {
        input: {
          mode: 'name',
          text: 'android.net.IConnectivityManager.currentOnly',
        },
      });
      const explicit = await queryAndroidApi(runtime, {
        input: {
          mode: 'source',
          source: { repo: connectivity, path: current },
          anchorTag: tag,
          target: 'IConnectivityManager.currentOnly',
        },
      });
      assert.equal(explicit.tags[0]?.status, 'found');
      assert.equal(explicit.tags[0]?.source?.path, current);
    }
    const { runtime: onlyLegacy } = fixture([entries[0]!]);
    assert.equal(
      (
        await queryAndroidApi(onlyLegacy, {
          input: {
            mode: 'name',
            text: 'android.net.IConnectivityManager.oldOnly',
          },
        })
      ).tags[0]?.status,
      'found',
    );
    for (const otherTag of ['android-12.0.0_r34', 'android-13.0.0_r84']) {
      const { runtime } = fixture(
        entries.map((e) => ({ ...e, tag: otherTag })),
      );
      assert.equal(
        (
          await queryAndroidApi(runtime, {
            input: { mode: 'name', text: 'android.net.IConnectivityManager' },
          })
        ).tags[0]?.status,
        'found',
      );
    }
    const { runtime: thirdDefinition } = fixture([
      ...entries,
      { ...entries[1]!, repo: base, path: legacy },
    ]);
    assert.equal(
      (
        await queryAndroidApi(thirdDefinition, {
          input: { mode: 'name', text: 'android.net.IConnectivityManager' },
        })
      ).tags[0]?.source?.repo,
      base,
    );
  });

test('queries visit versions round-robin while result tags stay in version order', async () => {
  const tags = [
    'android-8.0.0_r1',
    'android-8.0.0_r2',
    'android-8.0.0_r3',
    'android-8.1.0_r1',
    'android-8.1.0_r2',
    'android-9.0.0_r1',
  ];
  const { runtime } = fixture(
    tags.map((tag) => ({ repo: base, tag, path: oldPath, content: aidl })),
  );
  const started: string[] = [];
  const result = await queryAndroidApi(runtime, {
    input: name,
    minSdk: 26,
    concurrency: 1,
    onEvent(event) {
      if (event.type === 'tag-start') started.push(event.tag);
    },
  });
  assert.deepEqual(started, [
    tags[0],
    tags[3],
    tags[5],
    tags[1],
    tags[4],
    tags[2],
  ]);
  assert.deepEqual(
    result.tags.map((item) => item.tag),
    tags,
  );
  assert.equal(result.summary.firstFoundTag, tags[0]);
  assert.equal(result.summary.lastFoundTag, tags[5]);
});
