import React from 'react';

const styles = `
.ern-tabs { display: flex; }
.ern-tabs-pill { background: var(--ink-100); border-radius: var(--radius-full); padding: 3px; gap: 2px; }
.ern-tabs-underline { border-bottom: 2px solid var(--border); gap: 0; }
.ern-tab {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-body); font-size: 14px; font-weight: 600;
  cursor: pointer; border: none; background: transparent;
  transition: all var(--duration-fast) var(--ease-out);
}
.ern-tabs-pill .ern-tab { padding: 7px 16px; border-radius: var(--radius-full); color: var(--text-muted); }
.ern-tabs-pill .ern-tab-active { background: var(--surface); color: var(--primary); box-shadow: var(--shadow-sm); }
.ern-tabs-underline .ern-tab { padding: 10px 16px; color: var(--text-muted); border-bottom: 2px solid transparent; margin-bottom: -2px; }
.ern-tabs-underline .ern-tab-active { color: var(--primary); border-bottom-color: var(--primary); }
.ern-tab-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 18px; height: 18px; padding: 0 5px;
  border-radius: var(--radius-full); background: var(--primary-soft);
  color: var(--primary); font-size: 11px; font-weight: 700;
}
`;

export function Tabs({ tabs, value, onChange, variant = 'pill', className = '' }) {
  return (
    <>
      <style>{styles}</style>
      <div className={['ern-tabs', variant === 'pill' ? 'ern-tabs-pill' : 'ern-tabs-underline', className].filter(Boolean).join(' ')}>
        {tabs.map(tab => (
          <button
            key={tab.value}
            className={['ern-tab', value === tab.value ? 'ern-tab-active' : ''].filter(Boolean).join(' ')}
            onClick={() => onChange?.(tab.value)}
          >
            {tab.label}
            {tab.count !== undefined && <span className="ern-tab-count">{tab.count}</span>}
          </button>
        ))}
      </div>
    </>
  );
}
