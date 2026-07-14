import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { SignJWT } from 'jose';
import { verifyAccessTokenLocal } from '../utils/jwtVerify';

// The shared bootstrap sets SUPABASE_JWT_SECRET + SUPABASE_URL, so jwtVerify
// runs in HS256 mode against a known secret and issuer.
const SECRET = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET!);
const ISSUER = `${process.env.SUPABASE_URL}/auth/v1`;

async function makeToken(claims: Record<string, unknown>, expiresIn = '1h'): Promise<string> {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(ISSUER)
    .setAudience('authenticated')
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(SECRET);
}

describe('verifyAccessTokenLocal', () => {
  it('accepts a valid token and returns the subject', async () => {
    const token = await makeToken({ sub: 'user-123' });
    const result = await verifyAccessTokenLocal(token);
    assert.deepEqual(result, { status: 'ok', userId: 'user-123' });
  });

  it('rejects a malformed token as invalid', async () => {
    const result = await verifyAccessTokenLocal('not-a-jwt');
    assert.equal(result.status, 'invalid');
  });

  it('rejects an expired token as invalid', async () => {
    const token = await makeToken({ sub: 'user-123' }, '-1h');
    const result = await verifyAccessTokenLocal(token);
    assert.equal(result.status, 'invalid');
  });

  it('rejects a token signed with the wrong secret', async () => {
    const wrong = await new SignJWT({ sub: 'user-123' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuer(ISSUER)
      .setAudience('authenticated')
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode('a-different-secret'));
    const result = await verifyAccessTokenLocal(wrong);
    assert.equal(result.status, 'invalid');
  });

  it('rejects a token with the wrong audience', async () => {
    const token = await new SignJWT({ sub: 'user-123' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuer(ISSUER)
      .setAudience('someone-else')
      .setExpirationTime('1h')
      .sign(SECRET);
    const result = await verifyAccessTokenLocal(token);
    assert.equal(result.status, 'invalid');
  });
});
