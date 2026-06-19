'use client';

import { useCallback, useEffect, useState } from 'react';
import { CreatorPageHeader } from '@/components/creator/CreatorPageHeader';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { useLanguage } from '@/contexts/LanguageContext';
import { ApiError } from '@/lib/api/client';
import {
  listPlatforms,
  listSyncHistory,
  syncPlatform,
  getTikTokAuthUrl,
  getYouTubeAuthUrl,
  getInstagramAuthUrl,
} from '@/lib/api/platforms';
import { formatDate, formatHandle, platformLabel } from '@/lib/format';
import type { PlatformAccount, SyncHistoryEntry } from '@/lib/types/platforms';

const PLATFORMS = [
  { id: 'tiktok', label: 'TikTok', icon: '🎵' },
  { id: 'youtube', label: 'YouTube', icon: '📺' },
  { id: 'instagram', label: 'Instagram', icon: '📷' },
] as const;

export default function PlatformsPage() {
  const [accounts, setAccounts] = useState<PlatformAccount[]>([]);
  const [history, setHistory] = useState<SyncHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { t } = useLanguage();

  const load = useCallback(async (isCancelled: () => boolean = () => false) => {
    setError(null);
    try {
      const [accs, hist] = await Promise.all([listPlatforms(), listSyncHistory()]);
      if (!isCancelled()) {
        setAccounts(accs);
        setHistory(hist);
      }
    } catch (err) {
      if (!isCancelled()) {
        setError(err instanceof ApiError ? err.message : t('failed_to_load_platforms'));
      }
    } finally {
      if (!isCancelled()) setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    let cancelled = false;
    void load(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [load]);

  async function handleOAuthConnect(platformId: string) {
    setConnectingPlatform(platformId);
    setError(null);
    setMessage(null);
    try {
      let authUrl: string;

      if (platformId === 'tiktok') {
        const response = await getTikTokAuthUrl();
        authUrl = response.authUrl;
      } else if (platformId === 'youtube') {
        const response = await getYouTubeAuthUrl();
        authUrl = response.authUrl;
      } else if (platformId === 'instagram') {
        const response = await getInstagramAuthUrl();
        authUrl = response.authUrl;
      } else {
        throw new Error('Unknown platform');
      }

      // Redirect to platform OAuth
      window.location.href = authUrl;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : `Failed to initiate ${platformId} connection`);
      setConnectingPlatform(null);
    }
  }

  async function handleSync(accountId: string) {
    setSyncingId(accountId);
    setError(null);
    setMessage(null);
    try {
      await syncPlatform(accountId);
      setMessage(t('sync_completed'));
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('sync_failed'));
    } finally {
      setSyncingId(null);
    }
  }

  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl">
        <CreatorPageHeader
          title={t('platforms')}
          subtitle={t('connect_platforms_subtitle')}
        />

        {message && (
          <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</p>
        )}
        {error && (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        <section className="creator-panel mt-6">
          <h2 className="text-base font-semibold text-landing-fg">Connect Your Platforms</h2>
          <p className="mt-1 text-sm text-landing-muted">
            Connect your social media accounts securely via OAuth to sync real earnings and analytics
          </p>

          <div className="mt-6 grid gap-3">
            {PLATFORMS.map((platform) => {
              const account = accounts.find((a) => a.platform.toLowerCase() === platform.id);
              const isConnecting = connectingPlatform === platform.id;

              return (
                <div
                  key={platform.id}
                  className="flex items-center justify-between rounded-xl border border-landing-border bg-landing-surface px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-landing-fg">
                      {platform.icon} {platform.label}
                    </p>
                    <p className="text-xs text-landing-muted">
                      {account ? formatHandle(account.platform_username) : 'Not connected'}
                    </p>
                  </div>
                  {account ? (
                    <button
                      type="button"
                      disabled={syncingId === account.id}
                      onClick={() => handleSync(account.id)}
                      className="landing-btn-light px-4 py-2 text-xs"
                    >
                      {syncingId === account.id ? 'Syncing...' : 'Sync'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isConnecting}
                      onClick={() => handleOAuthConnect(platform.id)}
                      className="landing-btn-dark px-4 py-2 text-xs"
                    >
                      {isConnecting ? 'Connecting...' : 'Connect'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {history.length > 0 && (
          <section className="creator-panel mt-6">
            <h2 className="text-base font-semibold text-landing-fg">{t('sync_history')}</h2>
            <ul className="mt-4 space-y-2">
              {history.slice(0, 6).map((h) => (
                <li
                  key={h.id}
                  className="flex justify-between gap-2 rounded-xl border border-sky-50 px-3 py-2 text-sm"
                >
                  <span className="text-landing-fg">
                    {platformLabel(h.platform)} · {h.status}
                  </span>
                  <span className="shrink-0 text-landing-muted">{formatDate(h.started_at)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </DashboardShell>
  );
}
