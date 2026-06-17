/* @ds-bundle: {"format":3,"namespace":"EarnioDesignSystem_f806e6","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"ProgressBar","sourcePath":"components/data-display/ProgressBar.jsx"},{"name":"StatCard","sourcePath":"components/data-display/StatCard.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"dec5251eeb29","components/buttons/IconButton.jsx":"e150e12f3656","components/data-display/Avatar.jsx":"8f9508007dda","components/data-display/Badge.jsx":"83f2c785b058","components/data-display/ProgressBar.jsx":"41c8aa18a39f","components/data-display/StatCard.jsx":"b65b60e56be4","components/forms/Checkbox.jsx":"0d47e6e81847","components/forms/Input.jsx":"7053453d0edb","components/forms/Select.jsx":"5e9b71b17dad","components/forms/Switch.jsx":"e97aaeef169c","components/navigation/Tabs.jsx":"d8ef132e9b58","components/surfaces/Card.jsx":"43b184acd145","ui_kits/app/creator-app.jsx":"5426c4036409","ui_kits/ios/ios-app.jsx":"4970f742d45a","ui_kits/ios/ios-frame.jsx":"be3343be4b51","ui_kits/website/site-landing.jsx":"aa80ce6eaeef"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EarnioDesignSystem_f806e6 = window.EarnioDesignSystem_f806e6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'earnio-button-styles';
const CSS = `
.ern-btn{font-family:var(--font-sans);font-weight:600;border:1px solid transparent;border-radius:var(--radius-full);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;line-height:1;white-space:nowrap;text-decoration:none;-webkit-tap-highlight-color:transparent;transition:background var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out),box-shadow var(--dur-base) var(--ease-out),border-color var(--dur-fast) var(--ease-out)}
.ern-btn:focus-visible{outline:none;box-shadow:var(--focus-ring)}
.ern-btn:disabled,.ern-btn[aria-disabled="true"]{opacity:.5;cursor:not-allowed;pointer-events:none;box-shadow:none}
.ern-btn--full{width:100%}
.ern-btn--sm{font-size:13px;padding:8px 14px;min-height:36px}
.ern-btn--md{font-size:14px;padding:11px 20px;min-height:44px}
.ern-btn--lg{font-size:15px;padding:14px 26px;min-height:52px}
.ern-btn--primary{background:var(--primary);color:#fff;box-shadow:var(--shadow-brand)}
.ern-btn--primary:hover{background:var(--primary-hover)}
.ern-btn--primary:active{transform:scale(.97)}
.ern-btn--dark{background:var(--ink-900);color:#fff;box-shadow:var(--shadow-md)}
.ern-btn--dark:hover{background:var(--ink-800);transform:translateY(-1px)}
.ern-btn--dark:active{transform:translateY(0) scale(.98)}
.ern-btn--secondary{background:var(--surface);color:var(--text-strong);border-color:var(--border);box-shadow:var(--shadow-xs)}
.ern-btn--secondary:hover{background:var(--surface-muted);border-color:var(--border-strong)}
.ern-btn--secondary:active{transform:scale(.98)}
.ern-btn--ghost{background:transparent;color:var(--text-body)}
.ern-btn--ghost:hover{background:var(--surface-muted);color:var(--text-strong)}
.ern-btn__i{display:inline-flex;align-items:center;justify-content:center;width:1.15em;height:1.15em}
.ern-btn__i svg{width:100%;height:100%;display:block}
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

/**
 * Earnio Button — pill-shaped, four variants.
 * `primary` (solid blue, brand glow) is the app default; `dark` (ink pill) is
 * the marketing-site primary; `secondary` is a bordered white pill; `ghost` is text-only.
 */
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const cls = ['ern-btn', `ern-btn--${variant}`, `ern-btn--${size}`, fullWidth ? 'ern-btn--full' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls
  }, rest), leftIcon ? /*#__PURE__*/React.createElement("span", {
    className: "ern-btn__i",
    "aria-hidden": "true"
  }, leftIcon) : null, children, rightIcon ? /*#__PURE__*/React.createElement("span", {
    className: "ern-btn__i",
    "aria-hidden": "true"
  }, rightIcon) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'earnio-iconbutton-styles';
const CSS = `
.ern-iconbtn{font-family:var(--font-sans);border:1px solid transparent;border-radius:var(--radius-md);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;transition:background var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),color var(--dur-fast)}
.ern-iconbtn:focus-visible{outline:none;box-shadow:var(--focus-ring)}
.ern-iconbtn:disabled{opacity:.45;cursor:not-allowed;pointer-events:none}
.ern-iconbtn:active{transform:scale(.94)}
.ern-iconbtn--sm{width:36px;height:36px}
.ern-iconbtn--md{width:44px;height:44px}
.ern-iconbtn--lg{width:52px;height:52px}
.ern-iconbtn--solid{background:var(--primary);color:#fff;box-shadow:var(--shadow-brand)}
.ern-iconbtn--solid:hover{background:var(--primary-hover)}
.ern-iconbtn--outline{background:var(--surface);color:var(--text-strong);border-color:var(--border)}
.ern-iconbtn--outline:hover{background:var(--surface-muted);border-color:var(--border-strong)}
.ern-iconbtn--ghost{background:transparent;color:var(--text-muted)}
.ern-iconbtn--ghost:hover{background:var(--surface-muted);color:var(--text-strong)}
.ern-iconbtn svg{width:1.25em;height:1.25em;display:block;stroke-width:1.75}
.ern-iconbtn--sm{font-size:16px}.ern-iconbtn--md{font-size:18px}.ern-iconbtn--lg{font-size:20px}
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

/**
 * Square icon-only button for toolbars, top bars, and compact actions.
 * Always pass an accessible `aria-label`.
 */
function IconButton({
  variant = 'ghost',
  size = 'md',
  label,
  className = '',
  type = 'button',
  children,
  ...rest
}) {
  ensureStyles();
  const cls = ['ern-iconbtn', `ern-iconbtn--${variant}`, `ern-iconbtn--${size}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    "aria-label": label
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  return name.trim().split(/\s+/).slice(0, 2).map(p => p[0]).join('').toUpperCase();
}

/** Circular avatar — shows an image, or initials on the brand gradient. */
function Avatar({
  name,
  src,
  size = 'md',
  ring = false,
  className = '',
  ...rest
}) {
  ensureStyles();
  const cls = ['ern-avatar', `ern-avatar--${size}`, ring ? 'ern-avatar--ring' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || ''
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'earnio-badge-styles';
const CSS = `
.ern-badge{display:inline-flex;align-items:center;gap:5px;font-family:var(--font-sans);font-weight:600;font-size:12px;line-height:1;border-radius:var(--radius-full);padding:5px 10px;white-space:nowrap;border:1px solid transparent}
.ern-badge__dot{width:6px;height:6px;border-radius:50%;background:currentColor}
.ern-badge--neutral{background:var(--surface-muted);color:var(--text-body);border-color:var(--border)}
.ern-badge--brand{background:var(--primary-soft);color:var(--primary-press);border-color:var(--primary-border)}
.ern-badge--success{background:var(--success-soft);color:#0a7d5a}
.ern-badge--warning{background:var(--warning-soft);color:#9a6207}
.ern-badge--danger{background:var(--danger-soft);color:#b32134}
.ern-badge--solid{background:var(--primary);color:#fff}
.ern-badge--outline{background:transparent;color:var(--text-body);border-color:var(--border-strong)}
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

/** Small status pill / label. Use a `dot` for live statuses. */
function Badge({
  tone = 'neutral',
  dot = false,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['ern-badge', `ern-badge--${tone}`, className].filter(Boolean).join(' ')
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "ern-badge__dot",
    "aria-hidden": "true"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'earnio-progress-styles';
const CSS = `
.ern-progress{font-family:var(--font-sans)}
.ern-progress__head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:7px}
.ern-progress__label{font-size:13px;font-weight:600;color:var(--text-body)}
.ern-progress__val{font-family:var(--font-mono);font-size:12px;color:var(--text-muted)}
.ern-progress__track{height:8px;border-radius:var(--radius-full);background:var(--surface-sunken);overflow:hidden}
.ern-progress__fill{height:100%;border-radius:var(--radius-full);transition:width var(--dur-slow) var(--ease-out)}
.ern-progress__fill--brand{background:var(--gradient-spark)}
.ern-progress__fill--success{background:var(--success)}
.ern-progress__fill--warning{background:var(--warning)}
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

/** Slim progress bar — campaign budget filled, goal progress, sync status. */
function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = true,
  tone = 'brand',
  valueFormat,
  className = '',
  ...rest
}) {
  ensureStyles();
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const display = valueFormat ? valueFormat(value, max) : `${Math.round(pct)}%`;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['ern-progress', className].filter(Boolean).join(' ')
  }, rest), label || showValue ? /*#__PURE__*/React.createElement("div", {
    className: "ern-progress__head"
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "ern-progress__label"
  }, label) : /*#__PURE__*/React.createElement("span", null), showValue ? /*#__PURE__*/React.createElement("span", {
    className: "ern-progress__val"
  }, display) : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "ern-progress__track",
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": max
  }, /*#__PURE__*/React.createElement("span", {
    className: `ern-progress__fill ern-progress__fill--${tone}`,
    style: {
      width: `${pct}%`
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'earnio-statcard-styles';
const CSS = `
.ern-stat{position:relative;overflow:hidden;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:18px 20px;box-shadow:var(--shadow-sm);transition:border-color var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out);font-family:var(--font-sans)}
.ern-stat:hover{border-color:var(--primary-border);box-shadow:var(--shadow-md)}
.ern-stat__top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.ern-stat__label{font-size:13px;font-weight:600;color:var(--text-muted)}
.ern-stat__icon{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:var(--radius-md);background:var(--primary-soft);color:var(--primary)}
.ern-stat__icon svg{width:18px;height:18px;stroke-width:1.75}
.ern-stat__value{font-family:var(--font-mono);font-weight:600;font-size:28px;letter-spacing:-.02em;color:var(--text-strong);margin-top:12px;font-feature-settings:'tnum' 1}
.ern-stat__foot{display:flex;align-items:center;gap:7px;margin-top:8px;font-size:12px;color:var(--text-muted)}
.ern-stat__delta{display:inline-flex;align-items:center;gap:3px;font-weight:700}
.ern-stat__delta--up{color:var(--success)}
.ern-stat__delta--down{color:var(--danger)}
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

/** Dashboard metric card — label, big mono value, optional trend delta + icon. */
function StatCard({
  label,
  value,
  delta = null,
  trend = 'up',
  hint,
  icon = null,
  className = '',
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("article", _extends({
    className: ['ern-stat', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "ern-stat__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ern-stat__label"
  }, label), icon ? /*#__PURE__*/React.createElement("span", {
    className: "ern-stat__icon",
    "aria-hidden": "true"
  }, icon) : null), /*#__PURE__*/React.createElement("div", {
    className: "ern-stat__value"
  }, value), delta || hint ? /*#__PURE__*/React.createElement("div", {
    className: "ern-stat__foot"
  }, delta ? /*#__PURE__*/React.createElement("span", {
    className: `ern-stat__delta ern-stat__delta--${trend}`
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, trend === 'up' ? '▲' : '▼'), delta) : null, hint ? /*#__PURE__*/React.createElement("span", null, hint) : null) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'earnio-checkbox-styles';
const CSS = `
.ern-check{display:inline-flex;align-items:flex-start;gap:10px;font-family:var(--font-sans);cursor:pointer;user-select:none}
.ern-check input{position:absolute;opacity:0;width:0;height:0}
.ern-check__box{flex:none;width:20px;height:20px;border-radius:6px;border:1.5px solid var(--border-strong);background:var(--surface);display:inline-flex;align-items:center;justify-content:center;transition:background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out);margin-top:1px}
.ern-check__box svg{width:13px;height:13px;color:#fff;opacity:0;transform:scale(.6);transition:opacity var(--dur-fast),transform var(--dur-fast) var(--ease-spring)}
.ern-check input:checked + .ern-check__box{background:var(--primary);border-color:var(--primary)}
.ern-check input:checked + .ern-check__box svg{opacity:1;transform:scale(1)}
.ern-check input:focus-visible + .ern-check__box{box-shadow:var(--focus-ring)}
.ern-check input:disabled + .ern-check__box{opacity:.5}
.ern-check__label{font-size:14px;color:var(--text-body);line-height:1.4}
.ern-check__label strong{color:var(--text-strong);font-weight:600}
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

/** Checkbox with a custom blue box. Pass label text or rich children. */
function Checkbox({
  label,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("label", {
    className: ['ern-check', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ern-check__box",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), label || children ? /*#__PURE__*/React.createElement("span", {
    className: "ern-check__label"
  }, label || children) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'earnio-input-styles';
const CSS = `
.ern-field{display:flex;flex-direction:column;gap:7px;font-family:var(--font-sans)}
.ern-field__label{font-size:13px;font-weight:600;color:var(--text-strong)}
.ern-field__hint{font-size:12px;color:var(--text-muted)}
.ern-field__error{font-size:12px;color:var(--danger);font-weight:500}
.ern-input-wrap{position:relative;display:flex;align-items:center}
.ern-input-wrap__icon{position:absolute;left:14px;display:inline-flex;color:var(--text-faint);pointer-events:none}
.ern-input-wrap__icon svg{width:18px;height:18px;stroke-width:1.75}
.ern-input{width:100%;font-family:var(--font-sans);font-size:15px;color:var(--text-strong);background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:11px 14px;min-height:44px;outline:none;transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.ern-input::placeholder{color:var(--text-faint)}
.ern-input--icon{padding-left:42px}
.ern-input:hover{border-color:var(--border-strong)}
.ern-input:focus{border-color:var(--primary);box-shadow:var(--focus-ring)}
.ern-input:disabled{background:var(--surface-muted);color:var(--text-muted);cursor:not-allowed}
.ern-input--error{border-color:var(--danger)}
.ern-input--error:focus{box-shadow:0 0 0 3px var(--danger-soft)}
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

/** Labelled text input with optional leading icon, hint and error states. */
function Input({
  label,
  hint,
  error,
  icon = null,
  id,
  className = '',
  ...rest
}) {
  ensureStyles();
  const inputId = id || (label ? `ern-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const inputCls = ['ern-input', icon ? 'ern-input--icon' : '', error ? 'ern-input--error' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: "ern-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ern-field__label",
    htmlFor: inputId
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: "ern-input-wrap"
  }, icon ? /*#__PURE__*/React.createElement("span", {
    className: "ern-input-wrap__icon",
    "aria-hidden": "true"
  }, icon) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: inputCls,
    "aria-invalid": !!error
  }, rest))), error ? /*#__PURE__*/React.createElement("span", {
    className: "ern-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "ern-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'earnio-select-styles';
const CSS = `
.ern-select-field{display:flex;flex-direction:column;gap:7px;font-family:var(--font-sans)}
.ern-select-field__label{font-size:13px;font-weight:600;color:var(--text-strong)}
.ern-select-wrap{position:relative;display:flex;align-items:center}
.ern-select{width:100%;font-family:var(--font-sans);font-size:15px;color:var(--text-strong);background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:11px 40px 11px 14px;min-height:44px;outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
.ern-select:hover{border-color:var(--border-strong)}
.ern-select:focus{border-color:var(--primary);box-shadow:var(--focus-ring)}
.ern-select:disabled{background:var(--surface-muted);color:var(--text-muted);cursor:not-allowed}
.ern-select-wrap__chev{position:absolute;right:14px;pointer-events:none;color:var(--text-muted)}
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

/** Native select, styled to match Earnio inputs. Pass `options` or children. */
function Select({
  label,
  options,
  id,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const selId = id || (label ? `ern-sel-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: "ern-select-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ern-select-field__label",
    htmlFor: selId
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: "ern-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    className: ['ern-select', className].filter(Boolean).join(' ')
  }, rest), options ? options.map(o => {
    const value = typeof o === 'string' ? o : o.value;
    const lbl = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, lbl);
  }) : children), /*#__PURE__*/React.createElement("svg", {
    className: "ern-select-wrap__chev",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'earnio-switch-styles';
const CSS = `
.ern-switch{display:inline-flex;align-items:center;gap:10px;font-family:var(--font-sans);cursor:pointer;user-select:none}
.ern-switch input{position:absolute;opacity:0;width:0;height:0}
.ern-switch__track{flex:none;width:44px;height:26px;border-radius:var(--radius-full);background:var(--ink-200);position:relative;transition:background var(--dur-base) var(--ease-out)}
.ern-switch__thumb{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:var(--shadow-sm);transition:transform var(--dur-base) var(--ease-spring)}
.ern-switch input:checked + .ern-switch__track{background:var(--primary)}
.ern-switch input:checked + .ern-switch__track .ern-switch__thumb{transform:translateX(18px)}
.ern-switch input:focus-visible + .ern-switch__track{box-shadow:var(--focus-ring)}
.ern-switch input:disabled + .ern-switch__track{opacity:.5}
.ern-switch__label{font-size:14px;color:var(--text-body)}
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

/** Toggle switch with a springy thumb. */
function Switch({
  label,
  className = '',
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("label", {
    className: ['ern-switch', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ern-switch__track",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ern-switch__thumb"
  })), label ? /*#__PURE__*/React.createElement("span", {
    className: "ern-switch__label"
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Tabs({
  tabs = [],
  value,
  onChange,
  variant = 'pill',
  className = '',
  ...rest
}) {
  ensureStyles();
  const active = value != null ? value : tabs[0] && tabs[0].value;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    className: ['ern-tabs', `ern-tabs--${variant}`, className].filter(Boolean).join(' ')
  }, rest), tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.value,
    role: "tab",
    type: "button",
    "aria-selected": active === t.value,
    className: "ern-tab",
    onClick: () => onChange && onChange(t.value)
  }, t.label, t.count != null ? /*#__PURE__*/React.createElement("span", {
    className: "ern-tab__count"
  }, t.count) : null)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Card({
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
  const cls = ['ern-card', `ern-card--pad-${padding}`, rounded === 'xl' ? 'ern-card--xl' : '', glass ? 'ern-card--glass' : '', interactive ? 'ern-card--interactive' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), title || action ? /*#__PURE__*/React.createElement("div", {
    className: "ern-card__header"
  }, /*#__PURE__*/React.createElement("div", null, title ? /*#__PURE__*/React.createElement("h3", {
    className: "ern-card__title"
  }, title) : null, subtitle ? /*#__PURE__*/React.createElement("p", {
    className: "ern-card__sub"
  }, subtitle) : null), action) : null, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/creator-app.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
const DS = window.EarnioDesignSystem_f806e6;
const {
  Button,
  IconButton,
  Card,
  StatCard,
  Badge,
  Avatar,
  Tabs,
  Input,
  Select,
  ProgressBar,
  Switch
} = DS;

/* ---------- icons ---------- */
const I = {
  home: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.85",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M3 10.5 12 3l9 7.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 9.5V21h14V9.5"
  })),
  compass: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.85",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m15.5 8.5-2 5-5 2 2-5z"
  })),
  wallet: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.85",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 12h.01"
  })),
  layers: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.85",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "m12 2 9 5-9 5-9-5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m3 12 9 5 9-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m3 17 9 5 9-5"
  })),
  settings: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.85",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
  })),
  bell: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"
  })),
  search: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  trend: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.85",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M3 17l6-6 4 4 8-8M21 7h-5M21 7v5"
  })),
  calendar: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 2v4M8 2v4M3 10h18"
  })),
  plus: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  })),
  refresh: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.85",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 1 1-2.64-6.36M21 3v5h-5"
  })),
  check: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })),
  chevR: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "m9 6 6 6-6 6"
  })),
  arrowUp: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.1",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M7 17 17 7M9 7h8v8"
  })),
  shield: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M12 3 4 6v6c0 5 3.4 7.7 8 9 4.6-1.3 8-4 8-9V6z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 12 2 2 4-4"
  })),
  user: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"
  })),
  card: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "5",
    width: "20",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 10h20"
  })),
  globe: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"
  })),
  logout: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"
  })),
  eye: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }))
};
const Mark = ({
  size = 26
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 96 96",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M34 62 L62 34",
  stroke: "currentColor",
  strokeWidth: "9",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M44 34 H62 V52",
  stroke: "currentColor",
  strokeWidth: "9",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const PF = {
  tiktok: {
    name: 'TikTok',
    color: '#0B1220',
    icon: p => /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, p), /*#__PURE__*/React.createElement("path", {
      d: "M16.6 5.82a4.28 4.28 0 0 1-1.1-2.82h-3.2v12.6a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9.4a5.83 5.83 0 0 0-.78-.05A5.85 5.85 0 1 0 15.3 15.2V9.01a7.4 7.4 0 0 0 4.3 1.37V7.18a4.28 4.28 0 0 1-3-1.36z"
    }))
  },
  youtube: {
    name: 'YouTube',
    color: '#FF0033',
    icon: p => /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, p), /*#__PURE__*/React.createElement("path", {
      d: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.2zM9.8 15.3V8.7l5.7 3.3z"
    }))
  },
  instagram: {
    name: 'Instagram',
    color: '#C13584',
    icon: p => /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.9"
    }, p), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "4"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "17.3",
      cy: "6.7",
      r: "1",
      fill: "currentColor",
      stroke: "none"
    }))
  }
};

/* ---------- mock data ---------- */
const TREND = [1.4, 1.7, 1.5, 2.0, 1.9, 2.3, 2.1, 2.6, 2.2, 2.8, 2.5, 2.48];
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const BREAKDOWN = [{
  k: 'tiktok',
  amount: 6.2,
  pct: 50
}, {
  k: 'youtube',
  amount: 4.1,
  pct: 33
}, {
  k: 'instagram',
  amount: 2.1,
  pct: 17
}];
const RECENT = [{
  date: 'Jun 12',
  src: 'tiktok',
  label: 'Pop&Joy — UGC video',
  amt: 800000,
  type: 'Sponsorship'
}, {
  date: 'Jun 09',
  src: 'youtube',
  label: 'Ad revenue payout',
  amt: 420000,
  type: 'Earnings'
}, {
  date: 'Jun 05',
  src: 'instagram',
  label: 'Gobi Cashmere — reel',
  amt: 650000,
  type: 'Sponsorship'
}, {
  date: 'Jun 01',
  src: 'tiktok',
  label: 'Creator fund',
  amt: 180000,
  type: 'Earnings'
}];
const DEALS = [{
  brand: 'Maybee',
  title: 'Pop&Joy summer launch',
  budget: '₮800,000',
  platforms: ['tiktok', 'instagram'],
  deadline: '6 days',
  tag: 'Featured',
  desc: 'Film a 30s UGC video featuring the new Pop&Joy drink. Authentic, fun, summer vibes.'
}, {
  brand: 'Gobi',
  title: 'Cashmere autumn reel',
  budget: '₮1,200,000',
  platforms: ['instagram'],
  deadline: '12 days',
  tag: null,
  desc: 'One styled Instagram reel showcasing the new autumn cashmere collection.'
}, {
  brand: 'MCS Coca-Cola',
  title: 'Festival recap',
  budget: '₮650,000',
  platforms: ['tiktok', 'youtube'],
  deadline: '9 days',
  tag: null,
  desc: 'Recap the summer festival with energetic short-form content.'
}, {
  brand: 'Khan Bank',
  title: 'Student account explainer',
  budget: '₮900,000',
  platforms: ['youtube'],
  deadline: '15 days',
  tag: null,
  desc: 'A clear, friendly explainer of the new student account aimed at Gen-Z.'
}, {
  brand: 'Nomin',
  title: 'Grocery haul',
  budget: '₮500,000',
  platforms: ['tiktok'],
  deadline: '4 days',
  tag: null,
  desc: 'A fast, fun grocery haul featuring Nomin supermarket finds.'
}, {
  brand: 'UBeats',
  title: 'Headphone unboxing',
  budget: '₮720,000',
  platforms: ['youtube', 'instagram'],
  deadline: '20 days',
  tag: 'New',
  desc: 'Unbox and review the new wireless headphones for a young audience.'
}];
const TX = [{
  date: 'Jun 12',
  type: 'Sponsorship',
  label: 'Pop&Joy — UGC video',
  amt: 640000,
  credit: true,
  status: 'completed'
}, {
  date: 'Jun 10',
  type: 'Payout',
  label: 'Withdrawal · Khan Bank',
  amt: 1000000,
  credit: false,
  status: 'pending'
}, {
  date: 'Jun 09',
  type: 'Earnings',
  label: 'YouTube ad revenue',
  amt: 420000,
  credit: true,
  status: 'completed'
}, {
  date: 'Jun 05',
  type: 'Sponsorship',
  label: 'Gobi Cashmere — reel',
  amt: 520000,
  credit: true,
  status: 'completed'
}, {
  date: 'Jun 01',
  type: 'Fee',
  label: 'Platform fee (20%)',
  amt: 160000,
  credit: false,
  status: 'completed'
}];
const fmt = n => '₮' + n.toLocaleString('en-US');
const PLATFORMS = [{
  k: 'tiktok',
  handle: '@bolderdene',
  followers: '142K',
  month: 6.2,
  growth: '+8.4%',
  synced: true,
  posts: 24
}, {
  k: 'youtube',
  handle: 'Bold-Erdene',
  followers: '38.5K',
  month: 4.1,
  growth: '+3.1%',
  synced: true,
  posts: 6
}, {
  k: 'instagram',
  handle: '@bold.erdene',
  followers: '76.2K',
  month: 2.1,
  growth: '+12.6%',
  synced: true,
  posts: 18
}];

/* ---------- shell ---------- */
const NAV = [{
  k: 'dashboard',
  label: 'Dashboard',
  icon: 'home'
}, {
  k: 'explore',
  label: 'Explore',
  icon: 'compass'
}, {
  k: 'wallet',
  label: 'Wallet',
  icon: 'wallet'
}, {
  k: 'platforms',
  label: 'Platforms',
  icon: 'layers'
}, {
  k: 'settings',
  label: 'Settings',
  icon: 'settings'
}];
function Sidebar({
  page,
  setPage
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 248,
      flex: 'none',
      borderRight: '1px solid var(--border)',
      background: 'color-mix(in srgb, var(--surface) 75%, transparent)',
      backdropFilter: 'blur(14px)',
      padding: '22px 16px',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh'
    },
    className: "app-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 8px 22px',
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)'
    }
  }, "Earnio")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      flex: 1
    }
  }, NAV.map(n => {
    const active = page === n.k;
    return /*#__PURE__*/React.createElement("button", {
      key: n.k,
      onClick: () => setPage(n.k),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '11px 14px',
        borderRadius: 'var(--radius-full)',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 14,
        background: active ? 'var(--ink-900)' : 'transparent',
        color: active ? '#fff' : 'var(--text-muted)',
        boxShadow: active ? 'var(--shadow-md)' : 'none',
        transition: 'background .18s, color .18s'
      },
      onMouseEnter: e => {
        if (!active) {
          e.currentTarget.style.background = 'var(--surface-muted)';
          e.currentTarget.style.color = 'var(--text-strong)';
        }
      },
      onMouseLeave: e => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--text-muted)';
        }
      }
    }, I[n.icon]({
      width: 19,
      height: 19
    }), n.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)',
      paddingTop: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Bold Erdene",
    size: "sm",
    ring: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 700,
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "Bold-Erdene"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "Creator"))));
}
function Topbar({
  title,
  toast
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 28px',
      borderBottom: '1px solid var(--border)',
      background: 'color-mix(in srgb, var(--surface) 70%, transparent)',
      backdropFilter: 'blur(14px)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 19,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--text-faint)'
    }
  }, I.search({
    width: 17,
    height: 17
  })), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search",
    style: {
      width: 200,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      padding: '9px 14px 9px 34px',
      borderRadius: 'var(--radius-full)',
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      outline: 'none',
      color: 'var(--text-strong)'
    },
    className: "app-search"
  })), /*#__PURE__*/React.createElement(IconButton, {
    variant: "outline",
    label: "Notifications"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative'
    }
  }, I.bell({
    width: 19,
    height: 19
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -2,
      right: -2,
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--danger)',
      border: '1.5px solid var(--surface)'
    }
  }))), /*#__PURE__*/React.createElement(Avatar, {
    name: "Bold Erdene",
    size: "sm"
  })), toast ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 74,
      right: 28,
      zIndex: 60,
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      background: 'var(--ink-900)',
      color: '#fff',
      padding: '11px 16px',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      fontSize: 14,
      fontWeight: 600,
      animation: 'ern-toast .3s var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--success)'
    }
  }, I.trend({
    width: 16,
    height: 16
  })), toast) : null);
}

/* ---------- page header ---------- */
function PageHeader({
  eyebrow,
  title,
  subtitle,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--primary)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: '-0.03em',
      color: 'var(--text-strong)',
      margin: '7px 0 0'
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      color: 'var(--text-muted)',
      margin: '6px 0 0'
    }
  }, subtitle) : null), action);
}

/* ---------- Dashboard ---------- */
function Dashboard({
  go
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: 'ern-fade .4s var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Creator dashboard",
    title: "Welcome back, Bold-Erdene",
    subtitle: "Here's how your earnings are tracking this month.",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      leftIcon: I.refresh({})
    }, "Sync earnings")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.35fr 1fr',
      gap: 16,
      marginBottom: 16
    },
    className: "app-grid-2"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'var(--radius-xl)',
      padding: '26px 28px',
      background: 'var(--gradient-ink)',
      color: '#fff',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(ellipse 50% 90% at 90% 0%, rgba(46,91,255,.55) 0%, transparent 60%),radial-gradient(ellipse 40% 80% at 4% 100%, rgba(18,194,243,.28) 0%, transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: 'rgba(255,255,255,.7)',
      fontWeight: 600
    }
  }, "Available balance"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 12.5,
      fontWeight: 700,
      fontFamily: 'var(--font-mono)',
      background: 'rgba(255,255,255,.14)',
      borderRadius: 999,
      padding: '5px 11px'
    }
  }, I.trend({
    width: 13,
    height: 13
  }), " 18.2%")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 600,
      fontSize: 42,
      letterSpacing: '-0.02em',
      margin: '8px 0 0'
    }
  }, "\u20AE2,100,000"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      marginTop: 12,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(255,255,255,.75)'
    }
  }, "Pending ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: '#fff'
    }
  }, "\u20AE1.0M")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(255,255,255,.75)'
    }
  }, "Earned all-time ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: '#fff'
    }
  }, "\u20AE12.4M"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 11,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('wallet'),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      background: '#fff',
      color: 'var(--ink-900)',
      border: 'none',
      borderRadius: 999,
      padding: '11px 20px',
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, I.arrowUp({
    width: 16,
    height: 16
  }), "Withdraw"), /*#__PURE__*/React.createElement("button", {
    onClick: () => go('explore'),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      background: 'rgba(255,255,255,.16)',
      color: '#fff',
      border: 'none',
      borderRadius: 999,
      padding: '11px 20px',
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, "Find deals")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "This month",
    value: "\u20AE2.48M",
    delta: "18.2%",
    trend: "up",
    hint: "vs \u20AE2.1M"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Total earnings",
    value: "\u20AE12.4M",
    hint: "All time",
    icon: I.wallet({})
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Active deals",
    value: "4",
    hint: "2 awaiting review"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Connected",
    value: "3",
    hint: "All platforms synced",
    icon: I.layers({})
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 16,
      marginBottom: 16
    },
    className: "app-grid-2"
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Monthly earnings",
    subtitle: "Last 12 months (\u20AEM)",
    action: /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      dot: true
    }, "+18%")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 8,
      height: 180,
      marginTop: 8
    }
  }, TREND.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: v / 3 * 160,
      borderRadius: '6px 6px 3px 3px',
      background: i === TREND.length - 1 ? 'var(--gradient-spark)' : 'var(--blue-100)',
      transition: 'height .3s'
    },
    title: '₮' + v + 'M'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      color: 'var(--text-faint)',
      fontFamily: 'var(--font-mono)'
    }
  }, MONTHS[i]))))), /*#__PURE__*/React.createElement(Card, {
    title: "By platform",
    subtitle: "This month"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      marginTop: 4
    }
  }, BREAKDOWN.map(b => {
    const p = PF[b.k];
    return /*#__PURE__*/React.createElement("div", {
      key: b.k
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: p.color,
        display: 'inline-flex'
      }
    }, p.icon({
      width: 18,
      height: 18
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, p.name), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-body)'
      }
    }, "\u20AE", b.amount, "M")), /*#__PURE__*/React.createElement(ProgressBar, {
      value: b.pct,
      showValue: false
    }));
  })))), /*#__PURE__*/React.createElement(Card, {
    title: "Recent earnings",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "View all")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, RECENT.map((r, i) => {
    const p = PF[r.src];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '13px 0',
        borderTop: i ? '1px solid var(--border)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 'none',
        width: 38,
        height: 38,
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-muted)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: p.color
      }
    }, p.icon({
      width: 18,
      height: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14.5,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, r.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: 'var(--text-muted)'
      }
    }, r.type, " \xB7 ", r.date)), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: 14.5,
        fontWeight: 600,
        color: 'var(--success)'
      }
    }, "+", fmt(r.amt)));
  }))));
}

/* ---------- Explore ---------- */
function Explore({
  onApply,
  applied
}) {
  const [tab, setTab] = React.useState('all');
  const [q, setQ] = React.useState('');
  const filtered = DEALS.filter(d => {
    const okTab = tab === 'all' || d.platforms.includes(tab);
    const okQ = !q || (d.title + d.brand).toLowerCase().includes(q.toLowerCase());
    return okTab && okQ;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: 'ern-fade .4s var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Sponsorships",
    title: "Explore brand deals",
    subtitle: `${filtered.length} opportunities available right now.`,
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, "My applications")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: 22,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      minWidth: 240
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--text-faint)'
    }
  }, I.search({
    width: 18,
    height: 18
  })), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search campaigns and brands",
    style: {
      width: '100%',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      padding: '12px 16px 12px 42px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      outline: 'none',
      color: 'var(--text-strong)'
    }
  })), /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    value: tab,
    onChange: setTab,
    tabs: [{
      value: 'all',
      label: 'All'
    }, {
      value: 'tiktok',
      label: 'TikTok'
    }, {
      value: 'youtube',
      label: 'YouTube'
    }, {
      value: 'instagram',
      label: 'Instagram'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16
    },
    className: "app-grid3"
  }, filtered.map((d, i) => {
    const isApplied = applied.includes(d.title);
    return /*#__PURE__*/React.createElement(Card, {
      key: i,
      padding: "lg",
      interactive: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 'var(--radius-md)',
        background: 'var(--gradient-brand)',
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 16
      }
    }, d.brand[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)',
        fontWeight: 600
      }
    }, d.brand), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 15.5,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, d.title)), d.tag ? /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "brand"
    }, d.tag)) : null), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13.5,
        lineHeight: 1.55,
        color: 'var(--text-muted)',
        margin: '0 0 16px',
        minHeight: 42
      }
    }, d.desc), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16
      }
    }, d.platforms.map(k => /*#__PURE__*/React.createElement("span", {
      key: k,
      style: {
        color: PF[k].color,
        display: 'inline-flex'
      }
    }, PF[k].icon({
      width: 17,
      height: 17
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontSize: 12.5,
        color: 'var(--text-faint)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4
      }
    }, I.calendar({
      width: 14,
      height: 14
    }), d.deadline)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        paddingTop: 14,
        borderTop: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 17,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, d.budget), isApplied ? /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      dot: true
    }, "Applied") : /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      onClick: () => onApply(d.title)
    }, "Apply now")));
  })));
}

/* ---------- Wallet ---------- */
function Wallet({
  onPayout
}) {
  const [amount, setAmount] = React.useState('');
  const [bank, setBank] = React.useState('Khan Bank ••4821');
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: 'ern-fade .4s var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Wallet",
    title: "Your balance & payouts",
    subtitle: "Withdraw earnings to a Mongolian bank account in MNT."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16,
      marginBottom: 22
    },
    className: "app-grid4"
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Available to withdraw",
    value: "\u20AE2.1M",
    hint: "Ready now",
    icon: I.wallet({})
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Pending payouts",
    value: "\u20AE1.0M",
    hint: "Processing transfers"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Total earned",
    value: "\u20AE12.4M",
    hint: "All time"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Fees paid",
    value: "\u20AE2.48M",
    hint: "20% on sponsorships"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginBottom: 22
    },
    className: "app-grid-2"
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Request payout",
    subtitle: "Minimum \u20AE50,000"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Amount (MNT)",
    inputMode: "numeric",
    value: amount,
    onChange: e => setAmount(e.target.value),
    placeholder: "0"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Bank account",
    value: bank,
    onChange: e => setBank(e.target.value),
    options: ['Khan Bank ••4821', 'Golomt Bank ••0192', 'XacBank ••7733']
  }), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 13.5,
      color: 'var(--success)',
      fontWeight: 600
    }
  }, I.trend({
    width: 16,
    height: 16
  }), "Payout requested \u2014 processing to ", bank, ".") : null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      setSent(true);
      onPayout();
    }
  }, "Request payout"))), /*#__PURE__*/React.createElement(Card, {
    title: "Bank accounts",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "Add")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      marginTop: 4
    }
  }, [['Khan Bank', '••4821', true], ['Golomt Bank', '••0192', false], ['XacBank', '••7733', false]].map(([n, num, def], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 14px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-muted)',
      border: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--primary)'
    }
  }, I.wallet({
    width: 17,
    height: 17
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)'
    }
  }, num)), def ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "Default")) : /*#__PURE__*/React.createElement("button", {
    style: {
      marginLeft: 'auto',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--text-link)',
      fontWeight: 600,
      fontSize: 13,
      fontFamily: 'var(--font-sans)'
    }
  }, "Set default")))))), /*#__PURE__*/React.createElement(Card, {
    title: "Transaction history"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      textAlign: 'left',
      color: 'var(--text-muted)'
    }
  }, ['Date', 'Type', 'Description', 'Status', 'Amount'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: '6px 10px 12px',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      textAlign: i === 4 ? 'right' : 'left'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, TX.map((t, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '13px 10px',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)',
      fontSize: 13
    }
  }, t.date), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '13px 10px',
      color: 'var(--text-body)',
      fontWeight: 600
    }
  }, t.type), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '13px 10px',
      color: 'var(--text-muted)'
    }
  }, t.label), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '13px 10px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: t.status === 'pending' ? 'warning' : 'success',
    dot: true
  }, t.status === 'pending' ? 'Pending' : 'Completed')), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '13px 10px',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontWeight: 600,
      color: t.credit ? 'var(--success)' : 'var(--text-strong)'
    }
  }, t.credit ? '+' : '−', fmt(t.amt)))))))));
}

/* ---------- Platforms ---------- */
function Platforms({
  fireToast
}) {
  const [syncing, setSyncing] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: 'ern-fade .4s var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Connections",
    title: "Your platforms",
    subtitle: "Sync TikTok, YouTube and Instagram to pull earnings and audience data automatically.",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      leftIcon: I.plus({})
    }, "Connect new")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16,
      marginBottom: 22
    },
    className: "app-grid3"
  }, PLATFORMS.map(pl => {
    const p = PF[pl.k];
    const busy = syncing === pl.k;
    return /*#__PURE__*/React.createElement(Card, {
      key: pl.k,
      padding: "lg"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 46,
        height: 46,
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-muted)',
        border: '1px solid var(--border)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: p.color
      }
    }, p.icon({
      width: 24,
      height: 24
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 16,
        fontWeight: 700,
        color: 'var(--text-strong)'
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)'
      }
    }, pl.handle)), /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      dot: true
    }, "Synced")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        padding: '11px 13px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-muted)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--text-muted)',
        fontWeight: 600
      }
    }, "Followers"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 17,
        fontWeight: 600,
        color: 'var(--text-strong)',
        marginTop: 2
      }
    }, pl.followers)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        padding: '11px 13px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-muted)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--text-muted)',
        fontWeight: 600
      }
    }, "This month"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 17,
        fontWeight: 600,
        color: 'var(--text-strong)',
        marginTop: 2
      }
    }, "\u20AE", pl.month, "M"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        paddingTop: 14,
        borderTop: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--success)',
        fontWeight: 600
      }
    }, pl.growth, " growth"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      leftIcon: I.refresh({
        style: busy ? {
          animation: 'ern-spin 1s linear infinite'
        } : null
      }),
      onClick: () => {
        setSyncing(pl.k);
        setTimeout(() => {
          setSyncing(null);
          fireToast(p.name + ' synced');
        }, 1100);
      }
    }, busy ? 'Syncing…' : 'Sync now')));
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Audience by platform",
    subtitle: "Share of total reach"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      marginTop: 4
    }
  }, [['tiktok', 54], ['instagram', 29], ['youtube', 17]].map(([k, pct]) => {
    const p = PF[k];
    return /*#__PURE__*/React.createElement("div", {
      key: k
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: p.color,
        display: 'inline-flex'
      }
    }, p.icon({
      width: 18,
      height: 18
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, p.name), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-body)'
      }
    }, pct, "%")), /*#__PURE__*/React.createElement(ProgressBar, {
      value: pct,
      showValue: false
    }));
  }))));
}

/* ---------- Settings ---------- */
function SettingsRow({
  icon,
  title,
  desc,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '15px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 38,
      height: 38,
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-muted)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-body)'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, title), desc ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, desc) : null), children);
}
function Settings({
  onLogout
}) {
  const [notif, setNotif] = React.useState({
    deals: true,
    payouts: true,
    weekly: false
  });
  const section = {
    fontSize: 12.5,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    margin: '0 0 12px'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: 'ern-fade .4s var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Settings",
    title: "Account settings",
    subtitle: "Manage your profile, notifications and security."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      alignItems: 'start'
    },
    className: "app-grid-2"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: section
  }, "Profile"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Bold Erdene",
    size: "lg",
    ring: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Bold-Erdene"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "@bolderdene \xB7 Creator")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "Change photo")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Display name",
    defaultValue: "Bold-Erdene"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    defaultValue: "bold@earnio.mn"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Language",
    options: ['English', 'Монгол']
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "Save changes"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: section
  }, "Notifications"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, [['deals', I.layers, 'New brand deals', 'When a campaign matches your niche'], ['payouts', I.wallet, 'Payout updates', 'Status of your withdrawals'], ['weekly', I.calendar, 'Weekly summary', 'Earnings recap every Monday']].map(([key, ic, t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: key,
    style: {
      borderTop: i ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    icon: ic({
      width: 18,
      height: 18
    }),
    title: t,
    desc: d
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: notif[key],
    onChange: () => setNotif(n => ({
      ...n,
      [key]: !n[key]
    }))
  })))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: section
  }, "Security"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    icon: I.shield({
      width: 18,
      height: 18
    }),
    title: "Two-factor authentication",
    desc: "Add an extra layer of security"
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    dot: true
  }, "On")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    icon: I.eye({
      width: 18,
      height: 18
    }),
    title: "Password",
    desc: "Last changed 2 months ago"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Update"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(SettingsRow, {
    icon: I.card({
      width: 18,
      height: 18
    }),
    title: "Payout method",
    desc: "Khan Bank \xB7\xB74821"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Manage")))), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    style: {
      width: '100%',
      marginTop: 16,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '12px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      color: 'var(--danger)',
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, I.logout({
    width: 18,
    height: 18
  }), "Log out")))));
}

/* ---------- root ---------- */
function EarnioApp() {
  const [page, setPage] = React.useState('dashboard');
  const [applied, setApplied] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => {
    const s = document.createElement('style');
    s.textContent = '@keyframes ern-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@keyframes ern-toast{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}@keyframes ern-spin{to{transform:rotate(360deg)}}@media(max-width:1000px){.app-sidebar{display:none!important}.app-grid4{grid-template-columns:repeat(2,1fr)!important}.app-grid-2,.app-grid3{grid-template-columns:1fr!important}}';
    document.head.appendChild(s);
  }, []);
  const fireToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };
  const titles = {
    dashboard: 'Dashboard',
    explore: 'Explore',
    wallet: 'Wallet',
    platforms: 'Platforms',
    settings: 'Settings'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    page: page,
    setPage: setPage
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, var(--bg-page) 0%, var(--surface) 60%)'
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    title: titles[page],
    toast: toast
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: '26px 28px 60px',
      maxWidth: 1180,
      width: '100%',
      margin: '0 auto'
    }
  }, page === 'dashboard' && /*#__PURE__*/React.createElement(Dashboard, {
    go: setPage
  }), page === 'explore' && /*#__PURE__*/React.createElement(Explore, {
    applied: applied,
    onApply: t => {
      setApplied(a => [...a, t]);
      fireToast('Application sent to ' + t.split(' ')[0] + '!');
    }
  }), page === 'wallet' && /*#__PURE__*/React.createElement(Wallet, {
    onPayout: () => fireToast('Payout requested!')
  }), page === 'platforms' && /*#__PURE__*/React.createElement(Platforms, {
    fireToast: fireToast
  }), page === 'settings' && /*#__PURE__*/React.createElement(Settings, {
    onLogout: () => fireToast('Logged out')
  }))));
}
window.EarnioApp = EarnioApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/creator-app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios/ios-app.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
const DS = window.EarnioDesignSystem_f806e6;
const {
  Button,
  Badge,
  Avatar,
  ProgressBar
} = DS;
const {
  IOSDevice
} = window;

/* ---------- icons ---------- */
const I = {
  home: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M3 10.5 12 3l9 7.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 9.5V21h14V9.5"
  })),
  compass: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m15.5 8.5-2 5-5 2 2-5z"
  })),
  wallet: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 12h.01"
  })),
  user: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"
  })),
  bell: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.85",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"
  })),
  search: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.85",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  trend: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M3 17l6-6 4 4 8-8M21 7h-5M21 7v5"
  })),
  arrow: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.1",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  })),
  arrowUp: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.1",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M7 17 17 7M9 7h8v8"
  })),
  calendar: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 2v4M8 2v4M3 10h18"
  })),
  check: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })),
  chevR: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "m9 6 6 6-6 6"
  })),
  cog: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2l-.4-2.6H8.9l-.4 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 4 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2l.4 2.6h6.2l.4-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z"
  })),
  card: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "5",
    width: "20",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 10h20"
  })),
  help: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.7-2.5 2-2.5 3.5M12 17h.01"
  })),
  logout: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"
  }))
};
const Mark = ({
  size = 26,
  color
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 96 96",
  fill: "none",
  "aria-hidden": "true",
  style: {
    color
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M34 62 L62 34",
  stroke: "currentColor",
  strokeWidth: "9",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M44 34 H62 V52",
  stroke: "currentColor",
  strokeWidth: "9",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const PF = {
  tiktok: {
    name: 'TikTok',
    color: '#0B1220',
    icon: p => /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, p), /*#__PURE__*/React.createElement("path", {
      d: "M16.6 5.82a4.28 4.28 0 0 1-1.1-2.82h-3.2v12.6a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9.4a5.83 5.83 0 0 0-.78-.05A5.85 5.85 0 1 0 15.3 15.2V9.01a7.4 7.4 0 0 0 4.3 1.37V7.18a4.28 4.28 0 0 1-3-1.36z"
    }))
  },
  youtube: {
    name: 'YouTube',
    color: '#FF0033',
    icon: p => /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, p), /*#__PURE__*/React.createElement("path", {
      d: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.2zM9.8 15.3V8.7l5.7 3.3z"
    }))
  },
  instagram: {
    name: 'Instagram',
    color: '#C13584',
    icon: p => /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.9"
    }, p), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "4"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "17.3",
      cy: "6.7",
      r: "1",
      fill: "currentColor",
      stroke: "none"
    }))
  }
};
const TREND = [1.4, 1.7, 1.5, 2.0, 1.9, 2.3, 2.1, 2.6, 2.2, 2.8, 2.5, 2.48];
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const DEALS = [{
  brand: 'Maybee',
  title: 'Pop&Joy summer launch',
  budget: '₮800,000',
  platforms: ['tiktok', 'instagram'],
  deadline: '6d',
  tag: 'Featured'
}, {
  brand: 'Gobi',
  title: 'Cashmere autumn reel',
  budget: '₮1,200,000',
  platforms: ['instagram'],
  deadline: '12d',
  tag: null
}, {
  brand: 'MCS',
  title: 'Festival recap',
  budget: '₮650,000',
  platforms: ['tiktok', 'youtube'],
  deadline: '9d',
  tag: null
}, {
  brand: 'Nomin',
  title: 'Grocery haul',
  budget: '₮500,000',
  platforms: ['tiktok'],
  deadline: '4d',
  tag: 'New'
}];
const TX = [{
  date: 'Jun 12',
  label: 'Pop&Joy — UGC video',
  amt: 640000,
  credit: true,
  status: 'Completed'
}, {
  date: 'Jun 10',
  label: 'Withdrawal · Khan Bank',
  amt: 1000000,
  credit: false,
  status: 'Pending'
}, {
  date: 'Jun 09',
  label: 'YouTube ad revenue',
  amt: 420000,
  credit: true,
  status: 'Completed'
}, {
  date: 'Jun 05',
  label: 'Gobi Cashmere — reel',
  amt: 520000,
  credit: true,
  status: 'Completed'
}];
const fmt = n => '₮' + n.toLocaleString('en-US');

/* ===== shared styles ===== */
const DISPLAY = 'var(--font-display)';
const SANS = 'var(--font-sans)';
const MONO = 'var(--font-mono)';
const TOP = 60; // status-bar safe area
const card = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 20,
  boxShadow: 'var(--shadow-sm)'
};

/* ===== app header ===== */
function AppHeader({
  kicker,
  title,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `${TOP}px 20px 10px`,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, kicker ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, kicker) : null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: DISPLAY,
      fontSize: 27,
      fontWeight: 700,
      letterSpacing: '-0.03em',
      color: 'var(--text-strong)',
      margin: '2px 0 0'
    }
  }, title)), right);
}
function RoundIcon({
  children,
  onClick,
  badge
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      position: 'relative',
      width: 42,
      height: 42,
      borderRadius: 14,
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      color: 'var(--text-strong)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: 'var(--shadow-xs)'
    }
  }, children, badge ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 8,
      right: 9,
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--danger)',
      border: '1.5px solid var(--surface)'
    }
  }) : null);
}

/* ===== bottom tab bar ===== */
const TABS = [['home', 'Home', 'home'], ['explore', 'Explore', 'compass'], ['wallet', 'Wallet', 'wallet'], ['profile', 'Profile', 'user']];
function TabBar({
  tab,
  setTab
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      padding: '8px 14px 30px',
      background: 'color-mix(in srgb, var(--surface) 82%, transparent)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderTop: '1px solid var(--border)',
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)'
    }
  }, TABS.map(([k, label, icon]) => {
    const active = tab === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setTab(k),
      style: {
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '6px 0',
        color: active ? 'var(--primary)' : 'var(--text-faint)'
      }
    }, I[icon]({
      width: 23,
      height: 23
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: SANS,
        fontSize: 11,
        fontWeight: active ? 700 : 600
      }
    }, label));
  }));
}

/* ===== ONBOARDING ===== */
const SLIDES = [{
  title: 'Track every ₮ you earn',
  sub: 'See revenue from TikTok, YouTube and Instagram in one clean dashboard.',
  visual: 'earnings'
}, {
  title: 'Land brand deals',
  sub: 'Browse sponsorships from Mongolian brands and apply in a tap — no cold DMs.',
  visual: 'deal'
}, {
  title: 'Get paid in MNT',
  sub: 'Withdraw straight to Khan Bank, Golomt or XacBank. Your money, your way.',
  visual: 'payout'
}];
function OnboardVisual({
  kind
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 300",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      color: 'var(--blue-200)'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "200",
    cy: "150",
    rx: "150",
    ry: "110",
    stroke: "currentColor",
    strokeWidth: "1.2",
    strokeDasharray: "3 9",
    fill: "none"
  })), kind === 'earnings' && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 250,
      ...card,
      borderRadius: 26,
      boxShadow: 'var(--shadow-xl)',
      padding: 20,
      transform: 'rotate(-3deg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--text-muted)'
    }
  }, "This month"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--success)',
      fontWeight: 700,
      fontSize: 12.5,
      fontFamily: MONO
    }
  }, "\u25B2 18.2%")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontWeight: 600,
      fontSize: 27,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      marginTop: 5
    }
  }, "\u20AE2,480,000"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 5,
      height: 48,
      marginTop: 14
    }
  }, [40, 55, 46, 68, 60, 82, 74, 98].map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: h + '%',
      borderRadius: 4,
      background: i === 7 ? 'var(--gradient-spark)' : 'var(--blue-100)'
    }
  })))), kind === 'deal' && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 250,
      ...card,
      borderRadius: 26,
      boxShadow: 'var(--shadow-xl)',
      padding: 18,
      transform: 'rotate(2deg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: 'var(--gradient-brand)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: DISPLAY,
      fontWeight: 700
    }
  }, "M"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, "Maybee"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: DISPLAY,
      fontSize: 14.5,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Pop&Joy launch"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 12,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "\u20AE800,000"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: '#fff',
      background: 'var(--primary)',
      borderRadius: 999,
      padding: '5px 12px'
    }
  }, "Apply"))), kind === 'payout' && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 250,
      borderRadius: 26,
      boxShadow: 'var(--shadow-xl)',
      padding: 22,
      transform: 'rotate(-2deg)',
      background: 'var(--gradient-ink)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(ellipse 60% 80% at 90% 0%, rgba(46,91,255,.5) 0%, transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'rgba(255,255,255,.65)',
      fontWeight: 600
    }
  }, "Available balance"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontWeight: 600,
      fontSize: 26,
      marginTop: 4
    }
  }, "\u20AE2,100,000"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 16,
      background: '#fff',
      color: 'var(--ink-900)',
      borderRadius: 999,
      padding: '9px 14px',
      fontWeight: 700,
      fontSize: 13.5,
      width: 'fit-content'
    }
  }, I.arrowUp({
    width: 16,
    height: 16
  }), "Withdraw to Khan Bank"))));
}
function Onboarding({
  onDone,
  onLogin
}) {
  const [i, setI] = React.useState(0);
  const last = i === SLIDES.length - 1;
  const s = SLIDES[i];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-page)',
      backgroundImage: 'radial-gradient(ellipse 60% 35% at 20% 4%, var(--mesh-1) 0%, transparent 60%),radial-gradient(ellipse 50% 30% at 95% 0%, var(--mesh-2) 0%, transparent 55%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `${TOP}px 20px 0`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    size: 24
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: DISPLAY,
      fontWeight: 700,
      fontSize: 18,
      color: 'var(--text-strong)'
    }
  }, "Earnio")), /*#__PURE__*/React.createElement("button", {
    onClick: onDone,
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--text-muted)',
      fontWeight: 600,
      fontSize: 14,
      cursor: 'pointer',
      fontFamily: SANS
    }
  }, "Skip")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 28px'
    }
  }, /*#__PURE__*/React.createElement(OnboardVisual, {
    kind: s.visual
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: DISPLAY,
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: '-0.035em',
      color: 'var(--text-strong)',
      margin: '8px 0 0',
      lineHeight: 1.1
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.55,
      color: 'var(--text-muted)',
      margin: '14px 0 0'
    }
  }, s.sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 24px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      justifyContent: 'center',
      marginBottom: 22
    }
  }, SLIDES.map((_, k) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      height: 7,
      borderRadius: 99,
      transition: 'all .25s',
      width: k === i ? 24 : 7,
      background: k === i ? 'var(--primary)' : 'var(--ink-200)'
    }
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    rightIcon: I.arrow({}),
    onClick: () => last ? onDone() : setI(i + 1)
  }, last ? 'Create account' : 'Continue'), /*#__PURE__*/React.createElement("button", {
    onClick: onLogin,
    style: {
      width: '100%',
      marginTop: 14,
      border: 'none',
      background: 'transparent',
      color: 'var(--text-muted)',
      fontWeight: 600,
      fontSize: 14.5,
      cursor: 'pointer',
      fontFamily: SANS
    }
  }, "I already have an account")));
}

/* ===== AUTH ===== */
function Field({
  label,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontFamily: SANS
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    style: {
      fontFamily: SANS,
      fontSize: 16,
      padding: '13px 15px',
      borderRadius: 13,
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      outline: 'none',
      color: 'var(--text-strong)'
    },
    onFocus: e => {
      e.target.style.borderColor = 'var(--primary)';
      e.target.style.boxShadow = 'var(--focus-ring)';
    },
    onBlur: e => {
      e.target.style.borderColor = 'var(--border)';
      e.target.style.boxShadow = 'none';
    }
  })));
}
function Auth({
  mode,
  setMode,
  onAuthed
}) {
  const isLogin = mode === 'login';
  const [agree, setAgree] = React.useState(false);
  const oauth = (label, glyph) => /*#__PURE__*/React.createElement("button", {
    style: {
      flex: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      padding: '12px',
      borderRadius: 13,
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      fontFamily: SANS,
      fontSize: 14.5,
      fontWeight: 600,
      color: 'var(--text-strong)',
      cursor: 'pointer'
    }
  }, glyph, label);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface)',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `${TOP}px 24px 0`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    size: 34
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: DISPLAY,
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: '-0.03em',
      color: 'var(--text-strong)',
      margin: '16px 0 6px'
    }
  }, isLogin ? 'Welcome back' : 'Create your account'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, isLogin ? 'Log in to track earnings and deals.' : 'Free to join. No card required.')), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '22px 24px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 11
    }
  }, oauth('Apple', /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.8 2.2 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-1.1 2.7-2.2.5-.8.9-1.6 1.2-2.5-2.5-1-2.7-3.2-2.7-3.3zM14.2 5.5c.6-.8 1-1.8.9-2.9-.9.1-2 .6-2.6 1.3-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.1z"
  }))), oauth('Google', /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#4285F4",
    d: "M22 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.6a4.8 4.8 0 0 1-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.5z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#34A853",
    d: "M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7A10 10 0 0 0 12 22z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FBBC05",
    d: "M6.2 13.6a6 6 0 0 1 0-3.8V7.1H2.7a10 10 0 0 0 0 9z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#EA4335",
    d: "M12 6.4c1.5 0 2.9.5 3.9 1.5l2.9-2.9A10 10 0 0 0 2.7 7.1l3.5 2.7C7 7.3 9.3 5.4 12 5.4z"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      color: 'var(--text-faint)',
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border)'
    }
  }), "or", /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border)'
    }
  })), !isLogin ? /*#__PURE__*/React.createElement(Field, {
    label: "Name",
    placeholder: "Your name"
  }) : null, /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    type: "email",
    placeholder: "you@example.com"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Password",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  }), !isLogin ? /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      cursor: 'pointer'
    },
    onClick: () => setAgree(!agree)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 22,
      height: 22,
      borderRadius: 7,
      border: agree ? 'none' : '1.5px solid var(--border-strong)',
      background: agree ? 'var(--primary)' : 'var(--surface)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1
    }
  }, agree ? I.check({
    width: 14,
    height: 14
  }) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: 'var(--text-muted)',
      lineHeight: 1.45,
      fontFamily: SANS
    }
  }, "I accept the ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-link)'
    }
  }, "Terms"), " and ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-link)'
    }
  }, "Privacy Policy"))) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 24px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: onAuthed,
    disabled: !isLogin && !agree
  }, isLogin ? 'Log in' : 'Create account'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMode(isLogin ? 'signup' : 'login'),
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--text-muted)',
      fontWeight: 600,
      fontSize: 14,
      cursor: 'pointer',
      fontFamily: SANS
    }
  }, isLogin ? "Don't have an account? " : 'Already have an account? ', /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--primary)'
    }
  }, isLogin ? 'Sign up' : 'Log in'))));
}

/* ===== HOME ===== */
function StatChip({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      ...card,
      borderRadius: 16,
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 600,
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 16.5,
      fontWeight: 600,
      color: 'var(--text-strong)',
      marginTop: 3
    }
  }, value));
}
function Home({
  go
}) {
  return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(AppHeader, {
    kicker: "Wednesday, Jun 16",
    title: "Hey, Bold-Erdene",
    right: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(RoundIcon, {
      badge: true
    }, I.bell({
      width: 20,
      height: 20
    })), /*#__PURE__*/React.createElement(Avatar, {
      name: "Bold Erdene",
      size: "md",
      ring: true
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 24,
      padding: 22,
      background: 'var(--gradient-ink)',
      color: '#fff',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(ellipse 55% 80% at 88% 0%, rgba(46,91,255,.55) 0%, transparent 60%),radial-gradient(ellipse 40% 70% at 8% 100%, rgba(18,194,243,.32) 0%, transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,.7)',
      fontWeight: 600
    }
  }, "Available balance"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 12.5,
      fontWeight: 700,
      fontFamily: MONO,
      background: 'rgba(255,255,255,.14)',
      borderRadius: 999,
      padding: '4px 9px'
    }
  }, I.trend({
    width: 13,
    height: 13
  }), " 18.2%")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontWeight: 600,
      fontSize: 34,
      letterSpacing: '-0.02em',
      margin: '6px 0 0'
    }
  }, "\u20AE2,100,000"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go('wallet'),
    style: {
      flex: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      background: '#fff',
      color: 'var(--ink-900)',
      border: 'none',
      borderRadius: 999,
      padding: '11px',
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer',
      fontFamily: SANS
    }
  }, I.arrowUp({
    width: 16,
    height: 16
  }), "Withdraw"), /*#__PURE__*/React.createElement("button", {
    onClick: () => go('explore'),
    style: {
      flex: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      background: 'rgba(255,255,255,.16)',
      color: '#fff',
      border: 'none',
      borderRadius: 999,
      padding: '11px',
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer',
      fontFamily: SANS
    }
  }, "Find deals")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 11,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(StatChip, {
    label: "This month",
    value: "\u20AE2.48M"
  }), /*#__PURE__*/React.createElement(StatChip, {
    label: "Active deals",
    value: "4"
  }), /*#__PURE__*/React.createElement(StatChip, {
    label: "Platforms",
    value: "3"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...card,
      padding: 18,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: DISPLAY,
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Monthly earnings"), /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    dot: true
  }, "+18%")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 6,
      height: 110
    }
  }, TREND.map((v, k) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: v / 3 * 96,
      borderRadius: '5px 5px 2px 2px',
      background: k === TREND.length - 1 ? 'var(--gradient-spark)' : 'var(--blue-100)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9.5,
      color: 'var(--text-faint)',
      fontFamily: MONO
    }
  }, MONTHS[k]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '22px 2px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: DISPLAY,
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Recent earnings"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-link)'
    }
  }, "See all")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...card,
      padding: '4px 16px'
    }
  }, [['tiktok', 'Pop&Joy — UGC video', 'Sponsorship', 800000], ['youtube', 'Ad revenue payout', 'Earnings', 420000], ['instagram', 'Gobi Cashmere — reel', 'Sponsorship', 650000]].map(([src, label, type, amt], k) => {
    const p = PF[src];
    return /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        padding: '13px 0',
        borderTop: k ? '1px solid var(--border)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 'none',
        width: 38,
        height: 38,
        borderRadius: 11,
        background: 'var(--surface-muted)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: p.color
      }
    }, p.icon({
      width: 18,
      height: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--text-strong)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, type)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: MONO,
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--success)'
      }
    }, "+", fmt(amt)));
  }))));
}

/* ===== EXPLORE ===== */
function Explore({
  applied,
  onApply
}) {
  const [f, setF] = React.useState('all');
  const list = DEALS.filter(d => f === 'all' || d.platforms.includes(f));
  return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(AppHeader, {
    kicker: "Sponsorships",
    title: "Explore deals"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--text-faint)'
    }
  }, I.search({
    width: 18,
    height: 18
  })), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search campaigns and brands",
    style: {
      width: '100%',
      fontFamily: SANS,
      fontSize: 15,
      padding: '13px 16px 13px 42px',
      borderRadius: 14,
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      outline: 'none',
      color: 'var(--text-strong)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 16,
      overflowX: 'auto',
      paddingBottom: 2
    }
  }, [['all', 'All'], ['tiktok', 'TikTok'], ['youtube', 'YouTube'], ['instagram', 'Instagram']].map(([k, label]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setF(k),
    style: {
      flex: 'none',
      border: '1px solid',
      borderColor: f === k ? 'var(--primary)' : 'var(--border)',
      background: f === k ? 'var(--primary)' : 'var(--surface)',
      color: f === k ? '#fff' : 'var(--text-body)',
      borderRadius: 999,
      padding: '8px 16px',
      fontWeight: 600,
      fontSize: 13.5,
      cursor: 'pointer',
      fontFamily: SANS
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13
    }
  }, list.map((d, k) => {
    const isApplied = applied.includes(d.title);
    return /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        ...card,
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 'none',
        width: 44,
        height: 44,
        borderRadius: 13,
        background: 'var(--gradient-brand)',
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: DISPLAY,
        fontWeight: 700,
        fontSize: 17
      }
    }, d.brand[0]), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: 'var(--text-muted)',
        fontWeight: 600
      }
    }, d.brand), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: DISPLAY,
        fontSize: 15.5,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, d.title)), d.tag ? /*#__PURE__*/React.createElement(Badge, {
      tone: "brand"
    }, d.tag) : null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 14
      }
    }, d.platforms.map(k2 => /*#__PURE__*/React.createElement("span", {
      key: k2,
      style: {
        color: PF[k2].color,
        display: 'inline-flex'
      }
    }, PF[k2].icon({
      width: 17,
      height: 17
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 12.5,
        color: 'var(--text-faint)'
      }
    }, I.calendar({
      width: 14,
      height: 14
    }), d.deadline, " left")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 13,
        borderTop: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: MONO,
        fontSize: 17,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, d.budget), isApplied ? /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      dot: true
    }, "Applied") : /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      onClick: () => onApply(d.title)
    }, "Apply now")));
  }))));
}

/* ===== WALLET ===== */
function Wallet({
  onPayout
}) {
  const [amt, setAmt] = React.useState('');
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(AppHeader, {
    kicker: "Wallet",
    title: "Balance"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 24,
      padding: 22,
      background: 'var(--gradient-brand)',
      color: '#fff',
      boxShadow: 'var(--shadow-brand)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,.8)',
      fontWeight: 600
    }
  }, "Available to withdraw"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontWeight: 600,
      fontSize: 34,
      margin: '6px 0 0'
    }
  }, "\u20AE2,100,000"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginTop: 14,
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(255,255,255,.85)'
    }
  }, "Pending ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: MONO
    }
  }, "\u20AE1.0M")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(255,255,255,.85)'
    }
  }, "Earned ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: MONO
    }
  }, "\u20AE12.4M")))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...card,
      padding: 18,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: DISPLAY,
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)',
      marginBottom: 4
    }
  }, "Request payout"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-muted)',
      marginBottom: 14
    }
  }, "Minimum \u20AE50,000"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '4px 0 14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 26,
      fontWeight: 600,
      color: 'var(--text-faint)'
    }
  }, "\u20AE"), /*#__PURE__*/React.createElement("input", {
    value: amt,
    onChange: e => setAmt(e.target.value.replace(/\D/g, '')),
    inputMode: "numeric",
    placeholder: "0",
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      fontFamily: MONO,
      fontSize: 26,
      fontWeight: 600,
      color: 'var(--text-strong)',
      background: 'transparent',
      minWidth: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 14px',
      borderRadius: 13,
      background: 'var(--surface-muted)',
      border: '1px solid var(--border)',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 9,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--primary)'
    }
  }, I.card({
    width: 17,
    height: 17
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Khan Bank"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      fontFamily: MONO
    }
  }, "\u2022\u20224821")), I.chevR({
    width: 18,
    height: 18,
    style: {
      color: 'var(--text-faint)'
    }
  })), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 13,
      color: 'var(--success)',
      fontWeight: 600,
      marginBottom: 12
    }
  }, I.check({
    width: 16,
    height: 16
  }), "Payout requested \u2014 processing to Khan Bank.") : null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    onClick: () => {
      setSent(true);
      onPayout();
    }
  }, "Withdraw ", amt ? fmt(Number(amt)) : '')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: DISPLAY,
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--text-strong)',
      margin: '22px 2px 12px'
    }
  }, "Transactions"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...card,
      padding: '4px 16px'
    }
  }, TX.map((t, k) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 0',
      borderTop: k ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, t.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, t.date, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 3,
      borderRadius: 99,
      background: 'var(--text-faint)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.status === 'Pending' ? 'var(--warning)' : 'var(--success)',
      fontWeight: 600
    }
  }, t.status))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 14,
      fontWeight: 600,
      color: t.credit ? 'var(--success)' : 'var(--text-strong)'
    }
  }, t.credit ? '+' : '−', fmt(t.amt)))))));
}

/* ===== PROFILE ===== */
function Profile({
  onLogout
}) {
  const rows = [['cog', 'Account'], ['bell', 'Notifications'], ['card', 'Payment methods'], ['help', 'Help & support']];
  return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(AppHeader, {
    kicker: "Profile",
    title: "You"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...card,
      padding: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Bold Erdene",
    size: "lg",
    ring: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: DISPLAY,
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, "Bold-Erdene"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "@bolderdene \xB7 Creator")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "Edit")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      margin: '22px 4px 10px'
    }
  }, "Connected platforms"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...card,
      padding: '4px 16px'
    }
  }, Object.entries(PF).map(([k, p], idx) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      padding: '14px 0',
      borderTop: idx ? '1px solid var(--border)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: p.color,
      display: 'inline-flex'
    }
  }, p.icon({
    width: 22,
    height: 22
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, p.name), /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    dot: true
  }, "Synced")))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      margin: '22px 4px 10px'
    }
  }, "Settings"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...card,
      padding: '4px 16px'
    }
  }, rows.map(([icon, label], idx) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      padding: '14px 0',
      borderTop: idx ? '1px solid var(--border)' : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      background: 'var(--surface-muted)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-body)'
    }
  }, I[icon]({
    width: 17,
    height: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, label), I.chevR({
    width: 18,
    height: 18,
    style: {
      color: 'var(--text-faint)'
    }
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    style: {
      width: '100%',
      marginTop: 16,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '14px',
      borderRadius: 14,
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      color: 'var(--danger)',
      fontWeight: 700,
      fontSize: 15,
      cursor: 'pointer',
      fontFamily: SANS
    }
  }, I.logout({
    width: 18,
    height: 18
  }), "Log out")));
}

/* scroll wrapper for app screens (leaves room for tab bar) */
function Scroll({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      paddingBottom: 18
    }
  }, children);
}

/* ===== ROOT ===== */
function EarnioIOS() {
  const [flow, setFlow] = React.useState('onboarding'); // onboarding | auth | app
  const [authMode, setAuthMode] = React.useState('signup');
  const [tab, setTab] = React.useState('home');
  const [applied, setApplied] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const fireToast = m => {
    setToast(m);
    clearTimeout(window.__et);
    window.__et = setTimeout(() => setToast(null), 2400);
  };
  let screen;
  if (flow === 'onboarding') screen = /*#__PURE__*/React.createElement(Onboarding, {
    onDone: () => {
      setAuthMode('signup');
      setFlow('auth');
    },
    onLogin: () => {
      setAuthMode('login');
      setFlow('auth');
    }
  });else if (flow === 'auth') screen = /*#__PURE__*/React.createElement(Auth, {
    mode: authMode,
    setMode: setAuthMode,
    onAuthed: () => {
      setFlow('app');
      setTab('home');
    }
  });else {
    const inner = tab === 'home' ? /*#__PURE__*/React.createElement(Home, {
      go: setTab
    }) : tab === 'explore' ? /*#__PURE__*/React.createElement(Explore, {
      applied: applied,
      onApply: t => {
        setApplied(a => [...a, t]);
        fireToast('Application sent to ' + t.split(' ')[0]);
      }
    }) : tab === 'wallet' ? /*#__PURE__*/React.createElement(Wallet, {
      onPayout: () => fireToast('Payout requested')
    }) : /*#__PURE__*/React.createElement(Profile, {
      onLogout: () => {
        setFlow('onboarding');
        setApplied([]);
      }
    });
    screen = /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-page)'
      }
    }, inner, /*#__PURE__*/React.createElement(TabBar, {
      tab: tab,
      setTab: setTab
    }));
  }
  const chips = [['Onboarding', () => setFlow('onboarding')], ['Sign up', () => {
    setAuthMode('signup');
    setFlow('auth');
  }], ['Home', () => {
    setFlow('app');
    setTab('home');
  }], ['Explore', () => {
    setFlow('app');
    setTab('explore');
  }], ['Wallet', () => {
    setFlow('app');
    setTab('wallet');
  }], ['Profile', () => {
    setFlow('app');
    setTab('profile');
  }]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 16px 56px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 8,
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: DISPLAY,
      fontWeight: 700,
      fontSize: 21,
      letterSpacing: '-0.02em',
      color: 'var(--ink-900)'
    }
  }, "Earnio iOS")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: SANS,
      fontSize: 13.5,
      color: 'var(--ink-500)',
      margin: '0 0 18px'
    }
  }, "Tap through, or jump to a screen:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'center',
      marginBottom: 26,
      maxWidth: 440
    }
  }, chips.map(([label, fn]) => /*#__PURE__*/React.createElement("button", {
    key: label,
    onClick: fn,
    style: {
      border: '1px solid var(--border)',
      background: 'rgba(255,255,255,.75)',
      backdropFilter: 'blur(8px)',
      color: 'var(--ink-700)',
      borderRadius: 999,
      padding: '8px 15px',
      fontWeight: 600,
      fontSize: 13,
      cursor: 'pointer',
      fontFamily: SANS,
      boxShadow: 'var(--shadow-xs)'
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(IOSDevice, null, screen, toast ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 108,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 80,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--ink-900)',
      color: '#fff',
      padding: '11px 18px',
      borderRadius: 999,
      boxShadow: 'var(--shadow-lg)',
      fontSize: 13.5,
      fontWeight: 600,
      fontFamily: SANS,
      whiteSpace: 'nowrap',
      animation: 'et-toast .3s var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--success)',
      display: 'inline-flex'
    }
  }, I.check({
    width: 16,
    height: 16
  })), toast) : null)), /*#__PURE__*/React.createElement("style", null, `@keyframes et-toast{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}`));
}
window.EarnioIOS = EarnioIOS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios/ios-app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ios/ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ios/ios-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-landing.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
const DS = window.EarnioDesignSystem_f806e6;
const {
  Button,
  Card,
  Badge,
  Input,
  Checkbox
} = DS;

/* ---------- inline icon set (Lucide-style, 1.75 stroke) ---------- */
const I = {
  arrow: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  })),
  trend: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M3 17l6-6 4 4 8-8M21 7h-5M21 7v5"
  })),
  wallet: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 12h.01"
  })),
  briefcase: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "7",
    width: "20",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
  })),
  chart: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M3 3v18h18"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "7",
    y: "11",
    width: "3",
    height: "6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13",
    y: "7",
    width: "3",
    height: "10"
  })),
  check: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })),
  plus: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  })),
  close: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })),
  spark: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"
  }))
};
const Mark = ({
  size = 30
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 96 96",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M34 62 L62 34",
  stroke: "currentColor",
  strokeWidth: "9",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /*#__PURE__*/React.createElement("path", {
  d: "M44 34 H62 V52",
  stroke: "currentColor",
  strokeWidth: "9",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const Platform = {
  tiktok: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M16.6 5.82a4.28 4.28 0 0 1-1.1-2.82h-3.2v12.6a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12V9.4a5.83 5.83 0 0 0-.78-.05A5.85 5.85 0 1 0 15.3 15.2V9.01a7.4 7.4 0 0 0 4.3 1.37V7.18a4.28 4.28 0 0 1-3-1.36z"
  })),
  youtube: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.2zM9.8 15.3V8.7l5.7 3.3z"
  })),
  instagram: p => /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9"
  }, p), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.3",
    cy: "6.7",
    r: "1",
    fill: "currentColor",
    stroke: "none"
  }))
};

/* ---------- content ---------- */
const CONTENT = {
  creator: {
    badge: 'For Mongolian creators',
    title: 'The platform for Mongolian creators',
    subtitle: 'Earnio connects you with local brands, handles sponsorships and payouts, and lets you focus on creating.',
    primary: 'Get started',
    secondary: 'Explore sponsorships',
    steps: [{
      icon: 'chart',
      t: 'Connect platforms.',
      d: 'Link TikTok, YouTube and Instagram to sync earnings automatically.'
    }, {
      icon: 'trend',
      t: 'Track performance.',
      d: 'See revenue, trends and platform breakdowns in real time.'
    }, {
      icon: 'briefcase',
      t: 'Find sponsorships.',
      d: 'Browse brand deals and apply directly from your dashboard.'
    }, {
      icon: 'wallet',
      t: 'Get paid in MNT.',
      d: 'Manage wallet payouts and bank accounts in one place.'
    }],
    features: [{
      t: 'Centralized opportunities.',
      d: 'Find and apply to sponsorship campaigns from Mongolian brands.'
    }, {
      t: 'Payments built-in.',
      d: 'Track earnings and receive MNT payouts automatically.'
    }, {
      t: 'Track performance.',
      d: 'See views, revenue and engagement from TikTok, YouTube and Instagram.'
    }, {
      t: 'Easy delivery.',
      d: 'Manage briefs, applications and payouts in one platform.'
    }],
    metrics: ['2.4M', '890K', '₮12M']
  },
  brand: {
    badge: 'For brands',
    title: 'Reach Mongolian creators with sponsored campaigns',
    subtitle: 'Post brand deals, review creator applications, and manage partnerships with TikTok, YouTube and Instagram talent — from one dashboard.',
    primary: 'Get started',
    secondary: 'See how it works',
    steps: [{
      icon: 'briefcase',
      t: 'Create your account.',
      d: 'Sign up as a brand and set up your company profile.'
    }, {
      icon: 'spark',
      t: 'Post a campaign.',
      d: 'Define budget, content type and creator requirements.'
    }, {
      icon: 'chart',
      t: 'Review applications.',
      d: 'Compare creators and approve the best fits for your brand.'
    }, {
      icon: 'trend',
      t: 'Track results.',
      d: 'Monitor campaign status and partnership outcomes in one place.'
    }],
    features: [{
      t: 'Curated creators.',
      d: 'Reach vetted Mongolian creators across all three platforms.'
    }, {
      t: 'Custom campaigns.',
      d: 'Brief exactly the video content you want made.'
    }, {
      t: 'One dashboard.',
      d: 'Review pitches, approve creators and track deals together.'
    }, {
      t: 'Pay in MNT.',
      d: 'Settle partnerships locally — no scattered email threads.'
    }],
    metrics: ['120', '₮5M', '48h']
  }
};
const TESTIMONIALS = [{
  quote: 'Earnio helped me track my TikTok earnings and land my first brand deal in Mongolia. Everything is in one place.',
  name: 'Bold-Erdene',
  role: 'TikTok creator'
}, {
  quote: 'I used to spreadsheet everything manually. Now I see YouTube and sponsorship income together and get paid in MNT.',
  name: 'Sarnai',
  role: 'YouTube creator'
}, {
  quote: 'The sponsorship board is the best part — I apply to local brands without cold DMs and keep status updated in the app.',
  name: 'Temuulen',
  role: 'UGC creator'
}];
const FAQ = [{
  q: 'How do I sign up as a creator?',
  a: 'Create a free Earnio account, connect your TikTok, YouTube or Instagram platforms, and complete your profile. You can browse sponsorships and apply directly from your dashboard.'
}, {
  q: 'Who can join?',
  a: 'Mongolian content creators on TikTok, YouTube and Instagram who want to track earnings, find brand deals, and manage payouts in MNT.'
}, {
  q: 'How do payments work?',
  a: 'Earnings sync from connected platforms. Sponsorship payouts and wallet withdrawals are handled in MNT through your Earnio wallet.'
}, {
  q: 'Can I work with multiple brands at once?',
  a: 'Yes. Apply to multiple sponsorships and manage each application from your dashboard.'
}];

/* ---------- mesh background ---------- */
const Mesh = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    backgroundColor: 'var(--bg-page)',
    backgroundImage: 'radial-gradient(ellipse 70% 55% at 8% -8%, var(--mesh-1) 0%, transparent 55%),radial-gradient(ellipse 60% 50% at 96% -4%, var(--mesh-2) 0%, transparent 52%),radial-gradient(ellipse 55% 45% at 60% 108%, var(--mesh-3) 0%, transparent 55%)',
    ...style
  }
}, children);

/* ---------- Nav ---------- */
function Nav({
  audience,
  setAudience,
  onSignup,
  onLogin
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'color-mix(in srgb, var(--surface) 68%, transparent)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid color-mix(in srgb, var(--border) 70%, transparent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '14px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    size: 28
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 19,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)'
    }
  }, "Earnio")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 26,
      marginLeft: 14
    },
    className: "site-navlinks"
  }, ['How it works', 'Features', 'FAQ'].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: '#' + l.replace(/\s+/g, '-').toLowerCase(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-muted)',
      textDecoration: 'none'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--text-strong)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--text-muted)'
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      background: 'var(--surface-muted)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-full)',
      padding: 3
    }
  }, [['creator', 'For creators'], ['brand', 'For brands']].map(([k, label]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setAudience(k),
    style: {
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 13,
      padding: '7px 14px',
      borderRadius: 'var(--radius-full)',
      background: audience === k ? 'var(--surface)' : 'transparent',
      color: audience === k ? 'var(--text-strong)' : 'var(--text-muted)',
      boxShadow: audience === k ? 'var(--shadow-xs)' : 'none',
      transition: 'all .18s'
    }
  }, label))), /*#__PURE__*/React.createElement("button", {
    onClick: onLogin,
    className: "site-login",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, "Log in"), /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    size: "sm",
    onClick: onSignup
  }, "Get started"))));
}

/* ---------- Hero ---------- */
function HeroVisual({
  metrics
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 420,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 400",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      color: 'var(--blue-200)'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "200",
    cy: "200",
    rx: "172",
    ry: "118",
    stroke: "currentColor",
    strokeWidth: "1.2",
    strokeDasharray: "3 9",
    fill: "none"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "200",
    cy: "200",
    rx: "120",
    ry: "78",
    stroke: "currentColor",
    strokeWidth: "1.2",
    strokeDasharray: "3 9",
    fill: "none",
    transform: "rotate(-12 200 200)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 300,
      background: 'var(--surface)',
      borderRadius: 'var(--radius-2xl)',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-xl)',
      padding: 24,
      transform: 'rotate(-2deg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-muted)'
    }
  }, "This month"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      color: 'var(--success)',
      fontWeight: 700,
      fontSize: 13,
      fontFamily: 'var(--font-mono)'
    }
  }, "\u25B2 18.2%")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 600,
      fontSize: 32,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      marginTop: 6
    }
  }, "\u20AE2,480,000"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 6,
      height: 56,
      marginTop: 18
    }
  }, [38, 52, 44, 66, 58, 80, 72, 96].map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: h + '%',
      borderRadius: 5,
      background: i === 7 ? 'var(--gradient-spark)' : 'var(--blue-100)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 18,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Platform.tiktok, {
    width: "18",
    height: "18"
  }), /*#__PURE__*/React.createElement(Platform.youtube, {
    width: "18",
    height: "18"
  }), /*#__PURE__*/React.createElement(Platform.instagram, {
    width: "18",
    height: "18"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-faint)'
    }
  }, "3 connected"))), /*#__PURE__*/React.createElement(Chip, {
    style: {
      top: '6%',
      left: '0%'
    },
    icon: "trend",
    label: metrics[0] + ' views'
  }), /*#__PURE__*/React.createElement(Chip, {
    style: {
      top: '12%',
      right: '-2%'
    },
    icon: "wallet",
    label: metrics[2] + ' earned'
  }), /*#__PURE__*/React.createElement(Chip, {
    style: {
      bottom: '8%',
      left: '6%'
    },
    icon: "check",
    label: "Payout sent",
    tone: "success"
  }));
}
function Chip({
  style,
  icon,
  label,
  tone
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'color-mix(in srgb, var(--surface) 90%, transparent)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-full)',
      padding: '8px 13px',
      boxShadow: 'var(--shadow-md)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 26,
      height: 26,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      background: tone === 'success' ? 'var(--success-soft)' : 'var(--primary-soft)',
      color: tone === 'success' ? 'var(--success)' : 'var(--primary)'
    }
  }, I[icon]({
    width: 15,
    height: 15
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-mono)'
    }
  }, label));
}
function Hero({
  c,
  onSignup
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '56px 28px 72px',
      display: 'grid',
      gridTemplateColumns: '1.05fr 1fr',
      gap: 40,
      alignItems: 'center'
    },
    className: "site-hero"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      background: 'var(--primary-soft)',
      color: 'var(--primary-press)',
      border: '1px solid var(--primary-border)',
      borderRadius: 'var(--radius-full)',
      padding: '6px 13px',
      fontSize: 12.5,
      fontWeight: 700,
      letterSpacing: '0.01em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--primary)'
    }
  }), c.badge), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 56,
      lineHeight: 1.05,
      letterSpacing: '-0.035em',
      color: 'var(--text-strong)',
      margin: '20px 0 0'
    }
  }, c.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      margin: '20px 0 0',
      maxWidth: 520
    }
  }, c.subtitle), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    size: "lg",
    rightIcon: I.arrow({}),
    onClick: onSignup
  }, c.primary), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg"
  }, c.secondary)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 30,
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, "Works with"), /*#__PURE__*/React.createElement(Platform.tiktok, {
    width: "19",
    height: "19"
  }), /*#__PURE__*/React.createElement(Platform.youtube, {
    width: "19",
    height: "19"
  }), /*#__PURE__*/React.createElement(Platform.instagram, {
    width: "19",
    height: "19"
  }))), /*#__PURE__*/React.createElement(HeroVisual, {
    metrics: c.metrics
  }));
}

/* ---------- How it works ---------- */
function HowItWorks({
  c
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "how-it-works",
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '40px 28px 60px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "How it works"), /*#__PURE__*/React.createElement("h2", {
    style: hStyle
  }, c === CONTENT.creator ? 'How Earnio works for creators' : 'How brand partnerships work'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 18,
      marginTop: 34
    },
    className: "site-grid4"
  }, c.steps.map((s, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: "lg"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      background: 'var(--primary-soft)',
      color: 'var(--primary)'
    }
  }, I[s.icon]({
    width: 22,
    height: 22
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-faint)'
    }
  }, "0", i + 1)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 17,
      fontWeight: 600,
      color: 'var(--text-strong)',
      margin: '18px 0 6px'
    }
  }, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, s.d)))));
}

/* ---------- Features ---------- */
function Features({
  c
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "features",
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '40px 28px 60px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Features"), /*#__PURE__*/React.createElement("h2", {
    style: hStyle
  }, "Everything in one place"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 18,
      marginTop: 34
    },
    className: "site-grid2"
  }, c.features.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 16,
      padding: 24,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      display: 'inline-flex',
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      background: 'var(--gradient-brand)',
      color: '#fff'
    }
  }, I.check({
    width: 20,
    height: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 17,
      fontWeight: 600,
      color: 'var(--text-strong)',
      margin: '2px 0 6px'
    }
  }, f.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, f.d))))));
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '40px 28px 60px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Loved by creators"), /*#__PURE__*/React.createElement("h2", {
    style: hStyle
  }, "Built for Mongolian creators"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 18,
      marginTop: 34
    },
    className: "site-grid3"
  }, TESTIMONIALS.map((t, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: "lg"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.65,
      color: 'var(--text-body)',
      margin: '0 0 20px'
    }
  }, "\u201C", t.quote, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement(DS.Avatar, {
    name: t.name,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, t.role)))))));
}

/* ---------- FAQ ---------- */
function Faq() {
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    style: {
      maxWidth: 820,
      margin: '0 auto',
      padding: '40px 28px 70px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    center: true
  }, "FAQ"), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...hStyle,
      textAlign: 'center'
    }
  }, "Questions, answered"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, FAQ.map((f, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xs)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(isOpen ? -1 : i),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '18px 20px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 16,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, f.q), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 'none',
        color: 'var(--primary)',
        transform: isOpen ? 'rotate(45deg)' : 'none',
        transition: 'transform .22s'
      }
    }, I.plus({
      width: 20,
      height: 20
    }))), isOpen ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 20px 20px',
        fontSize: 14.5,
        lineHeight: 1.65,
        color: 'var(--text-muted)'
      }
    }, f.a) : null);
  })));
}

/* ---------- CTA band + footer ---------- */
function CtaBand({
  onSignup
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '20px 28px 70px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--gradient-ink)',
      borderRadius: 'var(--radius-2xl)',
      padding: '56px 48px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(ellipse 50% 80% at 80% 0%, rgba(46,91,255,.45) 0%, transparent 60%),radial-gradient(ellipse 40% 70% at 12% 100%, rgba(18,194,243,.3) 0%, transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 40,
      letterSpacing: '-0.03em',
      color: '#fff',
      margin: 0
    }
  }, "Ready to earn more?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: 'rgba(255,255,255,.7)',
      margin: '14px auto 28px',
      maxWidth: 460
    }
  }, "Join Earnio free, connect your platforms, and start landing brand deals in MNT."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onSignup,
    rightIcon: I.arrow({})
  }, "Get started"))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--text-strong)'
    }
  }, "Earnio"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-faint)',
      marginLeft: 8
    }
  }, "\xA9 Earnio \u2014 Built for Mongolian creators")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22,
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "Terms"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "Log in"))));
}

/* ---------- Signup modal ---------- */
function SignupModal({
  mode,
  onClose
}) {
  const [done, setDone] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const isLogin = mode === 'login';
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 90,
      background: 'rgba(11,18,32,.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(100%, 440px)',
      background: 'var(--surface)',
      borderRadius: 'var(--radius-2xl)',
      boxShadow: 'var(--shadow-xl)',
      padding: 32,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      position: 'absolute',
      top: 18,
      right: 18,
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-md)',
      border: 'none',
      background: 'var(--surface-muted)',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, I.close({
    width: 18,
    height: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--primary)',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    size: 34
  })), done ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--text-strong)',
      margin: '0 0 8px',
      letterSpacing: '-0.02em'
    }
  }, "You're in \uD83C\uDF89"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--text-muted)',
      lineHeight: 1.6,
      margin: '0 0 22px'
    }
  }, "Welcome to Earnio. Connect a platform to start tracking your earnings."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    onClick: onClose
  }, "Go to dashboard")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--text-strong)',
      margin: '0 0 6px',
      letterSpacing: '-0.02em'
    }
  }, isLogin ? 'Welcome back' : 'Create your account'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      color: 'var(--text-muted)',
      margin: '0 0 22px'
    }
  }, isLogin ? 'Log in to your Earnio dashboard.' : 'Free to join. No card required.'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, !isLogin ? /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Your name"
  }) : null, /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@example.com"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  }), !isLogin ? /*#__PURE__*/React.createElement(Checkbox, {
    checked: agree,
    onChange: e => setAgree(e.target.checked),
    label: "I accept the Terms and Privacy Policy"
  }) : null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    onClick: () => setDone(true),
    disabled: !isLogin && !agree
  }, isLogin ? 'Log in' : 'Create account')))));
}

/* ---------- shared bits ---------- */
const hStyle = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 34,
  letterSpacing: '-0.03em',
  color: 'var(--text-strong)',
  margin: '10px 0 0'
};
function Eyebrow({
  children,
  center
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--primary)',
      textAlign: center ? 'center' : 'left'
    }
  }, children);
}

/* ---------- root ---------- */
function EarnioSite() {
  const [audience, setAudience] = React.useState('creator');
  const [modal, setModal] = React.useState(null); // 'signup' | 'login' | null
  const c = CONTENT[audience];
  React.useEffect(() => {
    const s = document.createElement('style');
    s.textContent = '@media(max-width:900px){.site-hero{grid-template-columns:1fr!important}.site-grid4{grid-template-columns:repeat(2,1fr)!important}.site-grid2,.site-grid3{grid-template-columns:1fr!important}.site-navlinks{display:none!important}}';
    document.head.appendChild(s);
  }, []);
  return /*#__PURE__*/React.createElement(Mesh, null, /*#__PURE__*/React.createElement(Nav, {
    audience: audience,
    setAudience: setAudience,
    onSignup: () => setModal('signup'),
    onLogin: () => setModal('login')
  }), /*#__PURE__*/React.createElement(Hero, {
    c: c,
    onSignup: () => setModal('signup')
  }), /*#__PURE__*/React.createElement(HowItWorks, {
    c: c
  }), /*#__PURE__*/React.createElement(Features, {
    c: c
  }), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(CtaBand, {
    onSignup: () => setModal('signup')
  }), /*#__PURE__*/React.createElement(Footer, null), modal ? /*#__PURE__*/React.createElement(SignupModal, {
    mode: modal,
    onClose: () => setModal(null)
  }) : null);
}
window.EarnioSite = EarnioSite;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-landing.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Card = __ds_scope.Card;

})();
