import path from 'path';
import dotenv from 'dotenv';

// Load backend/.env regardless of cwd (compiled to dist/test/loadEnv.js)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Allow CI / fresh clones without a local .env
if (!process.env.SUPABASE_URL?.trim()) {
  process.env.SUPABASE_URL = 'https://example.supabase.co';
}
if (!process.env.SUPABASE_ANON_KEY?.trim() && !process.env.SUPABASE_KEY?.trim()) {
  process.env.SUPABASE_ANON_KEY = 'test-anon-key';
}

// Deterministic keys so the encryption and JWT modules initialise in a known,
// configured state before any application module is imported. Set here (the
// shared test bootstrap) because both modules read their config at import time.
if (!process.env.ENCRYPTION_KEY?.trim()) {
  process.env.ENCRYPTION_KEY = Buffer.alloc(32, 7).toString('base64');
}
if (!process.env.SUPABASE_JWT_SECRET?.trim()) {
  process.env.SUPABASE_JWT_SECRET = 'test-jwt-secret-please-change';
}
