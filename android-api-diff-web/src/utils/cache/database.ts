import { deleteDB, openDB } from 'idb';
import {
  DATABASE_NAME,
  DATABASE_VERSION,
  LEGACY_DATABASE_NAMES,
  META_STORE,
  REFS_BY_CONTENT_INDEX,
  STRUCT_BLOBS_STORE,
  STRUCT_REFS_STORE,
  TEXT_BLOBS_STORE,
  TEXT_REFS_STORE,
} from './config';
import { invalidateLocalFlights } from './flights';
import type { CacheDatabase, CacheDatabaseSchema } from './schema';
import { cleanupObsoleteCacheVersions } from './transactions';

let activeDatabase: CacheDatabase | undefined;
let openingDatabase: Promise<CacheDatabase> | undefined;
let databaseReset: Promise<void> | undefined;
let legacyCleanupStarted = false;

const deleteDatabase = (name: string): Promise<void> =>
  deleteDB(name, {
    blocked() {
      console.warn(`Deleting database ${name} is waiting for another tab`);
    },
  });

const deleteLegacyDatabases = async (): Promise<void> => {
  await Promise.all(LEGACY_DATABASE_NAMES.map(deleteDatabase));
};

const startLegacyCleanup = (): void => {
  if (legacyCleanupStarted) return;
  legacyCleanupStarted = true;
  void deleteLegacyDatabases().catch((error) => {
    console.warn('Failed to delete legacy API cache databases', error);
  });
};

export const getDatabase = (): Promise<CacheDatabase> => {
  if (databaseReset) return databaseReset.then(getDatabase);
  if (activeDatabase) return Promise.resolve(activeDatabase);
  if (openingDatabase) return openingDatabase;

  let database: CacheDatabase | undefined;
  let invalidated = false;
  const invalidateDatabase = () => {
    invalidated = true;
    invalidateLocalFlights();
    database?.close();
    if (activeDatabase === database) activeDatabase = undefined;
  };

  const promise = (async () => {
    database = await openDB<CacheDatabaseSchema>(
      DATABASE_NAME,
      DATABASE_VERSION,
      {
        upgrade(database, oldVersion) {
          // This database name starts with the final fixed-domain layout, so
          // there is no unshipped intermediate schema to migrate.
          if (oldVersion !== 0) return;
          database.createObjectStore(META_STORE);
          const textRefs = database.createObjectStore(TEXT_REFS_STORE);
          textRefs.createIndex(REFS_BY_CONTENT_INDEX, '', { unique: false });
          database.createObjectStore(TEXT_BLOBS_STORE);
          const structRefs = database.createObjectStore(STRUCT_REFS_STORE);
          structRefs.createIndex(REFS_BY_CONTENT_INDEX, '', { unique: false });
          database.createObjectStore(STRUCT_BLOBS_STORE);
        },
        blocked() {
          console.warn(
            'Opening the API cache database is waiting for another tab',
          );
        },
        // `blocking` is the versionchange fence paired with DATABASE_VERSION:
        // an older tab closes before a newer release updates logical versions.
        blocking: invalidateDatabase,
        terminated: invalidateDatabase,
      },
    );

    try {
      await cleanupObsoleteCacheVersions(database);
    } catch (error) {
      database.close();
      throw error;
    }
    if (invalidated) {
      database.close();
      throw new Error('API cache database changed while opening');
    }
    activeDatabase = database;
    startLegacyCleanup();
    return database;
  })();

  openingDatabase = promise;
  const clearOpeningDatabase = () => {
    if (openingDatabase === promise) openingDatabase = undefined;
  };
  void promise.then(clearOpeningDatabase, clearOpeningDatabase);
  return promise;
};

export const resetCacheDatabases = async (
  afterDelete: () => Promise<void>,
): Promise<void> => {
  const previousReset = databaseReset;
  const currentDatabase = activeDatabase;
  const pendingDatabase = openingDatabase;
  const reset = (async () => {
    if (previousReset) await previousReset;
    const database =
      currentDatabase ?? (await pendingDatabase?.catch(() => undefined));
    if (database) {
      if (activeDatabase === database) activeDatabase = undefined;
      database.close();
    }
    await deleteDatabase(DATABASE_NAME);
    await deleteLegacyDatabases();
    await afterDelete();
  })();
  databaseReset = reset;
  try {
    await reset;
  } finally {
    if (databaseReset === reset) databaseReset = undefined;
  }
};
