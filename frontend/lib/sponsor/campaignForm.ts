import type { SponsorCampaign } from '@/lib/types/sponsor';

export const CAMPAIGN_CONTENT_TYPES = [
  { value: 'tiktok_video', label: 'TikTok video' },
  { value: 'youtube_video', label: 'YouTube video' },
  { value: 'short_video', label: 'Short-form video' },
  { value: 'instagram_reel', label: 'Instagram Reel' },
] as const;

export type CampaignStatus = 'active' | 'closed';

export interface CampaignFormValues {
  title: string;
  description: string;
  paymentAmountMnt: string;
  contentType: string;
  requiredFollowersMin: string;
  requiredFollowersMax: string;
  engagementRateMin: string;
  deadlineApply: string;
  deadlineComplete: string;
}

export function emptyCampaignForm(): CampaignFormValues {
  return {
    title: '',
    description: '',
    paymentAmountMnt: '',
    contentType: 'tiktok_video',
    requiredFollowersMin: '',
    requiredFollowersMax: '',
    engagementRateMin: '',
    deadlineApply: '',
    deadlineComplete: '',
  };
}

export function campaignToFormValues(c: SponsorCampaign): CampaignFormValues {
  return {
    title: c.title,
    description: c.description,
    paymentAmountMnt: String(c.payment_amount_mnt),
    contentType: c.content_type ?? 'tiktok_video',
    requiredFollowersMin:
      c.required_followers_min != null ? String(c.required_followers_min) : '',
    requiredFollowersMax:
      c.required_followers_max != null ? String(c.required_followers_max) : '',
    engagementRateMin:
      c.engagement_rate_min != null ? String(c.engagement_rate_min) : '',
    deadlineApply: c.deadline_apply?.slice(0, 10) ?? '',
    deadlineComplete: c.deadline_complete?.slice(0, 10) ?? '',
  };
}

export function formValuesToPayload(values: CampaignFormValues): Record<string, unknown> {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
    paymentAmountMnt: Number(values.paymentAmountMnt),
    contentType: values.contentType,
    requiredFollowersMin: values.requiredFollowersMin
      ? Number(values.requiredFollowersMin)
      : undefined,
    requiredFollowersMax: values.requiredFollowersMax
      ? Number(values.requiredFollowersMax)
      : undefined,
    engagementRateMin: values.engagementRateMin ? Number(values.engagementRateMin) : undefined,
    deadlineApply: values.deadlineApply || undefined,
    deadlineComplete: values.deadlineComplete || undefined,
  };
}

/** Legacy rows created before draft mode was removed. */
export function isLegacyUnpublished(status: string): boolean {
  return status === 'draft';
}

export function isPublished(status: string): boolean {
  return status === 'active';
}

export function isClosed(status: string): boolean {
  return status === 'closed';
}

export function campaignStatusLabel(status: string): string {
  if (status === 'active') return 'Published';
  if (status === 'closed') return 'Closed';
  if (status === 'draft') return 'Unpublished';
  return status;
}
