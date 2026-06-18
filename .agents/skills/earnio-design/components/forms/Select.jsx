import React from 'react';

const STYLE_ID = 'earnio-select-styles';
const CSS = `
.ern-select-field{display:flex;flex-direction:column;gap:7px;font-family:var(--font-sans)}
.ern-select-field__label{font-size:13px;font-weight:600;color:var(--text-strong)}
.ern-select-wrap{position:relative;display:flex;align-items:center}
.ern-select{width:100%;font-family:var(--font-sans);font-size:15px;color:var(--text-strong);background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:11px 40px 11px 14px;min-height:44px;outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.ern-select:hover{border-color:var(--border-strong)}
.ern-select:focus{border-color:var(--primary);box-shadow:var(--focus-ring)}
.ern-select:disabled{background:var(--surface-muted);color:var(--text-muted);cursor:not-allowed}
.ern-select-wrap__chev{position:absolute;right:14px;pointer-events:none;color:var(--text-muted)}
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

/** Native select, styled to match Earnio inputs. Pass `options` or children. */
export function Select({ label, options, id, className = '', children, ...rest }) {
  ensureStyles();
  const selId = id || (label ? `ern-sel-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <div className="ern-select-field">
      {label ? <label className="ern-select-field__label" htmlFor={selId}>{label}</label> : null}
      <div className="ern-select-wrap">
        <select id={selId} className={['ern-select', className].filter(Boolean).join(' ')} {...rest}>
          {options
            ? options.map((o) => {
                const value = typeof o === 'string' ? o : o.value;
                const lbl = typeof o === 'string' ? o : o.label;
                return <option key={value} value={value}>{lbl}</option>;
              })
            : children}
        </select>
        <svg className="ern-select-wrap__chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
