import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';

export type LegalDocumentSlug = 'privacy-policy' | 'terms-and-conditions';

export interface LegalDocument {
  slug: LegalDocumentSlug;
  title: string;
  content: string;
  updatedAt: string;
}

const DOCUMENT_META: Record<LegalDocumentSlug, { title: string; filename: string }> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    filename: 'privacy-policy.md',
  },
  'terms-and-conditions': {
    title: 'Terms and Conditions',
    filename: 'terms-and-conditions.md',
  },
};

function resolveContentDir(): string {
  const candidates = [
    path.join(__dirname, '..', 'content', 'legal'),
    path.join(process.cwd(), 'dist', 'content', 'legal'),
    path.join(process.cwd(), 'src', 'content', 'legal'),
  ];

  for (const dir of candidates) {
    if (fsSync.existsSync(dir)) {
      return dir;
    }
  }

  return candidates[0];
}

const contentDir = resolveContentDir();

class LegalService {
  private async readDocument(slug: LegalDocumentSlug): Promise<LegalDocument> {
    const meta = DOCUMENT_META[slug];
    const filePath = path.join(contentDir, meta.filename);
    const content = await fs.readFile(filePath, 'utf-8');
    const stat = await fs.stat(filePath);

    return {
      slug,
      title: meta.title,
      content,
      updatedAt: stat.mtime.toISOString(),
    };
  }

  public async getPrivacyPolicy(): Promise<LegalDocument> {
    return this.readDocument('privacy-policy');
  }

  public async getTermsAndConditions(): Promise<LegalDocument> {
    return this.readDocument('terms-and-conditions');
  }
}

export default new LegalService();
