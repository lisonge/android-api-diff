import type { SourceLocation } from '../catalog/index.ts';
export const sourceLinkTargetOptions = [
  'cs.android.com',
  'googlesource',
  'github',
] as const;
export type SourceLinkTarget = (typeof sourceLinkTargetOptions)[number];
export const DEFAULT_SOURCE_LINK_TARGET: SourceLinkTarget = 'cs.android.com';
const encodedPath = (path: string) =>
  path.split('/').map(encodeURIComponent).join('/');
export const getMirrorContentUrl = (
  source: SourceLocation,
  tag: string,
): string =>
  `https://raw.githubusercontent.com/msft-mirror-aosp/${source.repo.replaceAll('/', '.')}/refs/tags/${encodeURIComponent(tag)}/${encodedPath(source.path)}`;
export const getMirrorSourceUrl = (
  source: SourceLocation,
  tag: string,
): string =>
  `https://github.com/msft-mirror-aosp/${source.repo.replaceAll('/', '.')}/blob/${encodeURIComponent(tag)}/${encodedPath(source.path)}`;
export const getGoogleSourceUrl = (
  source: SourceLocation,
  tag: string,
): string =>
  `https://android.googlesource.com/${source.repo}/+/refs/tags/${encodeURIComponent(tag)}/${encodedPath(source.path)}`;
export const getSourceTargetUrl = (
  source: SourceLocation,
  tag = 'android-latest-release',
): string =>
  `https://cs.android.com/android/platform/superproject/+/${encodeURIComponent(tag)}:${source.repo.replace(/^platform\//, '')}/${encodedPath(source.path)}`;
export const getSourceUrl = (
  source: SourceLocation,
  tag: string,
  target: SourceLinkTarget,
): string =>
  target === 'github'
    ? getMirrorSourceUrl(source, tag)
    : target === 'googlesource'
      ? getGoogleSourceUrl(source, tag)
      : getSourceTargetUrl(source, tag);
export const getSourceUrlWithLine = (url: string, line: number): string =>
  url.startsWith('https://cs.android.com/')
    ? `${url};l=${line}`
    : url.startsWith('https://github.com/')
      ? `${url}#L${line}`
      : `${url}#${line}`;
export const fixFilePath = (path: string): string => path.split(/[;?#]/, 1)[0]!;
