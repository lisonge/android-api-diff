export interface MTooltipOptions {
  text: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export type MTooltipValue = string | MTooltipOptions | null | undefined;
