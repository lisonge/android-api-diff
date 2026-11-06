import { groupTags, getIndexTags } from '../src/core/catalog/index.ts';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  bundledSourceMetadata,
  createSourceMetadata,
  loadSourceMetadata,
} from '../src/core/catalog/metadata.ts';
import type { SourceIndex } from '../src/core/catalog/index.ts';

test('bundled version metadata matches the exact source index revision and tags', async () => {
  const index: SourceIndex = JSON.parse(
    await readFile(
      new URL('../src/core/catalog/generated/index-data.json', import.meta.url),
      'utf8',
    ),
  );
  assert.deepEqual(bundledSourceMetadata, createSourceMetadata(index));
  assert.ok(Buffer.byteLength(JSON.stringify(bundledSourceMetadata)) < 4_000);
  assert.ok(!('repositories' in bundledSourceMetadata));
});

test('default metadata is available without fetching the full index', async () => {
  assert.equal(
    await loadSourceMetadata({
      fetchText: async () => {
        throw new Error('Unexpected fetch');
      },
    }),
    bundledSourceMetadata,
  );
});

test('custom metadata reads only the small manifest, not repository shards', async () => {
  const urls: string[] = [];
  const metadata = await loadSourceMetadata({
    indexUrl: 'https://example.test/manifest.json',
    fetchText: async (url) => {
      urls.push(url);
      return JSON.stringify({
        schemaVersion: 3,
        revision: 'custom',
        versions: groupTags(['android-12.0.0_r34']),
        repositories: [
          { repo: 'platform/frameworks/base', indexUrl: 'base.json' },
        ],
      });
    },
  });
  assert.deepEqual(urls, ['https://example.test/manifest.json']);
  assert.equal(metadata.revision, 'custom');
  assert.deepEqual(getIndexTags(metadata), ['android-12.0.0_r34']);
  await assert.rejects(
    loadSourceMetadata({
      indexUrl: 'https://example.test/index',
      fetchText: async () => '{"schemaVersion":99}',
    }),
    /Unsupported source index schema/,
  );
});
