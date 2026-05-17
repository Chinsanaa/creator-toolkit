'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { useAuth } from '@/contexts/AuthContext';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (loading || !user) return;
    if (user.userType === 'sponsor') {
      router.replace('/sponsor/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-full bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-semibold text-violet-600">
              Creator Toolkit
            </Link>
            <Link
              href="/dashboard"
              className="hidden text-sm text-zinc-600 hover:text-zinc-900 sm:inline dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Earnings
            </Link>
            <Link
              href="/sponsorships"
              className="hidden text-sm text-zinc-600 hover:text-zinc-900 sm:inline dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Sponsorships
            </Link>
            <Link
              href="/wallet"
              className="hidden text-sm text-zinc-600 hover:text-zinc-900 sm:inline dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Wallet
            </Link>
            <Link
              href="/platforms"
              className="hidden text-sm text-zinc-600 hover:text-zinc-900 sm:inline dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Platforms
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <NotificationBell />
            {user && (
              <span className="hidden text-sm text-zinc-600 sm:inline dark:text-zinc-400">
                @{user.username}
              </span>
            )}
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
