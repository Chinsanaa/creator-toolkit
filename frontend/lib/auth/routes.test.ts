import { describe, it, expect } from 'vitest';
import { homePathForUserType } from './routes';

describe('homePathForUserType', () => {
  it('sends sponsors to the sponsor dashboard', () => {
    expect(homePathForUserType('sponsor')).toBe('/sponsor/dashboard');
  });

  it('sends creators to the creator dashboard', () => {
    expect(homePathForUserType('creator')).toBe('/dashboard');
  });
});
