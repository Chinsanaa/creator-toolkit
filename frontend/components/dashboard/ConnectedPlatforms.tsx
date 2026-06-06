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
    <div className="card p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-foreground">Platforms</h2>
        <Link href="/platforms" className="link-primary text-sm">
          Manage
        </Link>
      </div>
      {message && <p className="mt-2 text-xs text-primary">{message}</p>}
      {platforms.length === 0 ? (
        <p className="mt-4 text-sm text-muted">
          No platforms connected.{' '}
          <Link href="/platforms" className="link-primary">
            Connect TikTok or YouTube
          </Link>
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {platforms.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3"
            >
              <div>
                <p className="font-medium text-foreground">{platformLabel(p.platform)}</p>
                <p className="text-sm text-muted">{p.platform_username}</p>
                <p className="text-xs text-muted-foreground">
                  {p.follower_count != null && `${p.follower_count.toLocaleString()} followers · `}
                  {formatDate(p.last_synced_at)}
                </p>
              </div>
              <button
                type="button"
                disabled={syncingId === p.id}
                onClick={() => handleSync(p.id)}
                className="btn-secondary min-h-9 shrink-0 px-3 py-1 text-xs disabled:opacity-60"
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
