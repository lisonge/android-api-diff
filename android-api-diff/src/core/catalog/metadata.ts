import data from './generated/metadata-data.json' with { type: 'json' };
import {
  type VersionTags,
  type SourceIndex,
  type SourceIndexManifest,
} from './index.ts';
import type { AndroidApiQueryRuntime } from '../model/types.ts';

export interface SourceMetadata {
  schemaVersion: 2;
  revision: string;
  versions: VersionTags[];
}

export const createSourceMetadata = (
  index: Pick<SourceIndex, 'revision' | 'versions'>,
): SourceMetadata => ({
  schemaVersion: 2,
  revision: index.revision,
  versions: index.versions,
});

export const bundledSourceMetadata: SourceMetadata = data as SourceMetadata;

// A remote index manifest already contains tags; repository shards are not needed.
export const loadSourceMetadata = async (
  runtime: AndroidApiQueryRuntime,
): Promise<SourceMetadata> => {
  if (!runtime.indexUrl) return bundledSourceMetadata;
  const manifest = JSON.parse(
    await runtime.fetchText(runtime.indexUrl),
  ) as SourceIndexManifest;
  if (manifest.schemaVersion !== 3)
    throw new Error('Unsupported source index schema');
  return createSourceMetadata(manifest);
};
