import { InputHTMLAttributes } from 'react';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export declare function Switch(props: SwitchProps): JSX.Element;
