#!/usr/bin/env node
/**
 * Smoke tests for frontend routes and backend API endpoints.
 * Usage: node scripts/smoke-test.mjs
 */

const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:3000';
const BACKEND = process.env.BACKEND_URL || 'http://localhost:3001';
const FETCH_TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS || 20_000);

const results = [];

function record(name, pass, detail = '') {
  results.push({ name, pass, detail });
  const icon = pass ? '✓' : '✗';
  console.log(`${icon} ${name}${detail ? ` — ${detail}` : ''}`);
}

async function fetchStatus(url, options = {}) {
  const res = await fetch(url, {
    redirect: 'manual',
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    ...options,
  });
  return res;
}

async function testFrontend() {
  console.log('\n=== Frontend routes ===\n');

  const publicPages = [
    ['/', 'creator landing'],
    ['/brands', 'brand landing'],
    ['/login/creator', 'creator login'],
    ['/login/sponsor', 'sponsor login'],
    ['/signup/creator', 'creator signup'],
    ['/signup/sponsor', 'sponsor signup'],
    ['/docs', 'docs hub'],
    ['/docs/deployment', 'docs article'],
  ];

  for (const [path, label] of publicPages) {
    try {
      const res = await fetchStatus(`${FRONTEND}${path}`);
      record(`${label} (${path})`, res.status === 200, `status ${res.status}`);
    } catch (e) {
      record(`${label} (${path})`, false, String(e.message || e));
    }
  }

  const redirects = [
    ['/login', '/login/creator'],
    ['/signup', '/signup/creator'],
  ];

  for (const [path, expectedPrefix] of redirects) {
    try {
      const res = await fetchStatus(`${FRONTEND}${path}`);
      const location = res.headers.get('location') || '';
      const ok = res.status === 307 || res.status === 308 || res.status === 302
        ? location.includes(expectedPrefix)
        : res.status === 200;
      record(`redirect ${path}`, ok, `status ${res.status} location ${location || 'n/a'}`);
    } catch (e) {
      record(`redirect ${path}`, false, String(e.message || e));
    }
  }

  try {
    const res = await fetch(`${FRONTEND}/this-route-does-not-exist`, { redirect: 'manual' });
    const html = await res.text();
    record(
      'unknown frontend route 404',
      res.status === 404 && html.includes('Page not found'),
      `status ${res.status}`
    );
  } catch (e) {
    record('unknown frontend route 404', false, String(e.message || e));
  }

  const protectedPaths = ['/dashboard', '/platforms', '/sponsorships', '/wallet', '/sponsor/dashboard'];
  for (const path of protectedPaths) {
    try {
      const res = await fetchStatus(`${FRONTEND}${path}`);
      const location = res.headers.get('location') || '';
      const ok = (res.status === 307 || res.status === 302 || res.status === 308) && location.includes('/login');
      record(`protected ${path} → login`, ok, `status ${res.status}`);
    } catch (e) {
      record(`protected ${path}`, false, String(e.message || e));
    }
  }

  try {
    const res = await fetch(`${FRONTEND}/`);
    const html = await res.text();
    record('creator page has scroll nav', html.includes('How it works') && html.includes('#features'));
    record('creator page no free trial', !html.toLowerCase().includes('free trial'));
    record('creator page Get started CTA', html.includes('Get started'));
  } catch (e) {
    record('creator page content', false, String(e.message || e));
  }

  try {
    const res = await fetch(`${FRONTEND}/brands`);
    const html = await res.text();
    record('brand page has campaigns nav', html.includes('Campaigns'));
    record('brand page For Creators link', html.includes('For Creators'));
  } catch (e) {
    record('brand page content', false, String(e.message || e));
  }
}

async function testBackend() {
  console.log('\n=== Backend API ===\n');

  try {
    const res = await fetch(`${BACKEND}/api/health`);
    const body = await res.json();
    record('GET /api/health', [200, 503].includes(res.status), `status ${res.status} db=${body.checks?.database}`);
  } catch (e) {
    record('GET /api/health', false, String(e.message || e));
  }

  try {
    const res = await fetch(`${BACKEND}/api/unknown`);
    const body = await res.json();
    record(
      'GET /api/unknown 404',
      res.status === 404 && body.error?.code === 'NOT_FOUND' && body.error?.message === 'Route not found'
    );
  } catch (e) {
    record('GET /api/unknown 404', false, String(e.message || e));
  }

  const protectedApi = [
    '/api/dashboard/summary',
    '/api/sponsorships',
    '/api/sponsorships/applications/me',
    '/api/wallet/summary',
    '/api/wallet/transactions',
    '/api/wallet/bank-accounts',
    '/api/platforms',
    '/api/platforms/sync/history',
    '/api/sponsor/dashboard',
    '/api/sponsor/campaigns',
    '/api/notifications',
    '/api/auth/me',
  ];

  for (const path of protectedApi) {
    try {
      const res = await fetch(`${BACKEND}${path}`);
      record(`401 ${path}`, res.status === 401, `status ${res.status}`);
    } catch (e) {
      record(`401 ${path}`, false, String(e.message || e));
    }
  }

  try {
    const res = await fetch(`${BACKEND}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'bad@test.com', password: 'wrong' }),
    });
    record('POST /api/auth/login invalid creds', res.status === 401, `status ${res.status}`);
  } catch (e) {
    record('POST /api/auth/login', false, String(e.message || e));
  }

  try {
    const res = await fetch(`${BACKEND}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    record('POST /api/auth/signup empty body', res.status === 400, `status ${res.status}`);
  } catch (e) {
    record('POST /api/auth/signup', false, String(e.message || e));
  }

  try {
    const res = await fetch(`${BACKEND}/api/auth/logout`, { method: 'POST' });
    const body = await res.json();
    record('POST /api/auth/logout', res.status === 200 && body.message, `status ${res.status}`);
  } catch (e) {
    record('POST /api/auth/logout', false, String(e.message || e));
  }

  try {
    const res = await fetch(`${BACKEND}/api/auth/refresh`, { method: 'POST' });
    record('POST /api/auth/refresh no cookie', res.status === 401, `status ${res.status}`);
  } catch (e) {
    record('POST /api/auth/refresh', false, String(e.message || e));
  }
}

async function main() {
  console.log(`Frontend: ${FRONTEND}`);
  console.log(`Backend:  ${BACKEND}`);

  await testFrontend();
  await testBackend();

  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass);

  console.log(`\n=== Summary: ${passed}/${results.length} passed ===`);
  if (failed.length) {
    console.log('\nFailed:');
    failed.forEach((f) => console.log(`  - ${f.name}: ${f.detail}`));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
