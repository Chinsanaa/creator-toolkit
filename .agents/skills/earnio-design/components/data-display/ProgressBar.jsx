import React from 'react';

const STYLE_ID = 'earnio-progress-styles';
const CSS = `
.ern-progress{font-family:var(--font-sans)}
.ern-progress__head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:7px}
.ern-progress__label{font-size:13px;font-weight:600;color:var(--text-body)}
.ern-progress__val{font-family:var(--font-mono);font-size:12px;color:var(--text-muted)}
.ern-progress__track{height:8px;border-radius:var(--radius-full);background:var(--surface-sunken);overflow:hidden}
.ern-progress__fill{height:100%;border-radius:var(--radius-full);transition:width var(--dur-slow) var(--ease-out)}
.ern-progress__fill--brand{background:var(--gradient-spark)}
.ern-progress__fill--success{background:var(--success)}
.ern-progress__fill--warning{background:var(--warning)}
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

/** Slim progress bar — campaign budget filled, goal progress, sync status. */
export function ProgressBar({ value = 0, max = 100, label, showValue = true, tone = 'brand', valueFormat, className = '', ...rest }) {
  ensureStyles();
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const display = valueFormat ? valueFormat(value, max) : `${Math.round(pct)}%`;
  return (
    <div className={['ern-progress', className].filter(Boolean).join(' ')} {...rest}>
      {(label || showValue) ? (
        <div className="ern-progress__head">
          {label ? <span className="ern-progress__label">{label}</span> : <span />}
          {showValue ? <span className="ern-progress__val">{display}</span> : null}
        </div>
      ) : null}
      <div className="ern-progress__track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <span className={`ern-progress__fill ern-progress__fill--${tone}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
