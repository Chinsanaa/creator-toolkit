'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { EarnioLogo } from '@/components/brand/EarnioLogo';
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
    `block cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium transition ${
      isActive(pathname, href) ? 'nav-active' : 'nav-inactive'
    }`;

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border md:hidden"
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
            <Link href={homeHref} className="truncate">
              <EarnioLogo iconClassName="h-7 w-7" />
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
              <span className="hidden max-w-[120px] truncate text-sm text-muted lg:inline">
                {userLabel}
              </span>
            )}
            <button
              type="button"
              onClick={onLogout}
              className="btn-secondary hidden min-h-11 sm:inline-flex"
            >
              Log out
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-border px-5 py-3 md:hidden">
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
              className="mt-2 w-full cursor-pointer rounded-xl border border-border px-3 py-2.5 text-left text-sm font-medium text-foreground"
            >
              Log out
            </button>
          </nav>
        )}
      </header>

      <main className="page-enter mx-auto w-full max-w-6xl flex-1 px-5 py-6 pb-24 md:py-8 md:pb-8">
        {children}
      </main>

      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/60 bg-card/90 backdrop-blur-md md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="mx-auto flex max-w-lg justify-around px-2 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-12 min-w-12 cursor-pointer flex-col items-center justify-center rounded-xl px-2 text-[10px] font-medium transition ${
                isActive(pathname, item.href) ? 'text-primary' : 'text-muted'
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
