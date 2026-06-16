import React from 'react';

const styles = `
.ern-checkbox-wrap { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
.ern-checkbox-input { display: none; }
.ern-checkbox-box {
  width: 20px; height: 20px; border-radius: 6px;
  border: 2px solid var(--border-strong); background: var(--surface);
  display: flex; align-items: center; justify-content: center;
  transition: all var(--duration-fast) var(--ease-spring);
  flex-shrink: 0;
}
.ern-checkbox-input:checked + .ern-checkbox-box {
  background: var(--primary); border-color: var(--primary);
  transform: scale(1.05);
}
.ern-checkbox-box svg { opacity: 0; transition: opacity var(--duration-fast); }
.ern-checkbox-input:checked + .ern-checkbox-box svg { opacity: 1; }
.ern-checkbox-label { font-family: var(--font-body); font-size: 14px; color: var(--text-primary); }
`;

export function Checkbox({ label, checked, onChange, disabled, className = '', ...props }) {
  return (
    <>
      <style>{styles}</style>
      <label className={['ern-checkbox-wrap', className].filter(Boolean).join(' ')}>
        <input type="checkbox" className="ern-checkbox-input" checked={checked} onChange={onChange} disabled={disabled} {...props} />
        <span className="ern-checkbox-box">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        {label && <span className="ern-checkbox-label">{label}</span>}
      </label>
    </>
  );
}
