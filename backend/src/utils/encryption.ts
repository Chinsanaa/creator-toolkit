import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  createHash,
  randomBytes,
} from 'node:crypto';

/**
 * Application-level encryption for sensitive columns (OAuth tokens, bank
 * account numbers). Uses AES-256-GCM with a random IV per value and an
 * authentication tag, so ciphertext is tamper-evident.
 *
 * Ciphertext format: `v1:<iv_b64>:<tag_b64>:<ciphertext_b64>`.
 *
 * The key comes from ENCRYPTION_KEY (base64 or hex, decoding to 32 bytes; any
 * other string is accepted and hashed to 32 bytes with SHA-256). In production
 * the key is required (see warnIfMissingEncryptionKey + the startup guard in
 * index.ts). In development a missing key degrades to plaintext passthrough
 * with a warning so local work keeps functioning.
 */

const VERSION = 'v1';
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96-bit nonce, recommended for GCM

function decodeKey(raw: string): Buffer {
  // Accept a 32-byte key provided as base64 or hex; otherwise derive one.
  const trimmed = raw.trim();

  const asHex = /^[0-9a-fA-F]{64}$/.test(trimmed) ? Buffer.from(trimmed, 'hex') : null;
  if (asHex && asHex.length === 32) return asHex;

  try {
    const asBase64 = Buffer.from(trimmed, 'base64');
    if (asBase64.length === 32) return asBase64;
  } catch {
    // fall through to hashing
  }

  // Any other passphrase: derive a deterministic 32-byte key.
  return createHash('sha256').update(trimmed).digest();
}

const rawKey = process.env.ENCRYPTION_KEY?.trim();
const key: Buffer | null = rawKey ? decodeKey(rawKey) : null;

// HMAC key for deterministic hashing (uniqueness columns). Defaults to a
// domain-separated derivation of the encryption key so a single env var is
// enough, but can be overridden with BANK_HASH_KEY.
const hashKeySource = process.env.BANK_HASH_KEY?.trim() || rawKey;
const hashKey: Buffer | null = hashKeySource
  ? createHash('sha256').update(`hash:${hashKeySource}`).digest()
  : null;

export function isConfigured(): boolean {
  return key !== null;
}

export function warnIfMissingEncryptionKey(): void {
  if (!key) {
    console.warn(
      '⚠ ENCRYPTION_KEY is not set. Sensitive values (OAuth tokens, bank ' +
        'account numbers) will be stored as plaintext. Set a 32-byte key ' +
        '(base64 or hex) before storing real data.'
    );
  }
}

/** Encrypts a plaintext string. Returns plaintext unchanged when unconfigured. */
export function encrypt(plaintext: string): string {
  if (!key) return plaintext;

  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${VERSION}:${iv.toString('base64')}:${tag.toString('base64')}:${ciphertext.toString('base64')}`;
}

/**
 * Decrypts a value produced by encrypt(). Values without the version prefix are
 * treated as legacy plaintext and returned unchanged, so existing rows and data
 * written while unconfigured keep reading correctly.
 */
export function decrypt(value: string | null | undefined): string {
  if (value == null) return '';
  if (!value.startsWith(`${VERSION}:`)) return value; // legacy plaintext

  if (!key) {
    throw new Error('Cannot decrypt: ENCRYPTION_KEY is not set');
  }

  const parts = value.split(':');
  if (parts.length !== 4) {
    throw new Error('Malformed ciphertext');
  }

  const [, ivB64, tagB64, ctB64] = parts;
  const iv = Buffer.from(ivB64, 'base64');
  const tag = Buffer.from(tagB64, 'base64');
  const ciphertext = Buffer.from(ctB64, 'base64');

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
}

/**
 * Deterministic keyed hash for uniqueness columns (e.g. bank account numbers):
 * same input always maps to the same digest so a UNIQUE constraint still works,
 * without revealing the plaintext. Returns null when no key is configured.
 */
export function deterministicHash(value: string): string | null {
  if (!hashKey) return null;
  return createHmac('sha256', hashKey).update(value).digest('hex');
}
