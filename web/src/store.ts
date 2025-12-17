import {
  check404File,
  getOrSetStructCache,
  persistentFetch,
} from '@/utils/cache';
import type { ClassStruct } from '@ikun/syntax';
import pLimit from 'p-limit';
import { computed, shallowReactive, shallowRef } from 'vue';
import { emptyArray } from './utils/constant';
import { fixFilePath, mirrorContentBaseUrl } from './utils/url';

const syntaxMod = () => import('@ikun/syntax');
setTimeout(syntaxMod, 3000);

export const fileStructsMap = shallowReactive<Record<string, ClassStruct[]>>(
  {},
);

export const notFoundFileMap = shallowReactive<Record<string, boolean>>({});

const limit = pLimit(5);
export const pullStructsByUrl = async (
  filePath: string,
  signal: AbortController,
): Promise<ClassStruct[]> => {
  const temp = fileStructsMap[filePath];
  if (temp) return temp;
  const url = mirrorContentBaseUrl + filePath;
  const list = await getOrSetStructCache(filePath, async () => {
    const text = await limit(() => {
      if (signal.signal.aborted) {
        throw new Error('aborted');
      }
      return persistentFetch(url);
    });
    let list: ClassStruct[] = [];
    if (text.startsWith('404:')) {
    } else if (url.endsWith('.aidl')) {
      list = (await syntaxMod()).getAIDLStructList(text);
    } else if (url.endsWith('.java')) {
      list = (await syntaxMod()).getJavaStructList(text);
    } else {
      // unsupported file type
    }
    return list;
  }).catch(() => {});
  if (!list) return emptyArray;
  if (list.length === 0) {
    const is404 = await check404File(url);
    if (is404) {
      notFoundFileMap[filePath] = is404;
    }
  }
  fileStructsMap[filePath] = list;
  return list;
};

const storageEstimate = shallowRef<StorageEstimate>();
export const updateStorageEstimate = async () => {
  if (navigator.storage?.estimate) {
    storageEstimate.value = await navigator.storage.estimate();
  }
};
setTimeout(updateStorageEstimate);
export const estimateDesc = computed(() => {
  if (!storageEstimate.value) return '';
  const usage = storageEstimate.value.usage;
  if (!usage) return '';
  return `${(usage / 1024 / 1024).toFixed(2)} MB`;
});

export const exampleList: ExampleItem[] = [
  {
    title: 'IActivityTaskManager#getTasks',
    url: 'https://cs.android.com/android/platform/superproject/+/main:frameworks/base/core/java/android/app/IActivityTaskManager.aidl',
    targetName: 'IActivityTaskManager',
    propName: 'getTasks',
    refName: 'IActivityTaskManager#getTasks',
  },
  {
    title: 'ITaskStackListener#onTaskMovedToFront',
    url: 'https://github.com/aosp-mirror/platform_frameworks_base/blob/android12-dev/core/java/android/app/ITaskStackListener.aidl',
    targetName: 'ITaskStackListener',
    propName: 'onTaskMovedToFront',
    refName: 'ITaskStackListener#onTaskMovedToFront',
  },
  {
    title: 'IUserManager#getUsers',
    url: 'https://android.googlesource.com/platform/frameworks/base/+/1cdfff555f4a21f71ccc978290e2e212e2f8b168/core/java/android/os/IUserManager.aidl',
    targetName: 'IUserManager',
    propName: 'getUsers',
    refName: 'IUserManager#getUsers',
  },
];

export const aidlJavaFiles = shallowRef<string[]>([]);
setTimeout(async () => {
  const text = await persistentFetch(
    'https://raw.githubusercontent.com/android-cs/16/refs/heads/main/aidl_java_files.txt',
  );
  aidlJavaFiles.value = text.split('\n');
});

// IActivityManager
// IActivityManager.java
// IActivityManager.
// android.app.IActivityManager

const aidlFileNameRegs = [/^I[A-Z].*/g, /\.I[A-Z].*/g];

export const searchFilePathByName = (name: string): string | undefined => {
  name = fixFilePath(name.trim());
  if (!name) return;
  if (name.endsWith('.java') || name.endsWith('.aidl')) {
    const a = `/${name}`;
    return aidlJavaFiles.value.find((v) => v.endsWith(a));
  }
  const perfAidl = aidlFileNameRegs.some((reg) => name.match(reg));
  name = name.replaceAll('.', '/');
  let a = '';
  if (perfAidl) {
    a = `/${name}.aidl`;
  } else {
    a = `/${name}.java`;
  }
  const ra = aidlJavaFiles.value.find((v) => v.endsWith(a));
  if (ra) return ra;
  if (!perfAidl) {
    a = `/${name}.aidl`;
  } else {
    a = `/${name}.java`;
  }
  return aidlJavaFiles.value.find((v) => v.endsWith(a));
};

export const searchFilePathByRefName = (
  name: string,
): SearchFromData | undefined => {
  name = name.trim();
  if (!name) return;
  for (const [mayClass, mayProp] of getMayClassAndPropNames(name)) {
    const filePath = searchFilePathByName(mayClass);
    if (!filePath) continue;
    return {
      targetUrl:
        `https://cs.android.com/android/platform/superproject/+/android-latest-release:frameworks/base/` +
        filePath,
      targetName: mayClass,
      targetProp: mayProp,
    };
  }
};

// com.android.internal.app.IAppOpsService
// com.android.internal.app.IAppOpsService#setMode
// android.content.pm.IPackageManager#getInstalledPackages(int, int)
// AppOpsManagerHidden.OP_POST_NOTIFICATION
const propReg = /^[_0-9a-zA-Z]+/g;
const getMayClassAndPropNames = (name: string): [string, string][] => {
  const res: [string, string][] = [];
  propReg.lastIndex = 0;
  let tempName = '';
  let tempProp = '';
  const append = () => {
    if (!tempName) return;
    getMayClassNames(tempName).forEach((className) => {
      if (!res.some(([c, p]) => c === className && p === tempProp)) {
        res.push([className, tempProp]);
      }
    });
  };
  if (name.includes('#')) {
    [tempName, tempProp] = name.split('#', 2);
    tempProp = tempProp.match(propReg)?.[0] || '';
    append();
  } else if (name.includes('.')) {
    const i = name.lastIndexOf('.');
    tempName = name.substring(0, i);
    tempProp = name.substring(i + 1);
    append();
    tempName = name;
    tempProp = '';
    append();
  } else {
    tempName = name;
    tempProp = '';
    append();
  }
  return res;
};

// android.content.pm.IPackageManager.A -> [android.content.pm.IPackageManager.A, android.content.pm.IPackageManager]
// android.content.pm.PackageInfoHidden -> [android.content.pm.PackageInfoHidden, android.content.pm.PackageInfo]
const getMayClassNames = (name: string): string[] => {
  const r = new Set<string>([name]);
  if (name.endsWith('Hidden')) {
    r.add(name.substring(0, name.length - 'Hidden'.length));
  }
  const parts = name.split('.');
  for (let i = parts.length - 1; i > 0; i--) {
    const lastPart = parts[i];
    if (lastPart[0] >= 'A' && lastPart[0] <= 'Z') {
      r.add(parts.slice(0, i + 1).join('.'));
    }
  }
  return Array.from(r).sort((a, b) => b.length - a.length);
};
