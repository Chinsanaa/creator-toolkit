'use client';

import { useState } from 'react';
import { LegalDocumentModal } from '@/components/auth/LegalDocumentModal';
import type { LegalDocumentSlug } from '@/lib/types/legal';

export function LegalLinksSection() {
  const [openSlug, setOpenSlug] = useState<LegalDocumentSlug | null>(null);

  return (
    <section className="creator-panel-lg">
      <h2 className="text-base font-semibold tracking-tight text-landing-fg">Legal</h2>
      <p className="mt-2 text-sm text-landing-muted">
        Review how Earnio handles your data and the terms that govern use of the app.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          className="oauth-provider-btn sm:flex-1"
          onClick={() => setOpenSlug('privacy-policy')}
        >
          Privacy Policy
        </button>
        <button
          type="button"
          className="oauth-provider-btn sm:flex-1"
          onClick={() => setOpenSlug('terms-and-conditions')}
        >
          Terms & Conditions
        </button>
      </div>
      <LegalDocumentModal slug={openSlug} onClose={() => setOpenSlug(null)} />
    </section>
  );
}
