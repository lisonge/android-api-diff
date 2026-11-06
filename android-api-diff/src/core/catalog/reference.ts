import type { FileTarget, SearchFromData } from '../model/types.ts';
import { fixFilePath } from '../source/url.ts';

const aidlFileNameRegs = [/^I[A-Z].*/, /\.I[A-Z].*/];
const sourceFileReg = /\.(java|aidl)$/;
const propReg = /^[_0-9a-zA-Z]+/;

const getFileStructName = (filePath: string): string => {
  return filePath.split('/').at(-1)!.replace(sourceFileReg, '');
};

const getMayFileRefNames = (name: string): string[] => {
  const r = new Set<string>([name]);
  const parts = name.split('.');
  const lastPart = parts.at(-1);
  if (lastPart?.endsWith('Hidden')) {
    parts[parts.length - 1] = lastPart.substring(
      0,
      lastPart.length - 'Hidden'.length,
    );
    r.add(parts.join('.'));
  }
  return Array.from(r);
};

const getPropName = (name: string): string => {
  return name.match(propReg)?.[0] || '';
};

const isLikelyMemberName = (name: string): boolean => {
  if (!name) return false;
  return /^[a-z_]/.test(name) || /^[A-Z0-9_]+$/.test(name);
};

const isTestPath = (path: string): boolean =>
  /(^|\/)(test|tests)(\/|$)/.test(path);

export const compareAndroidSourcePaths = (a: string, b: string): number =>
  Number(isTestPath(a)) - Number(isTestPath(b)) ||
  Number(!a.startsWith('core/java/')) - Number(!b.startsWith('core/java/')) ||
  (a < b ? -1 : a > b ? 1 : 0);

export const searchFilePathsByName = (
  name: string,
  aidlJavaFiles: readonly string[],
): string[] => {
  name = fixFilePath(name.trim()).replaceAll('\\', '/').replace(/^\/+/, '');
  if (!name) return [];
  const files = [...new Set(aidlJavaFiles)];
  if (sourceFileReg.test(name)) {
    // An exact repository-relative path pins the source, even in a test directory.
    if (files.includes(name)) return [name];
    return files
      .filter((path) => path.endsWith(`/${name}`))
      .sort(compareAndroidSourcePaths);
  }
  const preferredExtension = aidlFileNameRegs.some((reg) => reg.test(name))
    ? 'aidl'
    : 'java';
  name = name.replaceAll('.', '/');
  return files
    .filter(
      (path) =>
        path.endsWith(`/${name}.java`) || path.endsWith(`/${name}.aidl`),
    )
    .sort(
      (a, b) =>
        Number(!a.endsWith(`.${preferredExtension}`)) -
          Number(!b.endsWith(`.${preferredExtension}`)) ||
        compareAndroidSourcePaths(a, b),
    );
};

const getConstructorShorthandClassName = (
  name: string,
  aidlJavaFiles: readonly string[],
): string | undefined => {
  if (!name.endsWith('()')) return;
  const className = name.substring(0, name.length - 2).trim();
  if (/[#?;]/.test(className)) return;
  const simpleName = className.replaceAll('$', '.').split('.').at(-1);
  if (!simpleName) return;
  if (
    isLikelyMemberName(simpleName) &&
    !searchFilePathsByName(className, aidlJavaFiles).length
  ) {
    return;
  }
  return className;
};

export const resolveFileTargets = (
  name: string,
  aidlJavaFiles: readonly string[],
): FileTarget[] => {
  name = name.replaceAll('$', '.').replace(/\.+$/g, '').trim();
  if (!name) return [];
  const parts = name.split('.').filter(Boolean);
  const res: FileTarget[] = [];
  const seen = new Set<string>();
  for (let i = parts.length; i > 0; i--) {
    const fileRef = parts.slice(0, i).join('.');
    const suffix = parts.slice(i);
    for (const mayFileRef of getMayFileRefNames(fileRef)) {
      for (const filePath of searchFilePathsByName(mayFileRef, aidlJavaFiles)) {
        const targetPaths = [getFileStructName(filePath), ...suffix];
        const key = `${filePath}\n${targetPaths.join('.')}`;
        if (seen.has(key)) continue;
        seen.add(key);
        res.push({
          filePath,
          targetPaths,
        });
      }
    }
  }
  return res;
};

const createSearchFromData = (
  filePath: string,
  targetPaths: string[],
  targetKind: SearchFromData['targetKind'],
): SearchFromData => {
  return {
    filePath,
    targetUrl: '',
    targetPaths,
    targetKind,
  };
};

export const searchFilePathsByRefName = (
  name: string,
  aidlJavaFiles: readonly string[],
): SearchFromData[] => {
  name = name.trim();
  const fileMember = /^(.*\.(?:java|aidl))[.#](.+)$/.exec(name);
  if (fileMember) {
    const files = searchFilePathsByName(fileMember[1]!, aidlJavaFiles);
    if (files.length) {
      return files.flatMap((filePath) =>
        searchFilePathsByRefName(
          `${getFileStructName(filePath)}.${fileMember[2]}`,
          [filePath],
        ),
      );
    }
    name = name.replace(/\.(java|aidl)(?=[.#])/, '');
  }
  if (!name) return [];

  const fileName = fixFilePath(name);
  if (sourceFileReg.test(fileName)) {
    return searchFilePathsByName(fileName, aidlJavaFiles).map((filePath) =>
      createSearchFromData(filePath, [], 'file'),
    );
  }

  const constructorClassName = getConstructorShorthandClassName(
    name,
    aidlJavaFiles,
  );
  if (constructorClassName) {
    return resolveFileTargets(constructorClassName, aidlJavaFiles).map(
      (target) =>
        createSearchFromData(
          target.filePath,
          [...target.targetPaths, target.targetPaths.at(-1)!],
          'member',
        ),
    );
  }

  let className = name;
  let propName = '';
  if (name.includes('#')) {
    const parts = name.split('#', 2);
    className = parts[0];
    propName = getPropName(parts[1] || '');
  } else if (name.includes('.')) {
    const i = name.lastIndexOf('.');
    const mayPropName = getPropName(name.substring(i + 1));
    if (isLikelyMemberName(mayPropName)) {
      className = name.substring(0, i);
      propName = mayPropName;
    }
  }

  return resolveFileTargets(className, aidlJavaFiles).map((target) =>
    createSearchFromData(
      target.filePath,
      propName ? [...target.targetPaths, propName] : target.targetPaths,
      propName ? 'member' : 'class',
    ),
  );
};
