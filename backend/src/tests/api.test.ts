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

  it('rejects unauthenticated sponsorship application alias route', async () => {
    const res = await request(app())
      .post('/api/sponsorships/apply')
      .send({ sponsorshipId: 'demo', responseText: 'Interested' });
    assert.equal(res.status, 401);
  });

  it('rejects unauthenticated notifications', async () => {
    const res = await request(app()).get('/api/notifications');
    assert.equal(res.status, 401);
  });

  it('rejects unauthenticated account deletion', async () => {
    const res = await request(app())
      .delete('/api/auth/account')
      .send({ password: 'wrong-password' });
    assert.equal(res.status, 401);
  });

  it('rejects OAuth session without tokens', async () => {
    const res = await request(app()).post('/api/auth/oauth/session').send({});
    assert.equal(res.status, 400);
  });

  it('rate limits repeated refresh attempts', async () => {
    const testApp = app();

    for (let i = 0; i < 5; i += 1) {
      const res = await request(testApp).post('/api/auth/refresh').send({});
      assert.equal(res.status, 401);
    }

    const limited = await request(testApp).post('/api/auth/refresh').send({});
    assert.equal(limited.status, 429);
    assert.equal(limited.body.error, 'Too many auth attempts. Please try again later.');
  });
});

describe('Sync cron', () => {
  it('rejects cron without secret header', async () => {
    const res = await request(app()).post('/api/sync/cron');
    assert.equal(res.status, 401);
  });
});
