/**
 * WCAG 2.x relative-luminance contrast ratio utilities.
 *
 * Used by `designSystem.test.ts` to assert that the design system's
 * foreground/background token pairs meet the contrast thresholds:
 *  - 4.5:1 for normal text
 *  - 3:1 for large text (>=24px, or >=18.66px bold) and UI component boundaries
 *
 * Reference: https://www.w3.org/TR/WCAG21/#contrast-minimum
 */

export type RGB = [number, number, number];

/** Parses `#rgb`, `#rrggbb` hex, or `rgb()`/`rgba()` (space or comma separated) into 0-255 channels. */
export function parseColor(input: string): RGB {
  const value = input.trim();

  const hexMatch = value.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return [r, g, b];
  }

  const rgbMatch = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
  if (rgbMatch) {
    return [Number(rgbMatch[1]), Number(rgbMatch[2]), Number(rgbMatch[3])];
  }

  throw new Error(`parseColor: unrecognized color format: "${input}"`);
}

function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** Relative luminance per WCAG, 0 (black) to 1 (white). */
export function relativeLuminance(color: string | RGB): number {
  const [r, g, b] = typeof color === 'string' ? parseColor(color) : color;
  const [rl, gl, bl] = [r, g, b].map(srgbToLinear);
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

/** WCAG contrast ratio between two colors, always >= 1. */
export function contrastRatio(a: string | RGB, b: string | RGB): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** WCAG AA thresholds. */
export const WCAG_AA_NORMAL_TEXT = 4.5;
export const WCAG_AA_LARGE_TEXT = 3;
export const WCAG_AA_UI_BOUNDARY = 3;
