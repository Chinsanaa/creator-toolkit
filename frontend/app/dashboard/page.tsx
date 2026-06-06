'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CreatorPageHeader } from '@/components/creator/CreatorPageHeader';
import { GettingStartedPlan, type PlanTask } from '@/components/creator/GettingStartedPlan';
import { PlatformStatusCard } from '@/components/creator/PlatformStatusCard';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { MonthlyTrend } from '@/components/dashboard/MonthlyTrend';
import { useAuth } from '@/contexts/AuthContext';
import { ApiError } from '@/lib/api/client';
import { getDashboardSummary } from '@/lib/api/dashboard';
import { PageHeader } from '@/components/ui/PageHeader';
import type { AuthUser } from '@/lib/types/auth';
import type { DashboardSummary } from '@/lib/types/dashboard';

function CreatorDashboardBody({ user }: { user: AuthUser }) {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [applicationCount, setApplicationCount] = useState(0);
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getDashboardSummary(), listMyApplications(), getBankAccounts()])
      .then(([summary, applications, banks]) => {
        if (cancelled) return;
        setData(summary);
        setApplicationCount(applications.length);
        setHasBankAccount(banks.length > 0);
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
