'use client';

import { DeleteAccountSection } from '@/components/settings/DeleteAccountSection';
import { LegalLinksSection } from '@/components/settings/LegalLinksSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatHandle } from '@/lib/format';
import type { AuthUser } from '@/lib/types/auth';

export function AccountSettingsContent({ user }: { user: AuthUser }) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <section className="creator-panel-lg">
        <h2 className="text-base font-semibold tracking-tight text-landing-fg">{t('profile')}</h2>
        <dl className="mt-5 space-y-4 text-sm">
          <div>
            <dt className="font-medium text-landing-muted">{t('name')}</dt>
            <dd className="mt-1 text-landing-fg">{user.name || '—'}</dd>
          </div>
          <div>
            <dt className="font-medium text-landing-muted">{t('username')}</dt>
            <dd className="mt-1 text-landing-fg">{user.username ? formatHandle(user.username) : '—'}</dd>
          </div>
          <div>
            <dt className="font-medium text-landing-muted">{t('email')}</dt>
            <dd className="mt-1 text-landing-fg">{user.email}</dd>
          </div>
          <div>
            <dt className="font-medium text-landing-muted">{t('account_type')}</dt>
            <dd className="mt-1 capitalize text-landing-fg">{user.userType}</dd>
          </div>
        </dl>
      </section>

      <LegalLinksSection />

      <DeleteAccountSection />
    </div>
  );
}
