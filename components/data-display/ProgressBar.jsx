import React from 'react';

const styles = `
.ern-progress { display: flex; flex-direction: column; gap: 6px; }
.ern-progress-header { display: flex; justify-content: space-between; align-items: center; }
.ern-progress-label { font-family: var(--font-body); font-size: 13px; color: var(--text-secondary); font-weight: 500; }
.ern-progress-value { font-family: var(--font-mono); font-size: 13px; color: var(--text-primary); font-feature-settings: 'tnum' 1; }
.ern-progress-track { height: 6px; border-radius: var(--radius-full); background: var(--ink-100); overflow: hidden; }
.ern-progress-fill { height: 100%; border-radius: var(--radius-full); background: var(--gradient-spark); transition: width var(--duration-slow) var(--ease-out); }
`;

export function ProgressBar({ label, value, max = 100, format, className = '' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const display = format ? format(value, max) : `${Math.round(pct)}%`;
  return (
    <>
      <style>{styles}</style>
      <div className={['ern-progress', className].filter(Boolean).join(' ')}>
        <div className="ern-progress-header">
          {label && <span className="ern-progress-label">{label}</span>}
          <span className="ern-progress-value">{display}</span>
        </div>
        <div className="ern-progress-track">
          <div className="ern-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </>
  );
}
