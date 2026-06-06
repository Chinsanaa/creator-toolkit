'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CreatorAppShell } from '@/components/layout/CreatorAppShell';
import { useAuth } from '@/contexts/AuthContext';

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
    <CreatorAppShell
      userName={user?.name}
      userHandle={user?.username}
      onLogout={() => logout()}
    >
      {children}
    </CreatorAppShell>
  );
}
