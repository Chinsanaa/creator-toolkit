import type { AuthUser, UserType } from '@/lib/types/auth';

export function normalizeUserType(value: unknown): UserType {
  if (typeof value === 'string' && value.toLowerCase() === 'sponsor') {
    return 'sponsor';
  }
  return 'creator';
}

export function normalizeAuthUser(raw: Partial<AuthUser> & { user_type?: string }): AuthUser {
  return {
    id: raw.id ?? '',
    email: raw.email ?? '',
    name: raw.name ?? '',
    username: raw.username ?? '',
    userType: normalizeUserType(raw.userType ?? raw.user_type),
  };
}
