import { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'solid' | 'outline';
  dot?: boolean;
  className?: string;
}

export declare function Badge(props: BadgeProps): JSX.Element;
