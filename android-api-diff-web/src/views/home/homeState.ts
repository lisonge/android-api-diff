import { createQueryTask } from './queryTask.ts';
import { canSearchFromMemory } from './memorySearch.ts';
import { browserStructCache } from '@/utils/cache';
import { useQueryDisplay } from './queryDisplay.ts';
export { NOT_FOUND_TYPE_COLOR } from './queryDisplay.ts';
import {
  browserRuntime,
  sourceIndex,
  sourceMetadata,
  sourceCandidatesFor,
  indexError,
} from '@/store';
import {
  getIndexedSourceLinks,
  getSourceSearchText,
  indexVersions,
  type SourceLocation,
} from 'android-api-diff';
import { createSharedComposable } from '@vueuse/core';
import { computed, onUnmounted, watch } from 'vue';
import {
  useSearchState,
  diffConcurrentCountOptions,
  minSdkOptions,
  sourceLinkTargetOptions,
} from './searchState.ts';
export {
  DEFAULT_DIFF_CONCURRENT_COUNT,
  MAX_DIFF_CONCURRENT_COUNT,
} from './searchState.ts';
export const ANDROID_PREFIX_LEN = 'android-'.length;

const SKIP_NEXT_AUTO_DIFF_STATE_KEY = '__androidApiDiffSkipNextAutoDiff';
export const skipNextAutoDiffOnReload = () => {
  sessionStorage.setItem(SKIP_NEXT_AUTO_DIFF_STATE_KEY, '1');
};

const consumeSkipNextAutoDiff = () => {
  if (!sessionStorage.getItem(SKIP_NEXT_AUTO_DIFF_STATE_KEY)) return false;
  sessionStorage.removeItem(SKIP_NEXT_AUTO_DIFF_STATE_KEY);
  return true;
};

export const useSharedHomeState = createSharedComposable(() => {
  const search = useSearchState();
  const {
    input,
    searchRef,
    diffConcurrentCount,
    minSdk,
    sourceLinkTarget,
    searchHistory,
    setSearchRef,
    removeSearchHistory,
  } = search;
  const task = createQueryTask(browserRuntime);
  const queryResult = task.result;
  const errorText = task.error;
  const sourceCandidates = computed(() => sourceCandidatesFor(searchRef.value));
  const indexedSourceLinks = computed(() =>
    sourceIndex.value
      ? getIndexedSourceLinks(sourceIndex.value, input.value)
      : new Map<string, SourceLocation>(),
  );
  const getTagSource = (tag: string) => {
    const record = task.records.value.get(tag);
    if (record?.source) return record.source;
    return indexedSourceLinks.value.get(tag);
  };
  const searchFromData = computed(() => ({
    filePath: task.context.value.selection?.path ?? '',
    targetKind: task.context.value.resolvedTarget?.kind ?? 'file',
    targetPaths: task.context.value.resolvedTarget?.paths ?? [],
  }));
  const isValidSearchRef = computed(() => !!searchRef.value.trim());
  const isCanParsedUrl = isValidSearchRef;
  const filteredAndroidVersionList = computed(() =>
    (sourceIndex.value
      ? indexVersions(sourceIndex.value)
      : sourceMetadata.value
        ? indexVersions(sourceMetadata.value)
        : []
    ).filter((v) => v.apiVersion >= minSdk.value),
  );
  const display = useQueryDisplay(
    computed(() =>
      task.tags.value.flatMap((tag) => {
        const record = task.records.value.get(tag);
        return record ? [record] : [];
      }),
    ),
    searchFromData,
    filteredAndroidVersionList,
    computed(() => task.phase.value === 'querying'),
  );
  const { selectedOverloadKey } = display;
  const stopDiff = task.stop;
  onUnmounted(stopDiff);
  const handleDiff = {
    get loading() {
      return task.loading.value;
    },
    async invoke() {
      selectedOverloadKey.value = null;
      if (!isValidSearchRef.value) {
        task.reset();
        return;
      }
      const currentInput = input.value;
      const currentMinSdk = minSdk.value;
      await task.run({
        input: currentInput,
        minSdk: currentMinSdk,
        concurrency: diffConcurrentCount.value,
      });
    },
  };
  watch(
    [input, minSdk],
    () => {
      task.reset();
      selectedOverloadKey.value = null;
      if (
        sourceIndex.value &&
        canSearchFromMemory(
          sourceIndex.value,
          searchRef.value,
          minSdk.value,
          browserStructCache.peek,
        )
      ) {
        void handleDiff.invoke();
      }
    },
    { flush: 'sync' },
  );
  const selectSourcePath = async (source: SourceLocation) => {
    await setSearchRef(
      sourceIndex.value
        ? getSourceSearchText(sourceIndex.value, source)
        : source.path,
    );
    await handleDiff.invoke();
  };
  const runDiffWithSearchHistory = async () => {
    search.saveValidSearchHistory();
    await handleDiff.invoke();
  };
  const selectSearchHistory = async (value: string) => {
    await setSearchRef(value);
    await runDiffWithSearchHistory();
  };
  const autoStart = !consumeSkipNextAutoDiff()
    ? setTimeout(handleDiff.invoke)
    : undefined;
  onUnmounted(() => clearTimeout(autoStart));
  return {
    queryResult,
    errorText,
    indexError,
    sourceCandidates,
    selectSourcePath,
    searchFromData,
    isCanParsedUrl,
    ...display,
    getTagSource,
    getTagState: task.getTagState,
    handleDiff,
    isValidSearchRef,
    searchRef,
    searchHistory,
    runDiffWithSearchHistory,
    selectSearchHistory,
    removeSearchHistory,
    setSearchRef,
    stopDiff,
    androidVersionList: filteredAndroidVersionList,
    diffConcurrentCount,
    diffConcurrentCountOptions,
    minSdk,
    minSdkOptions,
    sourceLinkTarget,
    sourceLinkTargetOptions,
  };
});
