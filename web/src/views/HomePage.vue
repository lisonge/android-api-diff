<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import {
  estimateDesc,
  fileStructsMap,
  pullStructsByUrl,
  tagItems,
} from '@/store';
import { colors, useReactiveLocalStorage, useTask } from '@/utils';
import { emptyArray } from '@/utils/constant';
import { getVersionUrlBuilder } from '@/utils/url';
import { type ClassStruct } from '@ikun/syntax';
import { refDebounced, set, useLocalStorage } from '@vueuse/core';
import pLimit from 'p-limit';
import {
  computed,
  onMounted,
  onScopeDispose,
  onUnmounted,
  shallowRef,
  watch,
} from 'vue';

let alive = true;
onScopeDispose(() => (alive = false));
const inputUrl = useLocalStorage('url', '');
const lazyInputUrl = refDebounced(inputUrl);
const searchForm = useReactiveLocalStorage('diff', () => ({
  targetName: '',
  propName: '',
}));

const urlBuilder = computed(() => getVersionUrlBuilder(lazyInputUrl.value));
const isCanParsedUrl = computed(() => {
  const builder = urlBuilder.value;
  if (!builder) return false;
  return (
    builder.filePath.endsWith('.java') || builder.filePath.endsWith('.aidl')
  );
});
const getReplaceUrl = (tag: string): string => {
  return urlBuilder.value?.replaceUrl(tag) || '';
};
const title = document.title;
interface DiffResultItem {
  tag: string;
  interfaces: ClassStruct[];
  typeDesc: string;
  typeColor: string;
}

watch(lazyInputUrl, () => {
  const v = lazyInputUrl.value;
  if (v.match(/\w\.(java)|(aidl)\b/)) {
    searchForm.targetName = lazyInputUrl.value
      .split('/')
      .at(-1)!
      .replace(/\..+$/g, '');
  }
});

const flatedTags = computed<string[]>(() => {
  if (!tagItems.value?.length) return emptyArray;
  return tagItems.value.flatMap((v) => v.tags);
});
let stopFlag = 0;
interface DiffTypeItem {
  typeDesc: string;
  typeColor: string;
  tagRanges: string[][];
}

const limit = pLimit(5);
const findStructByName = (
  list: ClassStruct[] | undefined,
  name: string,
): ClassStruct | undefined => {
  if (!list?.length) return;
  const v = list.find((v) => v.name === name);
  if (v) return v;
  for (const struct of list) {
    const v2 = findStructByName(struct.children, name);
    if (v2) return v2;
  }
};

const lazySearchForm = (() => {
  const t = computed(
    () => [searchForm.targetName.trim(), searchForm.propName.trim()] as const,
  );
  watch(
    () => t.value.join('|'),
    () => colorCache.clear(),
  );
  return refDebounced(t);
})();
const colorCache = new Map<string, string>();
const getCachedTypeColor = (key: string) => {
  if (!key) return '#000';
  const v = colorCache.get(key);
  if (v) return v;
  let i = colorCache.size;
  const color = colors[i % colors.length];
  colorCache.set(key, color);
  return color;
};

const diffResultList = computed<DiffResultItem[]>(() => {
  const builder = urlBuilder.value;
  if (!builder?.filePath) return emptyArray;
  const [targetName, propName] = lazySearchForm.value;
  if (!targetName || !propName || !isCanParsedUrl.value) return emptyArray;
  return flatedTags.value
    .map((tag) => {
      const structs = fileStructsMap[tag + builder.filePath];
      if (!structs) return;
      let typeDesc = '';
      const target = findStructByName(structs, targetName);
      if (target) {
        const members = target.members.filter((v) => v.name === propName);
        if (members.length > 0) {
          typeDesc = members
            .sort((a, b) => (a.parameterCount ?? 0) - (b.parameterCount ?? 0))
            .map((v) => v.type)
            .join('\n');
        }
      }
      return {
        tag,
        interfaces: structs,
        typeDesc,
        typeColor: getCachedTypeColor(typeDesc),
      };
    })
    .filter((v): v is DiffResultItem => !!v);
});
const getDiffResult = (tag: string): DiffResultItem | undefined => {
  return diffResultList.value.find((v) => v.tag === tag);
};

const diffTypeReult = computed<DiffTypeItem[]>(() => {
  const list: DiffTypeItem[] = [];
  flatedTags.value.forEach((tag, index) => {
    const res = getDiffResult(tag);
    if (!res) return;
    let typeItem = list.find((v) => v.typeDesc === res.typeDesc);
    if (!typeItem) {
      typeItem = {
        typeDesc: res.typeDesc,
        typeColor: res.typeColor,
        tagRanges: [],
      };
      list.push(typeItem);
    }
    if (typeItem.tagRanges.length === 0) {
      typeItem.tagRanges.push([tag]);
      return;
    }
    const lastTag = flatedTags.value[index - 1];
    const lastRange = typeItem.tagRanges.at(-1)!;
    if (lastRange.at(-1) === lastTag) {
      lastRange.push(tag);
    } else {
      typeItem.tagRanges.push([tag]);
    }
  });
  return list;
});

const handleDiff = useTask(async () => {
  if (!tagItems.value?.length) return;
  if (!urlBuilder.value) return;
  if (!searchForm.targetName || !searchForm.propName) return;
  if (!isCanParsedUrl.value) return;
  const builder = urlBuilder.value;
  const tempStopFlag = (stopFlag = Date.now());
  const handleTag = async (tag: string) => {
    if (!alive) return;
    if (stopFlag !== tempStopFlag) return;
    const filePath = tag + builder.filePath;
    await limit(() => {
      if (stopFlag !== tempStopFlag) return;
      return pullStructsByUrl(filePath);
    });
    if (stopFlag !== tempStopFlag) return;
  };
  for (const item of tagItems.value) {
    await Promise.all(item.tags.map((v) => handleTag(v)));
  }
});
const stopDiff = () => {
  stopFlag++;
};
onUnmounted(stopDiff);
interface ExampleItem {
  title: string;
  url: string;
  targetName: string;
  propName: string;
}
const exampleList: ExampleItem[] = [
  {
    title: 'IActivityTaskManager#getTasks',
    url: 'https://cs.android.com/android/platform/superproject/main/+/main:frameworks/base/core/java/android/app/IActivityTaskManager.aidl',
    targetName: 'IActivityTaskManager',
    propName: 'getTasks',
  },
  {
    title: 'ITaskStackListener#onTaskMovedToFront',
    url: 'https://github.com/aosp-mirror/platform_frameworks_base/blob/android12-dev/core/java/android/app/ITaskStackListener.aidl',
    targetName: 'ITaskStackListener',
    propName: 'onTaskMovedToFront',
  },
  {
    title: 'IUserManager#getUsers',
    url: 'https://android.googlesource.com/platform/frameworks/base/+/1cdfff555f4a21f71ccc978290e2e212e2f8b168/core/java/android/os/IUserManager.aidl',
    targetName: 'IUserManager',
    propName: 'getUsers',
  },
];
const handleExample = (item: ExampleItem) => {
  if (handleDiff.loading) return;
  inputUrl.value = item.url;
  searchForm.targetName = item.targetName;
  searchForm.propName = item.propName;
  setTimeout(handleDiff.invoke, 500);
};
</script>
<template>
  <div v-if="tagItems" p-12px text-14px flex flex-col gap-8px>
    <div flex items-center gap-24px>
      <div text-20px font-400>{{ title }}</div>
      <div flex-1 flex items-center gap-8px>
        <div font-500>Example</div>
        <div flex gap-8px>
          <div
            v-for="example in exampleList"
            :key="example.title"
            @click="handleExample(example)"
            text-12px
            bg-gray-100
            rounded-4px
            px-4px
            cursor-pointer
            transition-colors
            hover="bg-gray-200"
          >
            {{ example.title }}
          </div>
        </div>
      </div>
      <div v-if="estimateDesc" text-14px>{{ estimateDesc }}</div>
      <a
        href="https://github.com/lisonge/android-api-diff"
        target="_blank"
        text-black
        transition-color
        hover="color-[rgb(from_currentColor_r_g_b_/_50%)]"
      >
        <SvgIcon name="github" size-20px />
      </a>
    </div>
    <div flex gap-24px>
      <input
        flex="[4]"
        type="text"
        v-model="inputUrl"
        placeholder="file url"
        outline-none
        transition-colors
        b-1px
        b-solid
        b-gray-200
        hover="b-gray-400"
        rounded-4px
        px-8px
        py-4px
        text-dark-100
        :disabled="handleDiff.loading"
      />
      <div
        flex="~ [3]"
        gap-12px
        items-center
        :class="{
          'op-50': !isCanParsedUrl,
        }"
      >
        <input
          flex="[1]"
          max-w-320px
          type="text"
          v-model="searchForm.targetName"
          placeholder="interface or class name"
          outline-none
          transition-colors
          b-1px
          b-solid
          b-gray-200
          hover="b-gray-400"
          rounded-4px
          px-8px
          py-4px
          text-dark-100
        />
        <input
          flex="[1]"
          type="text"
          v-model="searchForm.propName"
          placeholder="method or prop name of interface or class"
          outline-none
          transition-colors
          b-1px
          b-solid
          b-gray-200
          hover="b-gray-400"
          rounded-4px
          px-8px
          py-4px
          text-dark-100
        />
        <div
          @click="handleDiff.loading ? stopDiff() : handleDiff.invoke()"
          px-12px
          bg-blue-100
          rounded-xs
          flex
          items-center
          gap-4px
          cursor-pointer
          :class="{
            'cursor-not-allowed!': !isCanParsedUrl,
          }"
        >
          <SvgIcon name="loading" size-16px v-if="handleDiff.loading" />
          <div>{{ handleDiff.loading ? `stop` : `diff` }}</div>
        </div>
      </div>
    </div>
    <div v-if="diffTypeReult.length" flex flex-wrap gap-row-4px gap-col-24px>
      <div
        v-for="item in diffTypeReult"
        :key="item.typeDesc"
        flex
        gap-8px
        items-center
      >
        <div size-16px :style="{ background: item.typeColor }"></div>
        <div text-16px font-500 bg-red-100 px-4px rounded-4px whitespace-pre>
          {{ item.typeDesc || 'none' }}
        </div>
        <div flex gap-8px flex-wrap>
          <div
            v-for="range in item.tagRanges"
            :key="range[0]"
            px-4px
            bg-gray-100
            rounded-4px
          >
            {{
              range.length > 1 ? [range[0], range.at(-1)].join(' - ') : range[0]
            }}
          </div>
        </div>
      </div>
    </div>
    <div flex gap-8px overflow-scroll hidden-scrollbar>
      <div
        v-for="item in tagItems"
        :key="item.version"
        flex-1
        flex
        flex-col
        items-center
        px-4px
      >
        <div h-2px bg-red-200 w-full></div>
        <div text-14px text-center :title="item.alias">
          {{ item.version }}
        </div>
        <div flex flex-col gap-4px>
          <div v-for="tag in item.tags" :key="tag" flex gap-4px items-center>
            <div
              size-12px
              transition-colors
              :title="getDiffResult(tag)?.typeDesc"
              :style="{
                background: getDiffResult(tag)?.typeColor,
              }"
            ></div>
            <a
              v-if="urlBuilder"
              :href="getReplaceUrl(tag)"
              target="_blank"
              hover="color-[rgb(from_currentColor_r_g_b_/_50%)]"
              whitespace-nowrap
            >
              {{ tag }}
            </a>
            <a v-else whitespace-nowrap>{{ tag }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else py-16px pt-80px pb-16px text-center text-14px>
    初始化列表中...
  </div>
</template>
