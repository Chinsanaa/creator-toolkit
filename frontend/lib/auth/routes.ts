import type { UserType } from '@/lib/types/auth';

export function homePathForUserType(userType: UserType): string {
  return userType === 'sponsor' ? '/sponsor/dashboard' : '/dashboard';
}
