import type { ReactNode } from 'react';

export interface CreatorNavItem {
  href: string;
  label: string;
  labelKey: string;
  icon: ReactNode;
  match?: (pathname: string) => boolean;
}

export function isCreatorNavActive(pathname: string, href: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard';
  if (href === '/sponsorships') {
    return pathname === '/sponsorships' || pathname.startsWith('/sponsorships/');
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function IconHome() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" />
    </svg>
  );
}

function IconExplore() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
    </svg>
  );
}

function IconPlatforms() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  );
}

function IconWallet() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 5h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v9a3 3 0 003 3z" />
    </svg>
  );
}

export const CREATOR_SIDEBAR_NAV: CreatorNavItem[] = [
  { href: '/dashboard', label: 'Home', labelKey: 'home', icon: <IconHome /> },
  {
    href: '/sponsorships',
    label: 'Explore',
    labelKey: 'explore',
    icon: <IconExplore />,
    match: (p) => p === '/sponsorships' || p.startsWith('/sponsorships/'),
  },
  { href: '/platforms', label: 'Platforms', labelKey: 'platforms', icon: <IconPlatforms /> },
  { href: '/wallet', label: 'Wallet', labelKey: 'wallet', icon: <IconWallet /> },
];
