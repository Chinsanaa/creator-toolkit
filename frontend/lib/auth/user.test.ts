import { describe, it, expect } from 'vitest';
import { normalizeUserType, normalizeAuthUser } from './user';

describe('normalizeUserType', () => {
  it('recognizes "sponsor" case-insensitively', () => {
    expect(normalizeUserType('sponsor')).toBe('sponsor');
    expect(normalizeUserType('Sponsor')).toBe('sponsor');
    expect(normalizeUserType('SPONSOR')).toBe('sponsor');
  });

  it('defaults to creator for anything else', () => {
    expect(normalizeUserType('creator')).toBe('creator');
    expect(normalizeUserType('brand')).toBe('creator');
    expect(normalizeUserType('')).toBe('creator');
  });

  it('defaults to creator for non-string input', () => {
    expect(normalizeUserType(undefined)).toBe('creator');
    expect(normalizeUserType(null)).toBe('creator');
    expect(normalizeUserType(42)).toBe('creator');
  });
});

describe('normalizeAuthUser', () => {
  it('fills missing fields with empty strings and defaults the user type', () => {
    expect(normalizeAuthUser({})).toEqual({
      id: '',
      email: '',
      name: '',
      username: '',
      userType: 'creator',
      isVerified: false,
    });
  });

  it('maps a snake_case user_type from the API', () => {
    const user = normalizeAuthUser({
      id: 'u1',
      email: 'a@b.com',
      name: 'Amar',
      username: 'amar',
      user_type: 'sponsor',
      is_verified: true,
    });

    expect(user).toEqual({
      id: 'u1',
      email: 'a@b.com',
      name: 'Amar',
      username: 'amar',
      userType: 'sponsor',
      isVerified: true,
    });
  });

  it('prefers an explicit camelCase userType over user_type', () => {
    const user = normalizeAuthUser({ userType: 'sponsor', user_type: 'creator' });
    expect(user.userType).toBe('sponsor');
  });
});
