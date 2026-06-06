import Link from 'next/link';
import {
  applicationStatusLabel,
  contentTypeLabel,
  formatMnt,
} from '@/lib/format';
import type { SponsorshipListing } from '@/lib/types/sponsorship';

export function SponsorshipCard({ sponsorship }: { sponsorship: SponsorshipListing }) {
  const title = sponsorship.title.replace(/^\[Demo\]\s*/, '');
  const brand = sponsorship.sponsor?.name ?? 'Brand partner';

  return (
    <Link
      href={`/sponsorships/${sponsorship.id}`}
      className="glass-card block cursor-pointer p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--primary)]/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="badge-pill !inline-flex !normal-case">
            {sponsorship.sponsor?.name ?? 'Brand partner'}
          </p>
          <h3 className="font-display mt-2 text-lg font-bold text-[color:var(--foreground)]">
            {sponsorship.title.replace(/^\[Demo\]\s*/, '')}
          </h3>
        </div>
        <p className="font-mono-stat shrink-0 text-lg font-semibold text-[color:var(--primary)]">
          {formatMnt(sponsorship.payment_amount_mnt)}
        </p>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-landing-muted">{brand}</p>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold text-landing-fg">{title}</h3>
        {sponsorship.hasApplied ? (
          <p className="mt-2 text-sm font-medium text-sky-700">
            {applicationStatusLabel(sponsorship.applicationStatus ?? 'pending')}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
