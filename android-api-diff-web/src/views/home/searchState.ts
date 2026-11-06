import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { androidApiVersionList, DEFAULT_MIN_SDK } from 'android-api-diff';
import {
  DEFAULT_SOURCE_LINK_TARGET,
  sourceLinkTargetOptions,
  type SourceLinkTarget,
} from '@/utils/url';
import { readSearchRoute, searchLocation } from './searchRoute.ts';
const DIFF_CONCURRENT_COUNT_STORAGE_KEY =
  'android-api-diff:diff-concurrent-count:v1';
const MIN_SDK_STORAGE_KEY = 'android-api-diff:min-sdk:v1';
const SOURCE_LINK_TARGET_STORAGE_KEY = 'android-api-diff:source-link-target:v1';
const SEARCH_HISTORY_STORAGE_KEY = 'android-api-diff:search-history:v1';
const DEFAULT_SEARCH_HISTORY = [
  'IActivityTaskManager.getTasks',
  'ITaskStackListener.onTaskMovedToFront',
  'IUserManager.getUsers',
];
const MAX_SEARCH_HISTORY = 20;
export const DEFAULT_DIFF_CONCURRENT_COUNT = 2;
export const MAX_DIFF_CONCURRENT_COUNT = 5;
export const diffConcurrentCountOptions = Array.from(
  { length: MAX_DIFF_CONCURRENT_COUNT },
  (_, index) => index + 1,
);

export const minSdkOptions = androidApiVersionList;

export { sourceLinkTargetOptions };

const normalizeDiffConcurrentCount = (value: unknown) => {
  const count = Number(value);
  if (!Number.isInteger(count)) return DEFAULT_DIFF_CONCURRENT_COUNT;
  return Math.min(Math.max(count, 1), MAX_DIFF_CONCURRENT_COUNT);
};

const normalizeMinSdk = (value: unknown) => {
  const sdk = Number(value);
  if (!Number.isInteger(sdk)) return DEFAULT_MIN_SDK;
  const minSdk = minSdkOptions[0];
  const maxAllowedSdk = minSdkOptions.at(-1)!;
  return Math.min(Math.max(sdk, minSdk), maxAllowedSdk);
};

const normalizeSourceLinkTarget = (value: unknown): SourceLinkTarget => {
  if (
    typeof value === 'string' &&
    (sourceLinkTargetOptions as readonly string[]).includes(value)
  ) {
    return value as SourceLinkTarget;
  }
  return DEFAULT_SOURCE_LINK_TARGET;
};

const normalizeSearchHistory = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const list: string[] = [];
  for (const item of value) {
    if (typeof item !== 'string') continue;
    const ref = item.trim();
    if (!ref || seen.has(ref)) continue;
    seen.add(ref);
    list.push(ref);
    if (list.length >= MAX_SEARCH_HISTORY) break;
  }
  return list;
};

export const useSearchState = () => {
  const route = useRoute(),
    router = useRouter();
  const diffConcurrentCount = useStorage<number>(
    DIFF_CONCURRENT_COUNT_STORAGE_KEY,
    DEFAULT_DIFF_CONCURRENT_COUNT,
    undefined,
    {
      flush: 'sync',
      serializer: {
        read: (raw) => normalizeDiffConcurrentCount(raw),
        write: (value) => String(normalizeDiffConcurrentCount(value)),
      },
    },
  );
  const minSdk = useStorage<number>(
    MIN_SDK_STORAGE_KEY,
    DEFAULT_MIN_SDK,
    undefined,
    {
      flush: 'sync',
      serializer: {
        read: (raw) => normalizeMinSdk(raw),
        write: (value) => String(normalizeMinSdk(value)),
      },
    },
  );
  const sourceLinkTarget = useStorage<SourceLinkTarget>(
    SOURCE_LINK_TARGET_STORAGE_KEY,
    DEFAULT_SOURCE_LINK_TARGET,
    undefined,
    {
      flush: 'sync',
      serializer: {
        read: (raw) => normalizeSourceLinkTarget(raw),
        write: (value) => normalizeSourceLinkTarget(value),
      },
    },
  );
  const searchHistory = useStorage<string[]>(
    SEARCH_HISTORY_STORAGE_KEY,
    () => [...DEFAULT_SEARCH_HISTORY],
    undefined,
    {
      flush: 'sync',
      serializer: {
        read: (raw) => {
          try {
            return normalizeSearchHistory(JSON.parse(raw));
          } catch {
            return [...DEFAULT_SEARCH_HISTORY];
          }
        },
        write: (value) => JSON.stringify(normalizeSearchHistory(value)),
      },
    },
  );

  const searchQuery = computed(() => readSearchRoute(route.params.pathMatch));
  const searchRef = computed({
    get: () => searchQuery.value.text,
    set: (value: string) => {
      void router.replace(searchLocation(value));
    },
  });
  const input = computed(() => searchQuery.value.input);
  const setSearchRef = async (value: string) => {
    await router.replace(searchLocation(value));
  };
  const saveValidSearchHistory = () => {
    if (!searchRef.value.trim()) return;
    searchHistory.value = [
      searchRef.value,
      ...searchHistory.value.filter((x) => x !== searchRef.value),
    ].slice(0, MAX_SEARCH_HISTORY);
  };
  const removeSearchHistory = (value: string) => {
    searchHistory.value = searchHistory.value.filter((x) => x !== value);
  };
  return {
    input,
    searchRef,
    diffConcurrentCount,
    minSdk,
    sourceLinkTarget,
    searchHistory,
    setSearchRef,
    saveValidSearchHistory,
    removeSearchHistory,
  };
};
