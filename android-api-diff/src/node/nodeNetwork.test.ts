import assert from 'node:assert/strict';
import test from 'node:test';
import type {
  TextEtagCache,
  TextEtagRepresentation,
  TextEtagTag,
} from './textEtagCache.ts';
import {
  AdaptiveRequestLimiter,
  createFetchTextWithRetry,
  toTextEtagTag,
} from './nodeNetwork.ts';

const rawUrl = (tag: string): string =>
  `https://raw.githubusercontent.com/msft-mirror-aosp/platform.frameworks.base/refs/tags/${tag}/core/java/android/app/IExample.aidl`;

const moduleUrl = (tag: string): string =>
  rawUrl(tag).replace(
    'platform.frameworks.base',
    'platform.packages.modules.Connectivity',
  );

const compareTags = (a: TextEtagTag, b: TextEtagTag): number =>
  a.versionMajor - b.versionMajor ||
  a.versionMinor - b.versionMinor ||
  a.versionPatch - b.versionPatch ||
  a.revision - b.revision;

class MemoryTextEtagCache implements TextEtagCache {
  readonly rows: Array<{
    etag: string;
    tag: TextEtagTag;
    value: string;
  }> = [];

  async getByEtag(
    resourceKey: string,
    etag: string,
  ): Promise<TextEtagRepresentation | undefined> {
    const row = this.rows.find(
      (item) => item.tag.resourceKey === resourceKey && item.etag === etag,
    );
    if (row) return { etag: row.etag, value: row.value };
  }

  async getPredecessor(
    tag: TextEtagTag,
  ): Promise<TextEtagRepresentation | undefined> {
    const row = this.rows
      .filter(
        (item) =>
          item.tag.resourceKey === tag.resourceKey &&
          compareTags(item.tag, tag) < 0,
      )
      .sort((a, b) => compareTags(b.tag, a.tag))[0];
    if (row) return { etag: row.etag, value: row.value };
  }

  async set(tag: TextEtagTag, etag: string, value: string): Promise<void> {
    const index = this.rows.findIndex(
      (item) =>
        item.tag.resourceKey === tag.resourceKey &&
        compareTags(item.tag, tag) === 0,
    );
    const row = { etag, tag: { ...tag }, value };
    if (index < 0) {
      this.rows.push(row);
    } else {
      this.rows[index] = row;
    }
  }
}

interface TrackedResponse {
  response: Response;
  state: { cancelled: number; textReads: number };
}

const trackedResponse = (
  text: string,
  etag: string,
  status = 200,
): TrackedResponse => {
  const state = { cancelled: 0, textReads: 0 };
  const response = {
    body: {
      cancel: async () => {
        state.cancelled++;
      },
    },
    headers: new Headers({ etag }),
    status,
    text: async () => {
      state.textReads++;
      await Promise.resolve();
      return text;
    },
  } as unknown as Response;
  return { response, state };
};

test('extracts ordered Android tag coordinates from AOSP raw URLs', () => {
  assert.deepEqual(toTextEtagTag(rawUrl('android-13.0.0_r42')), {
    resourceKey:
      'raw-github:2:gzip:platform.frameworks.base:core/java/android/app/IExample.aidl',
    versionMajor: 13,
    versionMinor: 0,
    versionPatch: 0,
    revision: 42,
  });
  assert.deepEqual(toTextEtagTag(moduleUrl('android-16.0.0_r4')), {
    resourceKey:
      'raw-github:2:gzip:platform.packages.modules.Connectivity:core/java/android/app/IExample.aidl',
    versionMajor: 16,
    versionMinor: 0,
    versionPatch: 0,
    revision: 4,
  });
  assert.equal(
    toTextEtagTag(
      'https://raw.githubusercontent.com/other/repo/android-13.0.0_r1/file',
    ),
    undefined,
  );
});

test('adapts request concurrency to healthy responses and pressure', async () => {
  const limiter = new AdaptiveRequestLimiter(2, 6);
  assert.equal(limiter.concurrency, 2);

  await limiter.run(async () => new Response('ok', { status: 200 }));
  assert.equal(limiter.concurrency, 2);
  await limiter.run(async () => new Response(null, { status: 304 }));
  assert.equal(limiter.concurrency, 3);

  await Promise.all(
    Array.from({ length: 3 }, () =>
      limiter.run(async () => new Response('missing', { status: 404 })),
    ),
  );
  assert.equal(limiter.concurrency, 4);

  await limiter.run(async () => new Response('busy', { status: 429 }));
  assert.equal(limiter.concurrency, 2);
  await assert.rejects(
    limiter.run(async () => {
      throw new Error('network failed');
    }),
    /network failed/,
  );
  assert.equal(limiter.concurrency, 1);
});

test('retries a transient HTTP response after reducing concurrency', async () => {
  const cache = new MemoryTextEtagCache();
  let requestCount = 0;
  const fetchText = createFetchTextWithRetry(cache, (async () => {
    requestCount++;
    if (requestCount === 1) {
      return new Response('busy', { status: 429 });
    }
    return new Response('source', {
      headers: { etag: 'W/"source"' },
      status: 200,
    });
  }) as typeof fetch);

  assert.equal(await fetchText(rawUrl('android-13.0.0_r1')), 'source');
  assert.equal(requestCount, 2);
});

test('isolates the same path and ETag across repositories', async () => {
  const cache = new MemoryTextEtagCache();
  const headers: Headers[] = [];
  const fetchText = createFetchTextWithRetry(cache, (async (_input, init) => {
    headers.push(new Headers(init?.headers));
    return new Response(
      headers.length === 1 ? 'base source' : 'module source',
      { headers: { etag: 'W/"same"' }, status: 200 },
    );
  }) as typeof fetch);
  assert.equal(await fetchText(rawUrl('android-16.0.0_r3')), 'base source');
  assert.equal(
    await fetchText(moduleUrl('android-16.0.0_r4')),
    'module source',
  );
  assert.equal(headers[1]?.get('if-none-match'), null);
});

test('uses the predecessor ETag across tag URLs and reuses a 304 body', async () => {
  const cache = new MemoryTextEtagCache();
  const requests: Array<{ headers: Headers; url: string }> = [];
  const fetchText = createFetchTextWithRetry(cache, (async (input, init) => {
    const url = String(input);
    const headers = new Headers(init?.headers);
    requests.push({ headers, url });
    if (requests.length === 1) {
      return new Response('same source', {
        headers: { etag: 'W/"same"' },
        status: 200,
      });
    }
    return new Response(null, {
      headers: { etag: 'W/"same"' },
      status: 304,
    });
  }) as typeof fetch);

  assert.equal(await fetchText(rawUrl('android-13.0.0_r1')), 'same source');
  assert.equal(await fetchText(rawUrl('android-13.0.0_r2')), 'same source');
  assert.equal(requests[0]?.headers.get('accept-encoding'), 'gzip');
  assert.equal(requests[0]?.headers.get('if-none-match'), null);
  assert.equal(requests[1]?.headers.get('if-none-match'), 'W/"same"');
});

test('ignores a malformed ETag from the persistent cache', async () => {
  const cache = new MemoryTextEtagCache();
  await cache.set(
    toTextEtagTag(rawUrl('android-13.0.0_r1'))!,
    'invalid\r\netag',
    'old source',
  );
  let requestHeaders: Headers | undefined;
  const fetchText = createFetchTextWithRetry(cache, (async (_input, init) => {
    requestHeaders = new Headers(init?.headers);
    return new Response('fresh source', {
      headers: { etag: 'W/"fresh"' },
      status: 200,
    });
  }) as typeof fetch);

  assert.equal(await fetchText(rawUrl('android-13.0.0_r2')), 'fresh source');
  assert.equal(requestHeaders?.get('if-none-match'), null);
});

test('waits for the first response headers before starting cold followers', async () => {
  const cache = new MemoryTextEtagCache();
  const requests: Headers[] = [];
  let releaseFirst: ((response: Response) => void) | undefined;
  const firstResponse = new Promise<Response>((resolve) => {
    releaseFirst = resolve;
  });
  const fetchText = createFetchTextWithRetry(cache, (async (_input, init) => {
    requests.push(new Headers(init?.headers));
    if (requests.length === 1) return firstResponse;
    return new Response(null, {
      headers: { etag: 'W/"same"' },
      status: 304,
    });
  }) as typeof fetch);

  const pending = [1, 2, 3, 4, 5].map((revision) =>
    fetchText(rawUrl(`android-13.0.0_r${revision}`)),
  );
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(requests.length, 1);
  releaseFirst?.(
    new Response('same source', {
      headers: { etag: 'W/"same"' },
      status: 200,
    }),
  );

  assert.deepEqual(await Promise.all(pending), Array(5).fill('same source'));
  assert.equal(requests.length, 5);
  for (const headers of requests.slice(1)) {
    assert.equal(headers.get('if-none-match'), 'W/"same"');
  }
});

test('consumes only one body when concurrent responses share a new ETag', async () => {
  const cache = new MemoryTextEtagCache();
  const firstTag = toTextEtagTag(rawUrl('android-13.0.0_r1'))!;
  await cache.set(firstTag, 'W/"old"', 'old source');
  const responses: TrackedResponse[] = [];
  const fetchText = createFetchTextWithRetry(cache, (async () => {
    const tracked = trackedResponse('new source', 'W/"new"');
    responses.push(tracked);
    return tracked.response;
  }) as typeof fetch);

  const values = await Promise.all(
    [2, 3, 4, 5, 6].map((revision) =>
      fetchText(rawUrl(`android-13.0.0_r${revision}`)),
    ),
  );
  assert.deepEqual(values, Array(5).fill('new source'));
  assert.equal(
    responses.reduce((sum, item) => sum + item.state.textReads, 0),
    1,
  );
  assert.equal(
    responses.reduce((sum, item) => sum + item.state.cancelled, 0),
    4,
  );
});

test('keeps a representation flight until the downloaded body is published', async () => {
  let releaseFirstSet: (() => void) | undefined;
  const firstSetReleased = new Promise<void>((resolve) => {
    releaseFirstSet = resolve;
  });
  let markFirstSetStarted: (() => void) | undefined;
  const firstSetStarted = new Promise<void>((resolve) => {
    markFirstSetStarted = resolve;
  });
  const cache = new MemoryTextEtagCache();
  const originalSet = cache.set.bind(cache);
  let setCount = 0;
  cache.set = async (tag, etag, value) => {
    setCount++;
    if (setCount === 1) {
      markFirstSetStarted?.();
      await firstSetReleased;
    }
    await originalSet(tag, etag, value);
  };
  const responses: TrackedResponse[] = [];
  const fetchText = createFetchTextWithRetry(cache, (async () => {
    const tracked = trackedResponse('same source', 'W/"same"');
    responses.push(tracked);
    return tracked.response;
  }) as typeof fetch);

  const first = fetchText(rawUrl('android-13.0.0_r1'));
  await firstSetStarted;
  const second = fetchText(rawUrl('android-13.0.0_r2'));
  await new Promise((resolve) => setImmediate(resolve));
  releaseFirstSet?.();

  assert.deepEqual(await Promise.all([first, second]), [
    'same source',
    'same source',
  ]);
  assert.equal(
    responses.reduce((sum, item) => sum + item.state.textReads, 0),
    1,
  );
  assert.equal(
    responses.reduce((sum, item) => sum + item.state.cancelled, 0),
    1,
  );
});

test('lets a canceled follower stop waiting for bootstrap headers', async () => {
  const cache = new MemoryTextEtagCache();
  let releaseFirst: ((response: Response) => void) | undefined;
  const firstResponse = new Promise<Response>((resolve) => {
    releaseFirst = resolve;
  });
  const fetchText = createFetchTextWithRetry(
    cache,
    (async () => firstResponse) as typeof fetch,
  );
  const first = fetchText(rawUrl('android-13.0.0_r1'));
  await new Promise((resolve) => setImmediate(resolve));

  const controller = new AbortController();
  const follower = fetchText(rawUrl('android-13.0.0_r2'), controller.signal);
  controller.abort(new Error('cancel follower'));
  await assert.rejects(follower, /cancel follower/);

  releaseFirst?.(
    new Response('same source', {
      headers: { etag: 'W/"same"' },
      status: 200,
    }),
  );
  assert.equal(await first, 'same source');
});

test('lets a canceled follower stop waiting for a shared representation', async () => {
  const cache = new MemoryTextEtagCache();
  await cache.set(
    toTextEtagTag(rawUrl('android-13.0.0_r1'))!,
    'W/"old"',
    'old source',
  );
  let releaseBody: (() => void) | undefined;
  const bodyReleased = new Promise<void>((resolve) => {
    releaseBody = resolve;
  });
  let markBodyStarted: (() => void) | undefined;
  const bodyStarted = new Promise<void>((resolve) => {
    markBodyStarted = resolve;
  });
  let markFollowerResponse: (() => void) | undefined;
  const followerResponse = new Promise<void>((resolve) => {
    markFollowerResponse = resolve;
  });
  let requestCount = 0;
  let followerTracked: TrackedResponse | undefined;
  const fetchText = createFetchTextWithRetry(cache, (async () => {
    requestCount++;
    if (requestCount === 1) {
      return {
        body: null,
        headers: new Headers({ etag: 'W/"new"' }),
        status: 200,
        text: async () => {
          markBodyStarted?.();
          await bodyReleased;
          return 'new source';
        },
      } as unknown as Response;
    }
    followerTracked = trackedResponse('must not be read', 'W/"new"');
    markFollowerResponse?.();
    return followerTracked.response;
  }) as typeof fetch);

  const first = fetchText(rawUrl('android-13.0.0_r2'));
  await bodyStarted;
  const controller = new AbortController();
  const follower = fetchText(rawUrl('android-13.0.0_r3'), controller.signal);
  await followerResponse;
  controller.abort(new Error('cancel shared representation follower'));
  await assert.rejects(follower, /cancel shared representation follower/);
  assert.equal(followerTracked?.state.textReads, 0);
  assert.equal(followerTracked?.state.cancelled, 1);

  releaseBody?.();
  assert.equal(await first, 'new source');
});

test('lets a canceled 304 follower stop waiting for the cold body', async () => {
  const cache = new MemoryTextEtagCache();
  let releaseBody: (() => void) | undefined;
  const bodyReleased = new Promise<void>((resolve) => {
    releaseBody = resolve;
  });
  let markBodyStarted: (() => void) | undefined;
  const bodyStarted = new Promise<void>((resolve) => {
    markBodyStarted = resolve;
  });
  let markFollowerResponse: (() => void) | undefined;
  const followerResponse = new Promise<void>((resolve) => {
    markFollowerResponse = resolve;
  });
  let requestCount = 0;
  const fetchText = createFetchTextWithRetry(cache, (async () => {
    requestCount++;
    if (requestCount === 1) {
      return {
        body: null,
        headers: new Headers({ etag: 'W/"same"' }),
        status: 200,
        text: async () => {
          markBodyStarted?.();
          await bodyReleased;
          return 'same source';
        },
      } as unknown as Response;
    }
    markFollowerResponse?.();
    return new Response(null, {
      headers: { etag: 'W/"same"' },
      status: 304,
    });
  }) as typeof fetch);

  const first = fetchText(rawUrl('android-13.0.0_r1'));
  await bodyStarted;
  const controller = new AbortController();
  const follower = fetchText(rawUrl('android-13.0.0_r2'), controller.signal);
  await followerResponse;
  controller.abort(new Error('cancel 304 follower'));
  await assert.rejects(follower, /cancel 304 follower/);

  releaseBody?.();
  assert.equal(await first, 'same source');
});

test('cancels a reverted body when its historical ETag is cached', async () => {
  const cache = new MemoryTextEtagCache();
  await cache.set(
    toTextEtagTag(rawUrl('android-13.0.0_r1'))!,
    'W/"old"',
    'old source',
  );
  await cache.set(
    toTextEtagTag(rawUrl('android-13.0.0_r2'))!,
    'W/"new"',
    'new source',
  );
  const tracked = trackedResponse('must not be read', 'W/"old"');
  const fetchText = createFetchTextWithRetry(
    cache,
    (async () => tracked.response) as typeof fetch,
  );

  assert.equal(await fetchText(rawUrl('android-13.0.0_r3')), 'old source');
  assert.equal(tracked.state.textReads, 0);
  assert.equal(tracked.state.cancelled, 1);
});
