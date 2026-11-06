import { shallowRef } from 'vue';
import {
  queryAndroidApi,
  type AndroidApiQueryContext,
  type AndroidApiQueryResult,
  type AndroidApiQueryRuntime,
  type AndroidApiTagResult,
  type QueryAndroidApiOptions,
} from 'android-api-diff';
import { createTagView, loadTagView } from './queryView.ts';

export type TagViewRecord = AndroidApiTagResult &
  ReturnType<typeof createTagView>;
export type QueryPhase =
  | 'idle'
  | 'locating'
  | 'querying'
  | 'complete'
  | 'cancelled'
  | 'failed';

export const createQueryTask = (runtime: AndroidApiQueryRuntime) => {
  const phase = shallowRef<QueryPhase>('idle');
  const loading = shallowRef(false);
  const result = shallowRef<AndroidApiQueryResult>();
  const context = shallowRef<AndroidApiQueryContext>({});
  const error = shallowRef('');
  const tags = shallowRef<string[]>([]);
  const records = shallowRef(new Map<string, TagViewRecord>());
  const activeTags = shallowRef(new Set<string>());
  let controller: AbortController | undefined;

  const stop = () => {
    controller?.abort();
    if (phase.value === 'locating' || phase.value === 'querying')
      phase.value = 'cancelled';
    loading.value = false;
    activeTags.value = new Set();
  };
  const reset = () => {
    stop();
    phase.value = 'idle';
    result.value = undefined;
    context.value = {};
    error.value = '';
    tags.value = [];
    records.value = new Map();
  };
  const run = async (
    options: Omit<QueryAndroidApiOptions, 'signal' | 'onEvent' | 'onProgress'>,
    refresh = false,
  ) => {
    reset();
    const current = new AbortController();
    controller = current;
    const { signal } = current;
    phase.value = 'locating';
    // Memory-only queries finish during microtasks, without a visible loading state.
    const timer = setTimeout(() => {
      if (!signal.aborted) loading.value = true;
    }, 0);
    const commit = (record: TagViewRecord) => {
      records.value = new Map(records.value).set(record.tag, record);
      const active = new Set(activeTags.value);
      active.delete(record.tag);
      activeTags.value = active;
    };
    try {
      const value = await queryAndroidApi(
        refresh
          ? {
              ...runtime,
              queryCache: runtime.queryCache && {
                ...runtime.queryCache,
                get: async () => undefined,
              },
            }
          : runtime,
        {
          ...options,
          signal,
          onEvent(event) {
            if (signal.aborted) return;
            if (event.type === 'selected') {
              context.value = event.context;
              tags.value = event.tags;
              phase.value = 'querying';
            } else if (event.type === 'tag-start') {
              activeTags.value = new Set(activeTags.value).add(event.tag);
            } else {
              commit({
                ...event.result,
                ...createTagView(context.value, event.file),
              });
            }
          },
        },
      );
      signal.throwIfAborted();
      phase.value = 'querying';
      context.value = value;
      tags.value = value.tags.map((item) => item.tag);
      // A cached query emits no incremental events; hydrate views from the structure cache.
      for (const item of value.tags) {
        if (records.value.has(item.tag)) continue;
        const view = await loadTagView(runtime, value, item, signal);
        signal.throwIfAborted();
        if (view.sourceMissing) {
          await run(options, true);
          return;
        }
        commit({ ...item, ...view });
      }
      result.value = value;
      phase.value = 'complete';
    } catch (cause) {
      if (!signal.aborted) {
        error.value = cause instanceof Error ? cause.message : String(cause);
        phase.value = 'failed';
        current.abort();
      }
    } finally {
      clearTimeout(timer);
      if (controller === current) {
        loading.value = false;
        activeTags.value = new Set();
      }
    }
  };
  const getTagState = (tag: string) => {
    if (records.value.has(tag))
      return records.value.get(tag)!.status === 'error' ? 'failed' : 'complete';
    if (activeTags.value.has(tag)) return 'querying';
    if (
      tags.value.includes(tag) &&
      (phase.value === 'cancelled' || phase.value === 'failed')
    )
      return phase.value;
    return 'waiting';
  };
  return {
    phase,
    loading,
    result,
    context,
    error,
    tags,
    records,
    getTagState,
    run,
    stop,
    reset,
  };
};
