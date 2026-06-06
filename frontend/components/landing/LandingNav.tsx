import Link from 'next/link';
import type { LandingContent, LandingNavItem } from '@/lib/landing/content';

function ChevronDown() {
  return (
    <svg className="h-3.5 w-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

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

function NavItemLink({ item, showChevron }: { item: LandingNavItem; showChevron: boolean }) {
  const className =
    'flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 text-[14px] font-medium text-landing-fg/80 transition hover:text-landing-fg';

  if (item.type === 'scroll') {
    return (
      <a href={item.href} className={className}>
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.label}
      {showChevron ? <ChevronDown /> : null}
    </Link>
  );
}

export function LandingNav({ content }: { content: LandingContent }) {
  return (
    <header className="landing-nav sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link href={content.homeHref} className="flex shrink-0 items-center gap-2.5 text-landing-fg">
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-tight">Creator Toolkit</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {content.navItems.map((item) => (
            <NavItemLink key={item.href} item={item} showChevron={content.showNavChevron} />
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href={content.switchAudience.href}
            className="hidden items-center gap-1.5 text-[14px] font-medium text-landing-fg/80 transition hover:text-landing-fg sm:inline-flex"
          >
            {content.switchAudience.label}
            <ExternalIcon />
          </Link>
          <Link
            href={content.loginHref}
            className="hidden text-[14px] font-medium text-landing-fg/80 transition hover:text-landing-fg sm:inline"
          >
            Log in
          </Link>
          <Link href={content.signupHref} className="landing-btn-dark px-5 py-2.5 text-[14px]">
            {content.signupCta}
          </Link>
        </div>
      </div>
    </header>
  );
}
