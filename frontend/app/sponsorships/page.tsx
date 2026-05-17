'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SponsorshipCard } from '@/components/sponsorships/SponsorshipCard';
import { ApiError } from '@/lib/api/client';
import { listSponsorships } from '@/lib/api/sponsorships';
import type { SponsorshipListing } from '@/lib/types/sponsorship';

export default function SponsorshipsPage() {
  const [listings, setListings] = useState<SponsorshipListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listSponsorships()
      .then(setListings)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : 'Failed to load sponsorships')
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardShell>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Sponsorships
          </h1>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            Browse brand deals from Mongolian sponsors. Apply with one click.
          </p>
        </div>
        <Link
          href="/sponsorships/applications"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          My applications
        </Link>
      </div>

      {loading && <p className="text-sm text-zinc-500">Loading opportunities…</p>}
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </p>
      )}

      {!loading && !error && listings.length === 0 && (
        <p className="text-sm text-zinc-500">No active sponsorships right now. Check back soon.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {listings.map((s) => (
          <SponsorshipCard key={s.id} sponsorship={s} />
        ))}
      </div>
    </DashboardShell>
  );
}

