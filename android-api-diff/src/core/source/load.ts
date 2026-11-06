import type { AndroidApiQueryRuntime } from '../model/types.ts';
import {
  sourceKey,
  validateSource,
  type SourceLocation,
} from '../catalog/index.ts';
import { loadCachedTaggedSourceText } from './text-cache.ts';
import { getMirrorContentUrl } from './url.ts';
export interface AndroidApiSourceFile extends SourceLocation {
  status: 'found' | 'not-found';
  content: string;
  tag: string;
  url: string;
}
export const normalizeAndroidSourceTag = (value: string): string | undefined =>
  /^android-\d+\.\d+\.\d+_r\d+$/.test(value.trim()) ? value.trim() : undefined;
export const loadAndroidSourceFile = async (
  runtime: AndroidApiQueryRuntime,
  tagValue: string,
  source: SourceLocation,
  signal?: AbortSignal,
): Promise<AndroidApiSourceFile> => {
  validateSource(source);
  const tag = normalizeAndroidSourceTag(tagValue);
  if (!tag) throw new Error('Invalid Android release tag');
  const url = getMirrorContentUrl(source, tag);
  const { text, sourceFileNotFound } = await loadCachedTaggedSourceText(
    runtime,
    `source:v2:${tag}:${sourceKey(source)}`,
    url,
    signal,
  );
  return {
    ...source,
    tag,
    url,
    status: sourceFileNotFound ? 'not-found' : 'found',
    content: sourceFileNotFound ? '' : text,
  };
};
