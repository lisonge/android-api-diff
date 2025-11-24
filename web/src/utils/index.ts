import type { ClassStruct } from '@ikun/syntax';
import {
  computed,
  customRef,
  shallowReactive,
  watch,
  type ComputedRef,
} from 'vue';

interface TaskHandler<T extends (...args: any[]) => Promise<void>> {
  fn: T;
  loading: boolean;
  invoke: (...args: Parameters<T>) => Promise<void>;
}
export const useTask = <T extends (...args: any[]) => Promise<void>>(
  fn: T,
): TaskHandler<T> => {
  let loading = false;
  const loadingRef = customRef((track, trigger) => {
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

export const useReactiveLocalStorage = <T extends object>(
  key: string,
  getInitValue: () => T,
) => {
  const initText = localStorage.getItem(key);
  const initData: T = (() => {
    if (!initText) return getInitValue();
    try {
      return JSON.parse(initText);
    } catch {
      return getInitValue();
    }
  })();
  const r = shallowReactive(initData);
  watch(r, () => {
    localStorage.setItem(key, JSON.stringify(r));
  });
  return r;
};

export const colors = [
  '#19F61B',
  '#63F9C0',
  '#1985FF',
  '#3F049C',
  '#E88407',
  '#578065',
  '#F301CF',
  '#AC0800',
  '#D9FD40',
  '#C684EB',
  '#7833FE',
];

export const findStructByName = (
  list: ClassStruct[] | undefined,
  name: string,
): ClassStruct | undefined => {
  if (!list?.length) return;
  const v = list.find((v) => v.name === name);
  if (v) return v;
  for (const struct of list) {
    const v2 = findStructByName(struct.children, name);
    if (v2) return v2;
  }
};

export const getBeforeString = (str: string, sub: string): string => {
  const index = str.indexOf(sub);
  if (index < 0) return str;
  return str.substring(0, index);
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
