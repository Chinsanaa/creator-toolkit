export type LegalDocumentSlug = 'privacy-policy' | 'terms-and-conditions';

export interface LegalDocument {
  slug: LegalDocumentSlug;
  title: string;
  content: string;
  updatedAt: string;
}

export interface LegalDocumentResponse {
  document: LegalDocument;
}
