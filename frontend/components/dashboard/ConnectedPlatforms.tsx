'use client';

import Link from 'next/link';
import { useState } from 'react';
import { syncPlatform } from '@/lib/api/platforms';
import { ApiError } from '@/lib/api/client';
import { formatDate, platformLabel } from '@/lib/format';
import type { PlatformAccount } from '@/lib/types/dashboard';

export function ConnectedPlatforms({ platforms }: { platforms: PlatformAccount[] }) {
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSync(id: string) {
    setSyncingId(id);
    setMessage(null);
    try {
      await syncPlatform(id);
      setMessage('Synced — refresh dashboard to see updates.');
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : 'Sync failed');
    } finally {
      setSyncingId(null);
    }
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Platforms</h2>
        <Link href="/platforms" className="text-sm font-medium text-violet-600 hover:text-violet-700">
          Manage
        </Link>
      </div>
      {message && <p className="mt-2 text-xs text-violet-600 dark:text-violet-400">{message}</p>}
      {platforms.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-500">
          No platforms connected.{' '}
          <Link href="/platforms" className="font-medium text-violet-600">
            Connect TikTok or YouTube
          </Link>
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {platforms.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-zinc-100 px-4 py-3 dark:border-zinc-800"
            >
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {platformLabel(p.platform)}
                </p>
                <p className="text-sm text-zinc-500">{p.platform_username}</p>
                <p className="text-xs text-zinc-400">
                  {p.follower_count != null && `${p.follower_count.toLocaleString()} followers · `}
                  {formatDate(p.last_synced_at)}
                </p>
              </div>
              <button
                type="button"
                disabled={syncingId === p.id}
                onClick={() => handleSync(p.id)}
                className="shrink-0 rounded-lg border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 disabled:opacity-60"
              >
                {syncingId === p.id ? '…' : 'Sync'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
