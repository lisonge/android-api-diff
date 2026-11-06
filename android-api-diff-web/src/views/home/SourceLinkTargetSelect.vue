<script setup lang="ts">
import MOption from '@/components/MOption.vue';
import MSelect from '@/components/MSelect.vue';
import { useSharedHomeState } from './homeState.ts';

const { sourceLinkTarget, sourceLinkTargetOptions } = useSharedHomeState();
</script>

<template>
  <MSelect
    v-model="sourceLinkTarget"
    label="Link"
    trigger-min-width="136px"
    popover-min-width="136px"
  >
    <MOption
      v-for="target in sourceLinkTargetOptions"
      :key="target"
      :value="target"
    />
  </MSelect>
</template>
