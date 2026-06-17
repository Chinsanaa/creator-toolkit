import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'dark' | 'secondary' | 'ghost';
  /** Size. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to fill the container width. @default false */
  fullWidth?: boolean;
  /** Icon element rendered before the label (e.g. a Lucide <svg>). */
  leftIcon?: React.ReactNode;
  /** Icon element rendered after the label. */
  rightIcon?: React.ReactNode;
}

/**
 * Earnio's pill button. Primary CTA across the product.
 *
 * @startingPoint section="Components" subtitle="Pill buttons — primary, dark, secondary, ghost" viewport="700x180"
 */
export function Button(props: ButtonProps): React.JSX.Element;
