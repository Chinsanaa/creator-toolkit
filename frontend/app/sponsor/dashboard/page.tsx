'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SponsorShell } from '@/components/sponsor/SponsorShell';
import { useAuth } from '@/contexts/AuthContext';
import { ApiError } from '@/lib/api/client';
import { getSponsorDashboard } from '@/lib/api/sponsor';
import { formatMnt } from '@/lib/format';
import type { SponsorDashboardStats } from '@/lib/types/sponsor';

export default function SponsorDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<SponsorDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !user || user.userType !== 'sponsor') return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    getSponsorDashboard()
      .then((data) => {
        if (!cancelled) setStats(data);
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
      <SponsorShell>
        <p className="text-sm text-zinc-500">Loading…</p>
      </SponsorShell>
    );
  }

  return (
    <SponsorShell>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Hi, {user.name}
          </h1>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            Manage campaigns and review creator applications.
          </p>
        </div>
        <Link
          href="/sponsor/campaigns/new"
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          New campaign
        </Link>
      </div>

      {loading && <p className="text-sm text-zinc-500">Loading stats…</p>}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </p>
      )}

      {stats && !loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Active campaigns" value={String(stats.activeCampaigns)} />
          <StatCard label="Total campaigns" value={String(stats.totalCampaigns)} />
          <StatCard
            label="Pending applications"
            value={String(stats.pendingApplications)}
            hint={`${stats.totalApplications} total`}
          />
          <StatCard
            label="Active campaign budget"
            value={formatMnt(stats.totalBudgetMnt)}
            hint="Sum of active campaign payouts"
          />
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/sponsor/campaigns"
          className="text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          View all campaigns →
        </Link>
      </div>
    </SponsorShell>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</p>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}
