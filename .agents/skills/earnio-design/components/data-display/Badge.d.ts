import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color tone. @default "neutral" */
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'solid' | 'outline';
  /** Show a leading status dot. @default false */
  dot?: boolean;
}

/** Status pill / label used for application states, tags and counts. */
export function Badge(props: BadgeProps): React.JSX.Element;
