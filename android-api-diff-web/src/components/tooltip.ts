import { h, render, type ObjectDirective } from 'vue';
import MTooltip from './MTooltip.vue';
import type { MTooltipOptions, MTooltipValue } from './MTooltip.types.ts';

const createTooltip = (element: HTMLElement) => {
  let options: MTooltipOptions | undefined;
  let host: HTMLDivElement | undefined;
  let instance: InstanceType<typeof MTooltip> | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let hovered = false;
  let revision = 0;

  const unmount = () => {
    if (!host) return;
    render(null, host);
    host.remove();
    host = undefined;
    instance = undefined;
  };
  const renderTooltip = () => {
    if (!host || !options) return;
    render(
      h(MTooltip, {
        ...options,
        target: element,
        manual: true,
        ref: (value) => {
          instance = value as InstanceType<typeof MTooltip> | undefined;
        },
      }),
      host,
    );
  };
  const hide = async () => {
    hovered = false;
    clearTimeout(timer);
    const closingRevision = ++revision;
    await instance?.close();
    if (revision === closingRevision) unmount();
  };
  const show = () => {
    hovered = true;
    clearTimeout(timer);
    if (!options?.text.trim()) return;
    ++revision;
    const mount = () => {
      if (!host) {
        host = document.createElement('div');
        document.body.appendChild(host);
      }
      renderTooltip();
      void instance?.show();
    };
    // Reopening during the leave animation reuses the existing popover.
    if (host) mount();
    else timer = setTimeout(mount, options.delay ?? 300);
  };
  element.addEventListener('pointerenter', show);
  element.addEventListener('pointerleave', hide);
  element.addEventListener('pointerdown', hide);
  return {
    update(value: MTooltipValue) {
      const next = typeof value === 'string' ? { text: value } : value;
      if (!next?.text.trim()) {
        // Keep the previous text for the closing animation.
        void hide();
        options = undefined;
        return;
      }
      options = next;
      if (host) renderTooltip();
      else if (hovered) show();
    },
    dispose() {
      ++revision;
      clearTimeout(timer);
      element.removeEventListener('pointerenter', show);
      element.removeEventListener('pointerleave', hide);
      element.removeEventListener('pointerdown', hide);
      unmount();
    },
  };
};

const tooltips = new WeakMap<HTMLElement, ReturnType<typeof createTooltip>>();
export const vTooltip: ObjectDirective<HTMLElement, MTooltipValue> = {
  mounted(element, binding) {
    const tooltip = createTooltip(element);
    tooltips.set(element, tooltip);
    tooltip.update(binding.value);
  },
  updated: (element, binding) => tooltips.get(element)?.update(binding.value),
  beforeUnmount(element) {
    tooltips.get(element)?.dispose();
    tooltips.delete(element);
  },
};
