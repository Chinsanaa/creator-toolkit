'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, TrendingDown, TrendingUp } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { MonthlyTrend } from '@/components/dashboard/MonthlyTrend';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { PlatformsPanel } from '@/components/dashboard/PlatformsPanel';
import { RecentEarnings } from '@/components/dashboard/RecentEarnings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ApiError } from '@/lib/api/client';
import { getDashboardSummary } from '@/lib/api/dashboard';
import { getWalletSummary } from '@/lib/api/wallet';
import { syncPlatform } from '@/lib/api/platforms';
import { firstNameOf, formatMnt, formatPercent } from '@/lib/format';
import { PageHeader } from '@/components/ui/PageHeader';
import type { AuthUser } from '@/lib/types/auth';
import type { DashboardSummary } from '@/lib/types/dashboard';
import type { WalletSummary } from '@/lib/types/wallet';

function CreatorDashboardBody({ user }: { user: AuthUser }) {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [wallet, setWallet] = useState<WalletSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  function load() {
    return Promise.all([getDashboardSummary(), getWalletSummary()]).then(([summary, walletSummary]) => {
      setData(summary);
      setWallet(walletSummary);
    });
  }

  useEffect(() => {
    let cancelled = false;

    load()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSyncAll() {
    if (!data || data.connectedPlatforms.length === 0) return;
    setSyncing(true);
    try {
      await Promise.all(data.connectedPlatforms.map((p) => syncPlatform(p.id)));
      await load();
    } catch {
      // sync errors surface per-platform in PlatformsPanel
    } finally {
      setSyncing(false);
    }
  }

  const mom = data?.monthOverMonthChange ?? null;
  const momPositive = mom !== null && mom >= 0;

  return (
    <>
      <PageHeader
        eyebrow={t('creator_dashboard')}
        title={t('greeting').replace('{name}', firstNameOf(user.name))}
        description={t('creator_dashboard_subtitle')}
        actions={
          data && (
            <>
              <Button
                variant="outline"
                onClick={handleSyncAll}
                disabled={syncing || data.connectedPlatforms.length === 0}
              >
                <RefreshCw className={`size-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing…' : 'Sync'}
              </Button>
              <Button onClick={() => router.push('/wallet')}>Withdraw</Button>
            </>
          )
        }
      />

      {loading && <DashboardSkeleton />}

      {error && <p className="alert-error">{error}</p>}

      {data && !loading && (
        <div className="space-y-6">
          <div className="creator-hero">
            <div className="creator-hero-body">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="creator-hero-label">Total earnings</p>
                {mom !== null && (
                  <span
                    className={`creator-trend-badge ${
                      momPositive ? 'creator-trend-badge-up' : 'creator-trend-badge-down'
                    }`}
                  >
                    {momPositive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
                    {formatPercent(mom)}
                  </span>
                )}
              </div>
              <div className="creator-hero-amount">{formatMnt(data.totalEarningsMnt)}</div>

              <div className="creator-hero-divider" />

              <div className="creator-hero-stats">
                <div>
                  <p className="creator-hero-stat-label">This month</p>
                  <p className="creator-hero-stat-value">{formatMnt(data.earningsThisMonth)}</p>
                </div>
                <div>
                  <p className="creator-hero-stat-label">Available</p>
                  <p className="creator-hero-stat-value">
                    {wallet ? formatMnt(wallet.availableBalanceMnt) : '—'}
                  </p>
                </div>
                <div>
                  <p className="creator-hero-stat-label">Pending</p>
                  <p className="creator-hero-stat-value">
                    {wallet ? formatMnt(wallet.pendingPayoutMnt) : '—'}
                  </p>
                </div>
                <div>
                  <p className="creator-hero-stat-label">Connected</p>
                  <p className="creator-hero-stat-value">{data.connectedPlatforms.length} platforms</p>
                </div>
              </div>
            </div>
          </div>

          <StatsCards data={data} />

          <div className="grid gap-3 xl:grid-cols-4">
            <Card className="py-4 xl:col-span-3">
              <CardHeader>
                <CardTitle>Earnings performance</CardTitle>
              </CardHeader>
              <CardContent>
                <MonthlyTrend data={data.monthlyTrend} />
              </CardContent>
            </Card>

            <PlatformsPanel platforms={data.connectedPlatforms} earnings={data.byPlatform} />
          </div>

          <RecentEarnings data={data.recentEarnings} />
        </div>
      )}
    </>
  );
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login?next=/dashboard');
    }
  }, [authLoading, user, router]);

  if (authLoading || !user) {
    return (
      <DashboardShell>
        <DashboardSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <CreatorDashboardBody key={user.id} user={user} />
    </DashboardShell>
  );
}
