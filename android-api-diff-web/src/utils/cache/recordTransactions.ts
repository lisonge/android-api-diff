import { getCacheDomainStores, type CacheDomain } from './config';
import { isBlobRecord, isRefRecord, type BlobRecord } from './records';
import type { CacheDatabase } from './schema';
import {
  deleteCorruptBlobAndRefs,
  putRefAndCleanupOrphan,
  runTransaction,
} from './transactionHelpers';

export const readRecordsFromDatabase = (
  database: CacheDatabase,
  domain: CacheDomain,
  keyHash: string,
): Promise<{ ref: unknown; blob: unknown }> => {
  const stores = getCacheDomainStores(domain);
  const transaction = database.transaction(
    [stores.refs, stores.blobs] as const,
    'readonly',
  );
  return runTransaction(transaction, async () => {
    const ref: unknown = await transaction
      .objectStore(stores.refs)
      .get(keyHash);
    const blob: unknown = isRefRecord(ref)
      ? await transaction.objectStore(stores.blobs).get(ref)
      : undefined;
    return { ref, blob };
  });
};

export const linkExistingBlobInDatabase = (
  database: CacheDatabase,
  domain: CacheDomain,
  keyHash: string,
  contentHash: string,
  rawSize: number,
): Promise<boolean> => {
  const stores = getCacheDomainStores(domain);
  const transaction = database.transaction(
    [stores.refs, stores.blobs] as const,
    'readwrite',
  );
  return runTransaction(transaction, async () => {
    const existing: unknown = await transaction
      .objectStore(stores.blobs)
      .get(contentHash);
    if (!isBlobRecord(existing) || existing[1] !== rawSize) {
      if (existing !== undefined) {
        await deleteCorruptBlobAndRefs(transaction, stores, contentHash);
      }
      return false;
    }
    await putRefAndCleanupOrphan(transaction, stores, keyHash, contentHash);
    return true;
  });
};

export const writeBlobAndRefInDatabase = (
  database: CacheDatabase,
  domain: CacheDomain,
  keyHash: string,
  contentHash: string,
  bytes: Uint8Array,
  compressed: Uint8Array,
): Promise<void> => {
  const stores = getCacheDomainStores(domain);
  const transaction = database.transaction(
    [stores.refs, stores.blobs] as const,
    'readwrite',
  );
  return runTransaction(transaction, async () => {
    const blobs = transaction.objectStore(stores.blobs);
    const existing: unknown = await blobs.get(contentHash);
    if (!isBlobRecord(existing) || existing[1] !== bytes.byteLength) {
      await blobs.put(
        [
          crypto.randomUUID(),
          bytes.byteLength,
          compressed,
        ] satisfies BlobRecord,
        contentHash,
      );
    }
    await putRefAndCleanupOrphan(transaction, stores, keyHash, contentHash);
  });
};
