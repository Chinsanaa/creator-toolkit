import { contentTypeLabel, formatDate, formatMnt } from '@/lib/format';
import type { SponsorCampaign } from '@/lib/types/sponsor';
import { CampaignStatusBadge } from '@/components/sponsor/CampaignStatusBadge';

export function CampaignReadOnly({ campaign }: { campaign: SponsorCampaign }) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <CampaignStatusBadge status={campaign.status} />
          <h1 className="font-display mt-3 text-2xl font-bold text-foreground">{campaign.title}</h1>
          <p className="mt-2 text-xl font-semibold text-primary">
            {formatMnt(campaign.payment_amount_mnt)}
          </p>
        </div>
      </div>

      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted">Content</dt>
          <dd className="font-medium">{contentTypeLabel(campaign.content_type)}</dd>
        </div>
        <div>
          <dt className="text-muted">Applications</dt>
          <dd className="font-medium">
            {campaign.applicationCount} total · {campaign.pendingCount} pending
          </dd>
        </div>
        <div>
          <dt className="text-muted">Apply by</dt>
          <dd className="font-medium">{formatDate(campaign.deadline_apply)}</dd>
        </div>
        <div>
          <dt className="text-muted">Complete by</dt>
          <dd className="font-medium">{formatDate(campaign.deadline_complete)}</dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-border pt-6">
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted">Brief</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted">
          {campaign.description}
        </p>
      </div>
    </div>
  );
}
