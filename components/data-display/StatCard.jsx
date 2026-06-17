import React from 'react';

const STYLE_ID = 'earnio-statcard-styles';
const CSS = `
.ern-stat{position:relative;overflow:hidden;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:18px 20px;box-shadow:var(--shadow-sm);transition:border-color var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out);font-family:var(--font-sans)}
.ern-stat:hover{border-color:var(--primary-border);box-shadow:var(--shadow-md)}
.ern-stat__top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.ern-stat__label{font-size:13px;font-weight:600;color:var(--text-muted)}
.ern-stat__icon{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:var(--radius-md);background:var(--primary-soft);color:var(--primary)}
.ern-stat__icon svg{width:18px;height:18px;stroke-width:1.75}
.ern-stat__value{font-family:var(--font-mono);font-weight:600;font-size:28px;letter-spacing:-.02em;color:var(--text-strong);margin-top:12px;font-feature-settings:'tnum' 1}
.ern-stat__foot{display:flex;align-items:center;gap:7px;margin-top:8px;font-size:12px;color:var(--text-muted)}
.ern-stat__delta{display:inline-flex;align-items:center;gap:3px;font-weight:700}
.ern-stat__delta--up{color:var(--success)}
.ern-stat__delta--down{color:var(--danger)}
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

/** Dashboard metric card — label, big mono value, optional trend delta + icon. */
export function StatCard({ label, value, delta = null, trend = 'up', hint, icon = null, className = '', ...rest }) {
  ensureStyles();
  return (
    <article className={['ern-stat', className].filter(Boolean).join(' ')} {...rest}>
      <div className="ern-stat__top">
        <span className="ern-stat__label">{label}</span>
        {icon ? <span className="ern-stat__icon" aria-hidden="true">{icon}</span> : null}
      </div>
      <div className="ern-stat__value">{value}</div>
      {(delta || hint) ? (
        <div className="ern-stat__foot">
          {delta ? (
            <span className={`ern-stat__delta ern-stat__delta--${trend}`}>
              <span aria-hidden="true">{trend === 'up' ? '▲' : '▼'}</span>{delta}
            </span>
          ) : null}
          {hint ? <span>{hint}</span> : null}
        </div>
      ) : null}
    </article>
  );
}
