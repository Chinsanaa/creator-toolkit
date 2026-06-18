import * as React from 'react';

export interface StatCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Metric name, e.g. "Total earnings". */
  label: string;
  /** Pre-formatted value, e.g. "₮12,480,000". */
  value: React.ReactNode;
  /** Secondary context line under the value. */
  hint?: string;
  /** Month-over-month % change; colored green/red with arrow. */
  delta?: number;
  /** Override the value color (e.g. success/destructive). */
  valueColor?: string;
}

/**
 * Dashboard metric tile with hover-lift border.
 *
 * @startingPoint section="Core" subtitle="Dashboard stat tiles" viewport="700x150"
 */
export function StatCard(props: StatCardProps): React.JSX.Element;
