'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export interface NavItem {
  href: string;
  label: string;
}

interface AppShellProps {
  children: React.ReactNode;
  navItems: NavItem[];
  homeHref: string;
  badge?: React.ReactNode;
  userLabel?: string;
  onLogout: () => void;
  showNotifications?: boolean;
}

function isActive(pathname: string, href: string): boolean {
  if (href === '/dashboard' || href === '/sponsor/dashboard') {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({
  children,
  navItems,
  homeHref,
  badge,
  userLabel,
  onLogout,
  showNotifications = false,
}: AppShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (href: string) =>
    `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
      isActive(pathname, href)
        ? 'bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300'
        : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900'
    }`;

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-300 md:hidden dark:border-zinc-700"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? (
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <Link href={homeHref} className="truncate text-sm font-semibold text-violet-600">
              Creator Toolkit
            </Link>
            {badge}
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {showNotifications && <NotificationBell />}
            {userLabel && (
              <span className="hidden max-w-[120px] truncate text-sm text-zinc-600 lg:inline dark:text-zinc-400">
                {userLabel}
              </span>
            )}
            <button
              type="button"
              onClick={onLogout}
              className="hidden min-h-11 rounded-lg border border-zinc-300 px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 sm:inline-flex sm:items-center dark:border-zinc-700 dark:text-zinc-300"
            >
              Log out
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-zinc-100 px-4 py-3 md:hidden dark:border-zinc-800">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(item.href)}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-left text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
            >
              Log out
            </button>
          </nav>
        )}
      </header>

      <main className="page-enter mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-24 md:py-8 md:pb-8">
        {children}
      </main>

      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur md:hidden dark:border-zinc-800 dark:bg-zinc-950/95"
        aria-label="Mobile navigation"
      >
        <div className="mx-auto flex max-w-lg justify-around px-2 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-12 min-w-12 flex-col items-center justify-center rounded-lg px-2 text-[10px] font-medium ${
                isActive(pathname, item.href)
                  ? 'text-violet-600'
                  : 'text-zinc-500'
              }`}
            >
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

