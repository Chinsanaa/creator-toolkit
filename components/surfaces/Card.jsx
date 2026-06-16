import React from 'react';

const styles = `
.ern-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.ern-card-sm { padding: 16px; }
.ern-card-md { padding: 24px; }
.ern-card-lg { padding: 32px; }
.ern-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
.ern-card-title { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-primary); }
.ern-card-subtitle { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
.ern-card-glass {
  background: rgba(255,255,255,0.7) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
.ern-card-interactive { cursor: pointer; transition: transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out); }
.ern-card-interactive:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
`;

export function Card({ children, title, subtitle, action, size = 'md', glass = false, interactive = false, className = '', onClick, ...props }) {
  return (
    <>
      <style>{styles}</style>
      <div
        className={['ern-card', `ern-card-${size}`, glass ? 'ern-card-glass' : '', interactive ? 'ern-card-interactive' : '', className].filter(Boolean).join(' ')}
        onClick={onClick}
        {...props}
      >
        {(title || action) && (
          <div className="ern-card-header">
            <div>
              {title && <div className="ern-card-title">{title}</div>}
              {subtitle && <div className="ern-card-subtitle">{subtitle}</div>}
            </div>
            {action && <div>{action}</div>}
          </div>
        )}
        {children}
      </div>
    </>
  );
}
