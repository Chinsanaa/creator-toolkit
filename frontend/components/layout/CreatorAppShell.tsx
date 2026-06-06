'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EarnioLogo } from '@/components/brand/EarnioLogo';
import { CREATOR_SIDEBAR_NAV, isCreatorNavActive } from '@/components/layout/creator-nav';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { formatHandle } from '@/lib/format';

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
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!accountOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setAccountOpen(false);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [accountOpen]);

  function navActive(href: string, match?: (p: string) => boolean) {
    if (match) return match(pathname);
    return isCreatorNavActive(pathname, href);
  }

  const desktopSidebar = (
    <>
      <Link href={homeHref} className="creator-sidebar-logo">
        <EarnioLogo iconClassName="h-7 w-7" />
      </Link>

      <nav className="creator-sidebar-nav" aria-label="Creator navigation">
        {CREATOR_SIDEBAR_NAV.map((item) => {
          const active = navActive(item.href, item.match);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`creator-sidebar-link ${active ? 'creator-sidebar-link-active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="creator-sidebar-footer space-y-1">
        <Link href="/settings" className="creator-sidebar-logout">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Account settings</span>
        </Link>
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
      <aside className="creator-sidebar hidden w-56 shrink-0 flex-col lg:flex">{desktopSidebar}</aside>

      <div
        className={`creator-account-menu lg:hidden ${accountOpen ? 'creator-account-menu-open' : ''}`}
        aria-hidden={!accountOpen}
      >
        <button
          type="button"
          className="creator-account-menu-backdrop"
          aria-label="Close account menu"
          onClick={() => setAccountOpen(false)}
        />
        <aside className="creator-account-menu-panel">
          <div className="flex items-center gap-3 border-b border-sky-100 px-4 py-4">
            <div className="creator-avatar" aria-hidden>
              {(userName?.[0] ?? 'C').toUpperCase()}
            </div>
            <div className="min-w-0">
              {userName ? <p className="truncate text-sm font-medium text-landing-fg">{userName}</p> : null}
              {userHandle ? (
                <p className="truncate text-xs text-landing-muted">{formatHandle(userHandle)}</p>
              ) : null}
            </div>
          </div>
          <div className="space-y-1 p-4">
            <Link
              href="/settings"
              className="creator-sidebar-logout"
              onClick={() => setAccountOpen(false)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Account settings</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setAccountOpen(false);
                onLogout();
              }}
              className="creator-sidebar-logout"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Log out</span>
            </button>
          </div>
        </aside>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="creator-topbar">
          <div className="flex-1" />

          <div className="creator-topbar-actions flex items-center gap-3">
            <NotificationBell tone="creator" />
            {(userName || userHandle) && (
              <Link href="/settings" className="hidden text-right lg:block">
                {userName ? <p className="text-sm font-medium text-landing-fg">{userName}</p> : null}
                {userHandle ? (
                  <p className="text-xs text-landing-muted">{formatHandle(userHandle)}</p>
                ) : null}
              </Link>
            )}
            <button
              type="button"
              className="creator-avatar lg:hidden"
              aria-label="Open account menu"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen(true)}
            >
              {(userName?.[0] ?? 'C').toUpperCase()}
            </button>
          </div>
        </header>

        <main className="creator-main flex-1">{children}</main>

        <nav className="creator-bottom-nav lg:hidden" aria-label="Mobile navigation">
          {CREATOR_SIDEBAR_NAV.map((item) => {
            const active = navActive(item.href, item.match);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`creator-bottom-link ${active ? 'creator-bottom-link-active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <span className="creator-bottom-link-icon">{item.icon}</span>
                <span className="creator-bottom-link-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
