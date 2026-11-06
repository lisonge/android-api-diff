import assert from 'node:assert/strict';
import {
  access,
  mkdir,
  mkdtemp,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import { platform, tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import {
  CACHE_BLOB_CODEC,
  CACHE_CONNECTION_EPOCH,
  CACHE_FORMAT_VERSION,
  ETAG_CACHE_VERSION,
  NODE_CACHE_VERSIONS,
} from './cache/constants.ts';
import { createNodeCacheStores } from './nodeRuntime.ts';

type CacheDomain = 'query' | 'struct' | 'text';
type CacheTable = `${CacheDomain}_${'blobs' | 'refs'}`;

const CACHE_DOMAINS: readonly CacheDomain[] = ['text', 'struct', 'query'];
const CACHE_TABLES: readonly CacheTable[] = CACHE_DOMAINS.flatMap((domain) => [
  `${domain}_refs` as const,
  `${domain}_blobs` as const,
]);

const structValue = {
  file: { package: '', imports: [], structs: [] },
  sourceFileNotFound: true,
};
const queryValue = {
  tags: [],
  apiName: 'android.example.Api',
  normalizedApiName: 'android.example.Api',
  candidates: [],
  package: 'android.example',
  imports: [],
  summary: {
    checkedTags: 0,
    foundTags: 0,
    rangeCount: 0,
    overloadCount: 0,
  },
  ranges: [],
  overloads: [],
};

const etagTag = (
  revision: number,
  versionMajor = 13,
): {
  resourceKey: string;
  revision: number;
  versionMajor: number;
  versionMinor: number;
  versionPatch: number;
} => ({
  resourceKey: 'raw-github:1:gzip:android-frameworks-base:Example.java',
  versionMajor,
  versionMinor: 0,
  versionPatch: 0,
  revision,
});

const createCacheDir = (): Promise<string> => {
  return mkdtemp(join(tmpdir(), 'android-api-diff-cache-test-'));
};

const getCount = (database: DatabaseSync, table: CacheTable): number => {
  const row = database.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get();
  const count = row?.count;
  if (typeof count !== 'number') throw new TypeError('Missing row count');
  return count;
};

const getMetaValue = (database: DatabaseSync, key: string): unknown => {
  return database.prepare('SELECT value FROM meta WHERE key = ?').get(key)
    ?.value;
};

const getUserVersion = (database: DatabaseSync): unknown => {
  return database.prepare('PRAGMA user_version').get()?.user_version;
};

const populateEveryDomain = async (
  stores: ReturnType<typeof createNodeCacheStores>,
): Promise<void> => {
  await Promise.all([
    stores.textCache.set('Example.java', 'cached source'),
    stores.structCache.set('Example.java', structValue),
    stores.queryCache.set('Example', queryValue),
  ]);
};

test('deduplicates compressed blobs and removes only known legacy directories', async () => {
  const cacheDir = await createCacheDir();
  const legacyDirectories = ['text', 'struct', 'query'];
  const unrelatedDirectory = join(cacheDir, 'keep-me');
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    await Promise.all(
      legacyDirectories.map(async (name) => {
        const directory = join(cacheDir, name, 'nested');
        await mkdir(directory, { recursive: true });
        await writeFile(join(directory, 'old.cache'), 'legacy');
      }),
    );
    await mkdir(unrelatedDirectory);
    await writeFile(join(unrelatedDirectory, 'data.txt'), 'keep');

    stores = createNodeCacheStores(cacheDir, {
      removeLegacyDirectories: true,
    });
    const source = 'public class Example {\n'.repeat(200);
    await Promise.all([
      stores.textCache.set('android-1/Example.java', source),
      stores.textCache.set('android-2/Example.java', source),
      stores.textCache.set('android-1/Example.java', source),
    ]);
    await stores.structCache.set('android-1/Example.java', structValue);
    const changedSource = 'public class Changed {}';
    await stores.textCache.set('android-1/Example.java', changedSource);

    const openDatabase = new DatabaseSync(stores.databasePath, {
      readOnly: true,
    });
    try {
      assert.equal(getCount(openDatabase, 'text_blobs'), 2);
      const compressedSource = openDatabase
        .prepare(
          `SELECT raw_size AS rawSize, length(payload) AS payloadSize
           FROM text_blobs WHERE raw_size > 1000`,
        )
        .get();
      assert.equal(typeof compressedSource?.rawSize, 'number');
      assert.equal(typeof compressedSource?.payloadSize, 'number');
      if (
        typeof compressedSource?.rawSize === 'number' &&
        typeof compressedSource.payloadSize === 'number'
      ) {
        assert.ok(compressedSource.payloadSize < compressedSource.rawSize);
      }
    } finally {
      openDatabase.close();
    }
    await stores.textCache.set('android-2/Example.java', changedSource);

    assert.equal(
      await stores.textCache.get('android-2/Example.java'),
      changedSource,
    );
    assert.deepEqual(
      await stores.structCache.get('android-1/Example.java'),
      structValue,
    );
    await Promise.all(
      legacyDirectories.map((name) =>
        assert.rejects(access(join(cacheDir, name))),
      ),
    );
    await access(join(unrelatedDirectory, 'data.txt'));

    const databasePath = stores.databasePath;
    await stores.close();
    stores = undefined;

    const database = new DatabaseSync(databasePath, { readOnly: true });
    try {
      assert.equal(getCount(database, 'text_refs'), 2);
      assert.equal(getCount(database, 'text_blobs'), 1);
      assert.equal(getCount(database, 'struct_refs'), 1);
      assert.equal(getCount(database, 'struct_blobs'), 1);
      assert.equal(getCount(database, 'query_refs'), 0);
      assert.equal(getCount(database, 'query_blobs'), 0);

      for (const table of ['text_refs', 'struct_refs'] as const) {
        const hashes = database
          .prepare(
            `SELECT key_hash AS keyHash, content_hash AS contentHash FROM ${table}`,
          )
          .all();
        assert.ok(hashes.length > 0);
        for (const row of hashes) {
          const { contentHash, keyHash } = row;
          assert.equal(typeof keyHash, 'string');
          assert.equal(typeof contentHash, 'string');
          if (typeof keyHash !== 'string' || typeof contentHash !== 'string') {
            throw new TypeError('Expected text hashes');
          }
          assert.equal(keyHash.length, 43);
          assert.equal(contentHash.length, 43);
        }
      }
    } finally {
      database.close();
    }
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('reuses one decoded struct object across content-equivalent keys', async () => {
  const cacheDir = await createCacheDir();
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    stores = createNodeCacheStores(cacheDir);
    await stores.structCache.set('android-1/Example.java', structValue);
    await stores.structCache.set(
      'android-2/Example.java',
      structuredClone(structValue),
    );
    await stores.close();

    stores = createNodeCacheStores(cacheDir);
    const first = await stores.structCache.get('android-1/Example.java');
    const second = await stores.structCache.get('android-2/Example.java');

    assert.ok(first);
    assert.strictEqual(second, first);
    assert.notStrictEqual(first, structValue);
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('stores schema metadata once and omits scope and codec from data rows', async () => {
  const cacheDir = await createCacheDir();
  const stores = createNodeCacheStores(cacheDir);

  try {
    await stores.textCache.set('Example.java', 'cached source');
    const databasePath = stores.databasePath;
    await stores.close();

    const database = new DatabaseSync(databasePath, { readOnly: true });
    try {
      const tableNames = database
        .prepare(
          `SELECT name FROM sqlite_master
           WHERE type = 'table' AND name IN ('refs', 'blobs')`,
        )
        .all();
      assert.deepEqual(tableNames, []);

      for (const table of CACHE_TABLES) {
        const columns = database
          .prepare(`PRAGMA table_info(${table})`)
          .all()
          .map((column) => column.name);
        assert.ok(columns.length > 0);
        assert.equal(columns.includes('scope'), false);
        assert.equal(columns.includes('codec'), false);
        assert.equal(columns.includes('version'), false);
      }

      assert.equal(getUserVersion(database), CACHE_FORMAT_VERSION);
      assert.equal(
        getMetaValue(database, 'cache_epoch'),
        String(CACHE_CONNECTION_EPOCH),
      );
      assert.equal(getMetaValue(database, 'blob_codec'), CACHE_BLOB_CODEC);
      assert.equal(
        getMetaValue(database, 'text_version'),
        NODE_CACHE_VERSIONS.text,
      );
      assert.equal(
        getMetaValue(database, 'struct_version'),
        NODE_CACHE_VERSIONS.struct,
      );
      assert.equal(
        getMetaValue(database, 'query_version'),
        NODE_CACHE_VERSIONS.query,
      );
      assert.equal(getMetaValue(database, 'etag_version'), ETAG_CACHE_VERSION);
      const metaCount = database
        .prepare('SELECT COUNT(*) AS count FROM meta')
        .get()?.count;
      assert.equal(metaCount, 6);
    } finally {
      database.close();
    }
  } finally {
    await stores.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('persists tag-ordered ETags while sharing text blobs', async () => {
  const cacheDir = await createCacheDir();
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    stores = createNodeCacheStores(cacheDir);
    await stores.textEtagCache.set(etagTag(1), 'W/"same"', 'source A');
    await stores.textEtagCache.set(etagTag(2), 'W/"same"', 'source A');
    await stores.textEtagCache.set(etagTag(3), 'W/"changed"', 'source B');

    assert.deepEqual(await stores.textEtagCache.getPredecessor(etagTag(3)), {
      etag: 'W/"same"',
      value: 'source A',
    });
    assert.deepEqual(
      await stores.textEtagCache.getByEtag(etagTag(1).resourceKey, 'W/"same"'),
      { etag: 'W/"same"', value: 'source A' },
    );

    const databasePath = stores.databasePath;
    await stores.close();
    stores = createNodeCacheStores(cacheDir);
    assert.deepEqual(await stores.textEtagCache.getPredecessor(etagTag(4)), {
      etag: 'W/"changed"',
      value: 'source B',
    });
    await stores.close();
    stores = undefined;

    const database = new DatabaseSync(databasePath, { readOnly: true });
    try {
      assert.equal(
        database.prepare('SELECT COUNT(*) AS count FROM text_etag_refs').get()
          ?.count,
        3,
      );
      assert.equal(getCount(database, 'text_blobs'), 2);
    } finally {
      database.close();
    }
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('migrates the v1 cache schema without losing existing values', async () => {
  const cacheDir = await createCacheDir();
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    stores = createNodeCacheStores(cacheDir);
    await populateEveryDomain(stores);
    const databasePath = stores.databasePath;
    await stores.close();
    stores = undefined;

    const versionOneDatabase = new DatabaseSync(databasePath);
    try {
      versionOneDatabase.exec(`
        DROP TABLE text_etag_refs;
        DELETE FROM meta WHERE key = 'etag_version';
        UPDATE meta SET value = '1' WHERE key = 'cache_epoch';
        PRAGMA user_version = 1;
      `);
    } finally {
      versionOneDatabase.close();
    }

    stores = createNodeCacheStores(cacheDir);
    assert.equal(await stores.textCache.get('Example.java'), 'cached source');
    assert.deepEqual(await stores.structCache.get('Example.java'), structValue);
    assert.deepEqual(await stores.queryCache.get('Example'), queryValue);
    await stores.close();
    stores = undefined;

    const migratedDatabase = new DatabaseSync(databasePath, { readOnly: true });
    try {
      assert.equal(getUserVersion(migratedDatabase), CACHE_FORMAT_VERSION);
      assert.equal(
        getMetaValue(migratedDatabase, 'cache_epoch'),
        String(CACHE_CONNECTION_EPOCH),
      );
      assert.equal(
        getMetaValue(migratedDatabase, 'etag_version'),
        ETAG_CACHE_VERSION,
      );
      assert.ok(
        migratedDatabase
          .prepare(
            "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'text_etag_refs'",
          )
          .get(),
      );
      assert.equal(getCount(migratedDatabase, 'text_refs'), 1);
      assert.equal(getCount(migratedDatabase, 'struct_refs'), 1);
      assert.equal(getCount(migratedDatabase, 'query_refs'), 1);
    } finally {
      migratedDatabase.close();
    }
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('clears only ETag refs when their logical version changes', async () => {
  const cacheDir = await createCacheDir();
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    stores = createNodeCacheStores(cacheDir);
    await stores.textCache.set('Example.java', 'cached source');
    await stores.textEtagCache.set(etagTag(1), 'W/"cached"', 'cached source');
    const databasePath = stores.databasePath;
    await stores.close();
    stores = undefined;

    const versionDatabase = new DatabaseSync(databasePath);
    try {
      versionDatabase
        .prepare("UPDATE meta SET value = 'stale' WHERE key = 'etag_version'")
        .run();
    } finally {
      versionDatabase.close();
    }

    stores = createNodeCacheStores(cacheDir);
    assert.equal(await stores.textCache.get('Example.java'), 'cached source');
    assert.equal(
      await stores.textEtagCache.getPredecessor(etagTag(2)),
      undefined,
    );
    await stores.close();
    stores = undefined;

    const inspectingDatabase = new DatabaseSync(databasePath, {
      readOnly: true,
    });
    try {
      assert.equal(
        inspectingDatabase
          .prepare('SELECT COUNT(*) AS count FROM text_etag_refs')
          .get()?.count,
        0,
      );
      assert.equal(getCount(inspectingDatabase, 'text_refs'), 1);
      assert.equal(getCount(inspectingDatabase, 'text_blobs'), 1);
      assert.equal(
        getMetaValue(inspectingDatabase, 'cache_epoch'),
        String(CACHE_CONNECTION_EPOCH),
      );
    } finally {
      inspectingDatabase.close();
    }
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('invalidates every ref to a corrupt shared blob and can rebuild it', async () => {
  const cacheDir = await createCacheDir();
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    stores = createNodeCacheStores(cacheDir);
    await Promise.all([
      stores.textCache.set('Example.java', 'cached source'),
      stores.textCache.set('ExampleCopy.java', 'cached source'),
      stores.textEtagCache.set(etagTag(1), 'W/"cached"', 'cached source'),
    ]);
    const databasePath = stores.databasePath;
    await stores.close();
    stores = undefined;

    const corruptingDatabase = new DatabaseSync(databasePath);
    try {
      corruptingDatabase
        .prepare('UPDATE text_blobs SET payload = ?')
        .run(new Uint8Array([0, 1, 2, 3]));
    } finally {
      corruptingDatabase.close();
    }

    stores = createNodeCacheStores(cacheDir);
    assert.equal(await stores.textCache.get('Example.java'), undefined);
    assert.equal(await stores.textCache.get('ExampleCopy.java'), undefined);
    assert.equal(
      await stores.textEtagCache.getPredecessor(etagTag(2)),
      undefined,
    );
    await stores.close();
    stores = undefined;

    const inspectingDatabase = new DatabaseSync(databasePath, {
      readOnly: true,
    });
    try {
      assert.equal(getCount(inspectingDatabase, 'text_refs'), 0);
      assert.equal(getCount(inspectingDatabase, 'text_blobs'), 0);
      assert.equal(
        inspectingDatabase
          .prepare('SELECT COUNT(*) AS count FROM text_etag_refs')
          .get()?.count,
        0,
      );
    } finally {
      inspectingDatabase.close();
    }

    stores = createNodeCacheStores(cacheDir);
    await stores.textCache.set('Example.java', 'cached source');
    assert.equal(await stores.textCache.get('Example.java'), 'cached source');
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('degrades cache I/O failures to misses', async () => {
  const parentDir = await createCacheDir();
  const cachePath = join(parentDir, 'not-a-directory');
  await writeFile(cachePath, 'occupied');
  const stores = createNodeCacheStores(cachePath);

  try {
    await assert.doesNotReject(
      stores.textCache.set('Example.java', 'cached source'),
    );
    assert.equal(await stores.textCache.get('Example.java'), undefined);
  } finally {
    await stores.close();
    await rm(parentDir, { recursive: true, force: true });
  }
});

test('drains writes accepted before close and ignores later operations', async () => {
  const cacheDir = await createCacheDir();
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    stores = createNodeCacheStores(cacheDir);
    const source = 'public class CloseDrainExample {}\n'.repeat(100_000);
    const pendingWrite = stores.textCache.set('CloseDrainExample.java', source);
    const closing = stores.close();

    await stores.textCache.set('IgnoredAfterClose.java', 'must not persist');
    assert.equal(
      await stores.textCache.get('CloseDrainExample.java'),
      undefined,
    );
    await Promise.all([pendingWrite, closing, stores.close()]);
    stores = undefined;

    stores = createNodeCacheStores(cacheDir);
    assert.equal(await stores.textCache.get('CloseDrainExample.java'), source);
    assert.equal(
      await stores.textCache.get('IgnoredAfterClose.java'),
      undefined,
    );
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('does not recursively clean legacy names in a custom cache root', async () => {
  const cacheDir = await createCacheDir();
  const protectedFile = join(cacheDir, 'text', 'user-data.txt');
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    await mkdir(join(cacheDir, 'text'), { recursive: true });
    await writeFile(protectedFile, 'keep');
    stores = createNodeCacheStores(cacheDir);
    await stores.textCache.set('Example.java', 'cached source');
    await access(protectedFile);
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('does not clean legacy directories through a linked cache root', async (context) => {
  const parentDir = await createCacheDir();
  const victimDir = join(parentDir, 'victim');
  const linkedRoot = join(parentDir, 'linked-cache');
  const protectedFile = join(victimDir, 'text', 'user-data.txt');
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    await mkdir(join(victimDir, 'text'), { recursive: true });
    await writeFile(protectedFile, 'keep');
    try {
      await symlink(
        victimDir,
        linkedRoot,
        platform() === 'win32' ? 'junction' : 'dir',
      );
    } catch (error) {
      const code =
        error instanceof Error && 'code' in error ? error.code : undefined;
      if (code === 'EACCES' || code === 'EPERM' || code === 'ENOTSUP') {
        context.skip(`linked directories are unavailable: ${String(code)}`);
        return;
      }
      throw error;
    }

    stores = createNodeCacheStores(linkedRoot, {
      removeLegacyDirectories: true,
    });
    await stores.textCache.set('Example.java', 'cached source');
    await access(protectedFile);
  } finally {
    await stores?.close();
    await rm(parentDir, { recursive: true, force: true });
  }
});

test('clears only the domain whose logical version changed', async () => {
  const cacheDir = await createCacheDir();
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    stores = createNodeCacheStores(cacheDir);
    await populateEveryDomain(stores);
    await stores.textEtagCache.set(etagTag(1), 'W/"cached"', 'cached source');
    const databasePath = stores.databasePath;
    await stores.close();
    stores = undefined;

    const versionDatabase = new DatabaseSync(databasePath);
    try {
      versionDatabase
        .prepare("UPDATE meta SET value = 'stale' WHERE key = 'text_version'")
        .run();
    } finally {
      versionDatabase.close();
    }

    stores = createNodeCacheStores(cacheDir);
    assert.equal(await stores.textCache.get('Example.java'), undefined);
    assert.equal(
      await stores.textEtagCache.getPredecessor(etagTag(2)),
      undefined,
    );
    assert.deepEqual(await stores.structCache.get('Example.java'), structValue);
    assert.deepEqual(await stores.queryCache.get('Example'), queryValue);
    await stores.close();
    stores = undefined;

    const inspectingDatabase = new DatabaseSync(databasePath, {
      readOnly: true,
    });
    try {
      assert.equal(getCount(inspectingDatabase, 'text_refs'), 0);
      assert.equal(getCount(inspectingDatabase, 'text_blobs'), 0);
      assert.equal(
        inspectingDatabase
          .prepare('SELECT COUNT(*) AS count FROM text_etag_refs')
          .get()?.count,
        0,
      );
      assert.equal(getCount(inspectingDatabase, 'struct_refs'), 1);
      assert.equal(getCount(inspectingDatabase, 'struct_blobs'), 1);
      assert.equal(getCount(inspectingDatabase, 'query_refs'), 1);
      assert.equal(getCount(inspectingDatabase, 'query_blobs'), 1);
      assert.equal(
        getMetaValue(inspectingDatabase, 'text_version'),
        NODE_CACHE_VERSIONS.text,
      );
    } finally {
      inspectingDatabase.close();
    }
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('clears every domain when the blob codec changes', async () => {
  const cacheDir = await createCacheDir();
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    stores = createNodeCacheStores(cacheDir);
    await populateEveryDomain(stores);
    const databasePath = stores.databasePath;
    await stores.close();
    stores = undefined;

    const versionDatabase = new DatabaseSync(databasePath);
    try {
      versionDatabase
        .prepare("UPDATE meta SET value = 'stale' WHERE key = 'blob_codec'")
        .run();
    } finally {
      versionDatabase.close();
    }

    stores = createNodeCacheStores(cacheDir);
    assert.equal(await stores.textCache.get('Example.java'), undefined);
    assert.equal(await stores.structCache.get('Example.java'), undefined);
    assert.equal(await stores.queryCache.get('Example'), undefined);
    await stores.close();
    stores = undefined;

    const inspectingDatabase = new DatabaseSync(databasePath, {
      readOnly: true,
    });
    try {
      for (const table of CACHE_TABLES) {
        assert.equal(getCount(inspectingDatabase, table), 0);
      }
      assert.equal(
        getMetaValue(inspectingDatabase, 'blob_codec'),
        CACHE_BLOB_CODEC,
      );
      assert.equal(
        getMetaValue(inspectingDatabase, 'cache_epoch'),
        String(CACHE_CONNECTION_EPOCH),
      );
    } finally {
      inspectingDatabase.close();
    }
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('rebuilds fixed tables when the physical user_version changes', async () => {
  const cacheDir = await createCacheDir();
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    stores = createNodeCacheStores(cacheDir);
    await populateEveryDomain(stores);
    const databasePath = stores.databasePath;
    await stores.close();
    stores = undefined;

    const oldFormatDatabase = new DatabaseSync(databasePath);
    try {
      oldFormatDatabase.exec(`
        PRAGMA user_version = 0;
        ALTER TABLE text_blobs ADD COLUMN obsolete TEXT;
      `);
    } finally {
      oldFormatDatabase.close();
    }

    stores = createNodeCacheStores(cacheDir);
    assert.equal(await stores.textCache.get('Example.java'), undefined);

    const rebuiltDatabase = new DatabaseSync(databasePath, { readOnly: true });
    try {
      assert.equal(getUserVersion(rebuiltDatabase), CACHE_FORMAT_VERSION);
      assert.equal(
        getMetaValue(rebuiltDatabase, 'cache_epoch'),
        String(CACHE_CONNECTION_EPOCH),
      );
      for (const table of CACHE_TABLES) {
        assert.equal(getCount(rebuiltDatabase, table), 0);
      }
      const textBlobColumns = rebuiltDatabase
        .prepare('PRAGMA table_info(text_blobs)')
        .all()
        .map((column) => column.name);
      assert.equal(textBlobColumns.includes('obsolete'), false);
    } finally {
      rebuiltDatabase.close();
    }

    await stores.textCache.set('Rebuilt.java', 'rebuilt source');
    assert.equal(await stores.textCache.get('Rebuilt.java'), 'rebuilt source');
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('does not downgrade a cache with a higher connection epoch', async () => {
  const cacheDir = await createCacheDir();
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    stores = createNodeCacheStores(cacheDir);
    await stores.textCache.set('Existing.java', 'existing source');
    const databasePath = stores.databasePath;
    await stores.close();
    stores = undefined;

    const higherEpoch = String(CACHE_CONNECTION_EPOCH + 1);
    const futureDatabase = new DatabaseSync(databasePath);
    try {
      futureDatabase
        .prepare("UPDATE meta SET value = ? WHERE key = 'cache_epoch'")
        .run(higherEpoch);
    } finally {
      futureDatabase.close();
    }

    stores = createNodeCacheStores(cacheDir);
    assert.equal(await stores.textCache.get('Existing.java'), undefined);
    await stores.textCache.set('New.java', 'must not persist');
    await stores.close();
    stores = undefined;

    const inspectingDatabase = new DatabaseSync(databasePath, {
      readOnly: true,
    });
    try {
      assert.equal(
        getMetaValue(inspectingDatabase, 'cache_epoch'),
        higherEpoch,
      );
      assert.equal(getUserVersion(inspectingDatabase), CACHE_FORMAT_VERSION);
      assert.equal(getCount(inspectingDatabase, 'text_refs'), 1);
      assert.equal(getCount(inspectingDatabase, 'text_blobs'), 1);
    } finally {
      inspectingDatabase.close();
    }
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('does not downgrade a cache with a higher physical format', async () => {
  const cacheDir = await createCacheDir();
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    stores = createNodeCacheStores(cacheDir);
    await stores.textCache.set('Existing.java', 'existing source');
    const databasePath = stores.databasePath;
    await stores.close();
    stores = undefined;

    const higherFormat = CACHE_FORMAT_VERSION + 1;
    const futureDatabase = new DatabaseSync(databasePath);
    try {
      futureDatabase.exec(`PRAGMA user_version = ${higherFormat}`);
    } finally {
      futureDatabase.close();
    }

    stores = createNodeCacheStores(cacheDir);
    assert.equal(await stores.textCache.get('Existing.java'), undefined);
    await stores.textCache.set('New.java', 'must not persist');
    await stores.close();
    stores = undefined;

    const inspectingDatabase = new DatabaseSync(databasePath, {
      readOnly: true,
    });
    try {
      assert.equal(getUserVersion(inspectingDatabase), higherFormat);
      assert.equal(
        getMetaValue(inspectingDatabase, 'cache_epoch'),
        String(CACHE_CONNECTION_EPOCH),
      );
      assert.equal(getCount(inspectingDatabase, 'text_refs'), 1);
      assert.equal(getCount(inspectingDatabase, 'text_blobs'), 1);
    } finally {
      inspectingDatabase.close();
    }
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});

test('an open stale connection cannot write after the epoch advances', async () => {
  const cacheDir = await createCacheDir();
  let stores: ReturnType<typeof createNodeCacheStores> | undefined;

  try {
    stores = createNodeCacheStores(cacheDir);
    await populateEveryDomain(stores);
    const databasePath = stores.databasePath;
    const higherEpoch = String(CACHE_CONNECTION_EPOCH + 1);

    const upgradingDatabase = new DatabaseSync(databasePath);
    try {
      upgradingDatabase.exec('BEGIN IMMEDIATE');
      upgradingDatabase.exec(`
        DELETE FROM text_refs;
        DELETE FROM text_blobs;
        DELETE FROM struct_refs;
        DELETE FROM struct_blobs;
        DELETE FROM query_refs;
        DELETE FROM query_blobs;
      `);
      upgradingDatabase
        .prepare("UPDATE meta SET value = ? WHERE key = 'cache_epoch'")
        .run(higherEpoch);
      upgradingDatabase.exec('COMMIT');
    } catch (error) {
      if (upgradingDatabase.isTransaction) upgradingDatabase.exec('ROLLBACK');
      throw error;
    } finally {
      upgradingDatabase.close();
    }

    await stores.textCache.set('Late.java', 'must not persist');
    assert.equal(await stores.textCache.get('Example.java'), undefined);
    await stores.close();
    stores = undefined;

    const inspectingDatabase = new DatabaseSync(databasePath, {
      readOnly: true,
    });
    try {
      assert.equal(
        getMetaValue(inspectingDatabase, 'cache_epoch'),
        higherEpoch,
      );
      for (const table of CACHE_TABLES) {
        assert.equal(getCount(inspectingDatabase, table), 0);
      }
    } finally {
      inspectingDatabase.close();
    }
  } finally {
    await stores?.close();
    await rm(cacheDir, { recursive: true, force: true });
  }
});
