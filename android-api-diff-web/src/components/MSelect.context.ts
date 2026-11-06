import type { InjectionKey, Ref } from 'vue';

export type MSelectValue = string | number;

export interface MSelectContext {
  modelValue: Ref<MSelectValue>;
  isSelected: (value: MSelectValue) => boolean;
  selectValue: (value: MSelectValue) => void;
}

export const M_SELECT_CONTEXT_KEY: InjectionKey<MSelectContext> =
  Symbol('MSelectContext');
