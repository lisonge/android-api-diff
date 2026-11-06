import type {
  AndroidApiQueryResult,
  AndroidApiStructCacheEntry,
  CacheStore,
} from '../../core/index.ts';
import { BoundedContentValueInterner } from '../../core/index.ts';
import type {
  TextEtagCache,
  TextEtagRepresentation,
  TextEtagTag,
} from '../textEtagCache.ts';
import { NODE_CACHE_DOMAINS, type NodeCacheDomain } from './constants.ts';
import { hashBytes, hashString } from './hashing.ts';
import { SqliteContentAddressedCache } from './sqliteContentCache.ts';

interface BinaryCacheCodec<T> {
  encode(value: T): Uint8Array;
  decode(value: Uint8Array): T;
}

interface PendingWrite {
  contentHash: string;
  promise: Promise<void>;
}

class CacheStoreLifecycle {
  private acceptingOperations = true;
  private activeOperationCount = 0;
  private closePromise?: Promise<void>;
  private drainPromise?: Promise<void>;
  private resolveDrain?: () => void;

  startOperation(): (() => void) | undefined {
    if (!this.acceptingOperations) return;

    this.activeOperationCount += 1;
    let finished = false;
    return () => {
      if (finished) return;
      finished = true;
      this.activeOperationCount -= 1;
      if (this.activeOperationCount === 0) {
        this.resolveDrain?.();
        this.resolveDrain = undefined;
      }
    };
  }

  close(closeCache: () => Promise<void>): Promise<void> {
    if (this.closePromise) return this.closePromise;

    // Flip this synchronously so every store rejects operations invoked after
    // close(), even before the first await in the drain path.
    this.acceptingOperations = false;
    this.closePromise = (async () => {
      if (this.activeOperationCount > 0) {
        this.drainPromise ??= new Promise<void>((resolve) => {
          this.resolveDrain = resolve;
        });
        await this.drainPromise;
      }
      await closeCache();
    })();
    return this.closePromise;
  }
}

class SqliteCacheStore<T> implements CacheStore<T> {
  private readonly cache: SqliteContentAddressedCache;
  private readonly codec: BinaryCacheCodec<T>;
  private readonly domain: NodeCacheDomain;
  private readonly lifecycle: CacheStoreLifecycle;
  private readonly interner?: BoundedContentValueInterner<T>;
  private readonly readFlights = new Map<string, Promise<T | undefined>>();
  private readonly writeFlights = new Map<string, PendingWrite>();

  constructor(
    cache: SqliteContentAddressedCache,
    domain: NodeCacheDomain,
    codec: BinaryCacheCodec<T>,
    lifecycle: CacheStoreLifecycle,
    interner?: BoundedContentValueInterner<T>,
  ) {
    this.cache = cache;
    this.domain = domain;
    this.codec = codec;
    this.lifecycle = lifecycle;
    this.interner = interner;
  }

  async get(key: string): Promise<T | undefined> {
    const finishOperation = this.lifecycle.startOperation();
    if (!finishOperation) return;

    try {
      try {
        return await this.getCachedValue(key);
      } catch {
        return;
      }
    } finally {
      finishOperation();
    }
  }

  private async getCachedValue(key: string): Promise<T | undefined> {
    const keyHash = hashString(key);
    const pendingWrite = this.writeFlights.get(keyHash);
    if (pendingWrite) await pendingWrite.promise.catch(() => undefined);

    const current = this.readFlights.get(keyHash);
    if (current) return current;

    const promise = this.getOnce(keyHash);
    this.readFlights.set(keyHash, promise);
    try {
      return await promise;
    } finally {
      if (this.readFlights.get(keyHash) === promise) {
        this.readFlights.delete(keyHash);
      }
    }
  }

  private async getOnce(keyHash: string): Promise<T | undefined> {
    const cached = await this.cache.readRaw(this.domain, keyHash);
    if (!cached) return;

    const interned = this.interner?.get(cached.contentHash);
    if (interned !== undefined) return interned;
    try {
      const value = this.codec.decode(cached.rawValue);
      return this.interner?.intern(cached.contentHash, value) ?? value;
    } catch {
      await this.cache.invalidate(
        this.domain,
        keyHash,
        cached.contentHash,
        cached.generation,
      );
      return;
    }
  }

  intern(value: T): T {
    if (!this.interner) return value;
    try {
      const rawValue = this.codec.encode(value);
      return this.interner.intern(hashBytes(rawValue), value);
    } catch {
      return value;
    }
  }

  async set(key: string, value: T): Promise<void> {
    const finishOperation = this.lifecycle.startOperation();
    if (!finishOperation) return;

    try {
      try {
        await this.setCachedValue(key, value);
      } catch {
        // Cache data is fully reproducible. I/O and serialization failures
        // must not prevent the caller from completing the underlying query.
      }
    } finally {
      finishOperation();
    }
  }

  private async setCachedValue(key: string, value: T): Promise<void> {
    const keyHash = hashString(key);
    const rawValue = this.codec.encode(value);
    const contentHash = hashBytes(rawValue);
    this.interner?.intern(contentHash, value);
    const current = this.writeFlights.get(keyHash);
    if (current?.contentHash === contentHash) return current.promise;

    const previous = current?.promise.catch(() => undefined);
    const promise = (async () => {
      if (previous) await previous;
      await this.cache.writeRaw(this.domain, keyHash, contentHash, rawValue);
    })();
    const pending = { contentHash, promise };
    this.writeFlights.set(keyHash, pending);

    try {
      await promise;
    } finally {
      if (this.writeFlights.get(keyHash) === pending) {
        this.writeFlights.delete(keyHash);
      }
    }
  }
}

const textDecoder = new TextDecoder('utf-8', { fatal: true });
const textEncoder = new TextEncoder();

const textCodec: BinaryCacheCodec<string> = {
  encode: (value) => textEncoder.encode(value),
  decode: (value) => textDecoder.decode(value),
};

class SqliteTextEtagCache implements TextEtagCache {
  private readonly cache: SqliteContentAddressedCache;
  private readonly lifecycle: CacheStoreLifecycle;

  constructor(
    cache: SqliteContentAddressedCache,
    lifecycle: CacheStoreLifecycle,
  ) {
    this.cache = cache;
    this.lifecycle = lifecycle;
  }

  async getPredecessor(
    tag: TextEtagTag,
  ): Promise<TextEtagRepresentation | undefined> {
    return this.read(() =>
      this.cache.readTextEtagPredecessor(hashString(tag.resourceKey), tag),
    );
  }

  async getByEtag(
    resourceKey: string,
    etag: string,
  ): Promise<TextEtagRepresentation | undefined> {
    return this.read(() =>
      this.cache.readTextByEtag(hashString(resourceKey), etag),
    );
  }

  private async read(
    operation: () => Promise<
      { etag: string; rawValue: Uint8Array } | undefined
    >,
  ): Promise<TextEtagRepresentation | undefined> {
    const finishOperation = this.lifecycle.startOperation();
    if (!finishOperation) return;
    try {
      try {
        const cached = await operation();
        if (!cached) return;
        return {
          etag: cached.etag,
          value: textCodec.decode(cached.rawValue),
        };
      } catch {
        return;
      }
    } finally {
      finishOperation();
    }
  }

  async set(tag: TextEtagTag, etag: string, value: string): Promise<void> {
    const finishOperation = this.lifecycle.startOperation();
    if (!finishOperation) return;
    try {
      try {
        const rawValue = textCodec.encode(value);
        await this.cache.writeTextEtag(
          hashString(tag.resourceKey),
          tag,
          etag,
          hashBytes(rawValue),
          rawValue,
        );
      } catch {
        // HTTP validators are an optimization. Cache failures must not fail
        // the underlying Android API query.
      }
    } finally {
      finishOperation();
    }
  }
}

const jsonCodec = <T>(): BinaryCacheCodec<T> => ({
  encode: (value) => {
    const serialized = JSON.stringify(value);
    if (serialized === undefined) {
      throw new TypeError('Cache value is not JSON serializable');
    }
    return textEncoder.encode(serialized);
  },
  decode: (value) => JSON.parse(textDecoder.decode(value)) as T,
});

export interface NodeCacheStores {
  close(): Promise<void>;
  databasePath: string;
  queryCache: CacheStore<AndroidApiQueryResult>;
  structCache: CacheStore<AndroidApiStructCacheEntry>;
  textEtagCache: TextEtagCache;
  textCache: CacheStore<string>;
}

interface NodeCacheStoreOptions {
  removeLegacyDirectories?: boolean;
}

export const createNodeCacheStores = (
  cacheDir: string,
  options: NodeCacheStoreOptions = {},
): NodeCacheStores => {
  const cache = new SqliteContentAddressedCache(
    cacheDir,
    options.removeLegacyDirectories === true,
  );
  const lifecycle = new CacheStoreLifecycle();
  const structInterner =
    new BoundedContentValueInterner<AndroidApiStructCacheEntry>(256);
  return {
    close: () => lifecycle.close(() => cache.close()),
    databasePath: cache.databasePath,
    queryCache: new SqliteCacheStore(
      cache,
      NODE_CACHE_DOMAINS.query,
      jsonCodec<AndroidApiQueryResult>(),
      lifecycle,
    ),
    structCache: new SqliteCacheStore(
      cache,
      NODE_CACHE_DOMAINS.struct,
      jsonCodec<AndroidApiStructCacheEntry>(),
      lifecycle,
      structInterner,
    ),
    textEtagCache: new SqliteTextEtagCache(cache, lifecycle),
    textCache: new SqliteCacheStore(
      cache,
      NODE_CACHE_DOMAINS.text,
      textCodec,
      lifecycle,
    ),
  };
};
