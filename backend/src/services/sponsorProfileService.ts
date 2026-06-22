import authService from './authService';
import { getAuthenticatedClient } from '../database/supabase';

export interface SponsorProfile {
  companyName: string | null;
  websiteUrl: string | null;
  logoUrl: string | null;
}

export interface SponsorProfileUpdate {
  companyName?: string;
  websiteUrl?: string;
  logoUrl?: string;
}

type SponsorProfileRow = {
  company_name: string | null;
  website_url: string | null;
  logo_url: string | null;
};

function mapProfileRow(row: SponsorProfileRow | null): SponsorProfile {
  return {
    companyName: row?.company_name ?? null,
    websiteUrl: row?.website_url ?? null,
    logoUrl: row?.logo_url ?? null,
  };
}

class SponsorProfileService {
  private async assertSponsor(userId: string, accessToken: string): Promise<void> {
    const profile = await authService.getProfile(userId, accessToken);
    if (profile.userType !== 'sponsor') {
      throw new Error('Sponsor account required');
    }
  }

  public async getProfile(userId: string, accessToken: string): Promise<SponsorProfile> {
    await this.assertSponsor(userId, accessToken);
    const client = getAuthenticatedClient(accessToken);

    const { data, error } = await client
      .from('sponsor_profiles')
      .select('company_name, website_url, logo_url')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to load company profile: ${error.message}`);
    }

    return mapProfileRow(data as SponsorProfileRow | null);
  }

  public async updateProfile(
    userId: string,
    accessToken: string,
    update: SponsorProfileUpdate
  ): Promise<SponsorProfile> {
    await this.assertSponsor(userId, accessToken);
    const client = getAuthenticatedClient(accessToken);

    const payload = {
      user_id: userId,
      company_name: update.companyName?.trim() || null,
      website_url: update.websiteUrl?.trim() || null,
      logo_url: update.logoUrl?.trim() || null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await client
      .from('sponsor_profiles')
      .upsert(payload, { onConflict: 'user_id' })
      .select('company_name, website_url, logo_url')
      .single();

    if (error) {
      throw new Error(`Failed to update company profile: ${error.message}`);
    }

    return mapProfileRow(data as SponsorProfileRow);
  }
}

export default new SponsorProfileService();
