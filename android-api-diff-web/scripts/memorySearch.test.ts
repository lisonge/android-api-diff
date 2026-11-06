import assert from 'node:assert/strict';
import test from 'node:test';
import {
  queryAndroidApi,
  type AndroidApiStructCacheEntry,
} from 'android-api-diff';
import {
  movedFixture,
  fixture,
  base,
  t11,
  t12,
} from '../../android-api-diff/scripts/fixtures.ts';
import { createMemoryCache } from '../src/utils/cache/memoryCache.ts';
import { canSearchFromMemory } from '../src/views/home/memorySearch.ts';

test('live search follows available structures rather than input separators or search history', async () => {
  const { runtime, index, requests } = movedFixture();
  let epoch = 0;
  const cache = createMemoryCache<AndroidApiStructCacheEntry>(
    4096,
    () => epoch,
  );
  runtime.structCache = cache;
  const ready = (text: string) =>
    canSearchFromMemory(index, text, 26, cache.peek);
  assert.equal(ready('IConnectivityManager.ping'), false);
  await queryAndroidApi(runtime, {
    input: { mode: 'name', text: 'IConnectivityManager' },
  });
  const count = requests.length;
  for (const text of [
    'IConnectivityManager.ping',
    'IConnectivityManager#missing',
    'android.net.IConnectivityManager.ping',
    'IConnectivityManager.aidl.ping',
    'IConnectivityManager',
  ]) {
    assert.equal(ready(text), true, text);
    await queryAndroidApi(runtime, { input: { mode: 'name', text } });
  }
  assert.equal(requests.length, count);
  assert.equal(ready('NotAClass'), true);
  epoch++;
  assert.equal(ready('IConnectivityManager'), false);
});

test('file paths and embedded classes can reuse loaded files, but another unloaded file cannot', async () => {
  const path = 'core/java/a/Outer.java';
  const { index, runtime } = fixture([
    {
      repo: base,
      path,
      tag: t11,
      content:
        'package a; public class Outer { public static class Inner { public int value; } }',
    },
    {
      repo: base,
      path: 'core/java/a/Other.java',
      tag: t12,
      content: 'package a; public class Other {}',
    },
  ]);
  const cache = createMemoryCache<AndroidApiStructCacheEntry>(4096, () => 0);
  runtime.structCache = cache;
  await queryAndroidApi(runtime, { input: { mode: 'name', text: path } });
  for (const text of [
    path,
    'Outer',
    'Outer.Inner',
    'Outer.Inner.value',
    `${base}/${path}`,
  ]) {
    assert.equal(canSearchFromMemory(index, text, 26, cache.peek), true, text);
  }
  assert.equal(canSearchFromMemory(index, 'Other', 26, cache.peek), false);
});
