import type { UserType } from '@/lib/types/auth';

interface JwtPayload {
  exp?: number;
  sub?: string;
  user_metadata?: {
    user_type?: string;
  };
  app_metadata?: {
    user_type?: string;
  };
}

function decodeBase64Url(value: string): string | null {
  try {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    return atob(padded);
  } catch {
    return null;
  }
}

export function parseAccessToken(token: string | undefined): {
  valid: boolean;
  userId: string | null;
  userType: UserType | null;
} {
  if (!token) {
    return { valid: false, userId: null, userType: null };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, userId: null, userType: null };
  }

  const payloadJson = decodeBase64Url(parts[1]);
  if (!payloadJson) {
    return { valid: false, userId: null, userType: null };
  }

  let payload: JwtPayload;
  try {
    payload = JSON.parse(payloadJson) as JwtPayload;
  } catch {
    return { valid: false, userId: null, userType: null };
  }

  if (!payload.sub || typeof payload.exp !== 'number') {
    return { valid: false, userId: null, userType: null };
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (payload.exp <= nowSeconds) {
    return { valid: false, userId: null, userType: null };
  }

  const rawType = payload.user_metadata?.user_type ?? payload.app_metadata?.user_type;
  const userType = rawType === 'creator' || rawType === 'sponsor' ? rawType : null;

  return {
    valid: true,
    userId: payload.sub,
    userType,
  };
}
