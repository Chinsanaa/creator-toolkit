'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CreatorAppShell } from '@/components/layout/CreatorAppShell';
import { EmailVerificationPrompt } from '@/components/settings/EmailVerificationPrompt';
import { SPONSOR_SIDEBAR_NAV, isSponsorNavActive } from '@/components/layout/sponsor-nav';
import { useAuth } from '@/contexts/AuthContext';

export function SponsorShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (loading || !user) return;
    if (user.userType !== 'sponsor') {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <CreatorAppShell
      homeHref="/sponsor/dashboard"
      navItems={SPONSOR_SIDEBAR_NAV}
      isNavActive={isSponsorNavActive}
      settingsHref="/sponsor/settings"
      userName={user?.name}
      onLogout={() => logout()}
    >
      <EmailVerificationPrompt />
      {children}
    </CreatorAppShell>
  );
}
