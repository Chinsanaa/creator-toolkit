import { describe, expect, it } from 'vitest';
import { contrastRatio, parseColor, relativeLuminance } from './contrast';

describe('parseColor', () => {
  it('parses 6-digit hex', () => {
    expect(parseColor('#0B1220')).toEqual([11, 18, 32]);
  });

  it('parses 3-digit hex, expanding shorthand', () => {
    expect(parseColor('#fff')).toEqual([255, 255, 255]);
  });

  it('parses rgb() with commas', () => {
    expect(parseColor('rgb(11, 18, 32)')).toEqual([11, 18, 32]);
  });

  it('parses rgba() with a slash-separated alpha (ignored for contrast purposes)', () => {
    expect(parseColor('rgb(255 255 255 / 0.9)')).toEqual([255, 255, 255]);
  });

  it('throws on unrecognized input', () => {
    expect(() => parseColor('not-a-color')).toThrow();
  });
});

describe('relativeLuminance', () => {
  it('white is 1, black is 0', () => {
    expect(relativeLuminance('#FFFFFF')).toBeCloseTo(1, 5);
    expect(relativeLuminance('#000000')).toBeCloseTo(0, 5);
  });
});

describe('contrastRatio', () => {
  it('black on white is 21:1 (the maximum possible)', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 1);
  });

  it('a color against itself is 1:1', () => {
    expect(contrastRatio('#2E5BFF', '#2E5BFF')).toBeCloseTo(1, 5);
  });

  it('is symmetric regardless of argument order', () => {
    const a = contrastRatio('#0B1220', '#F4F7FC');
    const b = contrastRatio('#F4F7FC', '#0B1220');
    expect(a).toBeCloseTo(b, 5);
  });

  it('matches the known-bad pre-fix case: white text on Earnio primary in dark mode failed AA', () => {
    // Historical regression this test suite now guards against — see globals.css
    // --primary-foreground. Documented here so the "why" survives future edits.
    const ratio = contrastRatio('#ffffff', '#5C7DFF');
    expect(ratio).toBeLessThan(4.5);
  });

  it('confirms the fix: ink text on Earnio primary in dark mode passes AA', () => {
    const ratio = contrastRatio('#0B1220', '#5C7DFF');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});
