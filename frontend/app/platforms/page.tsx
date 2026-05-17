'use client';

import { FormEvent, useEffect, useState } from 'react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ApiError } from '@/lib/api/client';
import {
  connectPlatform,
  listPlatforms,
  listSyncHistory,
  syncPlatform,
} from '@/lib/api/platforms';
import { formatDate, platformLabel } from '@/lib/format';
import type { PlatformAccount, SyncHistoryEntry } from '@/lib/types/platforms';

const PLATFORMS = [
  { id: 'tiktok', label: 'TikTok' },
  { id: 'youtube', label: 'YouTube' },
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

  async function load() {
    setError(null);
    try {
      const [accs, hist] = await Promise.all([listPlatforms(), listSyncHistory()]);
      setAccounts(accs);
      setHistory(hist);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load platforms');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
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
      setError(err instanceof ApiError ? err.message : 'Failed to connect');
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
      setMessage('Sync completed. Check your dashboard for updated earnings.');
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Sync failed');
    } finally {
      setSyncingId(null);
    }
  }

  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Platforms</h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Connect TikTok or YouTube and sync ad revenue into your earnings dashboard.
        </p>
      </div>

      {message && (
        <p className="mb-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </p>
      )}

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Connect a platform</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Uses a simulated Creator API in development. Production can swap in real OAuth tokens.
        </p>
        <form onSubmit={handleConnect} className="mt-4 flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="mt-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              {PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-[200px] flex-1">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Username
            </label>
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your_handle"
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>
          <button
            type="submit"
            disabled={connecting}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60"
          >
            {connecting ? 'Connecting…' : 'Connect'}
          </button>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Connected accounts</h2>
        {loading && <p className="mt-4 text-sm text-zinc-500">Loading…</p>}
        {!loading && accounts.length === 0 && (
          <p className="mt-4 text-sm text-zinc-500">No platforms connected yet.</p>
        )}
        <ul className="mt-4 space-y-3">
          {accounts.map((a) => (
            <li
              key={a.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {platformLabel(a.platform)}
                </p>
                <p className="text-sm text-zinc-500">{a.platform_username}</p>
                <p className="mt-1 text-xs text-zinc-400">
                  {a.follower_count != null && `${a.follower_count.toLocaleString()} followers · `}
                  Last sync: {formatDate(a.last_synced_at)}
                </p>
              </div>
              <button
                type="button"
                disabled={syncingId === a.id}
                onClick={() => handleSync(a.id)}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 disabled:opacity-60"
              >
                {syncingId === a.id ? 'Syncing…' : 'Sync now'}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {history.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Sync history</h2>
          <ul className="mt-4 space-y-2">
            {history.slice(0, 8).map((h) => (
              <li
                key={h.id}
                className="flex justify-between rounded-lg border border-zinc-100 px-3 py-2 text-sm dark:border-zinc-800"
              >
                <span>
                  {platformLabel(h.platform)} · {h.status}
                  {h.records_synced != null && h.records_synced > 0 && ` · ${h.records_synced} new`}
                </span>
                <span className="text-zinc-400">{formatDate(h.started_at)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </DashboardShell>
  );
}
