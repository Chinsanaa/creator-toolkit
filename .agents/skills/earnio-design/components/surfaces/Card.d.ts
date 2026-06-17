import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional title rendered in the card header. */
  title?: React.ReactNode;
  /** Optional subtitle under the title. */
  subtitle?: React.ReactNode;
  /** Element pinned to the right of the header (e.g. a Button or Badge). */
  action?: React.ReactNode;
  /** Inner padding. @default "md" */
  padding?: 'sm' | 'md' | 'lg';
  /** Corner radius. @default "lg" */
  rounded?: 'lg' | 'xl';
  /** Frosted-glass surface for use over the mesh background. @default false */
  glass?: boolean;
  /** Hover-lift affordance for clickable cards. @default false */
  interactive?: boolean;
}

/**
 * The base Earnio surface — white, rounded, soft cool shadow.
 *
 * @startingPoint section="Components" subtitle="Card surface with header & actions" viewport="700x240"
 */
export function Card(props: CardProps): React.JSX.Element;
