import React from 'react';

const VARIANTS = {
  card: { borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'var(--card)', boxShadow: 'var(--shadow-sm)', backdropFilter: 'none' },
  elevated: { borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'var(--card)', boxShadow: 'var(--shadow-md)', backdropFilter: 'none' },
  glass: { borderRadius: 'var(--radius-xl)', border: '1px solid color-mix(in srgb, #fff 85%, transparent)', background: 'color-mix(in srgb, #fff 78%, transparent)', boxShadow: 'var(--landing-btn-light-shadow)', backdropFilter: 'blur(10px)' },
  hero: { borderRadius: 'var(--radius-2xl)', border: '1px solid color-mix(in srgb, #fff 90%, transparent)', background: 'color-mix(in srgb, #fff 88%, transparent)', boxShadow: 'var(--landing-card-shadow)', backdropFilter: 'blur(12px)' },
};

/**
 * Surface container. `hero` adds the blue→cyan gradient top-bar used on the
 * dashboard greeting card.
 */
export function Panel({ variant = 'card', padding = 20, className = '', style, children, ...rest }) {
  const v = VARIANTS[variant] || VARIANTS.card;
  return (
    <div
      className={className}
      style={{ position: 'relative', overflow: variant === 'hero' ? 'hidden' : undefined, padding, ...v, ...style }}
      {...rest}
    >
      {variant === 'hero' ? (
        <span aria-hidden style={{ position: 'absolute', insetInlineStart: 0, top: 0, width: '100%', height: 3, background: 'linear-gradient(90deg, var(--primary), var(--accent))', opacity: 0.85 }} />
      ) : null}
      {children}
    </div>
  );
}
