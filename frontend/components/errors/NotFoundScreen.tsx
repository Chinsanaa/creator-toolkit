import Link from 'next/link';
import { EarnioLogo } from '@/components/brand/EarnioLogo';

function NotFoundIllustration() {
  return (
    <div className="not-found-illustration relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[320px]">
      <div className="landing-rays pointer-events-none absolute inset-0 rounded-full" aria-hidden />

      <svg
        className="absolute inset-0 h-full w-full text-sky-200/80"
        viewBox="0 0 320 320"
        fill="none"
        aria-hidden
      >
        <circle cx="160" cy="160" r="118" stroke="currentColor" strokeWidth="1" strokeDasharray="6 10" />
        <circle cx="160" cy="160" r="78" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" opacity="0.7" />
        <path
          d="M48 200 Q160 80 272 128"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          opacity="0.5"
        />
      </svg>

      <div className="not-found-plane absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
        <svg className="h-16 w-16 drop-shadow-lg sm:h-20 sm:w-20" viewBox="0 0 64 64" fill="none" aria-hidden>
          <path
            d="M8 40L56 16L40 52L34 36L8 40Z"
            fill="var(--landing-fg)"
            stroke="var(--landing-fg)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="not-found-pin landing-float-card absolute bottom-[18%] right-[12%] rounded-2xl px-3 py-2 text-xs font-semibold text-landing-fg shadow-md">
        ?
      </div>
    </div>
  );
}

export function NotFoundScreen({
  title = 'Page not found',
  description = "We couldn't find that page. The link may be broken, or the address might be misspelled.",
  showNav = true,
}: {
  title?: string;
  description?: string;
  showNav?: boolean;
}) {
  return (
    <div className="landing-page not-found-page flex min-h-full flex-col">
      {showNav ? (
        <header className="landing-nav sticky top-0 z-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
            <Link href="/" className="shrink-0">
              <EarnioLogo iconClassName="h-7 w-7" />
            </Link>
            <Link href="/login/creator" className="text-[14px] font-medium text-landing-fg/80 transition hover:text-landing-fg">
              Log in
            </Link>
          </div>
        </header>
      ) : null}

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 lg:px-10">
        <div className="not-found-card w-full max-w-lg text-center">
          <p className="not-found-code font-display text-[5.5rem] font-semibold leading-none tracking-tighter text-landing-fg/10 sm:text-[7rem]">
            404
          </p>

          <NotFoundIllustration />

          <h1 className="mt-8 text-3xl font-semibold tracking-tight text-landing-fg sm:text-4xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-landing-muted sm:text-lg">
            {description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="landing-btn-dark px-7 py-3 text-[15px]">
              Back to home
            </Link>
            <Link href="/brands" className="landing-btn-light px-7 py-3 text-[15px]">
              For brands
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
