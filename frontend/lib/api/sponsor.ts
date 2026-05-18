import { apiFetch } from './client';
import type {
  SponsorApplication,
  SponsorCampaign,
  SponsorDashboardStats,
} from '@/lib/types/sponsor';

export async function getSponsorDashboard(): Promise<SponsorDashboardStats> {
  return apiFetch<SponsorDashboardStats>('/api/sponsor/dashboard');
}

export async function listSponsorCampaigns(): Promise<SponsorCampaign[]> {
  const data = await apiFetch<{ campaigns: SponsorCampaign[] }>('/api/sponsor/campaigns');
  return data.campaigns;
}

export async function createSponsorCampaign(
  payload: Record<string, unknown>
): Promise<SponsorCampaign> {
  const data = await apiFetch<{ campaign: SponsorCampaign }>('/api/sponsor/campaigns', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.campaign;
}

export async function getSponsorCampaign(id: string): Promise<{
  campaign: SponsorCampaign;
  applications: SponsorApplication[];
}> {
  return apiFetch(`/api/sponsor/campaigns/${id}`);
}

export async function publishCampaign(id: string): Promise<void> {
  await apiFetch(`/api/sponsor/campaigns/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'active' }),
  });
}

export async function closeCampaign(id: string): Promise<void> {
  await apiFetch(`/api/sponsor/campaigns/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'closed' }),
  });
}

export async function deleteSponsorCampaign(id: string): Promise<void> {
  await apiFetch(`/api/sponsor/campaigns/${id}`, { method: 'DELETE' });
}

export async function updateApplicationStatus(
  id: string,
  status: 'approved' | 'rejected',
  sponsorNotes?: string
): Promise<SponsorApplication> {
  const data = await apiFetch<{ application: SponsorApplication }>(
    `/api/sponsor/applications/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status, sponsorNotes }),
    }
  );
  return data.application;
}
