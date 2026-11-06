import assert from 'node:assert/strict';
import test from 'node:test';
import { queryAndroidApi } from '../src/core/query.ts';
import { getIndexedSourceLinks } from '../src/core/catalog/source-links.ts';
import { fixture, base, connectivity, t11 } from './fixtures.ts';

test('base then Java preference resolves UserInfo.name consistently for queries and links', async () => {
  const java = 'core/java/android/content/pm/UserInfo.java';
  const aidl = 'core/java/android/content/pm/UserInfo.aidl';
  const other = 'framework/src/android/content/pm/UserInfo.java';
  const { runtime, index } = fixture([
    {
      repo: base,
      tag: t11,
      path: java,
      content:
        'package android.content.pm; public class UserInfo { public String name; }',
    },
    {
      repo: base,
      tag: t11,
      path: aidl,
      content:
        'package android.content.pm; parcelable UserInfo { String name; }',
    },
    {
      repo: connectivity,
      tag: t11,
      path: other,
      content:
        'package android.content.pm; public class UserInfo { public int name; }',
    },
  ]);
  const input = { mode: 'name' as const, text: 'UserInfo.name' };
  const result = await queryAndroidApi(runtime, { input });
  assert.equal(result.tags[0]?.status, 'found');
  assert.deepEqual(result.tags[0]?.source, { repo: base, path: java });
  assert.deepEqual(
    getIndexedSourceLinks(index, input).get(t11),
    result.tags[0]?.source,
  );
  const explicit = await queryAndroidApi(runtime, {
    input: {
      mode: 'source',
      source: { repo: connectivity, path: other },
      target: 'UserInfo.name',
    },
  });
  assert.deepEqual(explicit.tags[0]?.source, {
    repo: connectivity,
    path: other,
  });
});

test('I-prefixed interface also prefers Java over AIDL', async () => {
  const path = 'core/java/android/test/IExample';
  const { runtime, index } = fixture([
    {
      repo: base,
      tag: t11,
      path: path + '.java',
      content:
        'package android.test; public interface IExample { int ping(); }',
    },
    {
      repo: base,
      tag: t11,
      path: path + '.aidl',
      content: 'package android.test; interface IExample { int ping(); }',
    },
  ]);
  const input = { mode: 'name' as const, text: 'IExample.ping' };
  const result = await queryAndroidApi(runtime, { input });
  assert.equal(result.tags[0]?.status, 'found');
  assert.equal(result.tags[0]?.source?.path, path + '.java');
  assert.deepEqual(
    getIndexedSourceLinks(index, input).get(t11),
    result.tags[0]?.source,
  );
});

test('extension precedes repository and path ordering is deterministic', async () => {
  const { preferSources } =
    await import('../src/core/catalog/preferred-sources.ts');
  const options = [
    { repo: base, path: 'core/java/a/Example.aidl' },
    { repo: connectivity, path: 'framework/src/a/Example.java' },
  ];
  assert.deepEqual(
    preferSources(options, (source) => source),
    [options[1]],
  );
  const paths = [
    { repo: base, path: 'framework/src/a/Example.java' },
    { repo: base, path: 'core/java/b/Example.java' },
    { repo: base, path: 'core/java/a/Example.java' },
  ];
  assert.deepEqual(
    preferSources(paths, (source) => source),
    [paths[2]],
  );
  assert.deepEqual(
    preferSources([...paths].reverse(), (source) => source),
    [paths[2]],
  );
});
