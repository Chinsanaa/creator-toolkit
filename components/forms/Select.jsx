import React from 'react';

const styles = `
.ern-select-wrap { position: relative; }
.ern-select {
  width: 100%; min-height: 44px; padding: 10px 36px 10px 14px;
  font-family: var(--font-body); font-size: 15px; color: var(--text-primary);
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius-md); outline: none; appearance: none; cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-out);
}
.ern-select:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-soft); }
.ern-select-chevron {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  pointer-events: none; color: var(--text-muted); width: 16px; height: 16px;
}
`;

export function Select({ label, hint, error, options = [], children, className = '', ...props }) {
  return (
    <>
      <style>{styles}</style>
      <div className="ern-field">
        {label && <label className="ern-label" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>{label}</label>}
        <div className="ern-select-wrap">
          <select className={['ern-select', className].filter(Boolean).join(' ')} {...props}>
            {options.length > 0
              ? options.map(opt => (
                  <option key={opt.value ?? opt} value={opt.value ?? opt}>{opt.label ?? opt}</option>
                ))
              : children}
          </select>
          <svg className="ern-select-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="4,6 8,10 12,6"/>
          </svg>
        </div>
        {error ? <span style={{ fontSize: '12px', color: 'var(--danger)' }}>{error}</span>
               : hint ? <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{hint}</span> : null}
      </div>
    </>
  );
}
