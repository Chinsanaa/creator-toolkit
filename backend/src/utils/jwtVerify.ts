import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';

/**
 * Local verification of Supabase access tokens, so the common path avoids a
 * network round trip to supabase.auth.getUser() on every authenticated request.
 *
 * Two modes:
 *   - SUPABASE_JWT_SECRET set → symmetric HS256 verification (no network).
 *   - Otherwise → asymmetric verification against the project's JWKS endpoint
 *     (RS256/ES256), which jose caches in-process.
 *
 * Returns a discriminated result so the caller can fall back to the network
 * getUser() path only when verification is genuinely unconfigured — a malformed
 * or expired token resolves to `invalid` and must not fall back.
 */

export type JwtVerifyResult =
  | { status: 'ok'; userId: string }
  | { status: 'invalid' }
  | { status: 'unconfigured' };

const supabaseUrl = (process.env.SUPABASE_URL || '').trim().replace(/\/$/, '');
const jwtSecret = process.env.SUPABASE_JWT_SECRET?.trim();

const issuer = supabaseUrl ? `${supabaseUrl}/auth/v1` : undefined;
const AUDIENCE = 'authenticated';

const secretKey = jwtSecret ? new TextEncoder().encode(jwtSecret) : null;

// Lazily initialise the remote key set so a missing/invalid URL doesn't throw
// at import time; it's only used when no shared secret is configured.
let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;
function getJwks(): ReturnType<typeof createRemoteJWKSet> | null {
  if (!supabaseUrl) return null;
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`${supabaseUrl}/auth/v1/.well-known/jwks.json`));
  }
  return jwks;
}

export function isConfigured(): boolean {
  return Boolean(secretKey) || Boolean(supabaseUrl);
}

function userIdFrom(payload: JWTPayload): JwtVerifyResult {
  return typeof payload.sub === 'string' && payload.sub
    ? { status: 'ok', userId: payload.sub }
    : { status: 'invalid' };
}

export async function verifyAccessTokenLocal(token: string): Promise<JwtVerifyResult> {
  const options = {
    audience: AUDIENCE,
    ...(issuer ? { issuer } : {}),
  };

  if (secretKey) {
    try {
      const { payload } = await jwtVerify(token, secretKey, options);
      return userIdFrom(payload);
    } catch {
      return { status: 'invalid' };
    }
  }

  const keySet = getJwks();
  if (!keySet) {
    return { status: 'unconfigured' };
  }

  try {
    const { payload } = await jwtVerify(token, keySet, options);
    return userIdFrom(payload);
  } catch (err) {
    // A JWKS fetch/config failure is unconfigured (fall back to network);
    // a real signature/claim failure is invalid (reject).
    if (err instanceof Error && err.name === 'JWKSNoMatchingKey') {
      return { status: 'invalid' };
    }
    if (
      err instanceof Error &&
      (err.name === 'JOSEError' || err.name === 'JWKSTimeout' || err.message.includes('JWKS'))
    ) {
      return { status: 'unconfigured' };
    }
    return { status: 'invalid' };
  }
}
