import { setTimeout as sleep } from 'node:timers/promises';
import pLimit, { type LimitFunction } from 'p-limit';
import type {
  TextEtagCache,
  TextEtagRepresentation,
  TextEtagTag,
} from './textEtagCache.ts';

const NETWORK_RETRY_COUNT = 3;
const NETWORK_RETRY_BASE_DELAY_MS = 300;
const INITIAL_REQUEST_CONCURRENCY = 5;
const MAX_REQUEST_CONCURRENCY = 16;
const RAW_GITHUB_HOST = 'raw.githubusercontent.com';
const AOSP_RAW_PATH_REG =
  /^\/msft-mirror-aosp\/(platform\.[^/]+)\/refs\/tags\/android-(\d+)\.(\d+)\.(\d+)_r(\d+)\/(.+)$/;
const ETAG_RESOURCE_VERSION = 2;

type FetchImplementation = typeof globalThis.fetch;

interface RequestCandidate {
  etag: string;
  value: Promise<string>;
}

const parseRawPath = (pathname: string) => {
  const match = AOSP_RAW_PATH_REG.exec(pathname);
  if (!match) return;
  const [versionMajor, versionMinor, versionPatch, revision] = match
    .slice(2, 6)
    .map(Number);
  return {
    repo: match[1]!,
    filePath: match[6]!,
    versionMajor: versionMajor!,
    versionMinor: versionMinor!,
    versionPatch: versionPatch!,
    revision: revision!,
  };
};

export const toTextEtagTag = (url: string): TextEtagTag | undefined => {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return;
  }
  if (
    parsedUrl.protocol !== 'https:' ||
    parsedUrl.hostname !== RAW_GITHUB_HOST
  ) {
    return;
  }
  const parsedPath = parseRawPath(parsedUrl.pathname);
  if (!parsedPath) return;
  const { repo, filePath, revision, versionMajor, versionMinor, versionPatch } =
    parsedPath;
  return {
    resourceKey: [
      'raw-github',
      ETAG_RESOURCE_VERSION,
      'gzip',
      repo,
      filePath,
    ].join(':'),
    versionMajor,
    versionMinor,
    versionPatch,
    revision,
  };
};

const isUsableEtag = (etag: string): boolean =>
  etag.length <= 16 * 1024 && /^(?:W\/)?"[\x21\x23-\x7e]*"$/.test(etag);

const getResponseEtag = (response: Response): string | undefined => {
  const etag = response.headers.get('etag');
  if (etag && isUsableEtag(etag)) return etag;
};

const toCandidate = (
  cached: TextEtagRepresentation,
): RequestCandidate | undefined => {
  if (!isUsableEtag(cached.etag)) return;
  return {
    etag: cached.etag,
    value: Promise.resolve(cached.value),
  };
};

const waitForPromise = <T>(
  promise: Promise<T>,
  signal: AbortSignal | undefined,
): Promise<T> => {
  if (!signal) return promise;
  signal.throwIfAborted();
  return new Promise<T>((resolve, reject) => {
    const onAbort = (): void => {
      signal.removeEventListener('abort', onAbort);
      reject(signal.reason);
    };
    signal.addEventListener('abort', onAbort, { once: true });
    void promise.then(
      (value) => {
        signal.removeEventListener('abort', onAbort);
        resolve(value);
      },
      (error: unknown) => {
        signal.removeEventListener('abort', onAbort);
        reject(error);
      },
    );
  });
};

const cancelResponseBody = async (response: Response): Promise<void> => {
  try {
    await response.body?.cancel();
  } catch {
    // The response might already be closed by the transport. Cancellation is
    // only a bandwidth optimization and must not affect the cached result.
  }
};

const isRequestPressureStatus = (status: number): boolean =>
  status === 408 || status === 425 || status === 429 || status >= 500;

const isHealthyRequestStatus = (status: number): boolean =>
  status === 200 || status === 304 || status === 404;

export class AdaptiveRequestLimiter {
  private healthyResponseCount = 0;
  private readonly limit: LimitFunction;
  private readonly maxConcurrency: number;

  constructor(
    initialConcurrency = INITIAL_REQUEST_CONCURRENCY,
    maxConcurrency = MAX_REQUEST_CONCURRENCY,
  ) {
    if (
      !Number.isSafeInteger(initialConcurrency) ||
      initialConcurrency < 1 ||
      !Number.isSafeInteger(maxConcurrency) ||
      maxConcurrency < initialConcurrency
    ) {
      throw new RangeError('Invalid adaptive request concurrency range');
    }
    this.limit = pLimit(initialConcurrency);
    this.maxConcurrency = maxConcurrency;
  }

  get concurrency(): number {
    return this.limit.concurrency;
  }

  run(
    operation: () => Promise<Response>,
    signal?: AbortSignal,
  ): Promise<Response> {
    const scheduled = this.limit(async () => {
      signal?.throwIfAborted();
      try {
        const response = await operation();
        this.recordResponse(response.status);
        return response;
      } catch (error) {
        if (!signal?.aborted) this.recordPressure();
        throw error;
      }
    });
    return waitForPromise(scheduled, signal).catch((error: unknown) => {
      if (signal?.aborted) {
        void scheduled.then(cancelResponseBody, () => undefined);
      }
      throw error;
    });
  }

  private recordResponse(status: number): void {
    if (isRequestPressureStatus(status)) {
      this.recordPressure();
      return;
    }
    if (
      !isHealthyRequestStatus(status) ||
      this.concurrency >= this.maxConcurrency
    ) {
      return;
    }

    this.healthyResponseCount += 1;
    if (this.healthyResponseCount < this.concurrency) {
      return;
    }
    this.healthyResponseCount = 0;
    this.limit.concurrency += 1;
  }

  private recordPressure(): void {
    this.healthyResponseCount = 0;
    this.limit.concurrency = Math.max(1, Math.ceil(this.concurrency / 2));
  }
}

export const createFetchTextWithRetry = (
  etagCache: TextEtagCache,
  fetchImplementation: FetchImplementation = globalThis.fetch,
): ((url: string, signal?: AbortSignal) => Promise<string>) => {
  const bootstrapFlights = new Map<
    string,
    Promise<RequestCandidate | undefined>
  >();
  const representationFlights = new Map<string, Promise<string>>();
  const requestLimiter = new AdaptiveRequestLimiter();

  const consumeRepresentation = async (
    response: Response,
    tag: TextEtagTag,
    etag: string,
    signal: AbortSignal | undefined,
  ): Promise<string> => {
    const flightKey = `${tag.resourceKey}\0${etag}`;
    const current = representationFlights.get(flightKey);
    if (current) {
      await waitForPromise(cancelResponseBody(response), signal);
      const value = await waitForPromise(current, signal);
      await etagCache.set(tag, etag, value);
      return value;
    }
    const promise = (async () => {
      const cached = await etagCache.getByEtag(tag.resourceKey, etag);
      let value: string;
      if (cached) {
        await cancelResponseBody(response);
        value = cached.value;
      } else {
        value = await response.text();
      }
      await etagCache.set(tag, etag, value);
      return value;
    })();
    representationFlights.set(flightKey, promise);
    try {
      return await promise;
    } finally {
      if (representationFlights.get(flightKey) === promise) {
        representationFlights.delete(flightKey);
      }
    }
  };

  const request = async (
    url: string,
    candidate: RequestCandidate | undefined,
    signal: AbortSignal | undefined,
  ): Promise<Response> => {
    const headers: Record<string, string> = {
      'Accept-Encoding': 'gzip',
    };
    if (candidate) headers['If-None-Match'] = candidate.etag;
    const response = await requestLimiter.run(
      () => fetchImplementation(url, { headers, signal }),
      signal,
    );
    if (isRequestPressureStatus(response.status)) {
      await cancelResponseBody(response);
      throw new Error(
        `Source request returned transient HTTP ${response.status}: ${url}`,
      );
    }
    return response;
  };

  const completeResponse = async (
    response: Response,
    tag: TextEtagTag,
    candidate: RequestCandidate | undefined,
    signal: AbortSignal | undefined,
  ): Promise<string> => {
    if (response.status === 304) {
      if (!candidate) {
        throw new Error('GitHub returned 304 without a cached representation');
      }
      const value = await waitForPromise(candidate.value, signal);
      const etag = getResponseEtag(response) ?? candidate.etag;
      await etagCache.set(tag, etag, value);
      return value;
    }
    if (response.status === 404) return '404: Not Found';
    if (response.status !== 200)
      throw new Error(`Source request returned HTTP ${response.status}`);
    const etag =
      response.status === 200 ? getResponseEtag(response) : undefined;
    if (etag) return consumeRepresentation(response, tag, etag, signal);
    return response.text();
  };

  const fetchTaggedTextOnce = async (
    url: string,
    tag: TextEtagTag,
    signal?: AbortSignal,
  ): Promise<string> => {
    const currentBootstrap = bootstrapFlights.get(tag.resourceKey);
    if (currentBootstrap) {
      const candidate = await waitForPromise(currentBootstrap, signal);
      return completeResponse(
        await request(url, candidate, signal),
        tag,
        candidate,
        signal,
      );
    }

    let resolveBootstrap:
      | ((candidate: RequestCandidate | undefined) => void)
      | undefined;
    const bootstrap = new Promise<RequestCandidate | undefined>((resolve) => {
      resolveBootstrap = resolve;
    });
    bootstrapFlights.set(tag.resourceKey, bootstrap);
    let bootstrapResolved = false;
    const publishCandidate = (
      candidate: RequestCandidate | undefined,
    ): void => {
      if (bootstrapResolved) return;
      bootstrapResolved = true;
      resolveBootstrap?.(candidate);
    };

    try {
      const predecessor = await etagCache.getPredecessor(tag);
      const candidate = predecessor ? toCandidate(predecessor) : undefined;
      if (candidate) publishCandidate(candidate);

      let response: Response;
      try {
        response = await request(url, candidate, signal);
      } catch (error) {
        publishCandidate(undefined);
        throw error;
      }

      if (!candidate && response.status === 200) {
        const etag = getResponseEtag(response);
        if (etag) {
          const value = consumeRepresentation(response, tag, etag, signal);
          publishCandidate({ etag, value });
          return value;
        }
      }
      publishCandidate(candidate);
      return completeResponse(response, tag, candidate, signal);
    } finally {
      publishCandidate(undefined);
      if (bootstrapFlights.get(tag.resourceKey) === bootstrap) {
        bootstrapFlights.delete(tag.resourceKey);
      }
    }
  };

  const fetchTextOnce = async (
    url: string,
    signal?: AbortSignal,
  ): Promise<string> => {
    const tag = toTextEtagTag(url);
    if (tag) return fetchTaggedTextOnce(url, tag, signal);
    const response = await fetchImplementation(url, { signal });
    if (response.status === 404) return '404: Not Found';
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
    return response.text();
  };

  return async (url: string, signal?: AbortSignal): Promise<string> => {
    let lastError: unknown;
    for (let attempt = 0; attempt <= NETWORK_RETRY_COUNT; attempt++) {
      signal?.throwIfAborted();
      try {
        return await fetchTextOnce(url, signal);
      } catch (error) {
        lastError = error;
        signal?.throwIfAborted();
        if (attempt === NETWORK_RETRY_COUNT) break;
        await sleep(NETWORK_RETRY_BASE_DELAY_MS * 2 ** attempt, undefined, {
          signal,
        });
      }
    }
    throw lastError instanceof Error
      ? lastError
      : new Error(`Fetch failed for ${url}`);
  };
};
