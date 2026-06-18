import * as React from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value. @default 0 */
  value?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Optional label above the bar. */
  label?: string;
  /** Show the numeric readout. @default true */
  showValue?: boolean;
  /** Fill color. @default "brand" */
  tone?: 'brand' | 'success' | 'warning';
  /** Custom formatter for the readout, e.g. (v,m) => `₮${v} / ₮${m}`. */
  valueFormat?: (value: number, max: number) => string;
}

/** Slim progress bar for campaign budgets, goals and sync status. */
export function ProgressBar(props: ProgressBarProps): React.JSX.Element;
