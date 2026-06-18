/* @ds-bundle: {"format":3,"namespace":"LogoDesignSystem_dc608d","components":[{"name":"EarnioMark","sourcePath":"components/brand/EarnioLogo.jsx"},{"name":"EarnioLogo","sourcePath":"components/brand/EarnioLogo.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Panel","sourcePath":"components/core/Panel.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"StatCard","sourcePath":"components/core/StatCard.jsx"}],"sourceHashes":{"components/brand/EarnioLogo.jsx":"11e3430d2426","components/core/Avatar.jsx":"5506dcf6e397","components/core/Badge.jsx":"94d6f44b0aa4","components/core/Button.jsx":"19dc9fd2b9ae","components/core/Input.jsx":"beb8ef5a687e","components/core/Panel.jsx":"1b5d3ede0d12","components/core/ProgressBar.jsx":"d95ae66b6197","components/core/StatCard.jsx":"52ef631314b8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LogoDesignSystem_dc608d = window.LogoDesignSystem_dc608d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/EarnioLogo.jsx
try { (() => {
/** The three-square "Fragmented Growth" mark with the fixed opacity fade. */
function EarnioMark({
  size = 28,
  color,
  className = '',
  style
}) {
  const solid = color || '#1736B8';
  const mid = color || '#2E5BFF';
  const light = color || '#5C7DFF';
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    width: size,
    height: size,
    viewBox: "0 0 96 96",
    role: "img",
    "aria-label": "Earnio",
    style: style
  }, /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "63",
    width: "25",
    height: "25",
    fill: solid,
    fillOpacity: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "35.5",
    y: "35.5",
    width: "25",
    height: "25",
    fill: mid,
    fillOpacity: "0.85"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "63",
    y: "8",
    width: "25",
    height: "25",
    fill: light,
    fillOpacity: "0.7"
  }));
}

/**
 * Earnio logo lockup. `variant` controls mark-only / wordmark-only / full.
 * Pass `color` for a single-color (mono) mark on colored backgrounds.
 */
function EarnioLogo({
  variant = 'full',
  size = 28,
  color,
  wordColor,
  className = '',
  style
}) {
  const word = /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      letterSpacing: '-0.04em',
      fontSize: size * 0.72,
      color: wordColor || 'var(--foreground)',
      lineHeight: 1
    }
  }, "Earnio");
  if (variant === 'wordmark') {
    return /*#__PURE__*/React.createElement("span", {
      className: className,
      style: style
    }, word);
  }
  if (variant === 'icon') {
    return /*#__PURE__*/React.createElement(EarnioMark, {
      size: size,
      color: color,
      className: className,
      style: style
    });
  }
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: size * 0.32,
      ...style
    }
  }, /*#__PURE__*/React.createElement(EarnioMark, {
    size: size,
    color: color
  }), word);
}
Object.assign(__ds_scope, { EarnioMark, EarnioLogo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/EarnioLogo.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 28,
  md: 36,
  lg: 48
};
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
function Avatar({
  name = '',
  src,
  size = 'md',
  tone = 'ink',
  className = '',
  style,
  ...rest
}) {
  const px = SIZES[size] || (typeof size === 'number' ? size : SIZES.md);
  const bg = tone === 'brand' ? 'var(--primary)' : 'var(--landing-fg)';
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: px,
      height: px,
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
      background: src ? 'var(--surface)' : bg,
      color: '#fff',
      fontSize: px * 0.38,
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      flexShrink: 0,
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    bg: 'var(--surface)',
    fg: 'var(--muted)',
    bd: 'transparent'
  },
  primary: {
    bg: 'var(--primary-soft)',
    fg: 'var(--primary)',
    bd: 'var(--border)'
  },
  accent: {
    bg: 'var(--accent-soft)',
    fg: 'var(--accent)',
    bd: 'transparent'
  },
  success: {
    bg: 'var(--success-soft)',
    fg: 'var(--success)',
    bd: 'transparent'
  },
  warning: {
    bg: 'var(--warning-soft)',
    fg: 'var(--warning)',
    bd: 'transparent'
  },
  danger: {
    bg: 'var(--destructive-soft)',
    fg: 'var(--destructive)',
    bd: 'transparent'
  }
};

/**
 * Status / category badge. `eyebrow` renders the uppercase tracked label
 * (the .badge-pill treatment used above headings).
 */
function Badge({
  tone = 'neutral',
  eyebrow = false,
  dot = false,
  className = '',
  style,
  children,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      borderRadius: 'var(--radius-full)',
      border: `1px solid ${t.bd}`,
      background: t.bg,
      color: t.fg,
      padding: eyebrow ? '2px 10px' : '4px 10px',
      fontSize: 12,
      fontWeight: eyebrow ? 700 : 600,
      fontFamily: 'var(--font-sans)',
      textTransform: eyebrow ? 'uppercase' : 'none',
      letterSpacing: eyebrow ? '0.06em' : 0,
      lineHeight: 1.4,
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: t.fg
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    minHeight: 36,
    padding: '0 14px',
    fontSize: 13
  },
  md: {
    minHeight: 44,
    padding: '0 18px',
    fontSize: 14
  },
  lg: {
    minHeight: 52,
    padding: '0 24px',
    fontSize: 15
  }
};
const VARIANT_CLASS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'btn-ghost'
};

/**
 * Earnio button. Pill-radius is reserved for landing CTAs (`pill` prop);
 * app buttons use the 12px radius. Hover lifts 1px, press squeezes to 0.98.
 */
function Button({
  variant = 'primary',
  size = 'md',
  pill = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled = false,
  type = 'button',
  className = '',
  style,
  children,
  ...rest
}) {
  const sz = SIZES[size] || SIZES.md;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    className: `${VARIANT_CLASS[variant] || VARIANT_CLASS.primary} ${className}`.trim(),
    style: {
      minHeight: sz.minHeight,
      padding: sz.padding,
      fontSize: sz.fontSize,
      width: fullWidth ? '100%' : undefined,
      borderRadius: pill ? 'var(--radius-full)' : 'var(--radius-md)',
      ...style
    }
  }, rest), leftIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    },
    "aria-hidden": true
  }, leftIcon) : null, children, rightIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    },
    "aria-hidden": true
  }, rightIcon) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let _id = 0;

/**
 * Labeled text input matching the Earnio auth/app field. Focus ring is a 3px
 * Earnio-Blue glow. Pass `error` to switch the border to danger.
 */
function Input({
  label,
  hint,
  error,
  id,
  className = '',
  style,
  ...rest
}) {
  const inputId = id || `earnio-input-${++_id}`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: 'block',
      marginBottom: 6,
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: `input-touch ${className}`.trim(),
    style: {
      borderColor: error ? 'var(--destructive)' : undefined,
      ...style
    },
    "aria-invalid": error ? true : undefined
  }, rest)), error ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 12,
      color: 'var(--destructive)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Panel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  card: {
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    background: 'var(--card)',
    boxShadow: 'var(--shadow-sm)',
    backdropFilter: 'none'
  },
  elevated: {
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    background: 'var(--card)',
    boxShadow: 'var(--shadow-md)',
    backdropFilter: 'none'
  },
  glass: {
    borderRadius: 'var(--radius-xl)',
    border: '1px solid color-mix(in srgb, #fff 85%, transparent)',
    background: 'color-mix(in srgb, #fff 78%, transparent)',
    boxShadow: 'var(--landing-btn-light-shadow)',
    backdropFilter: 'blur(10px)'
  },
  hero: {
    borderRadius: 'var(--radius-2xl)',
    border: '1px solid color-mix(in srgb, #fff 90%, transparent)',
    background: 'color-mix(in srgb, #fff 88%, transparent)',
    boxShadow: 'var(--landing-card-shadow)',
    backdropFilter: 'blur(12px)'
  }
};

/**
 * Surface container. `hero` adds the blue→cyan gradient top-bar used on the
 * dashboard greeting card.
 */
function Panel({
  variant = 'card',
  padding = 20,
  className = '',
  style,
  children,
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.card;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      position: 'relative',
      overflow: variant === 'hero' ? 'hidden' : undefined,
      padding,
      ...v,
      ...style
    }
  }, rest), variant === 'hero' ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      insetInlineStart: 0,
      top: 0,
      width: '100%',
      height: 3,
      background: 'linear-gradient(90deg, var(--primary), var(--accent))',
      opacity: 0.85
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Panel.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Track + fill progress bar. Used for onboarding plans, platform shares, and
 * campaign budgets. `gradient` switches the fill to the spark gradient.
 */
function ProgressBar({
  value = 0,
  max = 100,
  height = 8,
  gradient = false,
  color,
  trackColor,
  className = '',
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": max,
    style: {
      width: '100%',
      height,
      borderRadius: 'var(--radius-full)',
      background: trackColor || 'var(--surface)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      borderRadius: 'var(--radius-full)',
      background: gradient ? 'var(--gradient-spark)' : color || 'var(--primary)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/core/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Dashboard stat panel. Value renders in the mono numeral face with tabular
 * figures. `delta` shows a colored month-over-month change.
 */
function StatCard({
  label,
  value,
  hint,
  delta,
  valueColor,
  className = '',
  style,
  ...rest
}) {
  const deltaPositive = typeof delta === 'number' ? delta >= 0 : undefined;
  const deltaColor = deltaPositive === undefined ? 'var(--muted)' : deltaPositive ? 'var(--success)' : 'var(--destructive)';
  return /*#__PURE__*/React.createElement("article", _extends({
    className: `stat-card ${className}`.trim(),
    style: style
  }, rest), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--muted-foreground)'
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    className: "font-mono-stat",
    style: {
      margin: '8px 0 0',
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: valueColor || 'var(--foreground)'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, typeof delta === 'number' ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: deltaColor,
      fontFamily: 'var(--font-mono)'
    }
  }, deltaPositive ? '▲' : '▼', " ", Math.abs(delta).toFixed(1), "%") : null, hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, hint) : null));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatCard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.EarnioMark = __ds_scope.EarnioMark;

__ds_ns.EarnioLogo = __ds_scope.EarnioLogo;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatCard = __ds_scope.StatCard;

})();
