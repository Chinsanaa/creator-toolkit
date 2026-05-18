import { normalizeAuthUser } from '../auth/user';
import { getAccessToken, setAccessToken, setUserTypeCookie } from '../auth/session';
import type { AuthResponse, LoginRequest, MeResponse, SignupRequest } from '../types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (data && typeof data.error === 'string') return data.error;
    if (data?.error && typeof data.error.message === 'string') return data.error.message;
  } catch {
    // ignore
  }
  if (res.status === 401) return 'Please sign in again.';
  if (res.status >= 500) return 'Something went wrong. Please try again.';
  return res.statusText || 'Request failed';
}

const FETCH_TIMEOUT_MS = 30_000;

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  retryOnUnauthorized = true
): Promise<T> {
  const token = getAccessToken();

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: 'include',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers as Record<string, string> | undefined),
      },
    });
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      throw new ApiError('Request timed out. Please try again.', 408);
    }
    if (!navigator.onLine) {
      throw new ApiError('You appear to be offline. Check your connection.', 0);
    }
    throw new ApiError('Network error. Please try again.', 0);
  }

  if (res.status === 401 && retryOnUnauthorized && path !== '/api/auth/refresh') {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiFetch<T>(path, options, false);
    }
  }

  if (!res.ok) {
    throw new ApiError(await parseError(res), res.status);
  }

  return res.json() as Promise<T>;
}

export async function refreshAccessToken(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { accessToken: string };
    setAccessToken(data.accessToken);
    return true;
  } catch {
    return false;
  }
}

function normalizeAuthResponse(data: AuthResponse): AuthResponse {
  return {
    ...data,
    user: normalizeAuthUser(data.user),
  };
}

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  const data = normalizeAuthResponse(
    await apiFetch<AuthResponse>(
      '/api/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      false
    )
  );
  setAccessToken(data.accessToken);
  setUserTypeCookie(data.user.userType);
  return data;
}

export async function signup(payload: SignupRequest): Promise<AuthResponse> {
  const data = normalizeAuthResponse(
    await apiFetch<AuthResponse>(
      '/api/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      false
    )
  );
  setAccessToken(data.accessToken);
  setUserTypeCookie(data.user.userType);
  return data;
}

export async function logout(): Promise<void> {
  try {
    await apiFetch('/api/auth/logout', { method: 'POST' }, false);
  } catch {
    // clear local session even if backend call fails
  }
}

export async function getMe(): Promise<MeResponse> {
  const data = await apiFetch<MeResponse>('/api/auth/me');
  return { ...data, user: normalizeAuthUser(data.user) };
}
