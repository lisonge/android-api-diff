import { DatabaseSync, type StatementSync } from 'node:sqlite';
import {
  CACHE_BLOB_CODEC,
  CACHE_CONNECTION_EPOCH,
  CACHE_FORMAT_VERSION,
  ETAG_CACHE_VERSION,
  MAX_CACHE_PAYLOAD_BYTES,
  NODE_CACHE_VERSIONS,
  type NodeCacheDomain,
  SQLITE_BUSY_TIMEOUT_MS,
} from './constants.ts';

export interface CacheBlobRow extends Record<string, unknown> {
  contentHash: unknown;
  generation: unknown;
  payload: unknown;
  payloadSize: unknown;
  rawSize: unknown;
}

export interface TextEtagBlobRow extends CacheBlobRow {
  etag: unknown;
  resourceHash: unknown;
  revision: unknown;
  versionMajor: unknown;
  versionMinor: unknown;
  versionPatch: unknown;
}

export interface TextEtagCoordinates {
  revision: number;
  versionMajor: number;
  versionMinor: number;
  versionPatch: number;
}

export interface TextEtagPreparedStatements {
  deleteRef: StatementSync;
  readByEtag: StatementSync;
  readPredecessor: StatementSync;
  readRefContentHash: StatementSync;
  upsertRef: StatementSync;
}

export interface PreparedStatements {
  deleteBlob: StatementSync;
  deleteOrphanBlob: StatementSync;
  deleteRef: StatementSync;
  hasBlob: StatementSync;
  insertBlob: StatementSync;
  readRefContentHash: StatementSync;
  readRef: StatementSync;
  upsertRef: StatementSync;
}

export interface PreparedDatabase {
  assertCurrentConnection(): void;
  database: DatabaseSync;
  statements: Record<NodeCacheDomain, PreparedStatements>;
  textEtagStatements: TextEtagPreparedStatements;
}

interface CacheDomainSchema {
  blobTable: string;
  refTable: string;
  versionKey: MetaKey;
}

type MetaKey =
  | 'blob_codec'
  | 'cache_epoch'
  | 'etag_version'
  | 'query_version'
  | 'struct_version'
  | 'text_version';

const DOMAIN_ORDER: readonly NodeCacheDomain[] = ['text', 'struct', 'query'];

const DOMAIN_SCHEMAS = {
  query: {
    blobTable: 'query_blobs',
    refTable: 'query_refs',
    versionKey: 'query_version',
  },
  struct: {
    blobTable: 'struct_blobs',
    refTable: 'struct_refs',
    versionKey: 'struct_version',
  },
  text: {
    blobTable: 'text_blobs',
    refTable: 'text_refs',
    versionKey: 'text_version',
  },
} as const satisfies Record<NodeCacheDomain, CacheDomainSchema>;

const EXPECTED_META: Record<MetaKey, string> = {
  blob_codec: CACHE_BLOB_CODEC,
  cache_epoch: String(CACHE_CONNECTION_EPOCH),
  etag_version: ETAG_CACHE_VERSION,
  query_version: NODE_CACHE_VERSIONS.query,
  struct_version: NODE_CACHE_VERSIONS.struct,
  text_version: NODE_CACHE_VERSIONS.text,
};

const META_KEYS = Object.keys(EXPECTED_META) as MetaKey[];
const V1_TABLE_NAMES = [
  'meta',
  'text_blobs',
  'text_refs',
  'struct_blobs',
  'struct_refs',
  'query_blobs',
  'query_refs',
] as const;

const EXPECTED_TABLE_NAMES = [...V1_TABLE_NAMES, 'text_etag_refs'] as const;

const CREATE_TEXT_ETAG_SCHEMA_SQL = `
  CREATE TABLE text_etag_refs (
    resource_hash TEXT NOT NULL,
    version_major INTEGER NOT NULL CHECK (version_major >= 0),
    version_minor INTEGER NOT NULL CHECK (version_minor >= 0),
    version_patch INTEGER NOT NULL CHECK (version_patch >= 0),
    revision INTEGER NOT NULL CHECK (revision >= 0),
    etag TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    PRIMARY KEY (
      resource_hash,
      version_major,
      version_minor,
      version_patch,
      revision
    ),
    FOREIGN KEY (content_hash)
      REFERENCES text_blobs (content_hash)
      ON DELETE CASCADE
  ) WITHOUT ROWID;

  CREATE INDEX text_etag_refs_by_etag
    ON text_etag_refs (resource_hash, etag);

  CREATE INDEX text_etag_refs_by_content
    ON text_etag_refs (content_hash);
`;

const CREATE_SCHEMA_SQL = `
  CREATE TABLE meta (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
  ) WITHOUT ROWID;

  CREATE TABLE text_blobs (
    content_hash TEXT PRIMARY KEY NOT NULL,
    generation TEXT NOT NULL,
    raw_size INTEGER NOT NULL CHECK (raw_size >= 0),
    payload BLOB NOT NULL
  ) WITHOUT ROWID;

  CREATE TABLE text_refs (
    key_hash TEXT PRIMARY KEY NOT NULL,
    content_hash TEXT NOT NULL,
    FOREIGN KEY (content_hash)
      REFERENCES text_blobs (content_hash)
      ON DELETE CASCADE
  ) WITHOUT ROWID;

  CREATE INDEX text_refs_by_content ON text_refs (content_hash);

  ${CREATE_TEXT_ETAG_SCHEMA_SQL}

  CREATE TABLE struct_blobs (
    content_hash TEXT PRIMARY KEY NOT NULL,
    generation TEXT NOT NULL,
    raw_size INTEGER NOT NULL CHECK (raw_size >= 0),
    payload BLOB NOT NULL
  ) WITHOUT ROWID;

  CREATE TABLE struct_refs (
    key_hash TEXT PRIMARY KEY NOT NULL,
    content_hash TEXT NOT NULL,
    FOREIGN KEY (content_hash)
      REFERENCES struct_blobs (content_hash)
      ON DELETE CASCADE
  ) WITHOUT ROWID;

  CREATE INDEX struct_refs_by_content ON struct_refs (content_hash);

  CREATE TABLE query_blobs (
    content_hash TEXT PRIMARY KEY NOT NULL,
    generation TEXT NOT NULL,
    raw_size INTEGER NOT NULL CHECK (raw_size >= 0),
    payload BLOB NOT NULL
  ) WITHOUT ROWID;

  CREATE TABLE query_refs (
    key_hash TEXT PRIMARY KEY NOT NULL,
    content_hash TEXT NOT NULL,
    FOREIGN KEY (content_hash)
      REFERENCES query_blobs (content_hash)
      ON DELETE CASCADE
  ) WITHOUT ROWID;

  CREATE INDEX query_refs_by_content ON query_refs (content_hash);
`;

const readUserVersion = (database: DatabaseSync): number => {
  const value = database.prepare('PRAGMA user_version').get()?.user_version;
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) {
    throw new Error('Invalid SQLite cache format version');
  }
  return value;
};

const readStoredEpoch = (database: DatabaseSync): bigint | undefined => {
  const hasMeta = database
    .prepare(
      "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'meta'",
    )
    .get();
  if (!hasMeta) return;

  let value: unknown;
  try {
    value = database
      .prepare("SELECT value FROM meta WHERE key = 'cache_epoch'")
      .get()?.value;
  } catch {
    return;
  }
  if (typeof value !== 'string' || !/^(0|[1-9]\d*)$/.test(value)) return;
  return BigInt(value);
};

const assertNotNewer = (
  userVersion: number,
  storedEpoch: bigint | undefined,
): void => {
  if (userVersion > CACHE_FORMAT_VERSION) {
    throw new Error('SQLite cache format is newer than this binary');
  }
  if (
    storedEpoch !== undefined &&
    storedEpoch > BigInt(CACHE_CONNECTION_EPOCH)
  ) {
    throw new Error('SQLite cache epoch is newer than this binary');
  }
};

const hasTables = (
  database: DatabaseSync,
  expectedNames: readonly string[],
): boolean => {
  const rows = database
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table'")
    .all();
  const names = new Set(rows.map((row) => row.name));
  return expectedNames.every((name) => names.has(name));
};

const hasExpectedSchema = (database: DatabaseSync): boolean =>
  hasTables(database, EXPECTED_TABLE_NAMES);

const dropAndCreateSchema = (database: DatabaseSync): void => {
  database.exec(`
    DROP TABLE IF EXISTS text_etag_refs;
    DROP TABLE IF EXISTS text_refs;
    DROP TABLE IF EXISTS struct_refs;
    DROP TABLE IF EXISTS query_refs;
    DROP TABLE IF EXISTS text_blobs;
    DROP TABLE IF EXISTS struct_blobs;
    DROP TABLE IF EXISTS query_blobs;
    DROP TABLE IF EXISTS meta;
    ${CREATE_SCHEMA_SQL}
    PRAGMA user_version = ${CACHE_FORMAT_VERSION};
  `);
};

const migratePhysicalSchema = (
  database: DatabaseSync,
  userVersion: number,
): void => {
  if (userVersion === 1 && hasTables(database, V1_TABLE_NAMES)) {
    database.exec(`
      ${CREATE_TEXT_ETAG_SCHEMA_SQL}
      PRAGMA user_version = ${CACHE_FORMAT_VERSION};
    `);
    return;
  }
  dropAndCreateSchema(database);
};

const readMeta = (database: DatabaseSync): Record<MetaKey, unknown> => {
  const statement = database.prepare('SELECT value FROM meta WHERE key = ?');
  return Object.fromEntries(
    META_KEYS.map((key) => [key, statement.get(key)?.value]),
  ) as Record<MetaKey, unknown>;
};

const writeExpectedMeta = (
  database: DatabaseSync,
  currentMeta: Record<MetaKey, unknown> = {} as Record<MetaKey, unknown>,
): void => {
  const statement = database.prepare(`
    INSERT INTO meta (key, value)
    VALUES (?, ?)
    ON CONFLICT (key) DO UPDATE SET value = excluded.value
  `);
  for (const key of META_KEYS) {
    if (currentMeta[key] !== EXPECTED_META[key]) {
      statement.run(key, EXPECTED_META[key]);
    }
  }
};

const reconcileLogicalVersions = (database: DatabaseSync): void => {
  const currentMeta = readMeta(database);
  const resetAll = currentMeta.blob_codec !== EXPECTED_META.blob_codec;

  if (
    resetAll ||
    currentMeta.etag_version !== EXPECTED_META.etag_version ||
    currentMeta.text_version !== EXPECTED_META.text_version
  ) {
    database.exec('DELETE FROM text_etag_refs');
  }

  for (const domain of DOMAIN_ORDER) {
    const schema = DOMAIN_SCHEMAS[domain];
    if (
      resetAll ||
      currentMeta[schema.versionKey] !== EXPECTED_META[schema.versionKey]
    ) {
      database.exec(`
        DELETE FROM ${schema.refTable};
        DELETE FROM ${schema.blobTable};
      `);
    }
  }
  if (
    !resetAll &&
    currentMeta.etag_version !== EXPECTED_META.etag_version &&
    currentMeta.text_version === EXPECTED_META.text_version
  ) {
    database.exec(`
      DELETE FROM text_blobs
      WHERE NOT EXISTS (
        SELECT 1 FROM text_refs
        WHERE text_refs.content_hash = text_blobs.content_hash
      )
    `);
  }
  writeExpectedMeta(database, currentMeta);
};

const initializeDatabase = (database: DatabaseSync): void => {
  const initialUserVersion = readUserVersion(database);
  assertNotNewer(initialUserVersion, readStoredEpoch(database));

  database.exec('PRAGMA journal_mode = WAL');
  database.exec('BEGIN IMMEDIATE');
  try {
    const userVersion = readUserVersion(database);
    const storedEpoch = readStoredEpoch(database);
    assertNotNewer(userVersion, storedEpoch);

    if (userVersion < CACHE_FORMAT_VERSION) {
      migratePhysicalSchema(database, userVersion);
    } else if (!hasExpectedSchema(database)) {
      dropAndCreateSchema(database);
    }

    if (readMeta(database).blob_codec === undefined) {
      writeExpectedMeta(database);
    } else {
      reconcileLogicalVersions(database);
    }
    database.exec('COMMIT');
  } catch (error) {
    if (database.isTransaction) database.exec('ROLLBACK');
    throw error;
  }
};

const prepareDomainStatements = (
  database: DatabaseSync,
  schema: CacheDomainSchema,
): PreparedStatements => {
  const { blobTable, refTable } = schema;
  return {
    deleteBlob: database.prepare(`
      DELETE FROM ${blobTable}
      WHERE content_hash = ? AND generation = ?
    `),
    deleteOrphanBlob: database.prepare(`
      DELETE FROM ${blobTable}
      WHERE content_hash = ?
        AND NOT EXISTS (
          SELECT 1
          FROM ${refTable}
          WHERE ${refTable}.content_hash = ${blobTable}.content_hash
        )
        ${
          schema === DOMAIN_SCHEMAS.text
            ? `AND NOT EXISTS (
                SELECT 1
                FROM text_etag_refs
                WHERE text_etag_refs.content_hash = text_blobs.content_hash
              )`
            : ''
        }
    `),
    deleteRef: database.prepare(`
      DELETE FROM ${refTable}
      WHERE key_hash = ?
        AND (? IS NULL OR content_hash = ?)
    `),
    hasBlob: database.prepare(`
      SELECT 1
      FROM ${blobTable}
      WHERE content_hash = ?
    `),
    insertBlob: database.prepare(`
      INSERT OR IGNORE INTO ${blobTable} (
        content_hash, generation, raw_size, payload
      ) VALUES (?, ?, ?, ?)
    `),
    readRef: database.prepare(`
      SELECT
        ${refTable}.content_hash AS contentHash,
        ${blobTable}.generation AS generation,
        ${blobTable}.raw_size AS rawSize,
        length(${blobTable}.payload) AS payloadSize,
        CASE
          WHEN length(${blobTable}.payload) <= ${MAX_CACHE_PAYLOAD_BYTES}
          THEN ${blobTable}.payload
          ELSE NULL
        END AS payload
      FROM ${refTable}
      LEFT JOIN ${blobTable}
        ON ${blobTable}.content_hash = ${refTable}.content_hash
      WHERE ${refTable}.key_hash = ?
    `),
    readRefContentHash: database.prepare(`
      SELECT content_hash AS contentHash
      FROM ${refTable}
      WHERE key_hash = ?
    `),
    upsertRef: database.prepare(`
      INSERT INTO ${refTable} (key_hash, content_hash)
      VALUES (?, ?)
      ON CONFLICT (key_hash)
      DO UPDATE SET content_hash = excluded.content_hash
    `),
  };
};

const TEXT_ETAG_BLOB_SELECT = `
  SELECT
    text_etag_refs.resource_hash AS resourceHash,
    text_etag_refs.etag AS etag,
    text_etag_refs.version_major AS versionMajor,
    text_etag_refs.version_minor AS versionMinor,
    text_etag_refs.version_patch AS versionPatch,
    text_etag_refs.revision AS revision,
    text_etag_refs.content_hash AS contentHash,
    text_blobs.generation AS generation,
    text_blobs.raw_size AS rawSize,
    length(text_blobs.payload) AS payloadSize,
    CASE
      WHEN length(text_blobs.payload) <= ${MAX_CACHE_PAYLOAD_BYTES}
      THEN text_blobs.payload
      ELSE NULL
    END AS payload
  FROM text_etag_refs
  LEFT JOIN text_blobs
    ON text_blobs.content_hash = text_etag_refs.content_hash
`;

const prepareTextEtagStatements = (
  database: DatabaseSync,
): TextEtagPreparedStatements => ({
  deleteRef: database.prepare(`
    DELETE FROM text_etag_refs
    WHERE resource_hash = ?
      AND version_major = ?
      AND version_minor = ?
      AND version_patch = ?
      AND revision = ?
  `),
  readByEtag: database.prepare(`
    ${TEXT_ETAG_BLOB_SELECT}
    WHERE text_etag_refs.resource_hash = ?
      AND text_etag_refs.etag = ?
    ORDER BY
      text_etag_refs.version_major DESC,
      text_etag_refs.version_minor DESC,
      text_etag_refs.version_patch DESC,
      text_etag_refs.revision DESC
    LIMIT 1
  `),
  readPredecessor: database.prepare(`
    ${TEXT_ETAG_BLOB_SELECT}
    WHERE text_etag_refs.resource_hash = ?
      AND (
        text_etag_refs.version_major,
        text_etag_refs.version_minor,
        text_etag_refs.version_patch,
        text_etag_refs.revision
      ) < (?, ?, ?, ?)
    ORDER BY
      text_etag_refs.version_major DESC,
      text_etag_refs.version_minor DESC,
      text_etag_refs.version_patch DESC,
      text_etag_refs.revision DESC
    LIMIT 1
  `),
  readRefContentHash: database.prepare(`
    SELECT content_hash AS contentHash
    FROM text_etag_refs
    WHERE resource_hash = ?
      AND version_major = ?
      AND version_minor = ?
      AND version_patch = ?
      AND revision = ?
  `),
  upsertRef: database.prepare(`
    INSERT INTO text_etag_refs (
      resource_hash,
      version_major,
      version_minor,
      version_patch,
      revision,
      etag,
      content_hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (
      resource_hash,
      version_major,
      version_minor,
      version_patch,
      revision
    ) DO UPDATE SET
      etag = excluded.etag,
      content_hash = excluded.content_hash
  `),
});

const prepareStatements = (
  database: DatabaseSync,
): Record<NodeCacheDomain, PreparedStatements> => ({
  query: prepareDomainStatements(database, DOMAIN_SCHEMAS.query),
  struct: prepareDomainStatements(database, DOMAIN_SCHEMAS.struct),
  text: prepareDomainStatements(database, DOMAIN_SCHEMAS.text),
});

const prepareConnectionFence = (database: DatabaseSync): (() => void) => {
  const readEpoch = database.prepare(
    "SELECT value FROM meta WHERE key = 'cache_epoch'",
  );
  const readFormat = database.prepare('PRAGMA user_version');
  return () => {
    const userVersion = readFormat.get()?.user_version;
    const epoch = readEpoch.get()?.value;
    if (
      userVersion !== CACHE_FORMAT_VERSION ||
      epoch !== String(CACHE_CONNECTION_EPOCH)
    ) {
      throw new Error('SQLite cache connection is stale');
    }
  };
};

export const openCacheDatabase = (databasePath: string): PreparedDatabase => {
  const database = new DatabaseSync(databasePath, {
    enableForeignKeyConstraints: true,
    timeout: SQLITE_BUSY_TIMEOUT_MS,
  });

  try {
    database.exec(`
      PRAGMA busy_timeout = ${SQLITE_BUSY_TIMEOUT_MS};
      PRAGMA foreign_keys = ON;
    `);
    initializeDatabase(database);
    return {
      assertCurrentConnection: prepareConnectionFence(database),
      database,
      statements: prepareStatements(database),
      textEtagStatements: prepareTextEtagStatements(database),
    };
  } catch (error) {
    if (database.isOpen) database.close();
    throw error;
  }
};
