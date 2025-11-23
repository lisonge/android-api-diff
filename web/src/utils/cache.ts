import { updateStorageEstimate } from '@/store';
import { type ClassStruct } from '@ikun/syntax';
import lf from 'localforage';

const encoder = new TextEncoder();
async function sha256Hash(str: string): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(str));
  return new Uint8Array(hashBuffer)
    .slice(0, 12)
    .toBase64({ alphabet: 'base64url', omitPadding: true });
}

const persistentCache = lf.createInstance({
  name: 'persistentCache',
  version: 2,
});

const getPersistentCache = async (
  key: string,
  fallback: () => Promise<string>,
) => {
  let value = await persistentCache.getItem<string>(key);
  if (!value) {
    value = await fallback();
    await persistentCache.setItem(key, value);
    updateStorageEstimate();
  }
  return value;
};

interface UrlCacheKeyBuilder {
  (url: string): string;
}

export const persistentFetch = async (
  url: string,
  cacheKeyBuilder?: UrlCacheKeyBuilder,
): Promise<string> => {
  const key = await sha256Hash(cacheKeyBuilder?.(url) ?? url);
  return getPersistentCache(key, async () => {
    const r = await fetch(url);
    return r.text();
  });
};

const expiredCache = lf.createInstance({ name: 'expiredCache', version: 2 });
const getExpiredCache = async (
  key: string,
  expires: number,
  fallback: () => Promise<string>,
) => {
  interface ExpiredItem {
    data: string;
    mtime: number;
  }
  let value = await expiredCache.getItem<ExpiredItem>(key);
  if (value) {
    const now = Date.now();
    if (now - value.mtime > expires) {
      await expiredCache.removeItem(key);
      value = null;
    }
  }
  if (!value) {
    const data = await fallback();
    value = {
      data,
      mtime: Date.now(),
    };
    await expiredCache.setItem(key, value);
    updateStorageEstimate();
  }
  return value.data;
};

export const expiredFetch = async (
  url: string,
  cacheKeyBuilder?: UrlCacheKeyBuilder,
): Promise<string> => {
  const key = await sha256Hash(cacheKeyBuilder?.(url) ?? url);
  return getExpiredCache(key, 24 * 3600 * 1000, async () => {
    const r = await fetch(url);
    if (!r.ok) {
      throw new Error(`Failed to fetch ${url}: ${r.status} ${r.statusText}`);
    }
    return r.text();
  });
};

const structCache = lf.createInstance({ name: 'structCache' });

export const getOrSetStructCache = async (
  filePath: string,
  fallback: () => Promise<ClassStruct[]>,
): Promise<ClassStruct[]> => {
  const key = await sha256Hash(filePath);
  let value = await structCache.getItem<ClassStruct[]>(key);
  if (!value) {
    value = await fallback();
    await structCache.setItem(key, value);
    updateStorageEstimate();
  }
  return value;
};
