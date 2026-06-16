import React from 'react';

const styles = `
.ern-badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 10px; border-radius: var(--radius-full);
  font-family: var(--font-body); font-size: 12px; font-weight: 600;
  white-space: nowrap;
}
.ern-badge-neutral { background: var(--ink-100); color: var(--ink-700); }
.ern-badge-brand { background: var(--primary-soft); color: var(--primary); }
.ern-badge-success { background: var(--success-soft); color: var(--success); }
.ern-badge-warning { background: var(--warning-soft); color: #B45309; }
.ern-badge-danger { background: var(--danger-soft); color: var(--danger); }
.ern-badge-solid { background: var(--primary); color: #fff; }
.ern-badge-outline { background: transparent; color: var(--primary); border: 1.5px solid var(--primary-border); }
.ern-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
`;

export function Badge({ children, tone = 'neutral', dot = false, className = '' }) {
  return (
    <>
      <style>{styles}</style>
      <span className={['ern-badge', `ern-badge-${tone}`, className].filter(Boolean).join(' ')}>
        {dot && <span className="ern-badge-dot" />}
        {children}
      </span>
    </>
  );
}
