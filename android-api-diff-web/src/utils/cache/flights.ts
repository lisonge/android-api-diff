import { RESET_CHANNEL_NAME, type CacheDomain } from './config';

const logicalFlights = new Map<string, Promise<unknown>>();
const blobCreationFlights = new Map<string, Promise<void>>();
const blobReadFlights = new Map<string, Promise<Uint8Array>>();

let cacheEpoch = 0;
let externalResetHandler: (() => Promise<void>) | undefined;

const flightKey = (domain: CacheDomain, hash: string): string =>
  `${domain}\u0000${hash}`;

export const getCacheEpoch = (): number => cacheEpoch;

export const invalidateLocalFlights = (): void => {
  cacheEpoch += 1;
  logicalFlights.clear();
  blobCreationFlights.clear();
  blobReadFlights.clear();
};

const resetChannel = new BroadcastChannel(RESET_CHANNEL_NAME);
resetChannel.onmessage = () => {
  invalidateLocalFlights();
  if (!externalResetHandler) return;
  try {
    void externalResetHandler().catch((error) => {
      console.warn('Failed to reset API cache after an external clear', error);
    });
  } catch (error) {
    console.warn(
      'Failed to start API cache reset after an external clear',
      error,
    );
  }
};

export const setExternalResetHandler = (handler: () => Promise<void>): void => {
  externalResetHandler = handler;
};

export const broadcastCacheReset = (): void => {
  resetChannel.postMessage('reset');
};

export const runSingleFlight = <T>(
  domain: CacheDomain,
  keyHash: string,
  expectedEpoch: number,
  work: () => Promise<T>,
): Promise<T> => {
  const key = flightKey(domain, `${keyHash}\u0000${expectedEpoch}`);
  const current = logicalFlights.get(key);
  if (current) return current as Promise<T>;

  const promise = work();
  logicalFlights.set(key, promise);
  const clear = () => {
    if (logicalFlights.get(key) === promise) logicalFlights.delete(key);
  };
  void promise.then(clear, clear);
  return promise;
};

export const getBlobCreationFlight = (
  domain: CacheDomain,
  contentHash: string,
): Promise<void> | undefined =>
  blobCreationFlights.get(flightKey(domain, contentHash));

export const trackBlobCreationFlight = (
  domain: CacheDomain,
  contentHash: string,
  promise: Promise<void>,
): void => {
  const key = flightKey(domain, contentHash);
  blobCreationFlights.set(key, promise);
  const clear = () => {
    if (blobCreationFlights.get(key) === promise) {
      blobCreationFlights.delete(key);
    }
  };
  void promise.then(clear, clear);
};

export const runBlobReadFlight = (
  domain: CacheDomain,
  contentHash: string,
  generation: string,
  work: () => Promise<Uint8Array>,
): Promise<Uint8Array> => {
  const key = flightKey(domain, `${contentHash}\u0000${generation}`);
  const current = blobReadFlights.get(key);
  if (current) return current;

  const promise = work();
  blobReadFlights.set(key, promise);
  const clear = () => {
    if (blobReadFlights.get(key) === promise) blobReadFlights.delete(key);
  };
  void promise.then(clear, clear);
  return promise;
};
