import { computed, shallowReactive, shallowRef } from 'vue';
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
import { fixFilePath, mirrorContentBaseUrl } from './utils/url';
import { emptyArray } from './utils/constant';

export const tagItems = shallowRef<TagItem[]>();
export const flatedTags = computed<string[]>(() => {
  if (!tagItems.value?.length) return emptyArray;
  return tagItems.value.flatMap((v) => v.tags);
});

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

const androidAliasMap: Record<string, string> = {
  '8': 'O',
  '8.1': 'O_MR1',
  '9': 'P',
  '10': 'Q',
  '11': 'R',
  '12': 'S',
  '12.1': 'S_V2',
  '13': 'TIRAMISU',
  '14': 'UPSIDE_DOWN_CAKE',
  '15': 'VANILLA_ICE_CREAM',
  '16': 'BAKLAVA',
};

export const getAndroidTags = async (): Promise<TagItem[]> => {
  interface RefItem {
    ref: string;
  }
  const list: RefItem[] = await expiredFetch(
    'https://api.github.com/repos/aosp-mirror/platform_frameworks_base/git/refs/tags',
  ).then((v) => JSON.parse(v));
  const tagReg = /^android-\d+\.\d+\.\d+_r\d+$/;
  const map: Record<string, string[]> = {};
  list
    .map((v) => v.ref.replace('refs/tags/', ''))
    .filter((v) => tagReg.test(v))
    .forEach((v) => {
      const vserion = v
        .split('.')
        .slice(0, 2)
        .join('.')
        .replace('android-', '')
        .replace('.0', '');
      let list = map[vserion];
      if (!list) {
        list = [];
        map[vserion] = list;
      }
      list.push(v);
    });
  return Object.entries(map)
    .map<TagItem>(([version, tags]) => {
      tags.sort((a, b) => {
        const ra = Number(a.split('_r')[1]);
        const rb = Number(b.split('_r')[1]);
        return ra - rb;
      });
      return {
        version,
        tags,
        alias: androidAliasMap[version],
      };
    })
    .filter((v) => Number(v.version) >= 8.0)
    .sort((a, b) => Number(a.version) - Number(b.version));
};

setTimeout(async () => {
  tagItems.value = await getAndroidTags();
});

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
  const a = `/${name}.aidl`;
  const ra = aidlJavaFiles.value.find((v) => v.endsWith(a));
  if (ra) return ra;
  const b = `/${name}.java`;
  return aidlJavaFiles.value.find((v) => v.endsWith(b));
};
