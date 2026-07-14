import { describe, it, expect } from 'vitest';
import { validatePassword, getPasswordErrorMessage } from './passwords';

describe('validatePassword', () => {
  it('accepts a password meeting every requirement', () => {
    const result = validatePassword('Str0ng!pass');
    expect(result.isValid).toBe(true);
    expect(result.requirements).toEqual({
      minLength: true,
      hasUppercase: true,
      hasLowercase: true,
      hasNumber: true,
      hasSpecialChar: true,
    });
  });

  it('requires more than 8 characters', () => {
    // 8 chars, otherwise valid -> too short.
    const result = validatePassword('Ab1!cdef');
    expect(result.requirements.minLength).toBe(false);
    expect(result.isValid).toBe(false);
  });

  it('flags each missing character class', () => {
    expect(validatePassword('lower1!lower').requirements.hasUppercase).toBe(false);
    expect(validatePassword('UPPER1!UPPER').requirements.hasLowercase).toBe(false);
    expect(validatePassword('NoNumber!!!').requirements.hasNumber).toBe(false);
    expect(validatePassword('NoSpecial123').requirements.hasSpecialChar).toBe(false);
  });
});

describe('getPasswordErrorMessage', () => {
  it('returns null for a valid password', () => {
    expect(getPasswordErrorMessage('Str0ng!pass')).toBeNull();
  });

  it('reports length first with the current length', () => {
    const msg = getPasswordErrorMessage('Ab1!');
    expect(msg).toContain('more than 8 characters');
    expect(msg).toContain('currently 4');
  });

  it('reports the first unmet class once length is satisfied', () => {
    expect(getPasswordErrorMessage('lower1!lower')).toContain('uppercase');
    expect(getPasswordErrorMessage('UPPER1!UPPER')).toContain('lowercase');
    expect(getPasswordErrorMessage('NoNumber!!!X')).toContain('number');
    expect(getPasswordErrorMessage('NoSpecial123')).toContain('special character');
  });
});
