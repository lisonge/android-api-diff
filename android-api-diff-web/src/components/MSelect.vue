<script setup lang="ts" generic="T extends MSelectValue">
import MPopover from '@/components/MPopover.vue';
import MSvg from '@/components/MSvg.vue';
import { provide, ref, type Ref } from 'vue';
import { M_SELECT_CONTEXT_KEY, type MSelectValue } from './MSelect.context.ts';

type SelectPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left';

const props = withDefaults(
  defineProps<{
    label?: string;
    ariaLabel?: string;
    placement?: SelectPlacement;
    offset?: number;
    triggerMinWidth?: string;
    popoverMinWidth?: string;
    matchPopoverWidth?: boolean;
  }>(),
  {
    label: '',
    placement: 'bottom-start',
    offset: 6,
    triggerMinWidth: 'auto',
    popoverMinWidth: 'auto',
    matchPopoverWidth: false,
  },
);

const model = defineModel<T>({
  required: true,
});

const popoverRef = ref<InstanceType<typeof MPopover>>();
const root = ref<HTMLElement>();
const close = () => {
  void popoverRef.value?.close();
  root.value?.querySelector('button')?.focus();
};

const isSelected = (value: MSelectValue) => Object.is(model.value, value);

const selectValue = (value: MSelectValue) => {
  model.value = value as T;
  close();
};

provide(M_SELECT_CONTEXT_KEY, {
  modelValue: model as Ref<MSelectValue>,
  isSelected,
  selectValue,
});
</script>

<template>
  <div
    class="flex items-center gap-[6px] text-[14px] text-gray-600"
    ref="root"
    @keydown.esc.stop.prevent="close"
  >
    <span class="whitespace-nowrap" v-if="label">{{ label }}</span>
    <MPopover
      ref="popoverRef"
      :placement="placement"
      :offset="offset"
      :match-trigger-width="matchPopoverWidth"
      class="overflow-hidden"
    >
      <template #trigger="{ open, toggle, linkPopover }">
        <button
          class="h-[var(--control-height)] box-border border-[1px] border-solid border-gray-200 rounded-[var(--control-radius)] bg-white px-[8px] flex items-center justify-between gap-[8px] cursor-pointer select-none text-[14px] transition-colors hover:border-gray-400"
          type="button"
          :ref="linkPopover"
          :class="{
            'border-gray-400': open,
          }"
          :style="{ minWidth: props.triggerMinWidth }"
          role="button"
          :aria-label="ariaLabel"
          aria-haspopup="listbox"
          :aria-expanded="open"
          @click.stop="toggle"
        >
          <span class="text-[#1c1c1c] font-medium whitespace-nowrap">
            <slot name="value" :value="model">{{ model }}</slot>
          </span>
          <MSvg
            class="w-[16px] h-[16px] shrink-0 text-gray-500 transition-transform"
            name="expand-more"
            :class="{
              'rotate-180': open,
            }"
          />
        </button>
      </template>
      <template #default>
        <div
          class="max-h-[240px] overflow-y-auto py-[2px]"
          role="listbox"
          :style="{ minWidth: props.popoverMinWidth }"
          @click.stop
        >
          <slot />
        </div>
      </template>
    </MPopover>
  </div>
</template>
