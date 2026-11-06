import {
  persistentFetch,
  browserStructCache,
  browserQueryCache,
} from '@/utils/cache';
import {
  loadSourceIndex,
  bundledSourceMetadata,
  loadSourceMetadata,
  type SourceMetadata,
  searchSources,
  type SourceIndex,
  type AndroidApiQueryRuntime,
} from 'android-api-diff';
import { shallowRef } from 'vue';
import {
  parseSourceInWorker,
  constantExpressionKeysInWorker,
} from './utils/parser/index.ts';
export {
  estimateDesc,
  updateStorageEstimate,
} from './utils/storageEstimate.ts';
export const browserRuntime: AndroidApiQueryRuntime = {
  parseSource: parseSourceInWorker,
  constantExpressionKeys: constantExpressionKeysInWorker,
  fetchText: async (url, signal) => {
    signal?.throwIfAborted();
    const value =
      url === browserRuntime.indexUrl
        ? await fetch(url, { signal, cache: 'no-cache' }).then((response) => {
            if (!response.ok)
              throw new Error(`HTTP ${response.status}: ${url}`);
            return response.text();
          })
        : await persistentFetch(url);
    signal?.throwIfAborted();
    return value;
  },
  structCache: browserStructCache,
  queryCache: browserQueryCache,
  indexUrl: import.meta.env.VITE_SOURCE_INDEX_URL || undefined,
};
export const sourceIndex = shallowRef<SourceIndex>();
export const indexError = shallowRef('');
export const sourceMetadata = shallowRef<SourceMetadata | undefined>(
  browserRuntime.indexUrl ? undefined : bundledSourceMetadata,
);
if (browserRuntime.indexUrl) {
  void loadSourceMetadata(browserRuntime)
    .then((metadata) => {
      sourceMetadata.value = metadata;
    })
    .catch((error) => {
      indexError.value = String(error);
    });
}
let loading: Promise<SourceIndex> | undefined;
export const ensureSourceIndex = () =>
  (loading ??= loadSourceIndex(browserRuntime)
    .then((index) => {
      indexError.value = '';
      return (sourceIndex.value = index);
    })
    .catch((error) => {
      loading = undefined;
      indexError.value = String(error);
      throw error;
    }));
export const sourceCandidatesFor = (name: string) =>
  sourceIndex.value ? searchSources(sourceIndex.value, name) : [];
void ensureSourceIndex().catch(() => {});
