import React from 'react';

/**
 * Dashboard stat panel. Value renders in the mono numeral face with tabular
 * figures. `delta` shows a colored month-over-month change.
 */
export function StatCard({ label, value, hint, delta, valueColor, className = '', style, ...rest }) {
  const deltaPositive = typeof delta === 'number' ? delta >= 0 : undefined;
  const deltaColor = deltaPositive === undefined
    ? 'var(--muted)'
    : deltaPositive ? 'var(--success)' : 'var(--destructive)';
  return (
    <article className={`stat-card ${className}`.trim()} style={style} {...rest}>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--muted-foreground)' }}>{label}</p>
      <p
        className="font-mono-stat"
        style={{ margin: '8px 0 0', fontSize: 26, fontWeight: 600, letterSpacing: '-0.01em', color: valueColor || 'var(--foreground)' }}
      >
        {value}
      </p>
      <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
        {typeof delta === 'number' ? (
          <span style={{ fontSize: 12, fontWeight: 700, color: deltaColor, fontFamily: 'var(--font-mono)' }}>
            {deltaPositive ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}%
          </span>
        ) : null}
        {hint ? <span style={{ fontSize: 12, color: 'var(--muted)' }}>{hint}</span> : null}
      </div>
    </article>
  );
}
