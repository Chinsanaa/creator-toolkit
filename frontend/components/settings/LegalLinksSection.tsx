'use client';

import { useState } from 'react';
import { LegalDocumentModal } from '@/components/auth/LegalDocumentModal';
import { useLanguage } from '@/contexts/LanguageContext';
import type { LegalDocumentSlug } from '@/lib/types/legal';

export function LegalLinksSection() {
  const [openSlug, setOpenSlug] = useState<LegalDocumentSlug | null>(null);
  const { t } = useLanguage();

  return (
    <section className="creator-panel-lg">
      <h2 className="text-base font-semibold tracking-tight text-landing-fg">{t('legal')}</h2>
      <p className="mt-2 text-sm text-landing-muted">
        {t('legal_subtitle')}
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          className="oauth-provider-btn sm:flex-1"
          onClick={() => setOpenSlug('privacy-policy')}
        >
          {t('privacy_policy')}
        </button>
        <button
          type="button"
          className="oauth-provider-btn sm:flex-1"
          onClick={() => setOpenSlug('terms-and-conditions')}
        >
          {t('terms_and_conditions')}
        </button>
      </div>
      <LegalDocumentModal slug={openSlug} onClose={() => setOpenSlug(null)} />
    </section>
  );
}
