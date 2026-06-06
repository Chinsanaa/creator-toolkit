import { getAuthenticatedClient, supabaseAdmin } from '../database/supabase';

export interface SponsorInfo {
  id: string;
  name: string;
  username: string;
}

export interface SponsorshipListing {
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
  sponsor: SponsorInfo | null;
  hasApplied: boolean;
  applicationStatus: string | null;
}

export interface SponsorshipApplication {
  id: string;
  sponsorship_id: string;
  status: string;
  response_text: string | null;
  applied_at: string | null;
  sponsorship: {
    id: string;
    title: string;
    payment_amount_mnt: number;
    status: string;
    deadline_complete: string | null;
  } | null;
}

function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  return typeof value === 'number' ? value : parseFloat(value);
}

class SponsorshipService {
  private async enrichSponsors<T extends { sponsor_user_id: string }>(
    rows: T[]
  ): Promise<Map<string, SponsorInfo>> {
    const map = new Map<string, SponsorInfo>();
    if (!rows.length || !supabaseAdmin) return map;

    const ids = [...new Set(rows.map((r) => r.sponsor_user_id))];
    const { data } = await supabaseAdmin
      .from('users')
      .select('id, name, username')
      .in('id', ids);

    for (const u of data ?? []) {
      map.set(u.id, { id: u.id, name: u.name, username: u.username });
    }
    return map;
  }

  public async listActive(
    userId: string,
    accessToken: string
  ): Promise<SponsorshipListing[]> {
    const client = getAuthenticatedClient(accessToken);

    const [sponsorshipsResult, applicationsResult] = await Promise.all([
      client
        .from('sponsorships')
        .select(
          'id, sponsor_user_id, title, description, payment_amount_mnt, content_type, required_followers_min, required_followers_max, engagement_rate_min, status, deadline_apply, deadline_complete, created_at'
        )
        .eq('status', 'active')
        .order('created_at', { ascending: false }),
      client
        .from('sponsorship_applications')
        .select('sponsorship_id, status')
        .eq('creator_user_id', userId),
    ]);

    if (sponsorshipsResult.error) {
      throw new Error(`Failed to load sponsorships: ${sponsorshipsResult.error.message}`);
    }

    const applicationMap = new Map<string, string>();
    for (const app of applicationsResult.data ?? []) {
      applicationMap.set(app.sponsorship_id, app.status);
    }

    const rows = sponsorshipsResult.data ?? [];
    const sponsorMap = await this.enrichSponsors(rows);

    return rows.map((row) => ({
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
      sponsor: sponsorMap.get(row.sponsor_user_id) ?? null,
      hasApplied: applicationMap.has(row.id),
      applicationStatus: applicationMap.get(row.id) ?? null,
    }));
  }

  public async getById(
    sponsorshipId: string,
    userId: string,
    accessToken: string
  ): Promise<SponsorshipListing> {
    const client = getAuthenticatedClient(accessToken);

    const { data: row, error } = await client
      .from('sponsorships')
      .select(
        'id, sponsor_user_id, title, description, payment_amount_mnt, content_type, required_followers_min, required_followers_max, engagement_rate_min, status, deadline_apply, deadline_complete, created_at'
      )
      .eq('id', sponsorshipId)
      .eq('status', 'active')
      .single();

    if (error || !row) {
      throw new Error('Sponsorship not found');
    }

    const { data: application } = await client
      .from('sponsorship_applications')
      .select('status')
      .eq('sponsorship_id', sponsorshipId)
      .eq('creator_user_id', userId)
      .maybeSingle();

    const sponsorMap = await this.enrichSponsors([row]);

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
      sponsor: sponsorMap.get(row.sponsor_user_id) ?? null,
      hasApplied: !!application,
      applicationStatus: application?.status ?? null,
    };
  }

  public async apply(
    sponsorshipId: string,
    userId: string,
    accessToken: string,
    responseText: string
  ): Promise<{ id: string; status: string }> {
    if (!responseText?.trim()) {
      throw new Error('Application message is required');
    }

    const client = getAuthenticatedClient(accessToken);

    const { data: sponsorship, error: loadError } = await client
      .from('sponsorships')
      .select('id, status, deadline_apply')
      .eq('id', sponsorshipId)
      .single();

    if (loadError || !sponsorship) {
      throw new Error('Sponsorship not found');
    }

    if (sponsorship.status !== 'active') {
      throw new Error('This sponsorship is no longer accepting applications');
    }

    if (sponsorship.deadline_apply) {
      const deadline = new Date(sponsorship.deadline_apply);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadline < today) {
        throw new Error('Application deadline has passed');
      }
    }

    const { data: existing } = await client
      .from('sponsorship_applications')
      .select('id')
      .eq('sponsorship_id', sponsorshipId)
      .eq('creator_user_id', userId)
      .maybeSingle();

    if (existing) {
      throw new Error('You have already applied to this sponsorship');
    }

    const { data, error } = await client
      .from('sponsorship_applications')
      .insert({
        sponsorship_id: sponsorshipId,
        creator_user_id: userId,
        status: 'pending',
        response_text: responseText.trim(),
        applied_at: new Date().toISOString(),
      })
      .select('id, status')
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error('You have already applied to this sponsorship');
      }
      throw new Error(`Failed to submit application: ${error.message}`);
    }

    return { id: data.id, status: data.status };
  }

  public async listMyApplications(
    userId: string,
    accessToken: string
  ): Promise<SponsorshipApplication[]> {
    const client = getAuthenticatedClient(accessToken);

    const { data, error } = await client
      .from('sponsorship_applications')
      .select(
        `
        id,
        sponsorship_id,
        status,
        response_text,
        applied_at,
        sponsorship:sponsorships (
          id,
          title,
          payment_amount_mnt,
          status,
          deadline_complete
        )
      `
      )
      .eq('creator_user_id', userId)
      .order('applied_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to load applications: ${error.message}`);
    }

    return (data ?? []).map((row) => {
      const sponsorship = Array.isArray(row.sponsorship)
        ? row.sponsorship[0]
        : row.sponsorship;

      return {
        id: row.id,
        sponsorship_id: row.sponsorship_id,
        status: row.status,
        response_text: row.response_text,
        applied_at: row.applied_at,
        sponsorship: sponsorship
          ? {
              id: sponsorship.id,
              title: sponsorship.title,
              payment_amount_mnt: toNumber(sponsorship.payment_amount_mnt),
              status: sponsorship.status,
              deadline_complete: sponsorship.deadline_complete,
            }
          : null,
      };
    });
  }
}

export default new SponsorshipService();
