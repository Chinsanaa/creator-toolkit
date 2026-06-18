import * as React from 'react';

export interface EarnioLogoProps {
  /** Lockup form. @default "full" */
  variant?: 'full' | 'icon' | 'wordmark';
  /** Mark height in px (wordmark scales from it). @default 28 */
  size?: number;
  /** Single-color override for the mark (mono use on colored backgrounds). */
  color?: string;
  /** Wordmark color override. @default var(--foreground) */
  wordColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Earnio brand lockup — the three-square Fragmented Growth mark + wordmark.
 *
 * @startingPoint section="Brand" subtitle="Logo lockups & mark" viewport="700x150"
 */
export function EarnioLogo(props: EarnioLogoProps): React.JSX.Element;

export interface EarnioMarkProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** The mark only, with the fixed 100/85/70 opacity fade. */
export function EarnioMark(props: EarnioMarkProps): React.JSX.Element;
