import React from 'react';

const TONES = {
  neutral: { bg: 'var(--surface)', fg: 'var(--muted)', bd: 'transparent' },
  primary: { bg: 'var(--primary-soft)', fg: 'var(--primary)', bd: 'var(--border)' },
  accent:  { bg: 'var(--accent-soft)', fg: 'var(--accent)', bd: 'transparent' },
  success: { bg: 'var(--success-soft)', fg: 'var(--success)', bd: 'transparent' },
  warning: { bg: 'var(--warning-soft)', fg: 'var(--warning)', bd: 'transparent' },
  danger:  { bg: 'var(--destructive-soft)', fg: 'var(--destructive)', bd: 'transparent' },
};

/**
 * Status / category badge. `eyebrow` renders the uppercase tracked label
 * (the .badge-pill treatment used above headings).
 */
export function Badge({ tone = 'neutral', eyebrow = false, dot = false, className = '', style, children, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 'var(--radius-full)',
        border: `1px solid ${t.bd}`,
        background: t.bg,
        color: t.fg,
        padding: eyebrow ? '2px 10px' : '4px 10px',
        fontSize: 12,
        fontWeight: eyebrow ? 700 : 600,
        fontFamily: 'var(--font-sans)',
        textTransform: eyebrow ? 'uppercase' : 'none',
        letterSpacing: eyebrow ? '0.06em' : 0,
        lineHeight: 1.4,
        ...style,
      }}
      {...rest}
    >
      {dot ? <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: t.fg }} /> : null}
      {children}
    </span>
  );
}
