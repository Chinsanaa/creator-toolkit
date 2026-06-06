import { apiFetch } from './client';
import type { LegalDocumentResponse, LegalDocumentSlug } from '../types/legal';

export async function getLegalDocument(slug: LegalDocumentSlug): Promise<LegalDocumentResponse> {
  return apiFetch<LegalDocumentResponse>(`/api/legal/${slug}`, {}, false);
}
