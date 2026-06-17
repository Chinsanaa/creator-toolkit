import React from 'react';

const STYLE_ID = 'earnio-button-styles';
const CSS = `
.ern-btn{font-family:var(--font-sans);font-weight:600;border:1px solid transparent;border-radius:var(--radius-full);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;line-height:1;white-space:nowrap;text-decoration:none;-webkit-tap-highlight-color:transparent;transition:background var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out),box-shadow var(--dur-base) var(--ease-out),border-color var(--dur-fast) var(--ease-out)}
.ern-btn:focus-visible{outline:none;box-shadow:var(--focus-ring)}
.ern-btn:disabled,.ern-btn[aria-disabled="true"]{opacity:.5;cursor:not-allowed;pointer-events:none;box-shadow:none}
.ern-btn--full{width:100%}
.ern-btn--sm{font-size:13px;padding:8px 14px;min-height:36px}
.ern-btn--md{font-size:14px;padding:11px 20px;min-height:44px}
.ern-btn--lg{font-size:15px;padding:14px 26px;min-height:52px}
.ern-btn--primary{background:var(--primary);color:#fff;box-shadow:var(--shadow-brand)}
.ern-btn--primary:hover{background:var(--primary-hover)}
.ern-btn--primary:active{transform:scale(.97)}
.ern-btn--dark{background:var(--ink-900);color:#fff;box-shadow:var(--shadow-md)}
.ern-btn--dark:hover{background:var(--ink-800);transform:translateY(-1px)}
.ern-btn--dark:active{transform:translateY(0) scale(.98)}
.ern-btn--secondary{background:var(--surface);color:var(--text-strong);border-color:var(--border);box-shadow:var(--shadow-xs)}
.ern-btn--secondary:hover{background:var(--surface-muted);border-color:var(--border-strong)}
.ern-btn--secondary:active{transform:scale(.98)}
.ern-btn--ghost{background:transparent;color:var(--text-body)}
.ern-btn--ghost:hover{background:var(--surface-muted);color:var(--text-strong)}
.ern-btn__i{display:inline-flex;align-items:center;justify-content:center;width:1.15em;height:1.15em}
.ern-btn__i svg{width:100%;height:100%;display:block}
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

/**
 * Earnio Button — pill-shaped, four variants.
 * `primary` (solid blue, brand glow) is the app default; `dark` (ink pill) is
 * the marketing-site primary; `secondary` is a bordered white pill; `ghost` is text-only.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const cls = [
    'ern-btn',
    `ern-btn--${variant}`,
    `ern-btn--${size}`,
    fullWidth ? 'ern-btn--full' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} {...rest}>
      {leftIcon ? <span className="ern-btn__i" aria-hidden="true">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span className="ern-btn__i" aria-hidden="true">{rightIcon}</span> : null}
    </button>
  );
}
