import * as React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "ghost" */
  variant?: 'solid' | 'outline' | 'ghost';
  /** Size. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label (required — the button has no visible text). */
  label: string;
  /** The icon element, e.g. a Lucide <svg>. */
  children: React.ReactNode;
}

/** Square, icon-only button for top bars and toolbars. */
export function IconButton(props: IconButtonProps): React.JSX.Element;
