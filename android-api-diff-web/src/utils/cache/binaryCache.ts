import { gunzip, gzip, sha256Hash } from './compression';
import type { ContentValueInterner } from 'android-api-diff';
import { MAX_CACHE_ENTRY_BYTES, type CacheDomain } from './config';
import { getDatabase } from './database';
import {
  getBlobCreationFlight,
  getCacheEpoch,
  runBlobReadFlight,
  trackBlobCreationFlight,
} from './flights';
import { isBlobRecord, isRefRecord, type BlobRecord } from './records';
import {
  cleanupBrokenEntryInDatabase,
  linkExistingBlobInDatabase,
  readRecordsFromDatabase,
  writeBlobAndRefInDatabase,
} from './transactions';

interface CacheBytes {
  bytes: Uint8Array;
  contentHash: string;
  generation: string;
  epoch: number;
}

const cleanupBrokenEntry = async (
  domain: CacheDomain,
  keyHash: string,
  expectedEpoch: number,
  contentHash?: string,
  corruptGeneration?: string,
): Promise<void> => {
  if (expectedEpoch !== getCacheEpoch()) return;
  const database = await getDatabase();
  if (expectedEpoch !== getCacheEpoch()) return;
  return cleanupBrokenEntryInDatabase(
    database,
    domain,
    keyHash,
    contentHash,
    corruptGeneration,
  );
};

const readVerifiedBlob = (
  domain: CacheDomain,
  contentHash: string,
  record: BlobRecord,
): Promise<Uint8Array> =>
  runBlobReadFlight(domain, contentHash, record[0], async () => {
    const bytes = await gunzip(record[2]);
    if (bytes.byteLength !== record[1]) {
      throw new Error('Cached value length does not match its metadata');
    }
    if ((await sha256Hash(bytes)) !== contentHash) {
      throw new Error('Cached value hash does not match its content');
    }
    return bytes;
  });

const readCacheBytes = async (
  domain: CacheDomain,
  keyHash: string,
): Promise<CacheBytes | undefined> => {
  const expectedEpoch = getCacheEpoch();
  const database = await getDatabase();
  if (expectedEpoch !== getCacheEpoch()) return undefined;
  const { ref, blob } = await readRecordsFromDatabase(
    database,
    domain,
    keyHash,
  );
  if (ref === undefined) return undefined;
  if (!isRefRecord(ref)) {
    await cleanupBrokenEntry(domain, keyHash, expectedEpoch).catch(
      () => undefined,
    );
    return undefined;
  }
  if (!isBlobRecord(blob)) {
    await cleanupBrokenEntry(domain, keyHash, expectedEpoch, ref).catch(
      () => undefined,
    );
    return undefined;
  }

  try {
    return {
      bytes: await readVerifiedBlob(domain, ref, blob),
      contentHash: ref,
      generation: blob[0],
      epoch: expectedEpoch,
    };
  } catch {
    await cleanupBrokenEntry(
      domain,
      keyHash,
      expectedEpoch,
      ref,
      blob[0],
    ).catch(() => undefined);
    return undefined;
  }
};

export const readCacheValue = async <T>(
  domain: CacheDomain,
  keyHash: string,
  decode: (bytes: Uint8Array) => T,
  interner?: ContentValueInterner<T>,
): Promise<T | undefined> => {
  const cached = await readCacheBytes(domain, keyHash);
  if (!cached) return undefined;
  const interned = interner?.get(cached.contentHash);
  if (interned !== undefined) return interned;
  try {
    const value = decode(cached.bytes);
    return interner?.intern(cached.contentHash, value) ?? value;
  } catch {
    await cleanupBrokenEntry(
      domain,
      keyHash,
      cached.epoch,
      cached.contentHash,
      cached.generation,
    ).catch(() => undefined);
    return undefined;
  }
};

const linkExistingBlob = async (
  domain: CacheDomain,
  keyHash: string,
  contentHash: string,
  rawSize: number,
  expectedEpoch: number,
): Promise<boolean> => {
  const database = await getDatabase();
  if (expectedEpoch !== getCacheEpoch()) return false;
  return linkExistingBlobInDatabase(
    database,
    domain,
    keyHash,
    contentHash,
    rawSize,
  );
};

const writeBlobAndRef = async (
  domain: CacheDomain,
  keyHash: string,
  contentHash: string,
  bytes: Uint8Array,
  compressed: Uint8Array,
  expectedEpoch: number,
): Promise<boolean> => {
  const database = await getDatabase();
  if (expectedEpoch !== getCacheEpoch()) return false;
  await writeBlobAndRefInDatabase(
    database,
    domain,
    keyHash,
    contentHash,
    bytes,
    compressed,
  );
  return true;
};

const writeCacheBytes = async (
  domain: CacheDomain,
  keyHash: string,
  contentHash: string,
  bytes: Uint8Array,
  expectedEpoch: number,
): Promise<boolean> => {
  if (expectedEpoch !== getCacheEpoch()) return false;
  if (bytes.byteLength > MAX_CACHE_ENTRY_BYTES) return false;
  if (
    await linkExistingBlob(
      domain,
      keyHash,
      contentHash,
      bytes.byteLength,
      expectedEpoch,
    )
  ) {
    return true;
  }

  while (true) {
    const current = getBlobCreationFlight(domain, contentHash);
    if (current) {
      await current.catch(() => undefined);
      if (expectedEpoch !== getCacheEpoch()) return false;
      if (
        await linkExistingBlob(
          domain,
          keyHash,
          contentHash,
          bytes.byteLength,
          expectedEpoch,
        )
      ) {
        return true;
      }
      continue;
    }

    const promise = (async () => {
      const compressed = await gzip(bytes);
      await writeBlobAndRef(
        domain,
        keyHash,
        contentHash,
        bytes,
        compressed,
        expectedEpoch,
      );
    })();
    trackBlobCreationFlight(domain, contentHash, promise);
    await promise;
    return expectedEpoch === getCacheEpoch();
  }
};

export const writeCacheBytesIfAvailable = async (
  domain: CacheDomain,
  keyHash: string,
  bytes: Uint8Array,
  expectedEpoch: number,
  onStored: () => void,
): Promise<string | undefined> => {
  let contentHash: string | undefined;
  try {
    contentHash = await sha256Hash(bytes);
    if (
      await writeCacheBytes(domain, keyHash, contentHash, bytes, expectedEpoch)
    ) {
      onStored();
    }
  } catch (error) {
    console.warn('Failed to persist API cache value', error);
  }
  return contentHash;
};
