import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label rendered above the input. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message — turns the field red and overrides `hint`. */
  error?: string;
  /** Leading icon element (e.g. a Lucide <svg>). */
  icon?: React.ReactNode;
}

/** Labelled text input with icon, hint and error states. */
export function Input(props: InputProps): React.JSX.Element;
