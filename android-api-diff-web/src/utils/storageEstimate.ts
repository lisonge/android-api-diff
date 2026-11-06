import { computed, shallowRef } from 'vue';

const storageEstimate = shallowRef<StorageEstimate>();

export const updateStorageEstimate = async (): Promise<void> => {
  if (navigator.storage?.estimate) {
    storageEstimate.value = await navigator.storage.estimate();
  }
};

export const estimateDesc = computed(() => {
  const usage = storageEstimate.value?.usage;
  if (!usage) return '';
  return `${(usage / 1024 / 1024).toFixed(2)} MB`;
});
