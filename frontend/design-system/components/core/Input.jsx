import React from 'react';

let _id = 0;

/**
 * Labeled text input matching the Earnio auth/app field. Focus ring is a 3px
 * Earnio-Blue glow. Pass `error` to switch the border to danger.
 */
export function Input({ label, hint, error, id, className = '', style, ...rest }) {
  const inputId = id || `earnio-input-${++_id}`;
  return (
    <div style={{ width: '100%' }}>
      {label ? (
        <label htmlFor={inputId} style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={`input-touch ${className}`.trim()}
        style={{ borderColor: error ? 'var(--destructive)' : undefined, ...style }}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {error ? (
        <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--destructive)' }}>{error}</p>
      ) : hint ? (
        <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--muted)' }}>{hint}</p>
      ) : null}
    </div>
  );
}
