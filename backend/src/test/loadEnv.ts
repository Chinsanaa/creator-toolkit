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
