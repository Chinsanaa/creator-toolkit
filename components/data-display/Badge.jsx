import React from 'react';

const STYLE_ID = 'earnio-badge-styles';
const CSS = `
.ern-badge{display:inline-flex;align-items:center;gap:5px;font-family:var(--font-sans);font-weight:600;font-size:12px;line-height:1;border-radius:var(--radius-full);padding:5px 10px;white-space:nowrap;border:1px solid transparent}
.ern-badge__dot{width:6px;height:6px;border-radius:50%;background:currentColor}
.ern-badge--neutral{background:var(--surface-muted);color:var(--text-body);border-color:var(--border)}
.ern-badge--brand{background:var(--primary-soft);color:var(--primary-press);border-color:var(--primary-border)}
.ern-badge--success{background:var(--success-soft);color:#0a7d5a}
.ern-badge--warning{background:var(--warning-soft);color:#9a6207}
.ern-badge--danger{background:var(--danger-soft);color:#b32134}
.ern-badge--solid{background:var(--primary);color:#fff}
.ern-badge--outline{background:transparent;color:var(--text-body);border-color:var(--border-strong)}
`;

function ensureStyles() {
  if (typeof document === 'undefined') return;
  if (!document.getElementById(STYLE_ID)) {
    const s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/** Small status pill / label. Use a `dot` for live statuses. */
export function Badge({ tone = 'neutral', dot = false, className = '', children, ...rest }) {
  ensureStyles();
  return (
    <span className={['ern-badge', `ern-badge--${tone}`, className].filter(Boolean).join(' ')} {...rest}>
      {dot ? <span className="ern-badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
