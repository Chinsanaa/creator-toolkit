import { normalizeAuthUser } from '../auth/user';
import { getAccessToken, setAccessToken } from '../auth/session';
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
  } catch {
    // ignore
  }
  return res.statusText || 'Request failed';
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  retryOnUnauthorized = true
): Promise<T> {
  const token = getAccessToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> | undefined),
    },
  });

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
