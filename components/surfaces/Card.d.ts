import { ReactNode, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  glass?: boolean;
  interactive?: boolean;
}

export declare function Card(props: CardProps): JSX.Element;
