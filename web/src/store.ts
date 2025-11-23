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
import { mirrorContentBaseUrl } from './utils/url';

export const tagItems = shallowRef<TagItem[]>();

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
  return `Storage Used: ${(usage / 1024 / 1024).toFixed(2)} MB`;
});
