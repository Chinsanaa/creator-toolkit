import authService from './authService';
import notificationService from './notificationService';
import { getAuthenticatedClient, supabaseAdmin } from '../database/supabase';

export interface SponsorDashboardStats {
  activeCampaigns: number;
  totalCampaigns: number;
  pendingApplications: number;
  totalApplications: number;
  totalBudgetMnt: number;
}

export interface SponsorCampaign {
  id: string;
  title: string;
  description: string;
  payment_amount_mnt: number;
  content_type: string | null;
  required_followers_min: number | null;
  required_followers_max: number | null;
  engagement_rate_min: number | null;
  status: string;
  deadline_apply: string | null;
  deadline_complete: string | null;
  created_at: string | null;
  applicationCount: number;
  pendingCount: number;
}

export interface SponsorApplication {
  id: string;
  sponsorship_id: string;
  status: string;
  response_text: string | null;
  sponsor_notes: string | null;
  applied_at: string | null;
  creator: {
    id: string;
    name: string;
    username: string;
  } | null;
}

function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  return typeof value === 'number' ? value : parseFloat(value);
}

export interface CampaignPayload {
  title: string;
  description: string;
  paymentAmountMnt: number;
  contentType?: string;
  requiredFollowersMin?: number;
  requiredFollowersMax?: number;
  engagementRateMin?: number;
  deadlineApply?: string;
  deadlineComplete?: string;
}

type CampaignRow = {
  id: string;
  title: string;
  description: string;
  payment_amount_mnt: string | number;
  content_type: string | null;
  required_followers_min: number | null;
  required_followers_max: number | null;
  engagement_rate_min: string | number | null;
  status: string;
  deadline_apply: string | null;
  deadline_complete: string | null;
  created_at: string | null;
};

function mapCampaignRow(
  row: CampaignRow,
  counts: { total: number; pending: number } = { total: 0, pending: 0 }
): SponsorCampaign {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    payment_amount_mnt: toNumber(row.payment_amount_mnt),
    content_type: row.content_type,
    required_followers_min: row.required_followers_min,
    required_followers_max: row.required_followers_max,
    engagement_rate_min:
      row.engagement_rate_min != null ? toNumber(row.engagement_rate_min) : null,
    status: row.status,
    deadline_apply: row.deadline_apply,
    deadline_complete: row.deadline_complete,
    created_at: row.created_at,
    applicationCount: counts.total,
    pendingCount: counts.pending,
  };
}

function validateCampaignPayload(payload: CampaignPayload): void {
  const { title, description, paymentAmountMnt } = payload;
  if (!title?.trim() || !description?.trim()) {
    throw new Error('Title and description are required');
  }
  if (!paymentAmountMnt || paymentAmountMnt < 10000) {
    throw new Error('Minimum payment is 10,000 MNT');
  }
}

function campaignInsertFromPayload(userId: string, payload: CampaignPayload) {
  return {
    sponsor_user_id: userId,
    title: payload.title.trim(),
    description: payload.description.trim(),
    payment_amount_mnt: payload.paymentAmountMnt,
    content_type: payload.contentType ?? 'tiktok_video',
    required_followers_min: payload.requiredFollowersMin ?? null,
    required_followers_max: payload.requiredFollowersMax ?? null,
    engagement_rate_min: payload.engagementRateMin ?? null,
    status: 'active',
    deadline_apply: payload.deadlineApply ?? null,
    deadline_complete: payload.deadlineComplete ?? null,
  };
}

class SponsorService {
  private async assertSponsor(userId: string, accessToken: string): Promise<void> {
    const profile = await authService.getProfile(userId, accessToken);
    if (profile.userType !== 'sponsor') {
      throw new Error('Sponsor account required');
    }
  }

  public async getDashboard(
    userId: string,
    accessToken: string
  ): Promise<SponsorDashboardStats> {
    await this.assertSponsor(userId, accessToken);
    const client = getAuthenticatedClient(accessToken);

    const { data: campaigns, error } = await client
      .from('sponsorships')
      .select('id, status, payment_amount_mnt')
      .eq('sponsor_user_id', userId);

    if (error) {
      throw new Error(`Failed to load dashboard: ${error.message}`);
    }

    const rows = campaigns ?? [];
    const campaignIds = rows.map((r) => r.id);

    let applications: { status: string }[] = [];
    if (campaignIds.length > 0) {
      const { data: apps } = await client
        .from('sponsorship_applications')
        .select('status')
        .in('sponsorship_id', campaignIds);
      applications = apps ?? [];
    }

    return {
      activeCampaigns: rows.filter((r) => r.status === 'active').length,
      totalCampaigns: rows.length,
      pendingApplications: applications.filter((a) => a.status === 'pending').length,
      totalApplications: applications.length,
      totalBudgetMnt: rows
        .filter((r) => r.status === 'active')
        .reduce((sum, r) => sum + toNumber(r.payment_amount_mnt), 0),
    };
  }

  public async listCampaigns(
    userId: string,
    accessToken: string
  ): Promise<SponsorCampaign[]> {
    await this.assertSponsor(userId, accessToken);
    const client = getAuthenticatedClient(accessToken);

    const { data: campaigns, error } = await client
      .from('sponsorships')
      .select(
        'id, title, description, payment_amount_mnt, content_type, required_followers_min, required_followers_max, engagement_rate_min, status, deadline_apply, deadline_complete, created_at'
      )
      .eq('sponsor_user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to load campaigns: ${error.message}`);
    }

    const ids = (campaigns ?? []).map((c) => c.id);
    const appCounts = new Map<string, { total: number; pending: number }>();

    if (ids.length > 0) {
      const { data: apps } = await client
        .from('sponsorship_applications')
        .select('sponsorship_id, status')
        .in('sponsorship_id', ids);

      for (const app of apps ?? []) {
        const current = appCounts.get(app.sponsorship_id) ?? { total: 0, pending: 0 };
        current.total += 1;
        if (app.status === 'pending') current.pending += 1;
        appCounts.set(app.sponsorship_id, current);
      }
    }

    return (campaigns ?? []).map((row) => {
      const counts = appCounts.get(row.id) ?? { total: 0, pending: 0 };
      return mapCampaignRow(row, counts);
    });
  }

  public async createCampaign(
    userId: string,
    accessToken: string,
    payload: CampaignPayload
  ): Promise<SponsorCampaign> {
    await this.assertSponsor(userId, accessToken);
    validateCampaignPayload(payload);

    const client = getAuthenticatedClient(accessToken);

    const { data, error } = await client
      .from('sponsorships')
      .insert(campaignInsertFromPayload(userId, payload))
      .select(
        'id, title, description, payment_amount_mnt, content_type, required_followers_min, required_followers_max, engagement_rate_min, status, deadline_apply, deadline_complete, created_at'
      )
      .single();

    if (error) {
      throw new Error(`Failed to create campaign: ${error.message}`);
    }

    return mapCampaignRow(data);
  }

  public async deleteCampaign(
    userId: string,
    accessToken: string,
    campaignId: string
  ): Promise<void> {
    await this.assertSponsor(userId, accessToken);
    const client = getAuthenticatedClient(accessToken);

    const { data: campaign, error: findError } = await client
      .from('sponsorships')
      .select('id, status')
      .eq('id', campaignId)
      .eq('sponsor_user_id', userId)
      .single();

    if (findError || !campaign) {
      throw new Error('Campaign not found');
    }

    if (campaign.status === 'closed') {
      throw new Error('Closed campaigns cannot be deleted');
    }

    const { count, error: countError } = await client
      .from('sponsorship_applications')
      .select('id', { count: 'exact', head: true })
      .eq('sponsorship_id', campaignId);

    if (countError) {
      throw new Error(`Failed to check applications: ${countError.message}`);
    }

    if ((count ?? 0) > 0) {
      throw new Error('Cannot delete a campaign that has applications');
    }

    const { error } = await client
      .from('sponsorships')
      .delete()
      .eq('id', campaignId)
      .eq('sponsor_user_id', userId);

    if (error) {
      throw new Error(`Failed to delete campaign: ${error.message}`);
    }
  }

  public async updateCampaignStatus(
    userId: string,
    accessToken: string,
    campaignId: string,
    status: 'active' | 'closed'
  ): Promise<void> {
    await this.assertSponsor(userId, accessToken);
    const client = getAuthenticatedClient(accessToken);

    const { data: existing, error: findError } = await client
      .from('sponsorships')
      .select('id, status, title, description, payment_amount_mnt')
      .eq('id', campaignId)
      .eq('sponsor_user_id', userId)
      .single();

    if (findError || !existing) {
      throw new Error('Campaign not found');
    }

    if (status === 'active') {
      if (existing.status !== 'draft') {
        throw new Error('Only draft campaigns can be published');
      }
      validateCampaignPayload({
        title: existing.title,
        description: existing.description,
        paymentAmountMnt: toNumber(existing.payment_amount_mnt),
      });
    }

    if (status === 'closed' && existing.status !== 'active') {
      throw new Error('Only active campaigns can be closed');
    }

    const { error } = await client
      .from('sponsorships')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', campaignId)
      .eq('sponsor_user_id', userId);

    if (error) {
      throw new Error(`Failed to update campaign: ${error.message}`);
    }
  }

  public async getCampaignApplications(
    userId: string,
    accessToken: string,
    campaignId: string
  ): Promise<{ campaign: SponsorCampaign; applications: SponsorApplication[] }> {
    await this.assertSponsor(userId, accessToken);
    const client = getAuthenticatedClient(accessToken);

    const { data: campaign, error: campError } = await client
      .from('sponsorships')
      .select(
        'id, title, description, payment_amount_mnt, content_type, required_followers_min, required_followers_max, engagement_rate_min, status, deadline_apply, deadline_complete, created_at'
      )
      .eq('id', campaignId)
      .eq('sponsor_user_id', userId)
      .single();

    if (campError || !campaign) {
      throw new Error('Campaign not found');
    }

    const { data: apps, error: appsError } = await client
      .from('sponsorship_applications')
      .select(
        'id, sponsorship_id, status, response_text, sponsor_notes, applied_at, creator_user_id'
      )
      .eq('sponsorship_id', campaignId)
      .order('applied_at', { ascending: false });

    if (appsError) {
      throw new Error(`Failed to load applications: ${appsError.message}`);
    }

    const creatorIds = [...new Set((apps ?? []).map((a) => a.creator_user_id))];
    const creatorMap = new Map<string, { id: string; name: string; username: string }>();

    if (creatorIds.length > 0 && supabaseAdmin) {
      const { data: creators } = await supabaseAdmin
        .from('users')
        .select('id, name, username')
        .in('id', creatorIds);
      for (const c of creators ?? []) {
        creatorMap.set(c.id, c);
      }
    }

    const applications: SponsorApplication[] = (apps ?? []).map((app) => ({
      id: app.id,
      sponsorship_id: app.sponsorship_id,
      status: app.status,
      response_text: app.response_text,
      sponsor_notes: app.sponsor_notes,
      applied_at: app.applied_at,
      creator: creatorMap.get(app.creator_user_id) ?? null,
    }));

    const pendingCount = applications.filter((a) => a.status === 'pending').length;

    return {
      campaign: mapCampaignRow(campaign, {
        total: applications.length,
        pending: pendingCount,
      }),
      applications,
    };
  }

  public async updateApplicationStatus(
    userId: string,
    accessToken: string,
    applicationId: string,
    status: 'approved' | 'rejected',
    sponsorNotes?: string
  ): Promise<SponsorApplication> {
    await this.assertSponsor(userId, accessToken);
    const client = getAuthenticatedClient(accessToken);

    const { data: app, error: findError } = await client
      .from('sponsorship_applications')
      .select('id, sponsorship_id, status')
      .eq('id', applicationId)
      .single();

    if (findError || !app) {
      throw new Error('Application not found');
    }

    const { data: campaign } = await client
      .from('sponsorships')
      .select('id')
      .eq('id', app.sponsorship_id)
      .eq('sponsor_user_id', userId)
      .single();

    if (!campaign) {
      throw new Error('Not authorized to manage this application');
    }

    if (app.status !== 'pending') {
      throw new Error('Only pending applications can be updated');
    }

    const updatePayload: Record<string, unknown> = {
      status,
      sponsor_notes: sponsorNotes?.trim() || null,
      updated_at: new Date().toISOString(),
    };
    if (status === 'approved') {
      updatePayload.approved_at = new Date().toISOString();
    }

    const { data, error } = await client
      .from('sponsorship_applications')
      .update(updatePayload)
      .eq('id', applicationId)
      .select(
        'id, sponsorship_id, status, response_text, sponsor_notes, applied_at, creator_user_id'
      )
      .single();

    if (error) {
      throw new Error(`Failed to update application: ${error.message}`);
    }

    let creator = null;
    if (supabaseAdmin) {
      const { data: c } = await supabaseAdmin
        .from('users')
        .select('id, name, username')
        .eq('id', data.creator_user_id)
        .single();
      creator = c;

      const { data: camp } = await supabaseAdmin
        .from('sponsorships')
        .select('title')
        .eq('id', data.sponsorship_id)
        .single();

      await notificationService.notifyApplicationStatus(
        data.creator_user_id,
        status,
        camp?.title ?? 'Campaign',
        sponsorNotes
      );
    }

    return {
      id: data.id,
      sponsorship_id: data.sponsorship_id,
      status: data.status,
      response_text: data.response_text,
      sponsor_notes: data.sponsor_notes,
      applied_at: data.applied_at,
      creator,
    };
  }
}

export default new SponsorService();
