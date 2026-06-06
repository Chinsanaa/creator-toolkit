import { apiFetch } from './client';
import type { SponsorshipApplication, SponsorshipListing } from '@/lib/types/sponsorship';

export async function listSponsorships(): Promise<SponsorshipListing[]> {
  const data = await apiFetch<{ sponsorships: SponsorshipListing[] }>('/api/sponsorships');
  return data.sponsorships;
}

export async function getSponsorship(id: string): Promise<SponsorshipListing> {
  return apiFetch<SponsorshipListing>(`/api/sponsorships/${id}`);
}

export async function applyToSponsorship(
  id: string,
  responseText: string
): Promise<{ message: string; application: { id: string; status: string } }> {
  return apiFetch(`/api/sponsorships/${id}/apply`, {
    method: 'POST',
    body: JSON.stringify({ responseText }),
  });
}

export async function listMyApplications(): Promise<SponsorshipApplication[]> {
  const data = await apiFetch<{ applications: SponsorshipApplication[] }>(
    '/api/sponsorships/applications/me'
  );
  return data.applications;
}
