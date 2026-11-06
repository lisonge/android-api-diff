import { loadSourceIndex, indexVersions } from './index.ts';
import type {
  AndroidApiQueryRuntime,
  AndroidVersionItem,
} from '../model/types.ts';

export const loadAndroidVersionList = async (
  runtime: AndroidApiQueryRuntime,
  signal?: AbortSignal,
): Promise<AndroidVersionItem[]> =>
  (await runtime.loadAndroidVersionList?.(signal)) ??
  indexVersions(await loadSourceIndex(runtime, signal));
