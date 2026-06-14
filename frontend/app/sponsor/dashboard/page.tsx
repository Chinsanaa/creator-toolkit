'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SponsorShell } from '@/components/sponsor/SponsorShell';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ApiError } from '@/lib/api/client';
import { getSponsorDashboard } from '@/lib/api/sponsor';
import { formatMnt } from '@/lib/format';
import type { AuthUser } from '@/lib/types/auth';
import type { SponsorDashboardStats } from '@/lib/types/sponsor';

function SponsorDashboardBody({ user }: { user: AuthUser }) {
  const [stats, setStats] = useState<SponsorDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let cancelled = false;

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
  }, []);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {t('greeting').replace('{name}', user.name)}
          </h1>
          <p className="mt-1 text-muted">
            {t('sponsor_dashboard_subtitle')}
          </p>
        </div>
        <Link
          href="/sponsor/campaigns/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          {t('new_campaign')}
        </Link>
      </div>

      {loading && <p className="text-sm text-muted">{t('loading_stats')}</p>}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </p>
      )}

      {stats && !loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label={t('active_campaigns')} value={String(stats.activeCampaigns)} />
          <StatCard label={t('total_campaigns')} value={String(stats.totalCampaigns)} />
          <StatCard
            label={t('pending_applications')}
            value={String(stats.pendingApplications)}
            hint={`${stats.totalApplications} total`}
          />
          <StatCard
            label={t('active_campaign_budget')}
            value={formatMnt(stats.totalBudgetMnt)}
            hint={t('sum_of_active_payouts')}
          />
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/sponsor/campaigns"
          className="text-sm font-medium text-primary hover:text-primary"
        >
          {t('view_all_campaigns')}
        </Link>
      </div>
    </>
  );
}

export default function SponsorDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();

  if (authLoading || !user) {
    return (
      <SponsorShell>
        <p className="text-sm text-zinc-500">{t('loading')}</p>
      </SponsorShell>
    );
  }

  if (user.userType !== 'sponsor') {
    return (
      <SponsorShell>
        <p className="text-sm text-zinc-500">{t('sponsor_account_required')}</p>
      </SponsorShell>
    );
  }

  return (
    <SponsorShell>
      <SponsorDashboardBody key={user.id} user={user} />
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
    <div className="card p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
