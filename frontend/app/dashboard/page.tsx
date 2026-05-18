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
import { PageHeader } from '@/components/ui/PageHeader';
import type { AuthUser } from '@/lib/types/auth';
import type { DashboardSummary } from '@/lib/types/dashboard';

function CreatorDashboardBody({ user }: { user: AuthUser }) {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

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
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Creator dashboard"
        title={`Hi, ${user.name}`}
        description="Your earnings overview across connected platforms."
      />

      {loading && (
        <p className="text-sm font-medium text-[color:var(--muted-foreground)]">
          Loading analytics…
        </p>
      )}

      {error && <p className="alert-error">{error}</p>}

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
    </>
  );
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();

  if (authLoading || !user) {
    return (
      <DashboardShell>
        <p className="text-sm text-zinc-500">Loading…</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <CreatorDashboardBody key={user.id} user={user} />
    </DashboardShell>
  );
}
