import { lstat, rm } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { LEGACY_CACHE_DIR_NAMES } from './constants.ts';

const assertSafeLegacyCachePath = (
  cacheRoot: string,
  name: (typeof LEGACY_CACHE_DIR_NAMES)[number],
): string => {
  const target = resolve(cacheRoot, name);
  if (dirname(target) !== cacheRoot || basename(target) !== name) {
    throw new Error(`Refusing to remove unsafe legacy cache path: ${target}`);
  }
  return target;
};

export const removeLegacyCacheDirectories = async (
  cacheDir: string,
): Promise<void> => {
  if (cacheDir.trim().length === 0) {
    throw new Error('Cache directory must not be empty');
  }
  const cacheRoot = resolve(cacheDir);
  const rootStats = await lstat(cacheRoot);
  if (rootStats.isSymbolicLink()) {
    throw new Error(
      `Refusing to remove legacy caches through a linked root: ${cacheRoot}`,
    );
  }
  const targets = LEGACY_CACHE_DIR_NAMES.map((name) =>
    assertSafeLegacyCachePath(cacheRoot, name),
  );
  await Promise.all(
    targets.map(async (target) => {
      try {
        const targetStats = await lstat(target);
        if (targetStats.isSymbolicLink()) {
          throw new Error(
            `Refusing to remove a linked legacy cache: ${target}`,
          );
        }
      } catch (error) {
        if (
          error instanceof Error &&
          'code' in error &&
          error.code === 'ENOENT'
        ) {
          return;
        }
        throw error;
      }
      await rm(target, { recursive: true, force: true });
    }),
  );
};
