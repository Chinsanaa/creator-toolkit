import { test, expect } from '@playwright/test';

test.describe('auth redirect smoke', () => {
  test('unauthenticated /dashboard redirects to login', async ({ page, baseURL }) => {
    try {
      await page.request.get(baseURL ?? 'http://localhost:3000/', { timeout: 5_000 });
    } catch {
      test.skip(true, `Frontend not reachable at ${baseURL}`);
    }

    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
    expect(page.url()).toContain('next=');
  });
});
