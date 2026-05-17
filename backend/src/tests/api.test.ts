import 'dotenv/config';
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

describe('Protected routes', () => {
  it('rejects unauthenticated dashboard access', async () => {
    const app = createApp(testConfig);
    const res = await request(app).get('/api/dashboard/summary');
    assert.equal(res.status, 401);
  });
});
