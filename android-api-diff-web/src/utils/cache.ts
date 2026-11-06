import {
  BoundedContentValueInterner,
  type AndroidApiStructCacheEntry,
  type AndroidApiQueryResult,
} from 'android-api-diff';
import {
  decodeApiFileCacheEntry,
  encodeApiFileCacheEntry,
} from './cache/apiFileEntry';
import {
  readCacheValue,
  writeCacheBytesIfAvailable,
} from './cache/binaryCache';
import { decodeText, encodeText, sha256String } from './cache/compression';
import {
  NETWORK_RETRY_BASE_DELAY_MS,
  NETWORK_RETRY_COUNT,
  STRUCT_DOMAIN,
  TEXT_DOMAIN,
} from './cache/config';
import { resetCacheDatabases } from './cache/database';
import {
  broadcastCacheReset,
  getCacheEpoch,
  invalidateLocalFlights,
  runSingleFlight,
  setExternalResetHandler,
} from './cache/flights';
import { updateStorageEstimate } from './storageEstimate';
import { createMemoryCache } from './cache/memoryCache';

interface UrlCacheKeyBuilder {
  (url: string): string;
}

const apiFileInterner =
  new BoundedContentValueInterner<AndroidApiStructCacheEntry>(256);

const scheduleStorageEstimateUpdate = (): void => {
  void updateStorageEstimate().catch(() => undefined);
};

setExternalResetHandler(() => resetCacheDatabases(updateStorageEstimate));

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchTextWithRetry = async (url: string): Promise<string> => {
  let lastError: unknown;
  for (let attempt = 0; attempt <= NETWORK_RETRY_COUNT; attempt++) {
    try {
      const response = await fetch(url);
      if (response.status === 404) return '404: Not Found';
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
      return response.text();
    } catch (error) {
      lastError = error;
      if (attempt === NETWORK_RETRY_COUNT) break;
      await sleep(NETWORK_RETRY_BASE_DELAY_MS * 2 ** attempt);
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error(`Fetch failed for ${url}`);
};

export const persistentFetch = async (
  url: string,
  cacheKeyBuilder?: UrlCacheKeyBuilder,
): Promise<string> => {
  const expectedEpoch = getCacheEpoch();
  const keyHash = await sha256String(cacheKeyBuilder?.(url) ?? url);
  return runSingleFlight(TEXT_DOMAIN, keyHash, expectedEpoch, async () => {
    const cached = await readCacheValue(TEXT_DOMAIN, keyHash, decodeText).catch(
      () => undefined,
    );
    if (cached !== undefined) return cached;

    const value = await fetchTextWithRetry(url);
    await writeCacheBytesIfAvailable(
      TEXT_DOMAIN,
      keyHash,
      encodeText(value),
      expectedEpoch,
      scheduleStorageEstimateUpdate,
    );
    return value;
  });
};

export const clearLocalCache = async (): Promise<void> => {
  invalidateLocalFlights();
  apiFileInterner.clear();
  broadcastCacheReset();
  await resetCacheDatabases(updateStorageEstimate);
};

export const browserQueryCache = createMemoryCache<AndroidApiQueryResult>(
  64,
  getCacheEpoch,
);

export const browserStructCache = createMemoryCache<AndroidApiStructCacheEntry>(
  4096,
  getCacheEpoch,
  {
    async get(key: string): Promise<AndroidApiStructCacheEntry | undefined> {
      return readCacheValue(
        STRUCT_DOMAIN,
        await sha256String(key),
        decodeApiFileCacheEntry,
        apiFileInterner,
      );
    },
    async set(key: string, value: AndroidApiStructCacheEntry) {
      await writeCacheBytesIfAvailable(
        STRUCT_DOMAIN,
        await sha256String(key),
        encodeApiFileCacheEntry(value),
        getCacheEpoch(),
        scheduleStorageEstimateUpdate,
      );
    },
  },
);
