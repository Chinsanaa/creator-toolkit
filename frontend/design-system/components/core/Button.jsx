import React from 'react';

const SIZES = {
  sm: { minHeight: 36, padding: '0 14px', fontSize: 13 },
  md: { minHeight: 44, padding: '0 18px', fontSize: 14 },
  lg: { minHeight: 52, padding: '0 24px', fontSize: 15 },
};

const VARIANT_CLASS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
};

/**
 * Earnio button. Pill-radius is reserved for landing CTAs (`pill` prop);
 * app buttons use the 12px radius. Hover lifts 1px, press squeezes to 0.98.
 */
export function Button({
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
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${VARIANT_CLASS[variant] || VARIANT_CLASS.primary} ${className}`.trim()}
      style={{
        minHeight: sz.minHeight,
        padding: sz.padding,
        fontSize: sz.fontSize,
        width: fullWidth ? '100%' : undefined,
        borderRadius: pill ? 'var(--radius-full)' : 'var(--radius-md)',
        ...style,
      }}
      {...rest}
    >
      {leftIcon ? <span style={{ display: 'inline-flex' }} aria-hidden>{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span style={{ display: 'inline-flex' }} aria-hidden>{rightIcon}</span> : null}
    </button>
  );
}
