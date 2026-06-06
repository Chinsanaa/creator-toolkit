export const ACCESS_TOKEN_COOKIE = 'ct-access-token';
export const USER_TYPE_COOKIE = 'ct-user-type';

const MAX_AGE_SECONDS = 60 * 60;

export type SessionUserType = 'creator' | 'sponsor';

export function setAccessToken(token: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function setUserTypeCookie(userType: SessionUserType): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${USER_TYPE_COOKIE}=${userType}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function clearAccessToken(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function clearUserTypeCookie(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${USER_TYPE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function clearSessionCookies(): void {
  clearAccessToken();
  clearUserTypeCookie();
}

export function getAccessToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${ACCESS_TOKEN_COOKIE}=`));
  if (!match) return null;
  return decodeURIComponent(match.split('=').slice(1).join('='));
}
