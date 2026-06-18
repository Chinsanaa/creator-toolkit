'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SponsorShell } from '@/components/sponsor/SponsorShell';
import { CampaignStatusBadge } from '@/components/sponsor/CampaignStatusBadge';
import { PageHeader } from '@/components/ui/PageHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { ApiError } from '@/lib/api/client';
import { listSponsorCampaigns } from '@/lib/api/sponsor';
import { contentTypeLabel, formatDate, formatMnt } from '@/lib/format';
import { isLegacyUnpublished } from '@/lib/sponsor/campaignForm';
import type { SponsorCampaign } from '@/lib/types/sponsor';

type FilterTab = 'all' | 'published' | 'closed';

function matchesTab(c: SponsorCampaign, tab: FilterTab): boolean {
  if (tab === 'all') return true;
  if (tab === 'published') return c.status === 'active';
  return c.status === 'closed';
}

export default function SponsorCampaignsPage() {
  const [campaigns, setCampaigns] = useState<SponsorCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<FilterTab>('all');
  const { t } = useLanguage();

  useEffect(() => {
    listSponsorCampaigns()
      .then(setCampaigns)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : 'Failed to load campaigns')
      )
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return campaigns.filter((c) => matchesTab(c, tab));
  }, [campaigns, tab]);

  const counts = useMemo(
    () => ({
      all: campaigns.length,
      published: campaigns.filter((c) => c.status === 'active').length,
      closed: campaigns.filter((c) => c.status === 'closed').length,
      legacy: campaigns.filter((c) => isLegacyUnpublished(c.status)).length,
    }),
    [campaigns]
  );

  const tabLabels: Record<FilterTab, string> = {
    all: t('all'),
    published: t('published'),
    closed: t('closed'),
  };

  return (
    <SponsorShell>
      <PageHeader
        eyebrow="Sponsor"
        title={t('campaigns')}
        description={t('campaigns_subtitle')}
        actions={
          <Link href="/sponsor/campaigns/new" className="btn-primary w-auto px-5">
            {t('new_campaign')}
          </Link>
        }
      />

      {counts.legacy > 0 && (
        <p className="mb-4 text-sm text-amber-800 dark:text-amber-200">
          {counts.legacy} older campaign{counts.legacy === 1 ? '' : 's'} need publishing — open
          them and use Publish.
        </p>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {(['all', 'published', 'closed'] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`min-h-10 rounded-xl px-3 py-2 text-sm font-semibold transition ${
              tab === key ? 'nav-link-active' : 'nav-link-inactive border border-[color:var(--border)]'
            }`}
          >
            {tabLabels[key]} ({counts[key]})
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-sm text-[color:var(--muted-foreground)]">{t('loading_campaigns')}</p>
      )}
      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-sm text-[color:var(--muted-foreground)]">
          {tab === 'all' ? (
            <>
              {t('no_campaigns_yet')}{' '}
              <Link href="/sponsor/campaigns/new" className="link-primary">
                {t('no_campaigns_yet')}
              </Link>
            </>
          ) : (
            `No ${tabLabels[tab].toLowerCase()} campaigns.`
          )}
        </p>
      )}

      <div className="space-y-4">
        {filtered.map((c) => (
          <Link
            key={c.id}
            href={`/sponsor/campaigns/${c.id}`}
            className="creator-panel block cursor-pointer p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-lg font-bold text-[color:var(--foreground)]">
                    {c.title}
                  </h2>
                  <CampaignStatusBadge status={c.status} />
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-[color:var(--muted-foreground)]">
                  {c.description}
                </p>
                <p className="mt-2 text-xs text-[color:var(--muted)]">
                  {contentTypeLabel(c.content_type)} · Apply by {formatDate(c.deadline_apply)}
                </p>
                {isLegacyUnpublished(c.status) && (
                  <p className="mt-2 text-xs font-semibold text-[color:var(--primary)]">
                    {t('publish_to_go_live')}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-primary">
                  {formatMnt(c.payment_amount_mnt)}
                </p>
                <p className="mt-1 text-xs text-[color:var(--muted)]">
                  {c.applicationCount} {t('applications')}
                  {c.pendingCount > 0 && (
                    <span className="ml-1 font-semibold text-amber-600 dark:text-amber-400">
                      · {c.pendingCount} {t('pending_applications').toLowerCase()}
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
