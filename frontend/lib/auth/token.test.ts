import { describe, it, expect } from 'vitest';
import { parseAccessToken } from './token';

function base64url(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj))
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function makeToken(payload: Record<string, unknown>): string {
  const header = base64url({ alg: 'HS256', typ: 'JWT' });
  return `${header}.${base64url(payload)}.signature`;
}

const future = Math.floor(Date.now() / 1000) + 3600;
const past = Math.floor(Date.now() / 1000) - 3600;

describe('parseAccessToken', () => {
  it('returns invalid for undefined', () => {
    expect(parseAccessToken(undefined)).toEqual({ valid: false, userId: null, userType: null });
  });

  it('returns invalid for a non-three-part token', () => {
    expect(parseAccessToken('a.b')).toEqual({ valid: false, userId: null, userType: null });
  });

  it('parses a valid token with user_metadata', () => {
    const token = makeToken({
      sub: 'user-1',
      exp: future,
      user_metadata: { user_type: 'sponsor' },
    });
    expect(parseAccessToken(token)).toEqual({
      valid: true,
      userId: 'user-1',
      userType: 'sponsor',
    });
  });

  it('falls back to app_metadata for user_type', () => {
    const token = makeToken({
      sub: 'user-2',
      exp: future,
      app_metadata: { user_type: 'creator' },
    });
    expect(parseAccessToken(token).userType).toBe('creator');
  });

  it('returns null userType for unknown role', () => {
    const token = makeToken({ sub: 'user-3', exp: future, user_metadata: { user_type: 'admin' } });
    expect(parseAccessToken(token).userType).toBeNull();
  });

  it('rejects an expired token', () => {
    const token = makeToken({ sub: 'user-4', exp: past });
    expect(parseAccessToken(token).valid).toBe(false);
  });

  it('rejects a token without sub or exp', () => {
    expect(parseAccessToken(makeToken({ exp: future })).valid).toBe(false);
    expect(parseAccessToken(makeToken({ sub: 'x' })).valid).toBe(false);
  });
});
