import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

/**
 * E2E tests expect the Next.js frontend (and for happy-path, the Express API + Supabase)
 * to already be running. Start them with `npm run dev` from the repo root.
 *
 * Auth redirect smoke only needs the frontend.
 * Happy-path skips automatically when `GET {API}/api/health` is unreachable.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  timeout: 120_000,
  use: {
    baseURL,
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
  },
});
