'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CreatorPageHeader } from '@/components/creator/CreatorPageHeader';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SponsorshipCard } from '@/components/sponsorships/SponsorshipCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { ApiError } from '@/lib/api/client';
import { listSponsorships } from '@/lib/api/sponsorships';
import type { SponsorshipListing } from '@/lib/types/sponsorship';

const PAGE_SIZE = 24;

export default function SponsorshipsPage() {
  const [listings, setListings] = useState<SponsorshipListing[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextOffset, setNextOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    listSponsorships({ limit: PAGE_SIZE })
      .then((page) => {
        setListings(page.items);
        setHasMore(page.hasMore);
        setNextOffset(page.nextOffset);
      })
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : 'Failed to load sponsorships')
      )
      .finally(() => setLoading(false));
  }, []);

  async function loadMore() {
    setLoadingMore(true);
    try {
      const page = await listSponsorships({ limit: PAGE_SIZE, offset: nextOffset });
      setListings((prev) => [...prev, ...page.items]);
      setHasMore(page.hasMore);
      setNextOffset(page.nextOffset);
    } catch {
      // Keep loaded listings; the user can retry.
    } finally {
      setLoadingMore(false);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return listings;
    return listings.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.sponsor?.name?.toLowerCase().includes(q) ?? false)
    );
  }, [listings, query]);

  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl">
        <CreatorPageHeader
          title={t('explore')}
          subtitle={t('sponsorships_subtitle')}
          action={
            <Link href="/sponsorships/applications" className="landing-btn-light px-5 py-2.5 text-sm">
              {t('my_applications')}
            </Link>
          }
        />

        <div className="creator-panel mb-8">
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-landing-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search_sponsorships')}
              className="creator-search"
              aria-label={t('search_sponsorships')}
            />
          </div>
          {!loading && !error ? (
            <p className="mt-3 text-sm text-landing-muted">
              {filtered.length} {filtered.length === 1 ? t('opportunity_available') : t('opportunities_available')}
            </p>
          ) : null}
        </div>

        {loading && <p className="text-sm text-landing-muted">{t('loading_opportunities')}</p>}
        {error && (
          <p className="alert-error">{error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="creator-panel text-center">
            <p className="text-sm text-landing-muted">
              {query ? t('no_sponsorships_match') : t('no_active_sponsorships')}
            </p>
          </div>
        )}

        {filtered.length > 0 && (
          <>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-landing-muted">
              {query ? t('results') : t('for_you')}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((s) => (
                <SponsorshipCard key={s.id} sponsorship={s} />
              ))}
            </div>
            {hasMore && !query && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="landing-btn-light px-5 py-2.5 text-sm disabled:opacity-60"
                >
                  {loadingMore ? t('loading') : t('load_more')}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardShell>
  );
}
