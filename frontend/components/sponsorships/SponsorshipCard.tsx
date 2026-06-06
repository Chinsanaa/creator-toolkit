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
    <Link href={`/sponsorships/${sponsorship.id}`} className="creator-gig-card">
      <div className="creator-gig-thumb">
        <span className="creator-gig-price">{formatMnt(sponsorship.payment_amount_mnt)}</span>
        <div className="flex h-full items-end p-4">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-landing-muted">
            {contentTypeLabel(sponsorship.content_type)}
          </span>
        </div>
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
