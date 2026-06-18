import React from 'react';

const STYLE_ID = 'earnio-avatar-styles';
const CSS = `
.ern-avatar{display:inline-flex;align-items:center;justify-content:center;flex:none;border-radius:50%;overflow:hidden;font-family:var(--font-display);font-weight:600;color:#fff;background:var(--gradient-brand);user-select:none}
.ern-avatar img{width:100%;height:100%;object-fit:cover}
.ern-avatar--xs{width:28px;height:28px;font-size:11px}
.ern-avatar--sm{width:36px;height:36px;font-size:13px}
.ern-avatar--md{width:44px;height:44px;font-size:15px}
.ern-avatar--lg{width:56px;height:56px;font-size:19px}
.ern-avatar--ring{box-shadow:0 0 0 2px var(--surface),0 0 0 4px var(--primary)}
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

function initials(name) {
  if (!name) return '';
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join('').toUpperCase();
}

/** Circular avatar — shows an image, or initials on the brand gradient. */
export function Avatar({ name, src, size = 'md', ring = false, className = '', ...rest }) {
  ensureStyles();
  const cls = ['ern-avatar', `ern-avatar--${size}`, ring ? 'ern-avatar--ring' : '', className]
    .filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {src ? <img src={src} alt={name || ''} /> : initials(name)}
    </span>
  );
}
