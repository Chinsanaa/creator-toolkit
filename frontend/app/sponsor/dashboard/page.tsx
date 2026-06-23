'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SponsorShell } from '@/components/sponsor/SponsorShell';
import { ApplicationStatusChart } from '@/components/sponsor/ApplicationStatusChart';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ApiError } from '@/lib/api/client';
import { getSponsorDashboard } from '@/lib/api/sponsor';
import { firstNameOf, formatMnt } from '@/lib/format';
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
            {t('greeting').replace('{name}', firstNameOf(user.name))}
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
        <>
          <div className="creator-hero">
            <div className="creator-hero-body">
              <p className="creator-hero-label">{t('active_campaign_budget')}</p>
              <div className="creator-hero-amount">{formatMnt(stats.totalBudgetMnt)}</div>

              <div className="creator-hero-divider" />

              <div className="creator-hero-stats">
                <div>
                  <p className="creator-hero-stat-label">{t('active_campaigns')}</p>
                  <p className="creator-hero-stat-value">{stats.activeCampaigns}</p>
                </div>
                <div>
                  <p className="creator-hero-stat-label">{t('total_campaigns')}</p>
                  <p className="creator-hero-stat-value">{stats.totalCampaigns}</p>
                </div>
                <div>
                  <p className="creator-hero-stat-label">{t('pending_applications')}</p>
                  <p className="creator-hero-stat-value">{stats.pendingApplications}</p>
                </div>
                <div>
                  <p className="creator-hero-stat-label">{t('approval_rate')}</p>
                  <p className="creator-hero-stat-value">
                    {stats.approvalRate !== null ? `${Math.round(stats.approvalRate * 100)}%` : '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[3fr_2fr]">
            <div className="creator-panel-lg p-6">
              <p className="font-display text-lg font-bold text-[color:var(--foreground)]">
                {t('application_status')}
              </p>
              <div className="mt-4">
                <ApplicationStatusChart data={stats.statusBreakdown} />
              </div>
              <ApplicationStatusLegend data={stats.statusBreakdown} t={t} />
            </div>

            <div className="creator-panel-lg p-6">
              <p className="font-display text-lg font-bold text-[color:var(--foreground)]">
                {t('total_applications')}
              </p>
              <p className="mt-4 text-3xl font-bold text-[color:var(--foreground)]">
                {stats.totalApplications}
              </p>
              <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                {stats.pendingApplications} {t('pending_short')}
              </p>
            </div>
          </div>
        </>
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
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login?next=/sponsor/dashboard');
    }
  }, [authLoading, user, router]);

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

function ApplicationStatusLegend({
  data,
  t,
}: {
  data: { pending: number; approved: number; rejected: number };
  t: (key: string) => string;
}) {
  const items = [
    { key: 'pending', label: t('pending_short'), value: data.pending, color: '#f59e0b' },
    { key: 'approved', label: t('approved_short'), value: data.approved, color: 'var(--success)' },
    { key: 'rejected', label: t('rejected_short'), value: data.rejected, color: 'var(--destructive)' },
  ];

  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {items.map((item) => (
        <div key={item.key} className="flex items-center gap-2 text-sm text-[color:var(--muted-foreground)]">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.label}: <span className="font-semibold text-[color:var(--foreground)]">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
