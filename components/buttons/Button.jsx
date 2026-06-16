// @dsCard components/buttons/buttons.card.html
import React from 'react';

const styles = `
.ern-btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 6px; border: none; cursor: pointer; font-family: var(--font-body);
  font-weight: 600; letter-spacing: 0.01em; transition: all var(--duration-base) var(--ease-out);
  border-radius: var(--radius-full); white-space: nowrap;
}
.ern-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.ern-btn-sm { padding: 8px 16px; font-size: 13px; min-height: 34px; }
.ern-btn-md { padding: 10px 22px; font-size: 15px; min-height: 44px; }
.ern-btn-lg { padding: 14px 32px; font-size: 16px; min-height: 52px; }
.ern-btn-primary { background: var(--gradient-brand); color: #fff; box-shadow: var(--shadow-brand); }
.ern-btn-primary:hover:not(:disabled) { box-shadow: var(--shadow-glow); transform: translateY(-1px); }
.ern-btn-dark { background: var(--gradient-ink); color: #fff; }
.ern-btn-dark:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
.ern-btn-secondary { background: var(--surface); color: var(--text-primary); border: 1.5px solid var(--border-strong); }
.ern-btn-secondary:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
.ern-btn-ghost { background: transparent; color: var(--text-secondary); }
.ern-btn-ghost:hover:not(:disabled) { background: var(--primary-soft); color: var(--primary); }
.ern-btn-full { width: 100%; }
`;

export function Button({
  children, variant = 'primary', size = 'md', fullWidth = false,
  iconLeft, iconRight, disabled, onClick, className = '', ...props
}) {
  return (
    <>
      <style>{styles}</style>
      <button
        className={[
          'ern-btn',
          `ern-btn-${variant}`,
          `ern-btn-${size}`,
          fullWidth ? 'ern-btn-full' : '',
          className
        ].filter(Boolean).join(' ')}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {iconLeft && <span className="ern-btn-icon">{iconLeft}</span>}
        {children}
        {iconRight && <span className="ern-btn-icon">{iconRight}</span>}
      </button>
    </>
  );
}
