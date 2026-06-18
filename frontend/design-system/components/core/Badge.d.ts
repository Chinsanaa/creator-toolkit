import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color tone. @default "neutral" */
  tone?: 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger';
  /** Uppercase, tracked eyebrow style. @default false */
  eyebrow?: boolean;
  /** Show a leading status dot. @default false */
  dot?: boolean;
  children?: React.ReactNode;
}

/** Small status / category pill. */
export function Badge(props: BadgeProps): React.JSX.Element;
