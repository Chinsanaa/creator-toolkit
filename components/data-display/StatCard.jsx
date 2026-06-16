import React from 'react';

const styles = `
.ern-stat-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius-lg); padding: 20px 24px;
  display: flex; flex-direction: column; gap: 4px;
  box-shadow: var(--shadow-sm);
  transition: border-color var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out);
}
.ern-stat-card:hover { border-color: var(--primary); box-shadow: var(--shadow-brand); }
.ern-stat-label { font-family: var(--font-body); font-size: 13px; color: var(--text-muted); font-weight: 500; }
.ern-stat-value { font-family: var(--font-mono); font-size: 28px; font-weight: 600; color: var(--text-primary); font-feature-settings: 'tnum' 1; line-height: 1.1; }
.ern-stat-delta { display: inline-flex; align-items: center; gap: 3px; font-size: 12px; font-weight: 600; }
.ern-stat-delta-up { color: var(--success); }
.ern-stat-delta-down { color: var(--danger); }
.ern-stat-hint { font-size: 12px; color: var(--text-muted); }
.ern-stat-icon { color: var(--primary); opacity: 0.7; }
`;

export function StatCard({ label, value, delta, deltaUp, hint, icon, className = '' }) {
  return (
    <>
      <style>{styles}</style>
      <div className={['ern-stat-card', className].filter(Boolean).join(' ')}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="ern-stat-label">{label}</span>
          {icon && <span className="ern-stat-icon">{icon}</span>}
        </div>
        <span className="ern-stat-value">{value}</span>
        {delta !== undefined && (
          <span className={['ern-stat-delta', deltaUp ? 'ern-stat-delta-up' : 'ern-stat-delta-down'].join(' ')}>
            {deltaUp ? '↑' : '↓'} {delta}
          </span>
        )}
        {hint && <span className="ern-stat-hint">{hint}</span>}
      </div>
    </>
  );
}
