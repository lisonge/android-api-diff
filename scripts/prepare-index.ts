import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import descriptor from '../android-api-diff/src/core/catalog/generated/index-asset.json' with { type: 'json' };
import metadata from '../android-api-diff/src/core/catalog/generated/metadata-data.json' with { type: 'json' };

export interface IndexAsset {
  url: string;
  sha256: string;
  size: number;
  revision: string;
}

export const bundledIndexPath = new URL(
  '../android-api-diff/src/core/catalog/generated/index-data.json',
  import.meta.url,
);
export const prepareIndex = async (
  asset: IndexAsset,
  target: URL,
  fetcher: typeof fetch = fetch,
): Promise<'cached' | 'downloaded'> => {
  const valid = (bytes: Uint8Array) =>
    bytes.byteLength === asset.size &&
    createHash('sha256').update(bytes).digest('hex') === asset.sha256;
  try {
    if (valid(await readFile(target))) return 'cached';
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
  const response = await fetcher(asset.url);
  if (!response.ok)
    throw new Error(`Index download failed: HTTP ${response.status}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (!valid(bytes))
    throw new Error('Index download failed SHA-256 or size verification');
  const index = JSON.parse(new TextDecoder().decode(bytes));
  if (index.schemaVersion !== 3 || index.revision !== asset.revision)
    throw new Error('Index download does not match the pinned revision');
  await mkdir(new URL('./', target), { recursive: true });
  await writeFile(target, bytes);
  return 'downloaded';
};

if (import.meta.main) {
  if (descriptor.revision !== metadata.revision)
    throw new Error(
      'Bundled metadata and index asset revisions differ. Run pnpm upload:index after build:index --bundle.',
    );
  console.log(
    `Index ${await prepareIndex(descriptor, bundledIndexPath)} (${descriptor.size} bytes)`,
  );
}
