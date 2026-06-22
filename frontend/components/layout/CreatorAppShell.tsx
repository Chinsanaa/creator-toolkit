'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { EarnioLogo } from '@/components/brand/EarnioLogo';
import { CREATOR_SIDEBAR_NAV, isCreatorNavActive } from '@/components/layout/creator-nav';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/lib/theme/ThemeProvider';
import { formatHandle } from '@/lib/format';

interface CreatorAppShellProps {
  children: React.ReactNode;
  homeHref?: string;
  userName?: string;
  userHandle?: string;
  onLogout: () => void;
}

function SettingsIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}

function ThemeIcon({ isDark }: { isDark: boolean }) {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      {isDark ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      )}
    </svg>
  );
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
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { theme, ready, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!accountOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setAccountOpen(false);
    }
    function onPointerDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [accountOpen]);

  function navActive(href: string, match?: (p: string) => boolean) {
    if (match) return match(pathname);
    return isCreatorNavActive(pathname, href);
  }

  return (
    <div className="creator-app">
      <div className="creator-app-column flex min-w-0 flex-1 flex-col">
        <header className="creator-topbar">
          <Link href={homeHref} className="creator-topbar-logo">
            <EarnioLogo iconClassName="h-7 w-7" />
          </Link>

          <nav className="creator-topbar-nav" aria-label="Creator navigation">
            {CREATOR_SIDEBAR_NAV.map((item) => {
              const active = navActive(item.href, item.match);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`creator-topbar-nav-link ${active ? 'creator-topbar-nav-link-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </nav>

          <div className="creator-topbar-actions">
            <LanguageSwitcher />
            <NotificationBell tone="creator" />

            <div className="creator-profile" ref={menuRef}>
              <button
                type="button"
                className="creator-profile-trigger"
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                aria-label={accountOpen ? t('close_menu') : t('open_menu')}
                onClick={() => setAccountOpen((o) => !o)}
              >
                <span className="creator-avatar" aria-hidden>
                  {(userName?.[0] ?? 'C').toUpperCase()}
                </span>
                {(userName || userHandle) && (
                  <span className="hidden text-right md:block">
                    {userName ? <p className="text-sm font-medium text-landing-fg">{userName}</p> : null}
                    {userHandle ? (
                      <p className="text-xs text-landing-muted">{formatHandle(userHandle)}</p>
                    ) : null}
                  </span>
                )}
              </button>

              {accountOpen && (
                <div className="creator-profile-dropdown" role="menu">
                  {(userName || userHandle) && (
                    <div className="creator-profile-dropdown-header">
                      {userName ? <p className="truncate text-sm font-medium text-landing-fg">{userName}</p> : null}
                      {userHandle ? (
                        <p className="truncate text-xs text-landing-muted">{formatHandle(userHandle)}</p>
                      ) : null}
                    </div>
                  )}

                  <Link
                    href="/settings"
                    role="menuitem"
                    className="creator-sidebar-logout"
                    onClick={() => setAccountOpen(false)}
                  >
                    <SettingsIcon />
                    <span>{t('account_settings')}</span>
                  </Link>

                  <button
                    type="button"
                    role="menuitem"
                    className="creator-sidebar-logout"
                    onClick={toggleTheme}
                    disabled={!ready}
                    aria-label={isDark ? t('switch_to_light') : t('switch_to_dark')}
                  >
                    <ThemeIcon isDark={isDark} />
                    <span className="flex-1 text-left">{isDark ? t('switch_to_light') : t('switch_to_dark')}</span>
                    <span className={`creator-theme-switch ${isDark ? 'creator-theme-switch-on' : ''}`} aria-hidden>
                      <span className="creator-theme-switch-knob" />
                    </span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setAccountOpen(false);
                      onLogout();
                    }}
                    className="creator-sidebar-logout"
                  >
                    <LogoutIcon />
                    <span>{t('log_out')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="creator-main creator-app-shell-content flex-1">{children}</main>

        <nav className="creator-bottom-nav" aria-label="Mobile navigation">
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
                <span className="creator-bottom-link-label">{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
