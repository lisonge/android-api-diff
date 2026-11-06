import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import test from 'node:test';
import { prepareIndex } from '../../scripts/prepare-index.ts';

test('index preparation downloads, verifies, reuses and repairs the local file', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'index-prepare-'));
  try {
    const target = pathToFileURL(join(dir, 'index-data.json'));
    const text = JSON.stringify({
      schemaVersion: 3,
      revision: 'test',
      repositories: [],
    });
    const asset = {
      url: 'https://example.test/index.json',
      size: Buffer.byteLength(text),
      sha256: createHash('sha256').update(text).digest('hex'),
      revision: 'test',
    };
    let calls = 0;
    const fetcher: typeof fetch = async () => {
      calls++;
      return new Response(text);
    };
    assert.equal(await prepareIndex(asset, target, fetcher), 'downloaded');
    assert.equal(await prepareIndex(asset, target, fetcher), 'cached');
    assert.equal(calls, 1);
    await writeFile(target, 'corrupt');
    await assert.rejects(
      prepareIndex(asset, target, async () => new Response('wrong')),
      /SHA-256/,
    );
    assert.equal(await readFile(target, 'utf8'), 'corrupt');
    await assert.rejects(
      prepareIndex(
        asset,
        target,
        async () => new Response(null, { status: 404 }),
      ),
      /HTTP 404/,
    );
    await assert.rejects(
      prepareIndex({ ...asset, revision: 'other' }, target, fetcher),
      /revision/,
    );
    assert.equal(await prepareIndex(asset, target, fetcher), 'downloaded');
    assert.equal(await readFile(target, 'utf8'), text);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
