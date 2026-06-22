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
        <div className="mt-5 flex items-center gap-4">
          <span className="creator-avatar creator-avatar-lg" aria-hidden>
            {(user.name?.[0] ?? user.username?.[0] ?? 'C').toUpperCase()}
          </span>
          <div>
            <p className="text-lg font-semibold tracking-tight text-landing-fg">{user.name || '—'}</p>
            <p className="text-sm text-landing-muted">
              {user.username ? formatHandle(user.username) : '—'} · {t('account_type')}: {' '}
              <span className="capitalize">{user.userType}</span>
            </p>
          </div>
        </div>
        <dl className="mt-6 space-y-4 border-t border-sky-100 pt-5 text-sm">
          <div>
            <dt className="font-medium text-landing-muted">{t('email')}</dt>
            <dd className="mt-1 text-landing-fg">{user.email}</dd>
          </div>
        </dl>
      </section>

      <LegalLinksSection />

      <DeleteAccountSection />
    </div>
  );
}
