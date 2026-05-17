import Link from 'next/link';
import {
  applicationStatusLabel,
  contentTypeLabel,
  formatDate,
  formatMnt,
} from '@/lib/format';
import type { SponsorshipListing } from '@/lib/types/sponsorship';

export function SponsorshipCard({ sponsorship }: { sponsorship: SponsorshipListing }) {
  const followersRange = formatFollowers(
    sponsorship.required_followers_min,
    sponsorship.required_followers_max
  );

  return (
    <Link
      href={`/sponsorships/${sponsorship.id}`}
      className="block rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-violet-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-violet-800"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-violet-600">
            {sponsorship.sponsor?.name ?? 'Brand partner'}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {sponsorship.title.replace(/^\[Demo\]\s*/, '')}
          </h3>
        </div>
        <p className="shrink-0 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {formatMnt(sponsorship.payment_amount_mnt)}
        </p>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
        {sponsorship.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
        <span className="rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-zinc-900">
          {contentTypeLabel(sponsorship.content_type)}
        </span>
        <span className="rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-zinc-900">
          {followersRange}
        </span>
        {sponsorship.deadline_apply && (
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-zinc-900">
            Apply by {formatDate(sponsorship.deadline_apply)}
          </span>
        )}
      </div>

      {sponsorship.hasApplied && (
        <p className="mt-3 text-sm font-medium text-violet-600">
          {applicationStatusLabel(sponsorship.applicationStatus ?? 'pending')}
        </p>
      )}
    </Link>
  );
}

function formatFollowers(min: number | null, max: number | null): string {
  if (min && max) return `${(min / 1000).toFixed(0)}k–${(max / 1000).toFixed(0)}k followers`;
  if (min) return `${(min / 1000).toFixed(0)}k+ followers`;
  if (max) return `Up to ${(max / 1000).toFixed(0)}k followers`;
  return 'Any audience size';
}

