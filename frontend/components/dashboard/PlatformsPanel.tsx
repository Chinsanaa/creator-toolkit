'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlatformBadge } from '@/components/dashboard/PlatformBadge';
import { syncPlatform } from '@/lib/api/platforms';
import { ApiError } from '@/lib/api/client';
import { formatMnt, platformLabel } from '@/lib/format';
import type { PlatformAccount, PlatformEarnings } from '@/lib/types/dashboard';

export function PlatformsPanel({
  platforms,
  earnings,
}: {
  platforms: PlatformAccount[];
  earnings: PlatformEarnings[];
}) {
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const earningsByPlatform = new Map(earnings.map((e) => [e.platform.toLowerCase(), e]));

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
    <Card className="py-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Platforms</CardTitle>
        <Link
          href="/platforms"
          className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'text-muted-foreground' })}
        >
          Manage
          <ArrowUpRight className="size-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {message && <p className="mb-3 text-xs text-primary">{message}</p>}
        {platforms.length === 0 ? (
          <p className="text-sm text-muted">
            No platforms connected.{' '}
            <Link href="/platforms" className="link-primary">
              Connect TikTok, YouTube, or Instagram
            </Link>
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {platforms.map((p) => {
              const e = earningsByPlatform.get(p.platform.toLowerCase());
              const share = e ? Math.max(0, Math.min(100, e.share)) : 0;
              return (
                <div key={p.id}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-3 font-medium">
                      <PlatformBadge platform={p.platform} size="sm" />
                      <span>
                        {platformLabel(p.platform)}
                        <span className="block text-xs font-normal text-muted">
                          {p.platform_username}
                        </span>
                      </span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">
                        {e ? formatMnt(e.totalMnt) : formatMnt(0)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={syncingId === p.id}
                        onClick={() => handleSync(p.id)}
                      >
                        {syncingId === p.id ? '…' : 'Sync'}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-card-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${share}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted">{e ? `${share.toFixed(0)}% of earnings` : 'No earnings yet'}</p>
                </div>
              );
            })}
          </div>
        )}
        <Link
          href="/platforms"
          className={buttonVariants({
            variant: 'outline',
            className: 'mt-4 w-full bg-card-muted font-normal',
          })}
        >
          Connect a platform
          <Plus className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
