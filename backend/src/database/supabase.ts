import { createClient, SupabaseClient } from '@supabase/supabase-js';
import ws from 'ws';

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
  realtime: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transport: ws as any,
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
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}
