'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
    <div className="min-h-full bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <nav className="flex items-center gap-6">
            <Link href="/sponsor/dashboard" className="text-sm font-semibold text-violet-600">
              Creator Toolkit
            </Link>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
              Sponsor
            </span>
            <Link
              href="/sponsor/dashboard"
              className="hidden text-sm text-zinc-600 hover:text-zinc-900 sm:inline dark:text-zinc-400"
            >
              Dashboard
            </Link>
            <Link
              href="/sponsor/campaigns"
              className="hidden text-sm text-zinc-600 hover:text-zinc-900 sm:inline dark:text-zinc-400"
            >
              Campaigns
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {user && (
              <span className="hidden text-sm text-zinc-600 sm:inline dark:text-zinc-400">
                {user.name}
              </span>
            )}
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300"
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
