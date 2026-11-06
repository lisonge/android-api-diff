import { randomUUID } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { type DatabaseSync } from 'node:sqlite';
import { compressBrotli, decompressBrotli } from './compression.ts';
import {
  CACHE_DATABASE_FILENAME,
  MAX_CACHE_ENTRY_BYTES,
  MAX_CACHE_PAYLOAD_BYTES,
  type NodeCacheDomain,
} from './constants.ts';
import { hashBytes } from './hashing.ts';
import { removeLegacyCacheDirectories } from './legacy.ts';
import {
  type CacheBlobRow,
  openCacheDatabase,
  type PreparedStatements,
  type TextEtagBlobRow,
  type TextEtagCoordinates,
  type TextEtagPreparedStatements,
} from './sqliteSchema.ts';

export interface CachedTextEtagValue {
  coordinates: TextEtagCoordinates;
  etag: string;
  rawValue: Uint8Array;
}

export const getCacheDatabasePath = (cacheDir: string): string => {
  if (cacheDir.trim().length === 0) {
    throw new Error('Cache directory must not be empty');
  }
  return join(resolve(cacheDir), CACHE_DATABASE_FILENAME);
};

export class SqliteContentAddressedCache {
  readonly databasePath: string;

  private readonly cacheDir: string;
  private readonly removeLegacyDirectories: boolean;
  private readonly compressionFlights = new Map<string, Promise<Uint8Array>>();
  private assertCurrentConnection?: () => void;
  private database?: DatabaseSync;
  private preparePromise?: Promise<void>;
  private statements?: Record<NodeCacheDomain, PreparedStatements>;
  private textEtagStatements?: TextEtagPreparedStatements;

  constructor(cacheDir: string, removeLegacyDirectories: boolean) {
    if (cacheDir.trim().length === 0) {
      throw new Error('Cache directory must not be empty');
    }
    this.cacheDir = resolve(cacheDir);
    this.removeLegacyDirectories = removeLegacyDirectories;
    this.databasePath = getCacheDatabasePath(this.cacheDir);
  }

  private async prepare(): Promise<void> {
    this.preparePromise ??= this.prepareCache();
    await this.preparePromise;
  }

  private async prepareCache(): Promise<void> {
    await mkdir(this.cacheDir, { recursive: true });
    const {
      assertCurrentConnection,
      database,
      statements,
      textEtagStatements,
    } = openCacheDatabase(this.databasePath);

    try {
      this.assertCurrentConnection = assertCurrentConnection;
      this.database = database;
      this.statements = statements;
      this.textEtagStatements = textEtagStatements;
      if (this.removeLegacyDirectories) {
        await removeLegacyCacheDirectories(this.cacheDir).catch(() => {
          // Migration cleanup is optional; an undeletable legacy cache must
          // not disable the new cache or the underlying API query.
        });
      }
    } catch (error) {
      if (database.isOpen) database.close();
      this.assertCurrentConnection = undefined;
      this.database = undefined;
      this.statements = undefined;
      this.textEtagStatements = undefined;
      throw error;
    }
  }

  private getDatabase(): DatabaseSync {
    if (!this.database) throw new Error('Cache database is not prepared');
    return this.database;
  }

  private getStatements(domain: NodeCacheDomain): PreparedStatements {
    if (!this.statements) throw new Error('Cache database is not prepared');
    return this.statements[domain];
  }

  private getTextEtagStatements(): TextEtagPreparedStatements {
    if (!this.textEtagStatements) {
      throw new Error('Cache database is not prepared');
    }
    return this.textEtagStatements;
  }

  private assertConnectionIsCurrent(): void {
    if (!this.assertCurrentConnection) {
      throw new Error('Cache database is not prepared');
    }
    this.assertCurrentConnection();
  }

  private readTransaction<T>(operation: () => T): T {
    const database = this.getDatabase();
    database.exec('BEGIN');
    try {
      this.assertConnectionIsCurrent();
      const result = operation();
      database.exec('COMMIT');
      return result;
    } catch (error) {
      if (database.isTransaction) database.exec('ROLLBACK');
      throw error;
    }
  }

  private transaction<T>(operation: () => T): T {
    const database = this.getDatabase();
    database.exec('BEGIN IMMEDIATE');
    try {
      this.assertConnectionIsCurrent();
      const result = operation();
      database.exec('COMMIT');
      return result;
    } catch (error) {
      if (database.isTransaction) database.exec('ROLLBACK');
      throw error;
    }
  }

  private hasBlob(domain: NodeCacheDomain, contentHash: string): boolean {
    return this.getStatements(domain).hasBlob.get(contentHash) !== undefined;
  }

  private linkExistingBlob(
    domain: NodeCacheDomain,
    keyHash: string,
    contentHash: string,
  ): boolean {
    return this.transaction(() => {
      if (!this.hasBlob(domain, contentHash)) return false;
      this.upsertRefAndRemoveOrphan(domain, keyHash, contentHash);
      return true;
    });
  }

  private upsertRefAndRemoveOrphan(
    domain: NodeCacheDomain,
    keyHash: string,
    contentHash: string,
  ): void {
    const statements = this.getStatements(domain);
    const previousRow = statements.readRefContentHash.get(keyHash);
    const previousContentHash = previousRow?.contentHash;
    statements.upsertRef.run(keyHash, contentHash);
    if (
      typeof previousContentHash === 'string' &&
      previousContentHash !== contentHash
    ) {
      statements.deleteOrphanBlob.run(previousContentHash);
    }
  }

  private async getCompressedBlob(
    contentHash: string,
    rawValue: Uint8Array,
  ): Promise<Uint8Array> {
    const current = this.compressionFlights.get(contentHash);
    if (current) return current;

    const promise = compressBrotli(rawValue);
    this.compressionFlights.set(contentHash, promise);
    try {
      return await promise;
    } finally {
      if (this.compressionFlights.get(contentHash) === promise) {
        this.compressionFlights.delete(contentHash);
      }
    }
  }

  private isValidCoordinate(value: unknown): value is number {
    return (
      typeof value === 'number' && Number.isSafeInteger(value) && value >= 0
    );
  }

  private async decodeTextEtagRow(
    row: TextEtagBlobRow | undefined,
  ): Promise<CachedTextEtagValue | undefined> {
    if (!row) return;
    const { revision, versionMajor, versionMinor, versionPatch } = row;
    if (
      typeof row.etag !== 'string' ||
      typeof row.resourceHash !== 'string' ||
      typeof row.contentHash !== 'string' ||
      !this.isValidCoordinate(versionMajor) ||
      !this.isValidCoordinate(versionMinor) ||
      !this.isValidCoordinate(versionPatch) ||
      !this.isValidCoordinate(revision)
    ) {
      return;
    }
    const coordinates: TextEtagCoordinates = {
      versionMajor,
      versionMinor,
      versionPatch,
      revision,
    };
    const contentHash = row.contentHash;
    if (typeof row.generation !== 'string') {
      this.removeTextEtagRef(row.resourceHash, coordinates, contentHash);
      return;
    }
    const generation = row.generation;
    if (
      typeof row.rawSize !== 'number' ||
      !Number.isSafeInteger(row.rawSize) ||
      row.rawSize < 0 ||
      row.rawSize > MAX_CACHE_ENTRY_BYTES ||
      typeof row.payloadSize !== 'number' ||
      !Number.isSafeInteger(row.payloadSize) ||
      row.payloadSize < 0 ||
      row.payloadSize > MAX_CACHE_PAYLOAD_BYTES ||
      !(row.payload instanceof Uint8Array)
    ) {
      this.invalidateBlob('text', undefined, contentHash, generation);
      return;
    }

    try {
      const rawValue = await decompressBrotli(row.payload);
      if (
        rawValue.byteLength !== row.rawSize ||
        hashBytes(rawValue) !== contentHash
      ) {
        this.invalidateBlob('text', undefined, contentHash, generation);
        return;
      }
      return { coordinates, etag: row.etag, rawValue };
    } catch {
      this.invalidateBlob('text', undefined, contentHash, generation);
      return;
    }
  }

  async readTextEtagPredecessor(
    resourceHash: string,
    coordinates: TextEtagCoordinates,
  ): Promise<CachedTextEtagValue | undefined> {
    await this.prepare();
    const row = this.readTransaction(
      () =>
        this.getTextEtagStatements().readPredecessor.get(
          resourceHash,
          coordinates.versionMajor,
          coordinates.versionMinor,
          coordinates.versionPatch,
          coordinates.revision,
        ) as TextEtagBlobRow | undefined,
    );
    return this.decodeTextEtagRow(row);
  }

  async readTextByEtag(
    resourceHash: string,
    etag: string,
  ): Promise<CachedTextEtagValue | undefined> {
    await this.prepare();
    const row = this.readTransaction(
      () =>
        this.getTextEtagStatements().readByEtag.get(resourceHash, etag) as
          | TextEtagBlobRow
          | undefined,
    );
    return this.decodeTextEtagRow(row);
  }

  async readRaw(
    domain: NodeCacheDomain,
    keyHash: string,
  ): Promise<
    | { contentHash: string; generation: string; rawValue: Uint8Array }
    | undefined
  > {
    await this.prepare();
    const row = this.readTransaction(
      () =>
        this.getStatements(domain).readRef.get(keyHash) as
          | CacheBlobRow
          | undefined,
    );
    if (!row) return;

    if (typeof row.contentHash !== 'string') {
      this.removeRef(domain, keyHash);
      return;
    }

    const contentHash = row.contentHash;
    if (typeof row.generation !== 'string') {
      this.removeRef(domain, keyHash, contentHash);
      return;
    }
    const generation = row.generation;
    if (
      typeof row.rawSize !== 'number' ||
      !Number.isSafeInteger(row.rawSize) ||
      row.rawSize < 0 ||
      row.rawSize > MAX_CACHE_ENTRY_BYTES ||
      typeof row.payloadSize !== 'number' ||
      !Number.isSafeInteger(row.payloadSize) ||
      row.payloadSize < 0 ||
      row.payloadSize > MAX_CACHE_PAYLOAD_BYTES ||
      !(row.payload instanceof Uint8Array)
    ) {
      this.invalidateBlob(domain, keyHash, contentHash, generation);
      return;
    }

    try {
      const rawValue = await decompressBrotli(row.payload);
      if (
        rawValue.byteLength !== row.rawSize ||
        hashBytes(rawValue) !== contentHash
      ) {
        this.invalidateBlob(domain, keyHash, contentHash, generation);
        return;
      }
      return { contentHash, generation, rawValue };
    } catch {
      this.invalidateBlob(domain, keyHash, contentHash, generation);
      return;
    }
  }

  async writeRaw(
    domain: NodeCacheDomain,
    keyHash: string,
    contentHash: string,
    rawValue: Uint8Array,
  ): Promise<void> {
    await this.prepare();

    if (rawValue.byteLength > MAX_CACHE_ENTRY_BYTES) {
      throw new RangeError('Cache entry exceeds the maximum supported size');
    }

    if (this.linkExistingBlob(domain, keyHash, contentHash)) {
      return;
    }

    const payload = await this.getCompressedBlob(contentHash, rawValue);
    this.transaction(() => {
      const statements = this.getStatements(domain);
      statements.insertBlob.run(
        contentHash,
        randomUUID(),
        rawValue.byteLength,
        payload,
      );
      this.upsertRefAndRemoveOrphan(domain, keyHash, contentHash);
    });
  }

  private upsertTextEtagRefAndRemoveOrphan(
    resourceHash: string,
    coordinates: TextEtagCoordinates,
    etag: string,
    contentHash: string,
  ): void {
    const statements = this.getTextEtagStatements();
    const key = [
      resourceHash,
      coordinates.versionMajor,
      coordinates.versionMinor,
      coordinates.versionPatch,
      coordinates.revision,
    ] as const;
    const previousContentHash = statements.readRefContentHash.get(
      ...key,
    )?.contentHash;
    statements.upsertRef.run(...key, etag, contentHash);
    if (
      typeof previousContentHash === 'string' &&
      previousContentHash !== contentHash
    ) {
      this.getStatements('text').deleteOrphanBlob.run(previousContentHash);
    }
  }

  private linkTextEtagToExistingBlob(
    resourceHash: string,
    coordinates: TextEtagCoordinates,
    etag: string,
    contentHash: string,
  ): boolean {
    return this.transaction(() => {
      if (!this.hasBlob('text', contentHash)) return false;
      this.upsertTextEtagRefAndRemoveOrphan(
        resourceHash,
        coordinates,
        etag,
        contentHash,
      );
      return true;
    });
  }

  async writeTextEtag(
    resourceHash: string,
    coordinates: TextEtagCoordinates,
    etag: string,
    contentHash: string,
    rawValue: Uint8Array,
  ): Promise<void> {
    await this.prepare();
    if (rawValue.byteLength > MAX_CACHE_ENTRY_BYTES) {
      throw new RangeError('Cache entry exceeds the maximum supported size');
    }
    if (
      this.linkTextEtagToExistingBlob(
        resourceHash,
        coordinates,
        etag,
        contentHash,
      )
    ) {
      return;
    }

    const payload = await this.getCompressedBlob(contentHash, rawValue);
    this.transaction(() => {
      this.getStatements('text').insertBlob.run(
        contentHash,
        randomUUID(),
        rawValue.byteLength,
        payload,
      );
      this.upsertTextEtagRefAndRemoveOrphan(
        resourceHash,
        coordinates,
        etag,
        contentHash,
      );
    });
  }

  async invalidate(
    domain: NodeCacheDomain,
    keyHash: string,
    contentHash: string,
    generation: string,
  ): Promise<void> {
    await this.prepare();
    this.invalidateBlob(domain, keyHash, contentHash, generation);
  }

  private removeRef(
    domain: NodeCacheDomain,
    keyHash: string,
    contentHash?: string,
  ): void {
    this.transaction(() => {
      this.getStatements(domain).deleteRef.run(
        keyHash,
        contentHash ?? null,
        contentHash ?? null,
      );
    });
  }

  private removeTextEtagRef(
    resourceHash: string,
    coordinates: TextEtagCoordinates,
    contentHash: string,
  ): void {
    this.transaction(() => {
      this.getTextEtagStatements().deleteRef.run(
        resourceHash,
        coordinates.versionMajor,
        coordinates.versionMinor,
        coordinates.versionPatch,
        coordinates.revision,
      );
      this.getStatements('text').deleteOrphanBlob.run(contentHash);
    });
  }

  private invalidateBlob(
    domain: NodeCacheDomain,
    keyHash: string | undefined,
    contentHash: string,
    generation: string,
  ): void {
    this.transaction(() => {
      const statements = this.getStatements(domain);
      // The blob failed size, hash, or value decoding checks. Delete
      // only the generation we read, then let the foreign key invalidate all
      // refs to that corrupt generation without racing a concurrent rebuild.
      const deleted = statements.deleteBlob.run(contentHash, generation);
      if (
        keyHash !== undefined &&
        deleted.changes === 0 &&
        !this.hasBlob(domain, contentHash)
      ) {
        statements.deleteRef.run(keyHash, contentHash, contentHash);
      }
    });
  }

  async close(): Promise<void> {
    if (this.preparePromise) {
      try {
        await this.preparePromise;
      } catch {
        return;
      }
    }
    if (this.database?.isOpen) this.database.close();
    this.assertCurrentConnection = undefined;
    this.database = undefined;
    this.statements = undefined;
    this.textEtagStatements = undefined;
  }
}
