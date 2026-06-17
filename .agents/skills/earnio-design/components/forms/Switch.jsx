import React from 'react';

const STYLE_ID = 'earnio-switch-styles';
const CSS = `
.ern-switch{display:inline-flex;align-items:center;gap:10px;font-family:var(--font-sans);cursor:pointer;user-select:none}
.ern-switch input{position:absolute;opacity:0;width:0;height:0}
.ern-switch__track{flex:none;width:44px;height:26px;border-radius:var(--radius-full);background:var(--ink-200);position:relative;transition:background var(--dur-base) var(--ease-out)}
.ern-switch__thumb{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:var(--shadow-sm);transition:transform var(--dur-base) var(--ease-spring)}
.ern-switch input:checked + .ern-switch__track{background:var(--primary)}
.ern-switch input:checked + .ern-switch__track .ern-switch__thumb{transform:translateX(18px)}
.ern-switch input:focus-visible + .ern-switch__track{box-shadow:var(--focus-ring)}
.ern-switch input:disabled + .ern-switch__track{opacity:.5}
.ern-switch__label{font-size:14px;color:var(--text-body)}
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

/** Toggle switch with a springy thumb. */
export function Switch({ label, className = '', ...rest }) {
  ensureStyles();
  return (
    <label className={['ern-switch', className].filter(Boolean).join(' ')}>
      <input type="checkbox" role="switch" {...rest} />
      <span className="ern-switch__track" aria-hidden="true"><span className="ern-switch__thumb" /></span>
      {label ? <span className="ern-switch__label">{label}</span> : null}
    </label>
  );
}
