import * as React from 'react';

export type SelectOption = string | { value: string; label: string };

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Field label rendered above the select. */
  label?: string;
  /** Options as strings or {value,label}. Omit to pass <option> children. */
  options?: SelectOption[];
}

/** Styled native <select> with a custom chevron. */
export function Select(props: SelectProps): React.JSX.Element;
