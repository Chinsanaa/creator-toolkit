import { supabase, hasServiceRoleKey } from '../database/supabase';
import emailService from '../services/emailService';

export interface HealthStatus {
  status: 'ok' | 'degraded';
  timestamp: string;
  port: number;
  checks: {
    database: 'ok' | 'error';
    serviceRole: 'configured' | 'missing';
    email: 'configured' | 'disabled';
    syncCron: 'enabled' | 'disabled';
  };
}

export async function getHealthStatus(port: number): Promise<HealthStatus> {
  let database: 'ok' | 'error' = 'error';

  try {
    const { error } = await supabase.from('users').select('id').limit(1);
    if (!error) database = 'ok';
  } catch {
    database = 'error';
  }

  const checks = {
    database,
    serviceRole: hasServiceRoleKey() ? ('configured' as const) : ('missing' as const),
    email: emailService.isConfigured() ? ('configured' as const) : ('disabled' as const),
    syncCron:
      process.env.ENABLE_SYNC_CRON === 'true' ? ('enabled' as const) : ('disabled' as const),
  };

  const status =
    database === 'ok' ? 'ok' : 'degraded';

  return {
    status,
    timestamp: new Date().toISOString(),
    port,
    checks,
  };
}
