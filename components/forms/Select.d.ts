import { SelectHTMLAttributes, ReactNode } from 'react';

export interface SelectOption { value: string; label: string; }

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options?: SelectOption[] | string[];
  children?: ReactNode;
}

export declare function Select(props: SelectProps): JSX.Element;
