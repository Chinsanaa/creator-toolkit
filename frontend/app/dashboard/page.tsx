'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { MonthlyTrend } from '@/components/dashboard/MonthlyTrend';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { PlatformsPanel } from '@/components/dashboard/PlatformsPanel';
import { RecentEarnings } from '@/components/dashboard/RecentEarnings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ApiError } from '@/lib/api/client';
import { getDashboardSummary } from '@/lib/api/dashboard';
import { firstNameOf, formatMnt, formatPercent } from '@/lib/format';
import { PageHeader } from '@/components/ui/PageHeader';
import type { AuthUser } from '@/lib/types/auth';
import type { DashboardSummary } from '@/lib/types/dashboard';

function CreatorDashboardBody({ user }: { user: AuthUser }) {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let cancelled = false;

    Promise.all([getDashboardSummary()])
      .then(([summary]) => {
        if (cancelled) return;
        setData(summary);
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
        eyebrow={t('creator_dashboard')}
        title={t('greeting').replace('{name}', firstNameOf(user.name))}
        description={t('creator_dashboard_subtitle')}
      />

      {loading && <DashboardSkeleton />}

      {error && <p className="alert-error">{error}</p>}

      {data && !loading && (
        <div className="space-y-6">
          <StatsCards data={data} />

          <div className="grid gap-3 xl:grid-cols-4">
            <Card className="py-4 xl:col-span-3">
              <CardHeader>
                <CardTitle>Earnings performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold tracking-tight">
                  {formatMnt(data.totalEarningsMnt)}
                </div>
                {data.monthOverMonthChange !== null && (
                  <p
                    className={`mt-1 text-sm font-medium ${
                      data.monthOverMonthChange >= 0 ? 'text-success' : 'text-destructive'
                    }`}
                  >
                    {formatPercent(data.monthOverMonthChange)} vs last month
                  </p>
                )}
                <div className="mt-4">
                  <MonthlyTrend data={data.monthlyTrend} />
                </div>
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
