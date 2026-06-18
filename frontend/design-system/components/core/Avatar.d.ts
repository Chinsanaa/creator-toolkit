import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Display name; initials are derived when no image is given. */
  name?: string;
  /** Image URL; falls back to initials when omitted. */
  src?: string;
  /** Diameter. @default "md" */
  size?: 'sm' | 'md' | 'lg' | number;
  /** Fill color for the initials variant. @default "ink" */
  tone?: 'ink' | 'brand';
}

/** Circular initials / image avatar. */
export function Avatar(props: AvatarProps): React.JSX.Element;
