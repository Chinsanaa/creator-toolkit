'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SponsorShell } from '@/components/sponsor/SponsorShell';
import { AccountSettingsContent } from '@/components/settings/AccountSettingsContent';
import { CompanyProfileSection } from '@/components/sponsor/CompanyProfileSection';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SponsorSettingsPage() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?next=/sponsor/settings');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <SponsorShell>
        <p className="text-sm text-[color:var(--muted-foreground)]">{t('loading')}</p>
      </SponsorShell>
    );
  }

  return (
    <SponsorShell>
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
            {t('settings_title')}
          </h1>
          <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
            {t('settings_subtitle')}
          </p>
        </header>
        <div className="space-y-6">
          <CompanyProfileSection />
          <AccountSettingsContent user={user} />
        </div>
      </div>
    </SponsorShell>
  );
}
