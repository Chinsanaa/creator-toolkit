'use client';

import { FormEvent, useEffect, useState } from 'react';
import { CreatorPageHeader } from '@/components/creator/CreatorPageHeader';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { useLanguage } from '@/contexts/LanguageContext';
import { ApiError } from '@/lib/api/client';
import {
  connectPlatform,
  listPlatforms,
  listSyncHistory,
  syncPlatform,
} from '@/lib/api/platforms';
import { formatDate, formatHandle, platformLabel } from '@/lib/format';
import type { PlatformAccount, SyncHistoryEntry } from '@/lib/types/platforms';

const PLATFORMS = [
  { id: 'tiktok', label: 'TikTok' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'instagram', label: 'Instagram' },
] as const;

export default function PlatformsPage() {
  const [accounts, setAccounts] = useState<PlatformAccount[]>([]);
  const [history, setHistory] = useState<SyncHistoryEntry[]>([]);
  const [platform, setPlatform] = useState<string>('tiktok');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { t } = useLanguage();

  async function load() {
    setError(null);
    try {
      const [accs, hist] = await Promise.all([listPlatforms(), listSyncHistory()]);
      setAccounts(accs);
      setHistory(hist);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('failed_to_load_platforms'));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const [accs, hist] = await Promise.all([listPlatforms(), listSyncHistory()]);
        if (!cancelled) {
          setAccounts(accs);
          setHistory(hist);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : t('failed_to_load_platforms'));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleConnect(e: FormEvent) {
    e.preventDefault();
    setConnecting(true);
    setError(null);
    setMessage(null);
    try {
      await connectPlatform(platform, username);
      setUsername('');
      setMessage(`${platformLabel(platform)} connected. Run sync to pull earnings.`);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t('failed_to_connect'));
    } finally {
      setConnecting(false);
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

  function accountFor(platformId: string) {
    return accounts.find((a) => a.platform.toLowerCase() === platformId);
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

        <section className="creator-panel-lg">
          <h2 className="text-base font-semibold text-landing-fg">{t('social_accounts')}</h2>
          <p className="mt-1 text-sm text-landing-muted">{t('manage_platform_connections')}</p>

          {loading ? (
            <p className="mt-6 text-sm text-landing-muted">{t('loading')}</p>
          ) : (
            <ul className="mt-6 space-y-3">
              {PLATFORMS.map((p) => {
                const account = accountFor(p.id);
                return (
                  <li key={p.id} className="creator-platform-row">
                    <div>
                      <p className="font-medium text-landing-fg">{p.label}</p>
                      <p className="text-sm text-landing-muted">
                        {account ? formatHandle(account.platform_username) : t('not_connected')}
                      </p>
                    </div>
                    {account ? (
                      <button
                        type="button"
                        disabled={syncingId === account.id}
                        onClick={() => handleSync(account.id)}
                        className="landing-btn-light px-4 py-2 text-xs"
                      >
                        {syncingId === account.id ? 'Syncing…' : t('sync')}
                      </button>
                    ) : (
                      <span className="text-xs text-landing-muted">{t('use_form_below')}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="creator-panel mt-6">
          <h2 className="text-base font-semibold text-landing-fg">{t('connect_a_platform')}</h2>
          <form onSubmit={handleConnect} className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-landing-fg">{t('platform')}</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="auth-input"
              >
                {PLATFORMS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-landing-fg">{t('username')}</label>
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t('your_handle')}
                className="auth-input"
              />
            </div>
            <button type="submit" disabled={connecting} className="landing-btn-dark px-6 py-2.5 text-sm">
              {connecting ? t('connecting') : t('connect')}
            </button>
          </form>
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
