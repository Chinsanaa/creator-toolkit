'use client';

import { useState } from 'react';
import { LegalDocumentModal } from '@/components/auth/LegalDocumentModal';
import type { LegalDocumentSlug } from '@/lib/types/legal';

interface LegalConsentProps {
  mode: 'signup' | 'login';
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function LegalConsent({ mode, checked = false, onCheckedChange }: LegalConsentProps) {
  const [openSlug, setOpenSlug] = useState<LegalDocumentSlug | null>(null);

  function openDocument(slug: LegalDocumentSlug) {
    setOpenSlug(slug);
  }

  const links = (
    <>
      <button type="button" className="auth-link underline" onClick={() => openDocument('terms-and-conditions')}>
        Terms and Conditions
      </button>
      {' and '}
      <button type="button" className="auth-link underline" onClick={() => openDocument('privacy-policy')}>
        Privacy Policy
      </button>
    </>
  );

  return (
    <>
      {mode === 'signup' ? (
        <label className="legal-consent-label">
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={checked}
            onChange={(e) => onCheckedChange?.(e.target.checked)}
            required
            className="legal-consent-checkbox"
          />
          <span className="text-sm leading-relaxed text-landing-muted">
            I agree to the {links}.
          </span>
        </label>
      ) : (
        <p className="text-sm leading-relaxed text-landing-muted">
          By signing in, you agree to our {links}.
        </p>
      )}

      <LegalDocumentModal slug={openSlug} onClose={() => setOpenSlug(null)} />
    </>
  );
}
