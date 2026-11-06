import assert from 'node:assert/strict';
import test from 'node:test';
import { getIndexedSourceLinks } from '../src/core/catalog/source-links.ts';
import {
  movedFixture,
  fixture,
  base,
  connectivity,
  oldPath,
  newPath,
  t11,
  t12,
  aidl,
} from './fixtures.ts';

test('links follow repository and path migrations without fetching or parsing', () => {
  const { index, requests } = movedFixture();
  const links = getIndexedSourceLinks(index, {
    mode: 'name',
    text: 'IConnectivityManager.ping',
  });
  assert.deepEqual(links.get(t11), { repo: base, path: oldPath });
  assert.deepEqual(links.get(t12), { repo: connectivity, path: newPath });
  assert.deepEqual(requests, []);
});

test('exact file links stay on the requested path while API links follow moves', () => {
  const { index } = movedFixture();
  const source = { repo: connectivity, path: newPath };
  assert.equal(
    getIndexedSourceLinks(index, { mode: 'source', source }).has(t11),
    false,
  );
  assert.deepEqual(
    getIndexedSourceLinks(index, {
      mode: 'source',
      source,
      target: 'IConnectivityManager.ping',
    }).get(t11),
    { repo: base, path: oldPath },
  );
});

test('duplicate sources use priority while unindexed sources have no links', () => {
  const { index } = fixture([
    { repo: base, path: oldPath, tag: t12, content: aidl },
    { repo: base, path: newPath, tag: t12, content: aidl },
  ]);
  assert.deepEqual(
    getIndexedSourceLinks(index, {
      mode: 'name',
      text: 'IConnectivityManager',
    }).get(t12),
    { repo: base, path: oldPath },
  );
  const source = { repo: base, path: newPath };
  assert.deepEqual(
    getIndexedSourceLinks(index, {
      mode: 'source',
      source,
      target: 'IConnectivityManager',
    }).get(t12),
    source,
  );
  for (const repo of index.repositories) repo.tagSnapshots.fill(-2);
  assert.equal(
    getIndexedSourceLinks(
      { ...index },
      { mode: 'name', text: 'IConnectivityManager' },
    ).size,
    0,
  );
});

test('source links do not invent associations with differently named files', () => {
  const proxy = 'core/java/android/os/BinderProxy.java';
  const binder = 'core/java/android/os/Binder.java';
  const { index } = fixture([
    { repo: base, path: binder, tag: 'android-8.0.0_r1', content: '' },
    { repo: base, path: proxy, tag: t11, content: '' },
  ]);
  const links = getIndexedSourceLinks(index, {
    mode: 'name',
    text: 'BinderProxy.transact',
  });
  assert.equal(links.has('android-8.0.0_r1'), false);
  assert.deepEqual(links.get(t11), { repo: base, path: proxy });
});
