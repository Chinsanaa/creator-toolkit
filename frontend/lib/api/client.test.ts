import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the session module so apiFetch has a deterministic token + no real cookies.
vi.mock('@/lib/auth/session', () => ({
  getAccessToken: vi.fn(() => 'test-token'),
  setAccessToken: vi.fn(),
  setUserTypeCookie: vi.fn(),
  clearSessionCookies: vi.fn(),
}));

import { apiFetch, refreshAccessToken, ApiError } from './client';
import { getAccessToken, setAccessToken } from '@/lib/auth/session';

function jsonResponse(body: unknown, init: { status?: number; ok?: boolean } = {}) {
  const status = init.status ?? 200;
  return {
    ok: init.ok ?? (status >= 200 && status < 300),
    status,
    statusText: 'x',
    json: () => Promise.resolve(body),
  } as Response;
}

function setOnline(value: boolean) {
  Object.defineProperty(navigator, 'onLine', { value, configurable: true });
}

describe('apiFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (getAccessToken as ReturnType<typeof vi.fn>).mockReturnValue('test-token');
    setOnline(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns parsed JSON on success and sends the auth header', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ hello: 'world' }));
    vi.stubGlobal('fetch', fetchMock);

    const data = await apiFetch<{ hello: string }>('/api/thing');
    expect(data).toEqual({ hello: 'world' });

    const [, options] = fetchMock.mock.calls[0];
    expect((options.headers as Record<string, string>).Authorization).toBe('Bearer test-token');
  });

  it('parses a string error body into an ApiError with the status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ error: 'Bad thing' }, { status: 400 })));

    await expect(apiFetch('/api/thing')).rejects.toMatchObject({
      message: 'Bad thing',
      status: 400,
    });
  });

  it('surfaces a structured error object with code', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse({ error: { message: 'Missing', code: 'NOT_FOUND' } }, { status: 404 })
      )
    );

    const err = await apiFetch('/api/thing').catch((e) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect(err.code).toBe('NOT_FOUND');
    expect(err.status).toBe(404);
  });

  it('maps a fetch TimeoutError to a 408 ApiError', async () => {
    const timeout = Object.assign(new Error('timed out'), { name: 'TimeoutError' });
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(timeout));

    await expect(apiFetch('/api/thing')).rejects.toMatchObject({ status: 408 });
  });

  it('maps an offline network failure to a status-0 ApiError', async () => {
    setOnline(false);
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

    const err = await apiFetch('/api/thing').catch((e) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect(err.status).toBe(0);
    expect(err.message).toMatch(/offline/i);
  });

  it('refreshes the token and retries once on 401', async () => {
    const fetchMock = vi
      .fn()
      // 1) original request → 401
      .mockResolvedValueOnce(jsonResponse({ error: 'nope' }, { status: 401 }))
      // 2) refresh call → ok with a new token
      .mockResolvedValueOnce(jsonResponse({ accessToken: 'new-token' }))
      // 3) retried original request → success
      .mockResolvedValueOnce(jsonResponse({ ok: true }));
    vi.stubGlobal('fetch', fetchMock);

    const data = await apiFetch<{ ok: boolean }>('/api/thing');
    expect(data).toEqual({ ok: true });
    expect(setAccessToken).toHaveBeenCalledWith('new-token');
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('does not retry the refresh endpoint itself', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ error: 'nope' }, { status: 401 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(apiFetch('/api/auth/refresh')).rejects.toBeInstanceOf(ApiError);
    // Only the single call — no refresh-retry loop.
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe('refreshAccessToken', () => {
  beforeEach(() => vi.clearAllMocks());

  it('stores the new token and returns true on success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ accessToken: 'refreshed' })));
    const ok = await refreshAccessToken();
    expect(ok).toBe(true);
    expect(setAccessToken).toHaveBeenCalledWith('refreshed');
  });

  it('returns false when the refresh call fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, { status: 401 })));
    const ok = await refreshAccessToken();
    expect(ok).toBe(false);
  });
});
