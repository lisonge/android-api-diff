<script setup lang="ts">
import MButton from './MButton.vue';
import MPopover from '@/components/MPopover.vue';

type PopconfirmPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left';

withDefaults(
  defineProps<{
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    placement?: PopconfirmPlacement;
  }>(),
  {
    title: 'Are you sure?',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    placement: 'bottom-end',
  },
);

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const handleConfirm = (close: () => void) => {
  emit('confirm');
  close();
};

const handleCancel = (close: () => void) => {
  emit('cancel');
  close();
};
</script>

<template>
  <MPopover :placement="placement" :offset="8" class="min-w-[220px]">
    <template #trigger="{ open, close, toggle, linkPopover }">
      <slot
        name="trigger"
        :open="open"
        :close="close"
        :toggle="toggle"
        :link-popover="linkPopover"
      />
    </template>
    <template #default="{ close }">
      <div class="p-[10px]" @click.stop>
        <div
          class="text-gray-900 text-[14px] font-semibold leading-[20px] whitespace-nowrap"
        >
          {{ title }}
        </div>
        <div
          class="max-w-[260px] mt-[4px] text-gray-600 text-[12px] leading-[18px]"
          v-if="message"
        >
          {{ message }}
        </div>
        <div class="flex justify-end gap-[8px] mt-[12px]">
          <MButton size="sm" variant="default" @click="handleCancel(close)">{{
            cancelText
          }}</MButton>
          <MButton size="sm" variant="danger" @click="handleConfirm(close)">{{
            confirmText
          }}</MButton>
        </div>
      </div>
    </template>
  </MPopover>
</template>
