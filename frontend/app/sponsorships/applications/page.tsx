'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CreatorPageHeader } from '@/components/creator/CreatorPageHeader';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { useLanguage } from '@/contexts/LanguageContext';
import { ApiError } from '@/lib/api/client';
import { listMyApplications } from '@/lib/api/sponsorships';
import { applicationStatusLabel, formatDate, formatMnt } from '@/lib/format';
import type { SponsorshipApplication } from '@/lib/types/sponsorship';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-sky-100 text-landing-muted',
  completed: 'bg-sky-200 text-landing-fg',
  paid: 'bg-landing-fg text-white',
};

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<SponsorshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    listMyApplications()
      .then(setApplications)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : 'Failed to load applications')
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl">
        <CreatorPageHeader
          title={t('my_applications')}
          subtitle={t('track_sponsorships')}
          action={
            <Link href="/sponsorships" className="landing-btn-light px-5 py-2.5 text-sm">
              ← {t('explore')}
            </Link>
          }
        />

        {loading && <p className="text-sm text-landing-muted">{t('loading')}</p>}
        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {!loading && !error && applications.length === 0 && (
          <div className="creator-panel text-center">
            <p className="text-sm text-landing-muted">
              {t('no_applications_yet')}
            </p>
            <Link href="/sponsorships" className="landing-btn-dark mt-5 inline-flex px-6 py-2.5 text-sm">
              {t('browse_opportunities')}
            </Link>
          </div>
        )}

        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app.id} className="creator-panel-lg">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-landing-fg">
                    {app.sponsorship?.title.replace(/^\[Demo\]\s*/, '') ?? 'Sponsorship'}
                  </h2>
                  <p className="mt-1 text-sm text-landing-muted">
                    {t('applied')} {formatDate(app.applied_at)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    STATUS_STYLES[app.status] ?? STATUS_STYLES.pending
                  }`}
                >
                  {applicationStatusLabel(app.status)}
                </span>
              </div>
              {app.sponsorship && (
                <p className="mt-3 text-lg font-semibold text-landing-fg">
                  {formatMnt(app.sponsorship.payment_amount_mnt)}
                </p>
              )}
              {app.response_text && (
                <p className="mt-3 line-clamp-3 text-sm text-landing-muted">{app.response_text}</p>
              )}
              {app.sponsorship && (
                <Link
                  href={`/sponsorships/${app.sponsorship_id}`}
                  className="auth-link mt-4 inline-block text-sm font-medium"
                >
                  {t('view_listing')}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </DashboardShell>
  );
}
