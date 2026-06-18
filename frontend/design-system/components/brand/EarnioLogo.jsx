import React from 'react';

/** The three-square "Fragmented Growth" mark with the fixed opacity fade. */
export function EarnioMark({ size = 28, color, className = '', style }) {
  const solid = color || '#1736B8';
  const mid = color || '#2E5BFF';
  const light = color || '#5C7DFF';
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role="img"
      aria-label="Earnio"
      style={style}
    >
      <rect x="8" y="63" width="25" height="25" fill={solid} fillOpacity="1" />
      <rect x="35.5" y="35.5" width="25" height="25" fill={mid} fillOpacity="0.85" />
      <rect x="63" y="8" width="25" height="25" fill={light} fillOpacity="0.7" />
    </svg>
  );
}

/**
 * Earnio logo lockup. `variant` controls mark-only / wordmark-only / full.
 * Pass `color` for a single-color (mono) mark on colored backgrounds.
 */
export function EarnioLogo({ variant = 'full', size = 28, color, wordColor, className = '', style }) {
  const word = (
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.04em', fontSize: size * 0.72, color: wordColor || 'var(--foreground)', lineHeight: 1 }}>
      Earnio
    </span>
  );

  if (variant === 'wordmark') {
    return <span className={className} style={style}>{word}</span>;
  }
  if (variant === 'icon') {
    return <EarnioMark size={size} color={color} className={className} style={style} />;
  }
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.32, ...style }}>
      <EarnioMark size={size} color={color} />
      {word}
    </span>
  );
}
