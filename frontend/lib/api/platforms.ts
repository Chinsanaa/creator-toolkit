import { apiFetch } from './client';
import type { PlatformAccount, SyncHistoryEntry } from '@/lib/types/platforms';

export async function listPlatforms(): Promise<PlatformAccount[]> {
  const data = await apiFetch<{ accounts: PlatformAccount[] }>('/api/platforms');
  return data.accounts;
}

export async function connectPlatform(
  platform: string,
  platformUsername: string
): Promise<PlatformAccount> {
  const data = await apiFetch<{ account: PlatformAccount }>('/api/platforms/connect', {
    method: 'POST',
    body: JSON.stringify({ platform, platformUsername }),
  });
  return data.account;
}

export async function syncPlatform(accountId: string): Promise<void> {
  await apiFetch(`/api/platforms/${accountId}/sync`, { method: 'POST' });
}

export async function listSyncHistory(): Promise<SyncHistoryEntry[]> {
  const data = await apiFetch<{ history: SyncHistoryEntry[] }>('/api/platforms/sync/history');
  return data.history;
}

export async function getTikTokAuthUrl(): Promise<{ authUrl: string }> {
  const data = await apiFetch<{ authUrl: string }>('/api/auth/tiktok/authorize');
  return data;
}

export async function completeTikTokOAuth(code: string): Promise<{ account: PlatformAccount }> {
  const data = await apiFetch<{ account: PlatformAccount }>('/api/auth/tiktok/callback', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
  return data;
}

export async function getYouTubeAuthUrl(): Promise<{ authUrl: string }> {
  const data = await apiFetch<{ authUrl: string }>('/api/auth/youtube/authorize');
  return data;
}

export async function completeYouTubeOAuth(code: string): Promise<{ account: PlatformAccount }> {
  const data = await apiFetch<{ account: PlatformAccount }>('/api/auth/youtube/callback', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
  return data;
}

export async function getInstagramAuthUrl(): Promise<{ authUrl: string }> {
  const data = await apiFetch<{ authUrl: string }>('/api/auth/instagram/authorize');
  return data;
}

export async function completeInstagramOAuth(code: string): Promise<{ account: PlatformAccount }> {
  const data = await apiFetch<{ account: PlatformAccount }>('/api/auth/instagram/callback', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
  return data;
}
