<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { getAndroidTags } from './utils';
import { useLocalStorage } from '@vueuse/core';

const inputUrl = useLocalStorage('url', '');
const tagItems = shallowRef<TagItem[]>();
getAndroidTags().then((items) => {
  tagItems.value = items;
});
const versionReg = /\b(android-\d+\.\d+\.\d+_r\d+)|(android-latest-release)\b/;
const verionMatched = computed<boolean>(() => {
  return versionReg.test(inputUrl.value);
});
const getReplaceUrl = (tag: string) => {
  return inputUrl.value.replace(versionReg, tag);
};
</script>
<template>
  <div v-if="tagItems" p-16px text-14px flex flex-col gap-8px>
    <div text-20px font-400>Android Api Diff</div>
    <input
      type="text"
      v-model="inputUrl"
      placeholder="please input to android code file url"
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
      sticky
      top-0
      bg-white
    />
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
        <div text-16px>{{ item.version }}</div>
        <div>
          <div v-for="t in item.tags" :key="t" whitespace-nowrap>
            <template v-if="verionMatched">
              <a
                :href="getReplaceUrl(t)"
                target="_blank"
                hover="color-[rgb(from_currentColor_r_g_b_/_50%)]"
              >
                {{ t }}
              </a>
            </template>
            <template v-else>{{ t }}</template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else py-16px pt-80px pb-16px text-center text-14px>加载中...</div>
</template>
