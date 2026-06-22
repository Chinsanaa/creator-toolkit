'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

function SparkleMark() {
  return (
    <svg className="h-8 w-8 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 1.5l1.7 7.2 7.3 1.8-7.3 1.8-1.7 7.2-1.7-7.2-7.3-1.8 7.3-1.8z" />
    </svg>
  );
}

export function NotFoundScreen({
  title,
  description,
  showNav = true,
}: {
  title?: string;
  description?: string;
  showNav?: boolean;
}) {
  const { t } = useLanguage();

  const resolvedTitle = title ?? t('not_found_title');
  const resolvedDescription = description ?? t('not_found_subtitle');

  return (
    <div className="not-found-page flex min-h-full flex-col bg-primary text-primary-foreground">
      {showNav ? (
        <header className="relative z-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
            <Link href="/" className="shrink-0 text-[15px] font-semibold tracking-tight text-primary-foreground">
              Earnio
            </Link>
            <Link
              href="/login/creator"
              className="text-[14px] font-medium text-primary-foreground/80 transition hover:text-primary-foreground"
            >
              {t('log_in')}
            </Link>
          </div>
        </header>
      ) : null}

      <main className="not-found-hero relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16 lg:px-10">
        <p className="not-found-ghost-number" aria-hidden>
          404
        </p>

        <div className="not-found-card relative z-10 w-full max-w-lg text-center">
          <SparkleMark />

          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{resolvedTitle}</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            {resolvedDescription}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="not-found-cta px-7 py-3 text-[15px] font-medium">
              {t('back_to_home')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
