'use client';

import { useEffect, useState } from 'react';
import { ConnectedPlatforms } from '@/components/dashboard/ConnectedPlatforms';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { MonthlyTrend } from '@/components/dashboard/MonthlyTrend';
import { PlatformBreakdown } from '@/components/dashboard/PlatformBreakdown';
import { RecentEarnings } from '@/components/dashboard/RecentEarnings';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { useAuth } from '@/contexts/AuthContext';
import { ApiError } from '@/lib/api/client';
import { getDashboardSummary } from '@/lib/api/dashboard';
import type { DashboardSummary } from '@/lib/types/dashboard';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !user) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    getDashboardSummary()
      .then((summary) => {
        if (!cancelled) setData(summary);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Failed to load dashboard');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [authLoading, user]);

  if (authLoading || !user) {
    return (
      <DashboardShell>
        <p className="text-sm text-zinc-500">Loading…</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Hi, {user.name}
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Your earnings overview across connected platforms.
        </p>
      </div>

      {loading && <p className="text-sm text-zinc-500">Loading analytics…</p>}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </p>
      )}

      {data && !loading && (
        <div className="space-y-8">
          <StatsCards data={data} />
          <MonthlyTrend data={data.monthlyTrend} />
          <div className="grid gap-6 lg:grid-cols-2">
            <PlatformBreakdown data={data.byPlatform} />
            <ConnectedPlatforms platforms={data.connectedPlatforms} />
          </div>
          <RecentEarnings data={data.recentEarnings} />
        </div>
      )}
    </DashboardShell>
  );
}
