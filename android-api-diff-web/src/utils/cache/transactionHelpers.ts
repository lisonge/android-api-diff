import type { IDBPTransaction } from 'idb';
import {
  REFS_BY_CONTENT_INDEX,
  type BlobStoreName,
  type CacheDomainStores,
  type RefStoreName,
} from './config';
import { isRefRecord } from './records';
import type { CacheDatabaseSchema } from './schema';

export type DataWriteTransaction = IDBPTransaction<
  CacheDatabaseSchema,
  readonly [RefStoreName, BlobStoreName],
  'readwrite'
>;

interface CompletableTransaction {
  readonly done: Promise<void>;
  abort(): void;
}

export const runTransaction = async <T>(
  transaction: CompletableTransaction,
  operations: () => Promise<T>,
): Promise<T> => {
  try {
    const result = await operations();
    await transaction.done;
    return result;
  } catch (error) {
    try {
      transaction.abort();
    } catch {
      // The transaction may already have aborted or committed.
    }
    await transaction.done.catch(() => undefined);
    throw error;
  }
};

export const deleteBlobIfUnreferenced = async (
  transaction: DataWriteTransaction,
  stores: CacheDomainStores,
  contentHash: string,
): Promise<void> => {
  const count = await transaction
    .objectStore(stores.refs)
    .index(REFS_BY_CONTENT_INDEX)
    .count(contentHash);
  if (count === 0) {
    await transaction.objectStore(stores.blobs).delete(contentHash);
  }
};

export const deleteCorruptBlobAndRefs = async (
  transaction: DataWriteTransaction,
  stores: CacheDomainStores,
  contentHash: string,
): Promise<void> => {
  const refs = transaction.objectStore(stores.refs);
  let cursor = await refs.index(REFS_BY_CONTENT_INDEX).openCursor(contentHash);
  while (cursor) {
    await cursor.delete();
    cursor = await cursor.continue();
  }
  await transaction.objectStore(stores.blobs).delete(contentHash);
};

export const putRefAndCleanupOrphan = async (
  transaction: DataWriteTransaction,
  stores: CacheDomainStores,
  keyHash: string,
  contentHash: string,
): Promise<void> => {
  const refs = transaction.objectStore(stores.refs);
  const previous: unknown = await refs.get(keyHash);
  const previousContentHash = isRefRecord(previous) ? previous : undefined;
  await refs.put(contentHash, keyHash);
  if (previousContentHash && previousContentHash !== contentHash) {
    await deleteBlobIfUnreferenced(transaction, stores, previousContentHash);
  }
};
