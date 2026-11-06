import { readFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import process from 'node:process';
import type { AndroidApiQueryRuntime } from '../core/index.ts';
import { createNodeCacheStores } from './cache/index.ts';
import { createFetchTextWithRetry } from './nodeNetwork.ts';

export {
  createNodeCacheStores,
  getCacheDatabasePath,
  type NodeCacheStores,
} from './cache/index.ts';

const getBuiltInCacheDir = (): string => {
  return join(process.env.LOCALAPPDATA || homedir(), 'android-api-diff-cache');
};

export const getDefaultCacheDir = (): string => {
  return process.env.ANDROID_API_DIFF_CACHE_DIR || getBuiltInCacheDir();
};

export const createNodeRuntime = (
  cacheDir = getDefaultCacheDir(),
): AndroidApiQueryRuntime => {
  const cacheStores = createNodeCacheStores(cacheDir, {
    // Recursive migration cleanup is safe only inside the cache directory the
    // application itself owns. A custom environment path may be any directory.
    removeLegacyDirectories:
      resolve(cacheDir) === resolve(getBuiltInCacheDir()),
  });
  const fetchTextWithRetry = createFetchTextWithRetry(
    cacheStores.textEtagCache,
  );
  return {
    fetchText: (url, signal) =>
      url.startsWith('file:')
        ? readFile(new URL(url), { encoding: 'utf8', signal })
        : fetchTextWithRetry(url, signal),
    indexUrl: process.env.ANDROID_API_DIFF_INDEX_URL,
    textCache: cacheStores.textCache,
    structCache: cacheStores.structCache,
    queryCache: cacheStores.queryCache,
  };
};
