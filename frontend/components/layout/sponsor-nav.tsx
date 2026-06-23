import type { CreatorNavItem } from '@/components/layout/creator-nav';

function IconHome() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" />
    </svg>
  );
}

function IconCampaigns() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 11l18-7-7 18-2-8-9-3z" />
    </svg>
  );
}

export const SPONSOR_SIDEBAR_NAV: CreatorNavItem[] = [
  { href: '/sponsor/dashboard', label: 'Home', labelKey: 'home', icon: <IconHome /> },
  {
    href: '/sponsor/campaigns',
    label: 'Campaigns',
    labelKey: 'campaigns',
    icon: <IconCampaigns />,
    match: (p) => p === '/sponsor/campaigns' || p.startsWith('/sponsor/campaigns/'),
  },
];

export function isSponsorNavActive(pathname: string, href: string): boolean {
  if (href === '/sponsor/dashboard') return pathname === '/sponsor/dashboard';
  return pathname === href || pathname.startsWith(`${href}/`);
}
