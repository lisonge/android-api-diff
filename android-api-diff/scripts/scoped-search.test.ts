import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getSourceSearchText,
  searchSources,
  splitSourceSearch,
} from '../src/core/catalog/search.ts';
import { queryAndroidApi } from '../src/core/query.ts';
import { getIndexedSourceLinks } from '../src/core/catalog/source-links.ts';
import { fixture, base, connectivity, t11, t12 } from './fixtures.ts';

const path = 'core/java/android/net/Example.java';
const content = 'package android.net; public class Example {}';

test('exact class matches exclude substring matches across repositories', () => {
  const exactPath = 'core/java/android/net/ConnectivityManager.java';
  const sharedPath = 'framework/src/android/net/SharedConnectivityManager.java';
  const { index } = fixture([
    { repo: base, path: exactPath, tag: t11, content },
    { repo: connectivity, path: exactPath, tag: t12, content },
    { repo: connectivity, path: sharedPath, tag: t12, content },
  ]);
  const matches = searchSources(index, 'ConnectivityManager');
  assert.deepEqual(
    matches.map(({ repo }) => repo),
    [base, connectivity],
  );
  assert.ok(matches.every((item) => item.path === exactPath));
  assert.deepEqual(searchSources(index, 'ConnectivityMan'), []);
  assert.deepEqual(
    searchSources(index, `${connectivity}/SharedConnectivityManager`).map(
      (item) => item.path,
    ),
    [sharedPath],
  );
});
test('partial names and directory prefixes do not match files', () => {
  const sharedPath = 'framework/src/android/net/SharedConnectivityManager.java';
  const { index } = fixture([
    { repo: connectivity, path: sharedPath, tag: t12, content },
  ]);
  for (const text of [
    'ConnectivityManager',
    'ConnectivityMan',
    'Manager',
    'sharedconnectivity',
    'net/Shared',
    'framework/src',
  ]) {
    assert.deepEqual(searchSources(index, text), [], text);
  }
  for (const text of [
    'SharedConnectivityManager',
    'android.net.SharedConnectivityManager',
    sharedPath,
  ]) {
    assert.deepEqual(
      searchSources(index, text).map((item) => item.path),
      [sharedPath],
      text,
    );
  }
});

test('Hidden references match both complete names and preserve member targets', () => {
  const paths = [
    'UserInfo',
    'UserInfoHidden',
    'SharedUserInfo',
    'UserInfoHiddenExtra',
  ].map((name) => `core/java/android/content/pm/${name}.java`);
  const { index } = fixture(
    paths.map((path) => ({ repo: base, path, tag: t12, content })),
  );
  for (const text of [
    'UserInfoHidden',
    'android.content.pm.UserInfoHidden',
    `${base}/UserInfoHidden`,
  ]) {
    assert.deepEqual(
      new Set(searchSources(index, text).map((item) => item.path)),
      new Set(paths.slice(0, 2)),
    );
  }
  const members = searchSources(index, 'UserInfoHidden.name');
  assert.deepEqual(
    members.map((item) => item.targetPaths),
    [
      ['UserInfo', 'name'],
      ['UserInfoHidden', 'name'],
    ],
  );
  assert.deepEqual(
    searchSources(index, 'UserInfo').map((item) => item.path),
    [paths[0]],
  );
  assert.deepEqual(
    searchSources(index, paths[1]!).map((item) => item.path),
    [paths[1]],
  );
});
test('selection qualifies paths duplicated across repositories, even in different tags', async () => {
  const { index, runtime } = fixture([
    { repo: base, path, tag: t11, content },
    { repo: connectivity, path, tag: t12, content },
  ]);
  const text = getSourceSearchText(index, { repo: connectivity, path });
  assert.equal(text, `${connectivity}/${path}`);
  assert.equal(searchSources(index, path).length, 2);
  assert.deepEqual(
    searchSources(index, text).map((item) => item.repo),
    [connectivity],
  );
  const result = await queryAndroidApi(runtime, {
    input: { mode: 'name', text },
    minSdk: 31,
  });
  assert.deepEqual(result.tags[0]?.source, { repo: connectivity, path });
  assert.equal(
    getIndexedSourceLinks(index, { mode: 'name', text }).has(t11),
    false,
  );
});

test('unique paths stay short and repository-scoped searches never fall back to another repository', () => {
  const { index } = fixture([
    { repo: base, path, tag: t12, content },
    {
      repo: connectivity,
      path: 'framework/src/android/net/Other.java',
      tag: t12,
      content,
    },
  ]);
  assert.equal(getSourceSearchText(index, { repo: base, path }), path);
  assert.deepEqual(searchSources(index, `${connectivity}/${path}`), []);
  assert.deepEqual(searchSources(index, connectivity), []);
  assert.equal(
    splitSourceSearch(index, `${base}Extra/${path}`).repo,
    undefined,
  );
  assert.equal(searchSources(index, `${base}/Example`).length, 1);
});
