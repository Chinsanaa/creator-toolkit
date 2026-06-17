import React from 'react';

const STYLE_ID = 'earnio-card-styles';
const CSS = `
.ern-card{font-family:var(--font-sans);background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);transition:border-color var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-out)}
.ern-card--pad-sm{padding:16px}
.ern-card--pad-md{padding:22px}
.ern-card--pad-lg{padding:28px}
.ern-card--xl{border-radius:var(--radius-2xl)}
.ern-card--glass{background:color-mix(in srgb,var(--surface) 82%,transparent);backdrop-filter:blur(var(--blur-md));-webkit-backdrop-filter:blur(var(--blur-md))}
.ern-card--interactive{cursor:pointer}
.ern-card--interactive:hover{border-color:var(--primary-border);box-shadow:var(--shadow-md);transform:translateY(-2px)}
.ern-card--interactive:active{transform:translateY(0)}
.ern-card__header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px}
.ern-card__title{font-family:var(--font-display);font-size:16px;font-weight:600;letter-spacing:-.01em;color:var(--text-strong);margin:0}
.ern-card__sub{font-size:13px;color:var(--text-muted);margin:3px 0 0}
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

/** The base surface — white, rounded, soft cool shadow. */
export function Card({
  title,
  subtitle,
  action = null,
  padding = 'md',
  rounded = 'lg',
  glass = false,
  interactive = false,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const cls = [
    'ern-card',
    `ern-card--pad-${padding}`,
    rounded === 'xl' ? 'ern-card--xl' : '',
    glass ? 'ern-card--glass' : '',
    interactive ? 'ern-card--interactive' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <div className={cls} {...rest}>
      {(title || action) ? (
        <div className="ern-card__header">
          <div>
            {title ? <h3 className="ern-card__title">{title}</h3> : null}
            {subtitle ? <p className="ern-card__sub">{subtitle}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
}
