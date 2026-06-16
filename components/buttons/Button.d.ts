import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
