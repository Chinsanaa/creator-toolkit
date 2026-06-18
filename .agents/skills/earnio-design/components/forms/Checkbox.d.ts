import * as React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text beside the box (or use children for rich content). */
  label?: React.ReactNode;
}

/** Checkbox with a custom blue check. */
export function Checkbox(props: CheckboxProps): React.JSX.Element;
