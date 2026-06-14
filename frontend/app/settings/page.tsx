'use client';

import { CreatorPageHeader } from '@/components/creator/CreatorPageHeader';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { AccountSettingsContent } from '@/components/settings/AccountSettingsContent';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();

  if (loading || !user) {
    return (
      <DashboardShell>
        <p className="text-sm text-landing-muted">{t('loading')}</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <CreatorPageHeader
        title={t('settings_title')}
        subtitle={t('settings_subtitle')}
      />
      <AccountSettingsContent user={user} />
    </DashboardShell>
  );
}
