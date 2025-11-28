<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { shallowRef } from 'vue';
import { useSharedHomeState } from './homeState';

const { diffTypeReult } = useSharedHomeState();

const wrapRef = shallowRef<HTMLElement>();
const viewRef = shallowRef<HTMLElement>();
const { height } = useElementSize(viewRef);
</script>
<template>
  <div
    ref="wrapRef"
    overflow-hidden
    transition-height
    class="[--un-duration:500ms]"
    :style="{ height: height && `calc(${height}px + var(--gap))` }"
  >
    <div
      v-if="diffTypeReult.length"
      ref="viewRef"
      flex
      flex-wrap
      gap-row-4px
      gap-col-24px
    >
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
  </div>
</template>
