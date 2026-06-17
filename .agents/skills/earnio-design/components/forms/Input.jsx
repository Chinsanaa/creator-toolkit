import React from 'react';

const STYLE_ID = 'earnio-input-styles';
const CSS = `
.ern-field{display:flex;flex-direction:column;gap:7px;font-family:var(--font-sans)}
.ern-field__label{font-size:13px;font-weight:600;color:var(--text-strong)}
.ern-field__hint{font-size:12px;color:var(--text-muted)}
.ern-field__error{font-size:12px;color:var(--danger);font-weight:500}
.ern-input-wrap{position:relative;display:flex;align-items:center}
.ern-input-wrap__icon{position:absolute;left:14px;display:inline-flex;color:var(--text-faint);pointer-events:none}
.ern-input-wrap__icon svg{width:18px;height:18px;stroke-width:1.75}
.ern-input{width:100%;font-family:var(--font-sans);font-size:15px;color:var(--text-strong);background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:11px 14px;min-height:44px;outline:none;transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.ern-input::placeholder{color:var(--text-faint)}
.ern-input--icon{padding-left:42px}
.ern-input:hover{border-color:var(--border-strong)}
.ern-input:focus{border-color:var(--primary);box-shadow:var(--focus-ring)}
.ern-input:disabled{background:var(--surface-muted);color:var(--text-muted);cursor:not-allowed}
.ern-input--error{border-color:var(--danger)}
.ern-input--error:focus{box-shadow:0 0 0 3px var(--danger-soft)}
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

/** Labelled text input with optional leading icon, hint and error states. */
export function Input({
  label,
  hint,
  error,
  icon = null,
  id,
  className = '',
  ...rest
}) {
  ensureStyles();
  const inputId = id || (label ? `ern-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const inputCls = ['ern-input', icon ? 'ern-input--icon' : '', error ? 'ern-input--error' : '', className]
    .filter(Boolean).join(' ');
  return (
    <div className="ern-field">
      {label ? <label className="ern-field__label" htmlFor={inputId}>{label}</label> : null}
      <div className="ern-input-wrap">
        {icon ? <span className="ern-input-wrap__icon" aria-hidden="true">{icon}</span> : null}
        <input id={inputId} className={inputCls} aria-invalid={!!error} {...rest} />
      </div>
      {error ? <span className="ern-field__error">{error}</span>
        : hint ? <span className="ern-field__hint">{hint}</span> : null}
    </div>
  );
}
