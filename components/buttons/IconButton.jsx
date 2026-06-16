import React from 'react';

const styles = `
.ern-icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  border: none; cursor: pointer; border-radius: var(--radius-full);
  transition: all var(--duration-base) var(--ease-out);
}
.ern-icon-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.ern-icon-btn-sm { width: 34px; height: 34px; }
.ern-icon-btn-md { width: 44px; height: 44px; }
.ern-icon-btn-lg { width: 52px; height: 52px; }
.ern-icon-btn-primary { background: var(--gradient-brand); color: #fff; box-shadow: var(--shadow-brand); }
.ern-icon-btn-primary:hover:not(:disabled) { box-shadow: var(--shadow-glow); transform: translateY(-1px); }
.ern-icon-btn-dark { background: var(--gradient-ink); color: #fff; }
.ern-icon-btn-secondary { background: var(--surface); color: var(--text-primary); border: 1.5px solid var(--border-strong); }
.ern-icon-btn-secondary:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
.ern-icon-btn-ghost { background: transparent; color: var(--text-secondary); }
.ern-icon-btn-ghost:hover:not(:disabled) { background: var(--primary-soft); color: var(--primary); }
`;

export function IconButton({ icon, variant = 'primary', size = 'md', 'aria-label': ariaLabel, disabled, onClick, className = '', ...props }) {
  return (
    <>
      <style>{styles}</style>
      <button
        className={['ern-icon-btn', `ern-icon-btn-${variant}`, `ern-icon-btn-${size}`, className].filter(Boolean).join(' ')}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {icon}
      </button>
    </>
  );
}
