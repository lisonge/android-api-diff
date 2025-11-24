import {
  expiredFetch,
  getOrSetStructCache,
  persistentFetch,
} from '@/utils/cache';
import {
  getAIDLStructList,
  getJavaStructList,
  type ClassStruct,
} from '@ikun/syntax';
import { computed, shallowReactive, shallowRef } from 'vue';
import { fixFilePath, mirrorContentBaseUrl } from './utils/url';

export const fileStructsMap = shallowReactive<Record<string, ClassStruct[]>>(
  {},
);
export const pullStructsByUrl = async (
  filePath: string,
): Promise<ClassStruct[]> => {
  const temp = fileStructsMap[filePath];
  if (temp) return temp;
  const list = await getOrSetStructCache(filePath, async () => {
    const url = mirrorContentBaseUrl + filePath;
    const text = await persistentFetch(url);
    let list: ClassStruct[] = [];
    if (text.startsWith('404:')) {
    } else if (url.endsWith('.aidl')) {
      list = getAIDLStructList(text);
    } else if (url.endsWith('.java')) {
      list = getJavaStructList(text);
    } else {
      // unsupported file type
    }
    return list;
  });
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
    refName: 'android.app.IActivityTaskManager#getTasks(int)',
  },
  {
    title: 'ITaskStackListener#onTaskMovedToFront',
    url: 'https://github.com/aosp-mirror/platform_frameworks_base/blob/android12-dev/core/java/android/app/ITaskStackListener.aidl',
    targetName: 'ITaskStackListener',
    propName: 'onTaskMovedToFront',
    refName: 'android.app.ITaskStackListener#onTaskMovedToFront(int)',
  },
  {
    title: 'IUserManager#getUsers',
    url: 'https://android.googlesource.com/platform/frameworks/base/+/1cdfff555f4a21f71ccc978290e2e212e2f8b168/core/java/android/os/IUserManager.aidl',
    targetName: 'IUserManager',
    propName: 'getUsers',
    refName: 'android.os.IUserManager#getUsers(boolean)',
  },
];

export const aidlJavaFiles = shallowRef<string[]>([]);
setTimeout(async () => {
  const text = await expiredFetch(
    'https://raw.githubusercontent.com/android-cs/16/refs/heads/main/aidl_java_files.txt',
  );
  aidlJavaFiles.value = text.split('\n');
});
export const searchFilePathByName = (name: string): string | undefined => {
  name = fixFilePath(name.trim());
  if (!name) return;
  if (name.includes('.')) {
    const a = `/${name}`;
    return aidlJavaFiles.value.find((v) => v.endsWith(a));
  }
  let a = '';
  if (name.startsWith('I')) {
    a = `/${name}.aidl`;
  } else {
    a = `/${name}.java`;
  }
  const ra = aidlJavaFiles.value.find((v) => v.endsWith(a));
  if (ra) return ra;
  if (!name.startsWith('I')) {
    a = `/${name}.aidl`;
  } else {
    a = `/${name}.java`;
  }
  return aidlJavaFiles.value.find((v) => v.endsWith(a));
};
