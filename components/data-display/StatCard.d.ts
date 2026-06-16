import { ReactNode } from 'react';

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string | number;
  deltaUp?: boolean;
  hint?: string;
  icon?: ReactNode;
  className?: string;
}

export declare function StatCard(props: StatCardProps): JSX.Element;
