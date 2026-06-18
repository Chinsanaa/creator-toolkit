import React from 'react';

const STYLE_ID = 'earnio-iconbutton-styles';
const CSS = `
.ern-iconbtn{font-family:var(--font-sans);border:1px solid transparent;border-radius:var(--radius-md);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;transition:background var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),color var(--dur-fast)}
.ern-iconbtn:focus-visible{outline:none;box-shadow:var(--focus-ring)}
.ern-iconbtn:disabled{opacity:.45;cursor:not-allowed;pointer-events:none}
.ern-iconbtn:active{transform:scale(.94)}
.ern-iconbtn--sm{width:36px;height:36px}
.ern-iconbtn--md{width:44px;height:44px}
.ern-iconbtn--lg{width:52px;height:52px}
.ern-iconbtn--solid{background:var(--primary);color:#fff;box-shadow:var(--shadow-brand)}
.ern-iconbtn--solid:hover{background:var(--primary-hover)}
.ern-iconbtn--outline{background:var(--surface);color:var(--text-strong);border-color:var(--border)}
.ern-iconbtn--outline:hover{background:var(--surface-muted);border-color:var(--border-strong)}
.ern-iconbtn--ghost{background:transparent;color:var(--text-muted)}
.ern-iconbtn--ghost:hover{background:var(--surface-muted);color:var(--text-strong)}
.ern-iconbtn svg{width:1.25em;height:1.25em;display:block;stroke-width:1.75}
.ern-iconbtn--sm{font-size:16px}.ern-iconbtn--md{font-size:18px}.ern-iconbtn--lg{font-size:20px}
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
 * Square icon-only button for toolbars, top bars, and compact actions.
 * Always pass an accessible `aria-label`.
 */
export function IconButton({
  variant = 'ghost',
  size = 'md',
  label,
  className = '',
  type = 'button',
  children,
  ...rest
}) {
  ensureStyles();
  const cls = ['ern-iconbtn', `ern-iconbtn--${variant}`, `ern-iconbtn--${size}`, className]
    .filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} aria-label={label} {...rest}>
      {children}
    </button>
  );
}
