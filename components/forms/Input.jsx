import React from 'react';

const styles = `
.ern-field { display: flex; flex-direction: column; gap: 6px; }
.ern-label { font-family: var(--font-body); font-size: 13px; font-weight: 600; color: var(--text-primary); }
.ern-input-wrap { position: relative; display: flex; align-items: center; }
.ern-input {
  width: 100%; min-height: 44px; padding: 10px 14px;
  font-family: var(--font-body); font-size: 15px; color: var(--text-primary);
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius-md); outline: none;
  transition: border-color var(--duration-fast) var(--ease-out);
  box-sizing: border-box;
}
.ern-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-soft); }
.ern-input-error { border-color: var(--danger) !important; }
.ern-input-error:focus { box-shadow: 0 0 0 3px rgba(240,69,90,0.12) !important; }
.ern-input-icon { position: absolute; left: 12px; color: var(--text-muted); pointer-events: none; }
.ern-input-has-icon { padding-left: 38px; }
.ern-hint { font-size: 12px; color: var(--text-muted); }
.ern-error-msg { font-size: 12px; color: var(--danger); }
`;

export function Input({ label, hint, error, icon, id, className = '', ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <>
      <style>{styles}</style>
      <div className="ern-field">
        {label && <label className="ern-label" htmlFor={inputId}>{label}</label>}
        <div className="ern-input-wrap">
          {icon && <span className="ern-input-icon">{icon}</span>}
          <input
            id={inputId}
            className={['ern-input', error ? 'ern-input-error' : '', icon ? 'ern-input-has-icon' : '', className].filter(Boolean).join(' ')}
            {...props}
          />
        </div>
        {error ? <span className="ern-error-msg">{error}</span> : hint ? <span className="ern-hint">{hint}</span> : null}
      </div>
    </>
  );
}
