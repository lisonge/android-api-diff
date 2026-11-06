<script setup lang="ts">
import MOption from '@/components/MOption.vue';
import MSelect from '@/components/MSelect.vue';
import { useSharedHomeState } from './homeState.ts';

const { diffConcurrentCount, diffConcurrentCountOptions } =
  useSharedHomeState();
</script>

<template>
  <MSelect
    v-model="diffConcurrentCount"
    label="Concurrency"
    trigger-min-width="52px"
    popover-min-width="52px"
  >
    <MOption
      v-for="count in diffConcurrentCountOptions"
      :key="count"
      :value="count"
    />
  </MSelect>
</template>
