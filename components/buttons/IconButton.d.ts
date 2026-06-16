import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'primary' | 'dark' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  'aria-label': string;
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
