import { describe, it, expect } from 'vitest';
import type { SponsorCampaign } from '@/lib/types/sponsor';
import {
  emptyCampaignForm,
  campaignToFormValues,
  formValuesToPayload,
  isLegacyUnpublished,
  isPublished,
  isClosed,
  campaignStatusLabel,
} from './campaignForm';

function makeCampaign(overrides: Partial<SponsorCampaign> = {}): SponsorCampaign {
  return {
    id: 'c1',
    title: 'Launch',
    description: 'Promote our product',
    payment_amount_mnt: 100_000,
    content_type: 'youtube_video',
    required_followers_min: 1000,
    required_followers_max: 50_000,
    engagement_rate_min: 2.5,
    status: 'active',
    deadline_apply: '2026-01-15T00:00:00.000Z',
    deadline_complete: '2026-02-15T00:00:00.000Z',
    created_at: null,
    applicationCount: 0,
    pendingCount: 0,
    paymentMarkedPaidAt: null,
    ...overrides,
  };
}

describe('emptyCampaignForm', () => {
  it('returns blank fields with tiktok_video as the default content type', () => {
    const form = emptyCampaignForm();
    expect(form.title).toBe('');
    expect(form.contentType).toBe('tiktok_video');
    expect(form.paymentAmountMnt).toBe('');
  });
});

describe('campaignToFormValues', () => {
  it('stringifies numeric fields and truncates deadlines to dates', () => {
    const form = campaignToFormValues(makeCampaign());
    expect(form.paymentAmountMnt).toBe('100000');
    expect(form.requiredFollowersMin).toBe('1000');
    expect(form.requiredFollowersMax).toBe('50000');
    expect(form.engagementRateMin).toBe('2.5');
    expect(form.deadlineApply).toBe('2026-01-15');
    expect(form.deadlineComplete).toBe('2026-02-15');
  });

  it('maps null optional fields to empty strings and defaults content type', () => {
    const form = campaignToFormValues(
      makeCampaign({
        content_type: null,
        required_followers_min: null,
        required_followers_max: null,
        engagement_rate_min: null,
        deadline_apply: null,
        deadline_complete: null,
      })
    );
    expect(form.contentType).toBe('tiktok_video');
    expect(form.requiredFollowersMin).toBe('');
    expect(form.engagementRateMin).toBe('');
    expect(form.deadlineApply).toBe('');
  });
});

describe('formValuesToPayload', () => {
  it('trims text, coerces numbers, and drops empty optionals', () => {
    const payload = formValuesToPayload({
      title: '  Launch  ',
      description: '  Promote  ',
      paymentAmountMnt: '100000',
      contentType: 'short_video',
      requiredFollowersMin: '1000',
      requiredFollowersMax: '',
      engagementRateMin: '',
      deadlineApply: '2026-01-15',
      deadlineComplete: '',
    });

    expect(payload).toEqual({
      title: 'Launch',
      description: 'Promote',
      paymentAmountMnt: 100_000,
      contentType: 'short_video',
      requiredFollowersMin: 1000,
      requiredFollowersMax: undefined,
      engagementRateMin: undefined,
      deadlineApply: '2026-01-15',
      deadlineComplete: undefined,
    });
  });

  it('round-trips a campaign through form values back to a payload', () => {
    const payload = formValuesToPayload(campaignToFormValues(makeCampaign()));
    expect(payload.title).toBe('Launch');
    expect(payload.paymentAmountMnt).toBe(100_000);
    expect(payload.requiredFollowersMin).toBe(1000);
    expect(payload.engagementRateMin).toBe(2.5);
  });
});

describe('status helpers', () => {
  it('classifies statuses', () => {
    expect(isPublished('active')).toBe(true);
    expect(isPublished('closed')).toBe(false);
    expect(isClosed('closed')).toBe(true);
    expect(isClosed('active')).toBe(false);
    expect(isLegacyUnpublished('draft')).toBe(true);
    expect(isLegacyUnpublished('active')).toBe(false);
  });

  it('labels known statuses and echoes unknown ones', () => {
    expect(campaignStatusLabel('active')).toBe('Published');
    expect(campaignStatusLabel('closed')).toBe('Closed');
    expect(campaignStatusLabel('draft')).toBe('Unpublished');
    expect(campaignStatusLabel('archived')).toBe('archived');
  });
});
