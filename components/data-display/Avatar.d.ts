import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Full name — used for the alt text and initials fallback. */
  name?: string;
  /** Image URL. Falls back to initials when absent. */
  src?: string;
  /** Size. @default "md" */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Show a brand ring around the avatar. @default false */
  ring?: boolean;
}

/** Circular avatar with image or initials-on-gradient fallback. */
export function Avatar(props: AvatarProps): React.JSX.Element;
