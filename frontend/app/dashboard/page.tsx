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
import { listMyApplications } from '@/lib/api/sponsorships';
import { getBankAccounts } from '@/lib/api/wallet';
import { formatMnt } from '@/lib/format';
import type { DashboardSummary } from '@/lib/types/dashboard';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [applicationCount, setApplicationCount] = useState(0);
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !user) return;

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
  }, [authLoading, user]);

  const planTasks = useMemo<PlanTask[]>(() => {
    const platformCount = data?.connectedPlatforms.length ?? 0;
    return [
      {
        id: 'platforms',
        label: 'Connect your platforms',
        detail:
          platformCount > 0
            ? `${platformCount} platform${platformCount === 1 ? '' : 's'} connected`
            : 'Link TikTok or YouTube to sync earnings',
        done: platformCount > 0,
        href: '/platforms',
      },
      {
        id: 'apply',
        label: 'Apply to a sponsorship',
        detail:
          applicationCount > 0
            ? `${applicationCount} application${applicationCount === 1 ? '' : 's'} submitted`
            : 'Browse brand deals on Explore',
        done: applicationCount > 0,
        href: '/sponsorships',
      },
      {
        id: 'wallet',
        label: 'Set up payouts',
        detail: hasBankAccount ? 'Bank account on file' : 'Add a Mongolian bank account',
        done: hasBankAccount,
        href: '/wallet',
      },
    ];
  }, [data?.connectedPlatforms.length, applicationCount, hasBankAccount]);

  if (authLoading || !user) {
    return (
      <DashboardShell>
        <p className="text-sm text-landing-muted">Loading…</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl">
        <CreatorPageHeader
          title={`Hi, ${user.name.split(' ')[0]}`}
          subtitle="Your earnings and next steps — all from live account data."
        />

        {loading && <p className="text-sm text-landing-muted">Loading your dashboard…</p>}

        {error && (
          <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {data && !loading && (
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <div className="space-y-6">
              <div className="creator-hero-card">
                <p className="text-sm font-medium text-landing-muted">What you&apos;ve earned</p>
                <p className="creator-earnings-value mt-2">{formatMnt(data.totalEarningsMnt)}</p>
                <p className="mt-3 text-sm text-landing-muted">
                  {formatMnt(data.earningsThisMonth)} this month
                  {data.monthOverMonthChange != null && (
                    <span
                      className={
                        data.monthOverMonthChange >= 0 ? ' text-emerald-700' : ' text-red-600'
                      }
                    >
                      {` · ${data.monthOverMonthChange >= 0 ? '+' : ''}${data.monthOverMonthChange.toFixed(1)}% vs last month`}
                    </span>
                  )}
                </p>
                <Link href="/wallet" className="landing-btn-dark mt-8 inline-flex px-6 py-2.5 text-sm">
                  View wallet
                </Link>
              </div>

              <GettingStartedPlan tasks={planTasks} />

              {data.monthlyTrend.length > 0 && (
                <div className="creator-panel">
                  <h2 className="text-base font-semibold tracking-tight text-landing-fg">
                    Monthly trend
                  </h2>
                  <p className="mt-1 text-sm text-landing-muted">Last 6 months (MNT)</p>
                  <div className="mt-5">
                    <MonthlyTrend data={data.monthlyTrend} />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <PlatformStatusCard platforms={data.connectedPlatforms} />

              <div className="creator-panel">
                <h2 className="text-base font-semibold tracking-tight text-landing-fg">
                  Quick links
                </h2>
                <div className="mt-4 flex flex-col gap-2">
                  <Link href="/sponsorships" className="creator-link-tile">
                    Explore sponsorships
                  </Link>
                  <Link href="/sponsorships/applications" className="creator-link-tile">
                    My applications
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
