<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { estimateDesc, exampleList } from '@/store';
import androidVersionList from '@/utils/android.data';
import TagCard from '@/views/home/TagCard.vue';
import { useTitle } from '@vueuse/core';
import { useSharedHomeState } from './homeState';
import DiffResultList from './DiffResultList.vue';

const title = useTitle();
const {
  actualMainInput,
  handleDiff,
  handleExample,
  isCanParsedUrl,
  isRefMode,
  switchRefMode,
  searchName,
  searchProp,
  stopDiff,
  androidVersionColors,
} = useSharedHomeState();
</script>
<template>
  <div p-12px text-14px flex flex-col class="[--gap:8px]">
    <div mb="--gap" flex items-center gap-24px>
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
    <div mb="--gap" flex gap-24px items-center>
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
    <DiffResultList />
    <div mb="--gap" flex gap-16px overflow-scroll hidden-scrollbar>
      <div
        v-for="item in androidVersionList"
        :key="item.version"
        flex-1
        flex
        flex-col
        items-center
      >
        <div
          h-2px
          w-full
          flex
          :class="{ 'bg-cyan-200': !androidVersionColors[item.version].length }"
        >
          <div
            v-for="bg in androidVersionColors[item.version]"
            :key="bg"
            h-full
            flex-1
            :style="{
              background: bg,
            }"
          ></div>
        </div>
        <div text-12px font-600 flex justify-center gap-4px>
          <div>{{ item.version }}</div>
          <div>{{ item.alias }}</div>
        </div>
        <div flex flex-col gap-4px>
          <TagCard v-for="tag in item.tags" :key="tag" :tag="tag" />
          <TagCard
            v-for="tag in item.futureTags"
            :key="tag"
            :tag="tag"
            future
          />
        </div>
      </div>
    </div>
    <div h-80px></div>
  </div>
</template>
