import { computed, customRef, type ComputedRef } from 'vue';

interface TaskHandler<T extends (...args: any[]) => Promise<void>> {
  fn: T;
  loading: boolean;
  invoke: (...args: Parameters<T>) => Promise<void>;
}
export const useTask = <T extends (...args: any[]) => Promise<void>>(
  fn: T,
): TaskHandler<T> => {
  let loading = false;
  const loadingRef = customRef<boolean>((track, trigger) => {
    return {
      get() {
        track();
        return loading;
      },
      set(value) {
        loading = value;
        trigger();
      },
    };
  });
  return {
    fn,
    get loading() {
      return loadingRef.value;
    },
    invoke: async (...args: Parameters<T>) => {
      // avoid track getter
      if (loading) return;
      let error: any;
      let finished = false;
      const task = fn(...args)
        .catch((e) => {
          error = e;
        })
        .finally(() => {
          finished = true;
        });
      await new Promise((r) => setTimeout(r));
      if (finished) {
        if (error) throw error;
        return;
      }
      loadingRef.value = true;
      await task;
      loadingRef.value = false;
      if (error) throw error;
    },
  };
};

import { isEqual } from 'lodash-es';

export const useEqualComputed = <T>(fn: () => T): ComputedRef<T> => {
  let lastValue: T;
  return computed<T>(() => {
    const v = fn();
    if (!isEqual(v, lastValue)) {
      lastValue = v;
    }
    return lastValue;
  });
};
