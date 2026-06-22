'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>Share</TableHead>
                <TableHead>Earned</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platforms.map((p) => {
                const e = earningsByPlatform.get(p.platform.toLowerCase());
                return (
                  <TableRow key={p.id}>
                    <TableCell>
                      <span className="inline-flex items-center gap-3 font-medium">
                        <PlatformBadge platform={p.platform} size="sm" />
                        <span>
                          {platformLabel(p.platform)}
                          <span className="block text-xs font-normal text-muted">
                            {p.platform_username}
                          </span>
                        </span>
                      </span>
                    </TableCell>
                    <TableCell>{e ? `${e.share.toFixed(0)}%` : '—'}</TableCell>
                    <TableCell>{e ? formatMnt(e.totalMnt) : formatMnt(0)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={syncingId === p.id}
                        onClick={() => handleSync(p.id)}
                      >
                        {syncingId === p.id ? '…' : 'Sync'}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
