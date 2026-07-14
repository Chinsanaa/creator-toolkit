import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { encrypt, decrypt, deterministicHash, isConfigured } from '../utils/encryption';

// ENCRYPTION_KEY is set by the shared test bootstrap (test/loadEnv.ts).
describe('encryption', () => {
  it('is configured when ENCRYPTION_KEY is present', () => {
    assert.equal(isConfigured(), true);
  });

  it('round-trips a value through encrypt/decrypt', () => {
    const plaintext = 'oauth-access-token-abc123';
    const ciphertext = encrypt(plaintext);
    assert.notEqual(ciphertext, plaintext);
    assert.match(ciphertext, /^v1:/);
    assert.equal(decrypt(ciphertext), plaintext);
  });

  it('produces different ciphertext for the same input (random IV)', () => {
    const a = encrypt('same-value');
    const b = encrypt('same-value');
    assert.notEqual(a, b);
    assert.equal(decrypt(a), decrypt(b));
  });

  it('treats non-versioned values as legacy plaintext', () => {
    assert.equal(decrypt('legacy-plaintext-value'), 'legacy-plaintext-value');
  });

  it('returns empty string for null/undefined', () => {
    assert.equal(decrypt(null), '');
    assert.equal(decrypt(undefined), '');
  });

  it('deterministicHash is stable and input-sensitive', () => {
    const h1 = deterministicHash('1234567890');
    const h2 = deterministicHash('1234567890');
    const h3 = deterministicHash('1234567891');
    assert.equal(h1, h2);
    assert.notEqual(h1, h3);
    assert.notEqual(h1, '1234567890');
  });
});
