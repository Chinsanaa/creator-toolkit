import dotenv from 'dotenv';
dotenv.config();

import { loadEnvConfig } from './config/env';
import { createApp } from './app';
import { startSyncScheduler } from './jobs/syncScheduler';
import { warnIfMissingServiceRoleKey } from './database/supabase';
import emailService from './services/emailService';

const config = loadEnvConfig();
warnIfMissingServiceRoleKey();
emailService.warnIfNotConfigured();

const app = createApp(config);
const { port } = config;

app.listen(port, () => {
  console.log(`✓ Server running on http://localhost:${port}`);
  console.log(`✓ Health check: http://localhost:${port}/api/health`);
  console.log(`✓ Environment: ${config.nodeEnv}`);
  console.log(
    emailService.isConfigured()
      ? '✓ Email (Resend) enabled'
      : '○ Email (Resend) disabled — set RESEND_API_KEY and EMAIL_FROM'
  );
  startSyncScheduler();
});
