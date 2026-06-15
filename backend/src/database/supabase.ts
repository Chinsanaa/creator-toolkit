import { createClient, SupabaseClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const supabaseUrl = requireEnv('SUPABASE_URL');
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || requireEnv('SUPABASE_ANON_KEY');

const clientOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  global: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetch: fetch as any,
    WebSocket: WebSocket as unknown as typeof globalThis.WebSocket,
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, clientOptions);

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

export const supabaseAdmin: SupabaseClient | null = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, clientOptions)
  : null;

export function hasServiceRoleKey(): boolean {
  return Boolean(serviceRoleKey);
}

export function warnIfMissingServiceRoleKey(): void {
  if (!hasServiceRoleKey()) {
    console.warn(
      '⚠ SUPABASE_SERVICE_ROLE_KEY is not set. Username checks and sponsor creator lookups may be limited. ' +
        'Add it from Supabase Dashboard → Project Settings → API → service_role (secret).'
    );
  }
}

export function getAuthenticatedClient(accessToken: string): SupabaseClient {
  return createClient(supabaseUrl, supabaseAnonKey, {
    ...clientOptions,
    global: {
      ...clientOptions.global,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}
