'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ApiError } from '@/lib/api/client';
import { listMyApplications } from '@/lib/api/sponsorships';
import { applicationStatusLabel, formatDate, formatMnt } from '@/lib/format';
import type { SponsorshipApplication } from '@/lib/types/sponsorship';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300',
  approved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300',
  rejected: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  completed: 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300',
  paid: 'bg-violet-100 text-violet-800 dark:bg-violet-950/50 dark:text-violet-300',
};

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<SponsorshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="mb-8">
        <Link
          href="/sponsorships"
          className="text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          ← Marketplace
        </Link>
        <h1 className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          My applications
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Track sponsorships you have applied to.
        </p>
      </div>

      {loading && <p className="text-sm text-zinc-500">Loading…</p>}
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </p>
      )}

      {!loading && !error && applications.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
          <p className="text-sm text-zinc-500">You have not applied to any sponsorships yet.</p>
          <Link
            href="/sponsorships"
            className="mt-4 inline-block text-sm font-medium text-violet-600 hover:text-violet-700"
          >
            Browse opportunities
          </Link>
        </div>
      )}

      <ul className="space-y-4">
        {applications.map((app) => (
          <li
            key={app.id}
            className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {app.sponsorship?.title.replace(/^\[Demo\]\s*/, '') ?? 'Sponsorship'}
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Applied {formatDate(app.applied_at)}
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
              <p className="mt-3 text-lg font-medium text-zinc-800 dark:text-zinc-200">
                {formatMnt(app.sponsorship.payment_amount_mnt)}
              </p>
            )}
            {app.response_text && (
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                {app.response_text}
              </p>
            )}
            {app.sponsorship && (
              <Link
                href={`/sponsorships/${app.sponsorship_id}`}
                className="mt-4 inline-block text-sm font-medium text-violet-600 hover:text-violet-700"
              >
                View listing
              </Link>
            )}
          </li>
        ))}
      </ul>
    </DashboardShell>
  );
}

