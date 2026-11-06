import type { CacheStore } from 'android-api-diff';

export const createMemoryCache = <T>(
  capacity: number,
  getEpoch: () => number,
  persistent?: CacheStore<T>,
): CacheStore<T> & { peek(key: string): T | undefined } => {
  const values = new Map<string, T>();
  let epoch = getEpoch();
  const currentEpoch = () => {
    const current = getEpoch();
    if (epoch !== current) {
      values.clear();
      epoch = current;
    }
    return current;
  };
  const remember = (key: string, value: T) => {
    values.delete(key);
    values.set(key, value);
    if (values.size > capacity) values.delete(values.keys().next().value!);
  };
  return {
    peek(key) {
      currentEpoch();
      return values.get(key);
    },
    async get(key) {
      const expectedEpoch = currentEpoch();
      const cached = values.get(key);
      if (cached !== undefined) {
        remember(key, cached);
        return cached;
      }
      const value = await persistent?.get(key);
      if (value !== undefined && expectedEpoch === currentEpoch()) {
        remember(key, value);
      }
      return value;
    },
    async set(key, value) {
      currentEpoch();
      remember(key, value);
      await persistent?.set(key, value);
    },
  };
};
