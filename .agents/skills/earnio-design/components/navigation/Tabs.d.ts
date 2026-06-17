import * as React from 'react';

export interface TabItem {
  /** Stable value identifying the tab. */
  value: string;
  /** Visible label. */
  label: React.ReactNode;
  /** Optional count pill (e.g. number of applications). */
  count?: number;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The tabs to render. */
  tabs: TabItem[];
  /** Selected tab value (controlled). Defaults to the first tab. */
  value?: string;
  /** Called with the new value when a tab is clicked. */
  onChange?: (value: string) => void;
  /** Visual style. @default "pill" */
  variant?: 'pill' | 'underline';
}

/** Tab switcher — segmented pill or underline. */
export function Tabs(props: TabsProps): React.JSX.Element;
