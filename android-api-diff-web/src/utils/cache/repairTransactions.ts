import { getCacheDomainStores, type CacheDomain } from './config';
import { isBlobRecord, isRefRecord } from './records';
import type { CacheDatabase } from './schema';
import {
  deleteBlobIfUnreferenced,
  deleteCorruptBlobAndRefs,
  runTransaction,
} from './transactionHelpers';

export const cleanupBrokenEntryInDatabase = (
  database: CacheDatabase,
  domain: CacheDomain,
  keyHash: string,
  contentHash?: string,
  corruptGeneration?: string,
): Promise<void> => {
  const stores = getCacheDomainStores(domain);
  const transaction = database.transaction(
    [stores.refs, stores.blobs] as const,
    'readwrite',
  );
  return runTransaction(transaction, async () => {
    const refs = transaction.objectStore(stores.refs);
    const blobs = transaction.objectStore(stores.blobs);
    const hasContentHash = contentHash !== undefined;
    if (hasContentHash && corruptGeneration !== undefined) {
      const currentBlob: unknown = await blobs.get(contentHash);
      if (isBlobRecord(currentBlob) && currentBlob[0] === corruptGeneration) {
        await deleteCorruptBlobAndRefs(transaction, stores, contentHash);
      }
      return;
    }

    const currentPromise = refs.get(keyHash);
    const blobPromise = hasContentHash
      ? blobs.get(contentHash)
      : Promise.resolve(undefined);
    const [current, currentBlob]: [unknown, unknown] = await Promise.all([
      currentPromise,
      blobPromise,
    ]);
    if (!hasContentHash) {
      if (current !== undefined && !isRefRecord(current)) {
        await refs.delete(keyHash);
      }
      return;
    }
    if (isBlobRecord(currentBlob)) return;

    const refStillMatches = isRefRecord(current) && current === contentHash;
    if (!refStillMatches) {
      await deleteBlobIfUnreferenced(transaction, stores, contentHash);
      return;
    }
    await refs.delete(keyHash);
    await deleteBlobIfUnreferenced(transaction, stores, contentHash);
  });
};
