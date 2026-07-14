import { describe, it, expect } from 'vitest';
import {
  formatPercent,
  formatHandle,
  capitalize,
  firstNameOf,
  platformLabel,
  contentTypeLabel,
  transactionTypeLabel,
  transactionStatusLabel,
  applicationStatusLabel,
  sourceLabel,
  formatDate,
} from './format';

describe('formatPercent', () => {
  it('prefixes positive values with +', () => {
    expect(formatPercent(12.34)).toBe('+12.3%');
  });
  it('keeps the sign for negative values', () => {
    expect(formatPercent(-5)).toBe('-5.0%');
  });
  it('does not prefix zero', () => {
    expect(formatPercent(0)).toBe('0.0%');
  });
});

describe('formatHandle', () => {
  it('adds a leading @ when missing', () => {
    expect(formatHandle('creator')).toBe('@creator');
  });
  it('keeps an existing @', () => {
    expect(formatHandle('@creator')).toBe('@creator');
  });
  it('returns empty string for blank input', () => {
    expect(formatHandle('   ')).toBe('');
  });
});

describe('capitalize / firstNameOf', () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
  it('takes the first word and capitalizes it', () => {
    expect(firstNameOf('john doe')).toBe('John');
  });
  it('handles empty input', () => {
    expect(capitalize('')).toBe('');
    expect(firstNameOf('')).toBe('');
  });
});

describe('label maps', () => {
  it('maps known platforms and falls back to the raw value', () => {
    expect(platformLabel('tiktok')).toBe('TikTok');
    expect(platformLabel('YOUTUBE')).toBe('YouTube');
    expect(platformLabel('mystery')).toBe('mystery');
  });
  it('maps content types and humanizes unknown ones', () => {
    expect(contentTypeLabel('tiktok_video')).toBe('TikTok video');
    expect(contentTypeLabel(null)).toBe('Any format');
    expect(contentTypeLabel('some_new_type')).toBe('some new type');
  });
  it('maps transaction type and status', () => {
    expect(transactionTypeLabel('platform_fee')).toBe('Platform fee (20%)');
    expect(transactionStatusLabel('completed')).toBe('Completed');
    expect(transactionStatusLabel('unknown')).toBe('unknown');
  });
  it('maps application status and source', () => {
    expect(applicationStatusLabel('approved')).toBe('Approved');
    expect(sourceLabel('ad_revenue')).toBe('Ad revenue');
    expect(sourceLabel(null)).toBe('Other');
  });
});

describe('formatDate', () => {
  it('renders a placeholder for null', () => {
    expect(formatDate(null)).toBe('—');
  });
  it('formats an ISO date', () => {
    // Uses en-US month/day/year; assert the parts are present.
    const out = formatDate('2026-07-14T00:00:00Z');
    expect(out).toMatch(/2026/);
  });
});
