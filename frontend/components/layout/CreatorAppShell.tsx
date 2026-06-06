'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CREATOR_SIDEBAR_NAV, isCreatorNavActive } from '@/components/layout/creator-nav';
import { NotificationBell } from '@/components/notifications/NotificationBell';

function LogoMark() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 12L21 4L14 21L11 13L3 12Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface CreatorAppShellProps {
  children: React.ReactNode;
  homeHref?: string;
  userName?: string;
  userHandle?: string;
  onLogout: () => void;
}

export function CreatorAppShell({
  children,
  homeHref = '/dashboard',
  userName,
  userHandle,
  onLogout,
}: CreatorAppShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function navActive(href: string, match?: (p: string) => boolean) {
    if (match) return match(pathname);
    return isCreatorNavActive(pathname, href);
  }

  const sidebar = (
    <>
      <Link href={homeHref} className="creator-sidebar-logo" onClick={() => setMobileOpen(false)}>
        <LogoMark />
        <span>Creator Toolkit</span>
      </Link>

      <nav className="creator-sidebar-nav">
        {CREATOR_SIDEBAR_NAV.map((item) => {
          const active = navActive(item.href, item.match);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`creator-sidebar-link ${active ? 'creator-sidebar-link-active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="creator-sidebar-footer">
        <button type="button" onClick={onLogout} className="creator-sidebar-logout">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Log out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="creator-app flex min-h-full">
      <aside className="creator-sidebar hidden w-56 shrink-0 flex-col lg:flex">{sidebar}</aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="creator-sidebar relative z-10 flex h-full w-64 flex-col shadow-xl">{sidebar}</aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="creator-topbar">
          <button
            type="button"
            className="creator-icon-btn lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <NotificationBell tone="creator" />
            {(userName || userHandle) && (
              <div className="hidden text-right sm:block">
                {userName ? <p className="text-sm font-medium text-landing-fg">{userName}</p> : null}
                {userHandle ? <p className="text-xs text-landing-muted">{userHandle}</p> : null}
              </div>
            )}
            <div className="creator-avatar" aria-hidden>
              {(userName?.[0] ?? 'C').toUpperCase()}
            </div>
          </div>
        </header>

        <main className="creator-main page-enter flex-1">{children}</main>

        <nav className="creator-bottom-nav lg:hidden" aria-label="Mobile navigation">
          {CREATOR_SIDEBAR_NAV.map((item) => {
            const active = navActive(item.href, item.match);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`creator-bottom-link ${active ? 'creator-bottom-link-active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
