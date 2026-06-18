'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function SponsorShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (loading || !user) return;
    if (user.userType !== 'sponsor') {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  const SPONSOR_NAV = [
    { href: '/sponsor/dashboard', label: t('home') },
    { href: '/sponsor/campaigns', label: t('campaigns') },
    { href: '/sponsor/settings', label: t('settings_title') },
  ];

  return (
    <AppShell
      navItems={SPONSOR_NAV}
      homeHref="/sponsor/dashboard"
      badge={
        <span className="rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent-soft)] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-[color:var(--accent)]">
          {t('sponsor')}
        </span>
      }
      userLabel={user?.name}
      onLogout={() => logout()}
    >
      {children}
    </AppShell>
  );
}
