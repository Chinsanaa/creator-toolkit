'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SponsorShell } from '@/components/sponsor/SponsorShell';
import { AccountSettingsContent } from '@/components/settings/AccountSettingsContent';
import { CompanyProfileSection } from '@/components/sponsor/CompanyProfileSection';
import { useAuth } from '@/contexts/AuthContext';

export default function SponsorSettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?next=/sponsor/settings');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <SponsorShell>
        <p className="text-sm text-[color:var(--muted-foreground)]">Loading…</p>
      </SponsorShell>
    );
  }

  return (
    <SponsorShell>
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Account settings
          </h1>
          <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
            Manage your profile and account preferences.
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
