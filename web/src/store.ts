import {
  expiredFetch,
  getOrSetStructCache,
  persistentFetch,
} from '@/utils/cache';
import type { ClassStruct } from '@ikun/syntax';
import { computed, shallowReactive, shallowRef } from 'vue';
import { fixFilePath, mirrorContentBaseUrl } from './utils/url';
import pLimit from 'p-limit';
import { getBeforeString } from './utils';
import { emptyArray } from './utils/constant';

const syntaxMod = () => import('@ikun/syntax');
setTimeout(syntaxMod, 3000);

export const fileStructsMap = shallowReactive<Record<string, ClassStruct[]>>(
  {},
);

const limit = pLimit(5);
export const pullStructsByUrl = async (
  filePath: string,
  signal: AbortController,
): Promise<ClassStruct[]> => {
  const temp = fileStructsMap[filePath];
  if (temp) return temp;
  const list = await getOrSetStructCache(filePath, async () => {
    if (signal.signal.aborted) {
      throw new Error('aborted');
    }
    const url = mirrorContentBaseUrl + filePath;
    const text = await limit(() => persistentFetch(url));
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
  }).catch(() => undefined);
  if (!list) return emptyArray;
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
    refName: 'android.app.IActivityTaskManager#getTasks',
  },
  {
    title: 'ITaskStackListener#onTaskMovedToFront',
    url: 'https://github.com/aosp-mirror/platform_frameworks_base/blob/android12-dev/core/java/android/app/ITaskStackListener.aidl',
    targetName: 'ITaskStackListener',
    propName: 'onTaskMovedToFront',
    refName: 'android.app.ITaskStackListener#onTaskMovedToFront',
  },
  {
    title: 'IUserManager#getUsers',
    url: 'https://android.googlesource.com/platform/frameworks/base/+/1cdfff555f4a21f71ccc978290e2e212e2f8b168/core/java/android/os/IUserManager.aidl',
    targetName: 'IUserManager',
    propName: 'getUsers',
    refName: 'android.os.IUserManager#getUsers',
  },
];

export const aidlJavaFiles = shallowRef<string[]>([]);
setTimeout(async () => {
  const text = await expiredFetch(
    'https://raw.githubusercontent.com/android-cs/16/refs/heads/main/aidl_java_files.txt',
  );
  aidlJavaFiles.value = text.split('\n');
});

// IActivityManager
// IActivityManager.java
// IActivityManager.
// android.app.IActivityManager

export const searchFilePathByName = (name: string): string | undefined => {
  name = fixFilePath(name.trim());
  if (!name) return;
  if (name.endsWith('.java') || name.endsWith('.aidl')) {
    const a = `/${name}`;
    return aidlJavaFiles.value.find((v) => v.endsWith(a));
  }
  const perfAidl = name.startsWith('I') || name.includes('.I');
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
// com.android.internal.app.IAppOpsService
// com.android.internal.app.IAppOpsService#setMode
// android.content.pm.IPackageManager#getInstalledPackages(int, int)
export const searchFilePathByRefName = (
  name: string,
): SearchFromData | undefined => {
  name = name.trim();
  if (!name) return;
  const [clazzName, tempProp = ''] = name.split('#', 2);
  let filePath: string | undefined;
  let targetName = '';
  for (const mayName of getMayClassNames(clazzName)) {
    filePath = searchFilePathByName(mayName);
    targetName = mayName.split('.').at(-1)!;
    if (filePath) break;
  }
  if (!filePath) return;
  const targetProp = getBeforeString(tempProp, '(');
  return {
    targetUrl:
      `https://cs.android.com/android/platform/superproject/+/android-latest-release:frameworks/base/` +
      filePath,
    targetName,
    targetProp,
  };
};
// android.content.pm.IPackageManager.A -> [android.content.pm.IPackageManager.A, android.content.pm.IPackageManager]
const getMayClassNames = (name: string): string[] => {
  const r = new Set<string>([name]);
  const parts = name.split('.');
  for (let i = parts.length - 1; i > 0; i--) {
    const lastPart = parts[i];
    if (lastPart[0] >= 'A' && lastPart[0] <= 'Z') {
      r.add(parts.slice(0, i + 1).join('.'));
    }
  }
  return Array.from(r).sort((a, b) => b.length - a.length);
};
