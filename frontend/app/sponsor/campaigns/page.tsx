'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SponsorShell } from '@/components/sponsor/SponsorShell';
import { ApiError } from '@/lib/api/client';
import { listSponsorCampaigns } from '@/lib/api/sponsor';
import { contentTypeLabel, formatDate, formatMnt } from '@/lib/format';
import type { SponsorCampaign } from '@/lib/types/sponsor';

export default function SponsorCampaignsPage() {
  const [campaigns, setCampaigns] = useState<SponsorCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listSponsorCampaigns()
      .then(setCampaigns)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : 'Failed to load campaigns')
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <SponsorShell>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Campaigns</h1>
          <p className="mt-1 text-muted">
            Create and manage sponsorship opportunities for creators.
          </p>
        </div>
        <Link
          href="/sponsor/campaigns/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          New campaign
        </Link>
      </div>

      {loading && <p className="text-sm text-muted">Loading campaigns…</p>}
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </p>
      )}

      {!loading && !error && campaigns.length === 0 && (
        <p className="text-sm text-muted">
          No campaigns yet.{' '}
          <Link href="/sponsor/campaigns/new" className="font-medium text-primary">
            Create your first
          </Link>
          .
        </p>
      )}

      <div className="space-y-4">
        {campaigns.map((c) => (
          <Link
            key={c.id}
            href={`/sponsor/campaigns/${c.id}`}
            className="block rounded-xl border border-border bg-card p-5 transition hover:border-primary/30 dark:border-border dark:bg-background dark:hover:border-primary/40"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-foreground">{c.title}</h2>
                  <StatusBadge status={c.status} />
                </div>
                <p className="mt-1 text-sm text-muted line-clamp-2">
                  {c.description}
                </p>
                <p className="mt-2 text-xs text-muted">
                  {contentTypeLabel(c.content_type)} · Apply by {formatDate(c.deadline_apply)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">
                  {formatMnt(c.payment_amount_mnt)}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {c.applicationCount} applications
                  {c.pendingCount > 0 && (
                    <span className="ml-1 font-medium text-amber-600">
                      · {c.pendingCount} pending
                    </span>
                  )}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SponsorShell>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300',
    closed: 'bg-surface text-foreground dark:bg-surface dark:text-muted',
    draft: 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300',
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[status] ?? styles.closed}`}
    >
      {status}
    </span>
  );
}
