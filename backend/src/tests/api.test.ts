import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../app';
import type { EnvConfig } from '../config/env';

const testConfig: EnvConfig = {
  port: 3001,
  frontendUrl: 'http://localhost:3000',
  supabaseUrl: 'https://example.supabase.co',
  supabaseAnonKey: 'test-anon-key',
  nodeEnv: 'test',
};

function app() {
  return createApp(testConfig);
}

describe('Protected routes', () => {
  it('rejects unauthenticated dashboard access', async () => {
    const res = await request(app()).get('/api/dashboard/summary');
    assert.equal(res.status, 401);
  });

  it('rejects unauthenticated wallet summary', async () => {
    const res = await request(app()).get('/api/wallet/summary');
    assert.equal(res.status, 401);
  });

  it('rejects unauthenticated sponsor dashboard', async () => {
    const res = await request(app()).get('/api/sponsor/dashboard');
    assert.equal(res.status, 401);
  });

  it('rejects unauthenticated sponsorships list', async () => {
    const res = await request(app()).get('/api/sponsorships');
    assert.equal(res.status, 401);
  });

  it('rejects unauthenticated notifications', async () => {
    const res = await request(app()).get('/api/notifications');
    assert.equal(res.status, 401);
  });
});

describe('Sync cron', () => {
  it('rejects cron without secret header', async () => {
    const res = await request(app()).post('/api/sync/cron');
    assert.equal(res.status, 401);
  });
});
