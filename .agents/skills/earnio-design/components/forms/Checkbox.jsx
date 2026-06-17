import React from 'react';

const STYLE_ID = 'earnio-checkbox-styles';
const CSS = `
.ern-check{display:inline-flex;align-items:flex-start;gap:10px;font-family:var(--font-sans);cursor:pointer;user-select:none}
.ern-check input{position:absolute;opacity:0;width:0;height:0}
.ern-check__box{flex:none;width:20px;height:20px;border-radius:6px;border:1.5px solid var(--border-strong);background:var(--surface);display:inline-flex;align-items:center;justify-content:center;transition:background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out);margin-top:1px}
.ern-check__box svg{width:13px;height:13px;color:#fff;opacity:0;transform:scale(.6);transition:opacity var(--dur-fast),transform var(--dur-fast) var(--ease-spring)}
.ern-check input:checked + .ern-check__box{background:var(--primary);border-color:var(--primary)}
.ern-check input:checked + .ern-check__box svg{opacity:1;transform:scale(1)}
.ern-check input:focus-visible + .ern-check__box{box-shadow:var(--focus-ring)}
.ern-check input:disabled + .ern-check__box{opacity:.5}
.ern-check__label{font-size:14px;color:var(--text-body);line-height:1.4}
.ern-check__label strong{color:var(--text-strong);font-weight:600}
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

/** Checkbox with a custom blue box. Pass label text or rich children. */
export function Checkbox({ label, className = '', children, ...rest }) {
  ensureStyles();
  return (
    <label className={['ern-check', className].filter(Boolean).join(' ')}>
      <input type="checkbox" {...rest} />
      <span className="ern-check__box" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      </span>
      {(label || children) ? <span className="ern-check__label">{label || children}</span> : null}
    </label>
  );
}
