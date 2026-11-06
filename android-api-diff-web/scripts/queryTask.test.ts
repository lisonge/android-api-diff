import assert from 'node:assert/strict';
import test from 'node:test';
import { computed, effectScope, watch } from 'vue';
import { createQueryTask } from '../src/views/home/queryTask.ts';
import { useQueryDisplay } from '../src/views/home/queryDisplay.ts';
import {
  movedFixture,
  t11,
  t12,
  connectivity,
  newPath,
} from '../../android-api-diff/scripts/fixtures.ts';
import { queryAndroidApi } from '../../android-api-diff/src/core/query.ts';
import { createMemoryCache } from '../src/utils/cache/memoryCache.ts';

const options = {
  input: {
    mode: 'source' as const,
    source: { repo: connectivity, path: newPath },
    target: 'IConnectivityManager.ping',
  },
  concurrency: 2,
};

test('switching hash members reuses loaded source structures without a loading frame', async () => {
  const { runtime, requests } = movedFixture();
  const task = createQueryTask(runtime);
  await task.run({
    input: { mode: 'name', text: 'IConnectivityManager#ping' },
  });
  const requestCount = requests.length;
  const loading: boolean[] = [];
  const stop = watch(task.loading, (value) => loading.push(value), {
    flush: 'sync',
  });
  try {
    await task.run({
      input: { mode: 'name', text: 'IConnectivityManager#missing' },
    });
    assert.ok(
      task.result.value?.tags.every((tag) => tag.status === 'not-found'),
    );
    await task.run({
      input: { mode: 'name', text: 'IConnectivityManager#ping' },
    });
    assert.ok(task.result.value?.tags.every((tag) => tag.status === 'found'));
    assert.equal(requests.length, requestCount);
    assert.deepEqual(loading, []);
  } finally {
    stop();
  }
});

test('cached query recovery treats a missing source as a normal result', async () => {
  const { runtime, structures, contents } = movedFixture();
  const input = {
    mode: 'source' as const,
    source: { repo: connectivity, path: newPath },
  };
  await queryAndroidApi(runtime, { input });
  structures.clear();
  runtime.textCache = undefined;
  contents.clear();
  const task = createQueryTask(runtime);
  await task.run({ input });
  assert.equal(task.phase.value, 'complete');
  assert.equal(task.error.value, '');
  assert.ok(task.result.value?.tags.every((tag) => tag.status === 'not-found'));
  assert.equal(task.result.value?.summary.foundTags, 0);
  await task.run({ input });
  assert.equal(task.phase.value, 'complete');
  assert.equal(task.result.value?.summary.foundTags, 0);
});

test('missing files keep their status and color without a diagnostic label', async () => {
  const { runtime } = movedFixture();
  const task = createQueryTask(runtime);
  const scope = effectScope();
  const display = scope.run(() =>
    useQueryDisplay(
      computed(() => [...task.records.value.values()]),
      computed(() => ({
        filePath: newPath,
        targetKind: 'file',
        targetPaths: [],
      })),
      computed(() => []),
    ),
  )!;
  try {
    await task.run({
      input: { mode: 'source', source: { repo: connectivity, path: newPath } },
    });
    assert.equal(display.getDiffResult(t11)?.status, 'not-found');
    assert.equal(display.getDiffResult(t11)?.typeDesc, '');
    assert.ok(display.getDiffResult(t11)?.typeColor);
  } finally {
    scope.stop();
  }
});
const waitFor = (predicate: () => boolean) => {
  if (predicate()) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const stop = watch(
      predicate,
      (ready) => {
        if (ready) {
          stop();
          resolve();
        }
      },
      { flush: 'sync' },
    );
  });
};
const delayedFixture = () => {
  const fixture = movedFixture();
  const fetch = fixture.runtime.fetchText;
  let release!: () => void;
  const blocked = new Promise<void>((resolve) => {
    release = resolve;
  });
  fixture.runtime.fetchText = async (url, signal) => {
    if (url.includes(t11)) await blocked;
    return fetch(url, signal);
  };
  return { ...fixture, release };
};

test('completed tags and actual diff colors appear while another tag is still loading', async () => {
  const { runtime, index, release } = delayedFixture();
  const task = createQueryTask(runtime);
  const scope = effectScope();
  const display = scope.run(() =>
    useQueryDisplay(
      computed(() => [...task.records.value.values()]),
      computed(() => ({
        filePath: task.context.value.selection?.path ?? '',
        targetKind: task.context.value.resolvedTarget?.kind ?? 'file',
        targetPaths: task.context.value.resolvedTarget?.paths ?? [],
      })),
      computed(() => []),
    ),
  )!;
  const pending = task.run(options);
  try {
    await waitFor(() => task.records.value.has(t12));
    assert.equal(task.phase.value, 'querying');
    assert.equal(task.getTagState(t11), 'querying');
    assert.equal(task.getTagState(t12), 'complete');
    assert.equal(task.result.value, undefined);
    assert.equal(display.getDiffResult(t12)?.typeDesc, '() -> int');
    assert.ok(display.getDiffResult(t12)?.typeColor);
    const color = display.getDiffResult(t12)!.typeColor;
    release();
    await pending;
    assert.equal(task.phase.value, 'complete');
    assert.equal(display.getDiffResult(t12)?.typeColor, color);
    assert.equal(index.repositories.length, 2);
    const baseline = await queryAndroidApi(movedFixture().runtime, options);
    assert.deepEqual(task.result.value, baseline);
  } finally {
    release();
    await pending;
    scope.stop();
  }
});

test('cancel preserves completed tags, and a subsequent search ignores old completions', async () => {
  const { runtime, release } = delayedFixture();
  const task = createQueryTask(runtime);
  const old = task.run(options);
  try {
    await waitFor(() => task.records.value.has(t12));
    task.stop();
    assert.equal(task.phase.value, 'cancelled');
    assert.equal(task.loading.value, false);
    assert.equal(task.records.value.size, 1);
    assert.equal(task.getTagState(t11), 'cancelled');
    await task.run({ ...options, minSdk: 31 });
    const current = task.result.value;
    assert.equal(current?.tags.length, 1);
    release();
    await old;
    assert.equal(task.result.value, current);
    assert.equal(task.phase.value, 'complete');
    assert.equal(task.records.value.has(t11), false);
    task.reset();
    assert.equal(task.phase.value, 'idle');
    assert.equal(task.records.value.size, 0);
  } finally {
    release();
    await old;
  }
});

test('partial source failure is shown per tag and successful tags remain usable', async () => {
  const { runtime } = movedFixture();
  const fetch = runtime.fetchText;
  runtime.fetchText = async (url, signal) => {
    if (url.includes(t11)) throw new Error('offline');
    return fetch(url, signal);
  };
  const task = createQueryTask(runtime);
  await task.run(options);
  assert.equal(task.getTagState(t11), 'failed');
  assert.equal(task.getTagState(t12), 'complete');
  assert.equal(task.records.value.get(t11)?.reason, 'network-error');
  assert.equal(
    task.records.value.get(t12)?.target?.name,
    'IConnectivityManager',
  );
});

test('cached searches complete without loading state or repeated persistent reads', async () => {
  const { runtime } = movedFixture();
  runtime.structCache = createMemoryCache(4096, () => 0, runtime.structCache);
  runtime.queryCache = createMemoryCache(64, () => 0);
  const task = createQueryTask(runtime);
  await task.run(options);
  const first = task.result.value;
  const loading: boolean[] = [];
  const stop = watch(task.loading, (value) => loading.push(value), {
    flush: 'sync',
  });
  try {
    await task.run(options);
    assert.equal(task.result.value, first);
    assert.equal(task.records.value.size, 2);
    assert.deepEqual(loading, []);
  } finally {
    stop();
  }
});

test('unmatched search completes quietly and clears the previous result', async () => {
  const { runtime } = movedFixture();
  const task = createQueryTask(runtime);
  await task.run(options);
  await task.run({ input: { mode: 'name', text: 'NotARealClass' } });
  assert.equal(task.phase.value, 'complete');
  assert.equal(task.loading.value, false);
  assert.deepEqual(task.result.value?.tags, []);
  assert.equal(task.records.value.size, 0);
  assert.equal(task.error.value, '');
});
