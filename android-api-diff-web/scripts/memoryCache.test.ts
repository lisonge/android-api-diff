import assert from 'node:assert/strict';
import test from 'node:test';
import { createMemoryCache } from '../src/utils/cache/memoryCache.ts';
import { movedFixture } from '../../android-api-diff/scripts/fixtures.ts';
import { queryAndroidApi } from '../../android-api-diff/src/core/query.ts';
import { loadTagView } from '../src/views/home/queryView.ts';

test('repeated query and tag views finish before the next timer without persistent reads', async () => {
  const { runtime, requests } = movedFixture();
  let epoch = 0;
  let reads = 0;
  const persistent = runtime.structCache!;
  runtime.structCache = createMemoryCache(4096, () => epoch, {
    async get(key) {
      reads++;
      await new Promise((resolve) => setTimeout(resolve, 0));
      return persistent.get(key);
    },
    set: persistent.set,
  });
  runtime.queryCache = createMemoryCache(64, () => epoch);
  const search = async () => {
    const result = await queryAndroidApi(runtime, {
      input: { mode: 'name', text: 'IConnectivityManager' },
    });
    const views = [];
    for (const item of result.tags)
      views.push(await loadTagView(runtime, result, item));
    return { result, views };
  };
  const first = await search();
  const initialReads = reads;
  const initialRequests = requests.length;
  let timerRan = false;
  const timer = setTimeout(() => {
    timerRan = true;
  }, 0);
  try {
    const repeated = await search();
    assert.deepEqual(repeated, first);
    assert.equal(repeated.result, first.result);
    assert.equal(repeated.views[0]!.file, first.views[0]!.file);
    assert.equal(reads, initialReads);
    assert.equal(requests.length, initialRequests);
    assert.equal(timerRan, false);
  } finally {
    clearTimeout(timer);
  }
  epoch++;
  assert.deepEqual(await search(), first);
  assert.ok(reads > initialReads);
});

test('memory cache refreshes recent entries and reloads evicted values', async () => {
  const reads: string[] = [];
  const cache = createMemoryCache(2, () => 0, {
    async get(key) {
      reads.push(key);
      return key;
    },
    async set() {},
  });
  await cache.get('a');
  await cache.get('b');
  await cache.get('a');
  await cache.get('c');
  await cache.get('b');
  assert.deepEqual(reads, ['a', 'b', 'c', 'b']);
});

test('an in-flight persistent read cannot repopulate memory after a reset', async () => {
  let epoch = 0;
  let resolveRead!: (value: string) => void;
  let reads = 0;
  const cache = createMemoryCache(2, () => epoch, {
    get: async () => {
      reads++;
      if (reads > 1) return 'new';
      return new Promise<string>((resolve) => {
        resolveRead = resolve;
      });
    },
    async set() {},
  });
  const pending = cache.get('key');
  epoch++;
  resolveRead('old');
  await pending;
  assert.equal(await cache.get('key'), 'new');
  assert.equal(reads, 2);
});
