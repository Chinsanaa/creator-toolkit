import * as React from 'react';

export interface StatCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Metric label, e.g. "Total earnings". */
  label: string;
  /** The headline value (rendered in mono). e.g. "₮12.4M". */
  value: React.ReactNode;
  /** Optional trend value, e.g. "18.2%". */
  delta?: string;
  /** Direction of the delta. @default "up" */
  trend?: 'up' | 'down';
  /** Secondary caption under the value. */
  hint?: string;
  /** Optional icon (e.g. a Lucide <svg>) shown top-right. */
  icon?: React.ReactNode;
}

/**
 * Dashboard metric card — the building block of the earnings & wallet views.
 *
 * @startingPoint section="Components" subtitle="Dashboard metric cards" viewport="700x200"
 */
export function StatCard(props: StatCardProps): React.JSX.Element;
