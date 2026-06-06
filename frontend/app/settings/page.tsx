'use client';

import { CreatorPageHeader } from '@/components/creator/CreatorPageHeader';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { AccountSettingsContent } from '@/components/settings/AccountSettingsContent';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
      <DashboardShell>
        <p className="text-sm text-landing-muted">Loading…</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <CreatorPageHeader
        title="Account settings"
        subtitle="Manage your profile and account preferences."
      />
      <AccountSettingsContent user={user} />
    </DashboardShell>
  );
}
