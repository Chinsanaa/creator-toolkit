export const ACCESS_TOKEN_COOKIE = 'ct-access-token';
export const USER_TYPE_COOKIE = 'ct-user-type';

const MAX_AGE_SECONDS = 60 * 60;

export type SessionUserType = 'creator' | 'sponsor';

function cookieSecurityAttribute(): string {
  if (typeof window === 'undefined') return '';
  return window.location.protocol === 'https:' ? '; Secure' : '';
}

function buildCookie(name: string, value: string, maxAge: number): string {
  return `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${cookieSecurityAttribute()}`;
}

export function setAccessToken(token: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = buildCookie(ACCESS_TOKEN_COOKIE, token, MAX_AGE_SECONDS);
}

export function setUserTypeCookie(userType: SessionUserType): void {
  if (typeof document === 'undefined') return;
  document.cookie = buildCookie(USER_TYPE_COOKIE, userType, MAX_AGE_SECONDS);
}

export function clearAccessToken(): void {
  if (typeof document === 'undefined') return;
  document.cookie = buildCookie(ACCESS_TOKEN_COOKIE, '', 0);
}

export function clearUserTypeCookie(): void {
  if (typeof document === 'undefined') return;
  document.cookie = buildCookie(USER_TYPE_COOKIE, '', 0);
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
