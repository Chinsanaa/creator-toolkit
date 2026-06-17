import React from 'react';

const STYLE_ID = 'earnio-tabs-styles';
const CSS = `
.ern-tabs{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-sans)}
.ern-tabs--pill{background:var(--surface-muted);border:1px solid var(--border);border-radius:var(--radius-full);padding:4px}
.ern-tabs--underline{gap:24px;border-bottom:1px solid var(--border);border-radius:0;padding:0}
.ern-tab{appearance:none;border:none;background:transparent;cursor:pointer;font-family:var(--font-sans);font-weight:600;font-size:14px;color:var(--text-muted);display:inline-flex;align-items:center;gap:7px;transition:color var(--dur-fast) var(--ease-out),background var(--dur-fast) var(--ease-out)}
.ern-tabs--pill .ern-tab{padding:8px 16px;border-radius:var(--radius-full);min-height:36px}
.ern-tabs--pill .ern-tab:hover{color:var(--text-strong)}
.ern-tabs--pill .ern-tab[aria-selected="true"]{background:var(--surface);color:var(--text-strong);box-shadow:var(--shadow-xs)}
.ern-tabs--underline .ern-tab{padding:10px 2px 13px;position:relative}
.ern-tabs--underline .ern-tab:hover{color:var(--text-strong)}
.ern-tabs--underline .ern-tab[aria-selected="true"]{color:var(--primary)}
.ern-tabs--underline .ern-tab[aria-selected="true"]::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--primary);border-radius:2px}
.ern-tab:focus-visible{outline:none;box-shadow:var(--focus-ring)}
.ern-tab__count{font-family:var(--font-mono);font-size:11px;background:var(--surface-sunken);color:var(--text-muted);border-radius:var(--radius-full);padding:1px 7px}
.ern-tab[aria-selected="true"] .ern-tab__count{background:var(--primary-soft);color:var(--primary)}
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

/** Tab switcher — `pill` (segmented) or `underline` style. Controlled via value/onChange. */
export function Tabs({ tabs = [], value, onChange, variant = 'pill', className = '', ...rest }) {
  ensureStyles();
  const active = value != null ? value : (tabs[0] && tabs[0].value);
  return (
    <div role="tablist" className={['ern-tabs', `ern-tabs--${variant}`, className].filter(Boolean).join(' ')} {...rest}>
      {tabs.map((t) => (
        <button
          key={t.value}
          role="tab"
          type="button"
          aria-selected={active === t.value}
          className="ern-tab"
          onClick={() => onChange && onChange(t.value)}
        >
          {t.label}
          {t.count != null ? <span className="ern-tab__count">{t.count}</span> : null}
        </button>
      ))}
    </div>
  );
}
