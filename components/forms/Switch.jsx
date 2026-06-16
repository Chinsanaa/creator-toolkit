import React from 'react';

const styles = `
.ern-switch-wrap { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
.ern-switch-input { display: none; }
.ern-switch-track {
  width: 44px; height: 26px; border-radius: var(--radius-full);
  background: var(--ink-200); position: relative;
  transition: background var(--duration-base) var(--ease-out);
  flex-shrink: 0;
}
.ern-switch-input:checked + .ern-switch-track { background: var(--primary); }
.ern-switch-thumb {
  position: absolute; top: 3px; left: 3px;
  width: 20px; height: 20px; border-radius: 50%;
  background: #fff; box-shadow: var(--shadow-sm);
  transition: transform var(--duration-base) var(--ease-spring);
}
.ern-switch-input:checked + .ern-switch-track .ern-switch-thumb { transform: translateX(18px); }
.ern-switch-label { font-family: var(--font-body); font-size: 14px; color: var(--text-primary); }
`;

export function Switch({ label, checked, onChange, disabled, className = '', ...props }) {
  return (
    <>
      <style>{styles}</style>
      <label className={['ern-switch-wrap', className].filter(Boolean).join(' ')}>
        <input type="checkbox" className="ern-switch-input" checked={checked} onChange={onChange} disabled={disabled} {...props} />
        <span className="ern-switch-track"><span className="ern-switch-thumb" /></span>
        {label && <span className="ern-switch-label">{label}</span>}
      </label>
    </>
  );
}
