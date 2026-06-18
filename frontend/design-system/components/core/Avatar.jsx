import React from 'react';

const SIZES = { sm: 28, md: 36, lg: 48 };

function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Initial / image avatar. Defaults to the ink fill with white initials used
 * in the creator top bar.
 */
export function Avatar({ name = '', src, size = 'md', tone = 'ink', className = '', style, ...rest }) {
  const px = SIZES[size] || (typeof size === 'number' ? size : SIZES.md);
  const bg = tone === 'brand' ? 'var(--primary)' : 'var(--landing-fg)';
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: px, height: px, borderRadius: 'var(--radius-full)', overflow: 'hidden',
        background: src ? 'var(--surface)' : bg, color: '#fff',
        fontSize: px * 0.38, fontWeight: 600, fontFamily: 'var(--font-sans)', flexShrink: 0,
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        initials(name)
      )}
    </span>
  );
}
