'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useAuth } from '@/contexts/AuthContext';

const SPONSOR_NAV = [
  { href: '/sponsor/dashboard', label: 'Dashboard' },
  { href: '/sponsor/campaigns', label: 'Campaigns' },
];

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
    <AppShell
      navItems={SPONSOR_NAV}
      homeHref="/sponsor/dashboard"
      badge={
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
          Sponsor
        </span>
      }
      userLabel={user?.name}
      onLogout={() => logout()}
    >
      {children}
    </AppShell>
  );
}
