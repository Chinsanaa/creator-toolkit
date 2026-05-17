'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useAuth } from '@/contexts/AuthContext';

const CREATOR_NAV = [
  { href: '/dashboard', label: 'Earnings' },
  { href: '/sponsorships', label: 'Deals' },
  { href: '/wallet', label: 'Wallet' },
  { href: '/platforms', label: 'Platforms' },
];

export function CreatorShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (loading || !user) return;
    if (user.userType === 'sponsor') {
      router.replace('/sponsor/dashboard');
    }
  }, [user, loading, router]);

  return (
    <AppShell
      navItems={CREATOR_NAV}
      homeHref="/dashboard"
      userLabel={user ? `@${user.username}` : undefined}
      onLogout={() => logout()}
      showNotifications
    >
      {children}
    </AppShell>
  );
}
