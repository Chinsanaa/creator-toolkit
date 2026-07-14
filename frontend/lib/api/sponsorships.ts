import { apiFetch } from './client';
import type { SponsorshipApplication, SponsorshipListing } from '@/lib/types/sponsorship';
import type { Page } from '@/lib/types/pagination';

export async function listSponsorships(
  options: { limit?: number; offset?: number } = {}
): Promise<Page<SponsorshipListing>> {
  const params = new URLSearchParams();
  if (options.limit != null) params.set('limit', String(options.limit));
  if (options.offset != null) params.set('offset', String(options.offset));
  const query = params.toString();
  const data = await apiFetch<{
    sponsorships: SponsorshipListing[];
    hasMore: boolean;
    nextOffset: number;
  }>(`/api/sponsorships${query ? `?${query}` : ''}`);
  return { items: data.sponsorships, hasMore: data.hasMore, nextOffset: data.nextOffset };
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

export async function submitDeliverable(
  applicationId: string,
  deliverableUrl: string
): Promise<SponsorshipApplication['deliverable_url']> {
  const data = await apiFetch<{ application: { deliverable_url: string | null } }>(
    `/api/sponsorships/applications/${applicationId}/deliverable`,
    {
      method: 'PATCH',
      body: JSON.stringify({ deliverableUrl }),
    }
  );
  return data.application.deliverable_url;
}
