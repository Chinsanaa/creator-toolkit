import React from 'react';

const SIZE_MAP = { sm: 28, md: 36, lg: 44, xl: 56 };

const styles = `
.ern-avatar {
  border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-body); font-weight: 700; color: #fff;
  background: var(--gradient-brand); overflow: hidden; flex-shrink: 0;
}
.ern-avatar img { width: 100%; height: 100%; object-fit: cover; }
.ern-avatar-ring { box-shadow: 0 0 0 2px var(--surface), 0 0 0 4px var(--primary); }
`;

export function Avatar({ src, name, size = 'md', ring = false, className = '' }) {
  const px = SIZE_MAP[size] ?? 44;
  const initials = name ? name.trim().split(/\s+/).slice(0,2).map(w => w[0].toUpperCase()).join('') : '?';
  const fontSize = Math.round(px * 0.38);
  return (
    <>
      <style>{styles}</style>
      <span
        className={['ern-avatar', ring ? 'ern-avatar-ring' : '', className].filter(Boolean).join(' ')}
        style={{ width: px, height: px, fontSize }}
      >
        {src ? <img src={src} alt={name ?? ''} /> : initials}
      </span>
    </>
  );
}
