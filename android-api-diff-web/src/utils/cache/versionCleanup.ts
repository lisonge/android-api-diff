import {
  CACHE_META_KEY,
  META_STORE,
  STRUCT_BLOBS_STORE,
  STRUCT_REFS_STORE,
  TEXT_BLOBS_STORE,
  TEXT_REFS_STORE,
} from './config';
import { isObject } from './records';
import { EXPECTED_CACHE_META, type CacheDatabase } from './schema';
import { runTransaction } from './transactionHelpers';

interface StoredCacheMeta {
  formatVersion: number;
  codec: string;
  textVersion: number;
  structVersion: number;
}

const isStoredCacheMeta = (value: unknown): value is StoredCacheMeta =>
  isObject(value) &&
  Number.isSafeInteger(value.formatVersion) &&
  typeof value.codec === 'string' &&
  Number.isSafeInteger(value.textVersion) &&
  Number.isSafeInteger(value.structVersion);

export const cleanupObsoleteCacheVersions = (
  database: CacheDatabase,
): Promise<void> => {
  const transaction = database.transaction(
    [
      META_STORE,
      TEXT_REFS_STORE,
      TEXT_BLOBS_STORE,
      STRUCT_REFS_STORE,
      STRUCT_BLOBS_STORE,
    ] as const,
    'readwrite',
  );
  return runTransaction(transaction, async () => {
    const meta = transaction.objectStore(META_STORE);
    const current: unknown = await meta.get(CACHE_META_KEY);
    const currentMeta = isStoredCacheMeta(current) ? current : undefined;
    const clearAll =
      currentMeta === undefined ||
      currentMeta.formatVersion !== EXPECTED_CACHE_META.formatVersion ||
      currentMeta.codec !== EXPECTED_CACHE_META.codec;
    const clearText =
      clearAll || currentMeta?.textVersion !== EXPECTED_CACHE_META.textVersion;
    const clearStruct =
      clearAll ||
      currentMeta?.structVersion !== EXPECTED_CACHE_META.structVersion;

    if (!clearText && !clearStruct) return;
    if (clearText) {
      await transaction.objectStore(TEXT_REFS_STORE).clear();
      await transaction.objectStore(TEXT_BLOBS_STORE).clear();
    }
    if (clearStruct) {
      await transaction.objectStore(STRUCT_REFS_STORE).clear();
      await transaction.objectStore(STRUCT_BLOBS_STORE).clear();
    }
    await meta.put(EXPECTED_CACHE_META, CACHE_META_KEY);
  });
};
