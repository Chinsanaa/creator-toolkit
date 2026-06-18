import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the input. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message; turns the border & message danger-red. */
  error?: string;
}

/** Labeled text input with the Earnio focus glow. */
export function Input(props: InputProps): React.JSX.Element;
