<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import TagCard from '@/components/TagCard.vue';
import {
  aidlJavaFiles,
  estimateDesc,
  exampleList,
  fileStructsMap,
  notFoundFileMap,
  pullStructsByUrl,
  searchFilePathByRefName,
} from '@/store';
import { colors, findStructByName, useEqualComputed, useTask } from '@/utils';
import androidVersionList from '@/utils/android.data';
import { emptyArray } from '@/utils/constant';
import { getVersionUrlBuilder } from '@/utils/url';
import { useLocalStorage, useTitle, watchDebounced } from '@vueuse/core';
import { useRouteQuery } from '@vueuse/router';
import { computed, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const title = useTitle();
const androidOrderTags = androidVersionList.flatMap((v) => v.tags);

const mode = useLocalStorage<'file' | 'ref'>('mode', 'ref');
const isRefMode = computed({
  get: () => mode.value === 'ref',
  set: (v: boolean) => {
    mode.value = v ? 'ref' : 'file';
  },
});
const searchUrl = useRouteQuery<string>('url', '');
const searchName = useRouteQuery<string>('name', '');
const searchProp = useRouteQuery<string>('prop', '');
watch(searchUrl, () => {
  if (!searchUrl.value) {
    searchName.value = '';
  }
});
watch(searchName, () => {
  if (!searchName.value) {
    searchProp.value = '';
  }
});
watchDebounced(searchUrl, (v) => {
  if (v.match(/\w\.(java)|(aidl)\b/)) {
    searchName.value = v.split('/').at(-1)!.replace(/\..+$/g, '');
  }
});
const searchRef = useRouteQuery<string>('ref', '');
if (searchRef.value) {
  isRefMode.value = true;
} else if (searchUrl.value) {
  isRefMode.value = false;
}
const router = useRouter();
const switchRefMode = () => {
  isRefMode.value = !isRefMode.value;
  router.replace({ query: {} });
};

const actualMainInput = computed({
  get() {
    return isRefMode.value ? searchRef.value : searchUrl.value;
  },
  set(v: string) {
    if (isRefMode.value) {
      searchRef.value = v;
    } else {
      searchUrl.value = v;
    }
  },
});

const emptySearchFromData: SearchFromData = {
  targetUrl: '',
  targetName: '',
  targetProp: '',
};

const searchFromData = useEqualComputed<SearchFromData>(() => {
  if (isRefMode.value) {
    return searchFilePathByRefName(searchRef.value) ?? emptySearchFromData;
  } else {
    return {
      targetUrl: searchUrl.value,
      targetName: searchName.value,
      targetProp: searchProp.value,
    };
  }
});

const urlBuilder = useEqualComputed(() =>
  getVersionUrlBuilder(searchFromData.value.targetUrl),
);

const isCanParsedUrl = computed(() => {
  const builder = urlBuilder.value;
  if (!builder) return false;
  const f = builder.filePath.substring('/'.length);
  return (
    (f.endsWith('.java') || f.endsWith('.aidl')) &&
    aidlJavaFiles.value.includes(f)
  );
});

const getTemplateUrlUrl = (tag: string): string => {
  const t = urlBuilder.value?.templateUrl;
  if (!t) return '';
  return t[0] + tag + t[1];
};

const colorCache = new Map<string, string>();
watch(searchFromData, () => colorCache.clear());
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
  const targetName = searchFromData.value.targetName;
  const propName = searchFromData.value.targetProp;
  if (!targetName || !propName || !isCanParsedUrl.value) return emptyArray;
  return androidOrderTags
    .map((tag) => {
      const filePath = tag + builder.filePath;
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
      const r: DiffResultItem = {
        tag,
        interfaces: structs,
        typeDesc,
        typeColor: getCachedTypeColor(typeDesc),
        notFound: notFoundFileMap[filePath],
      };
      return r;
    })
    .filter((v): v is DiffResultItem => !!v);
});
const getDiffResult = (tag: string): DiffResultItem | undefined => {
  return diffResultList.value.find((v) => v.tag === tag);
};

const diffTypeReult = computed<DiffTypeItem[]>(() => {
  const list: DiffTypeItem[] = [];
  androidOrderTags.forEach((tag, index) => {
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
    const lastTag = androidOrderTags[index - 1];
    const lastRange = typeItem.tagRanges.at(-1)!;
    if (lastRange.at(-1) === lastTag) {
      lastRange.push(tag);
    } else {
      typeItem.tagRanges.push([tag]);
    }
  });
  return list;
});

let signal = new AbortController();
const stopDiff = () => {
  signal.abort();
  signal = new AbortController();
};
onUnmounted(stopDiff);

const handleDiff = useTask(async () => {
  const s = signal;
  if (isRefMode.value) {
    while (aidlJavaFiles.value.length === 0) {
      await new Promise((r) => setTimeout(r));
      if (s.signal.aborted) return;
    }
  }
  if (!urlBuilder.value) return;
  const builder = urlBuilder.value;
  for (const item of androidVersionList) {
    if (s.signal.aborted) return;
    await Promise.all(
      item.tags.map((tag) => pullStructsByUrl(tag + builder.filePath, s)),
    );
  }
});
setTimeout(handleDiff.invoke);

const handleExample = (item: ExampleItem) => {
  if (handleDiff.loading) return;
  if (isRefMode.value) {
    searchRef.value = item.refName;
  } else {
    searchUrl.value = item.url;
    searchName.value = item.targetName;
    searchProp.value = item.propName;
  }
  setTimeout(handleDiff.invoke, 300);
};
</script>
<template>
  <div p-12px text-14px flex flex-col gap-8px>
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
      <div v-if="estimateDesc" flex items-center gap-4px>
        <SvgIcon name="database" size-20px />
        <div text-14px>{{ estimateDesc }}</div>
      </div>
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
    <div flex gap-24px items-center>
      <div title="switch search mode">
        <SvgIcon
          name="exchange"
          size-24px
          cursor-pointer
          transition-colors
          rounded-4px
          hover="color-[rgb(from_currentColor_r_g_b_/_50%)] bg-gray-100"
          active="bg-gray-200"
          @click="switchRefMode"
        />
      </div>
      <input
        flex="[4]"
        type="text"
        v-model="actualMainInput"
        :placeholder="
          isRefMode
            ? `Please input Java/AIDL Member Reference`
            : `Please input Java/AIDL file url`
        "
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
        @keyup.enter="handleDiff.invoke()"
      />
      <div
        v-if="!isRefMode"
        flex="~ [3]"
        gap-12px
        items-center
        :class="{
          'op-75': !isCanParsedUrl,
        }"
      >
        <input
          flex="[1]"
          max-w-320px
          type="text"
          v-model="searchName"
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
          @keyup.enter="handleDiff.invoke()"
        />
        <input
          flex="[1]"
          type="text"
          v-model="searchProp"
          placeholder="method or prop name"
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
          @keyup.enter="handleDiff.invoke()"
        />
      </div>
      <div
        @click="handleDiff.loading ? stopDiff() : handleDiff.invoke()"
        px-12px
        rounded-xs
        flex
        items-center
        gap-4px
        text-16px
        cursor-pointer
        bg-blue-100
        hover="bg-blue-200"
        active="bg-blue-300"
        transition-colors
        select-none
        :class="{
          'cursor-not-allowed!': !isCanParsedUrl,
        }"
      >
        <SvgIcon name="loading" size-16px v-if="handleDiff.loading" />
        <div>{{ handleDiff.loading ? `STOP` : `DIFF` }}</div>
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
        <div
          v-if="item.typeDesc"
          font-500
          bg-gray-200
          px-4px
          rounded-4px
          whitespace-pre
        >
          {{ item.typeDesc }}
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
    <div flex gap-16px overflow-scroll hidden-scrollbar>
      <div
        v-for="item in androidVersionList"
        :key="item.version"
        flex-1
        flex
        flex-col
        items-center
      >
        <div h-2px bg-red-200 w-full></div>
        <div text-12px font-600 flex justify-center gap-4px>
          <div>{{ item.version }}</div>
          <div>{{ item.alias }}</div>
        </div>
        <div flex flex-col gap-4px>
          <TagCard
            v-for="tag in item.tags"
            :key="tag"
            :getTemplateUrlUrl="getTemplateUrlUrl"
            :tag="tag"
            :diffResult="getDiffResult(tag)"
            :urlBuilder="urlBuilder"
          />
        </div>
      </div>
    </div>
    <div h-80px></div>
  </div>
</template>
