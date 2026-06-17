import * as React from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Optional label beside the switch. */
  label?: React.ReactNode;
}

/** Toggle switch with a springy thumb animation. */
export function Switch(props: SwitchProps): React.JSX.Element;
