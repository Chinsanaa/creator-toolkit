import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  /** Control height & padding. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Fully-rounded pill — use for landing CTAs. @default false */
  pill?: boolean;
  /** Stretch to container width. @default false */
  fullWidth?: boolean;
  /** Icon node before the label. */
  leftIcon?: React.ReactNode;
  /** Icon node after the label. */
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Primary action button for the Earnio system.
 *
 * @startingPoint section="Core" subtitle="Buttons in every variant & size" viewport="700x150"
 */
export function Button(props: ButtonProps): React.JSX.Element;
