'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EARNIO_SLOGAN } from '@/lib/brand/earnio';

export { EARNIO_SLOGAN };

type EarnioLogoProps = {
  variant?: 'icon' | 'wordmark' | 'full';
  showSlogan?: boolean;
  className?: string;
  iconClassName?: string;
  href?: string;
};

function EarnioMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <title>Earnio Logo Mark</title>
      <rect x="8" y="63" width="25" height="25" fill="currentColor" opacity="1" />
      <rect x="35.5" y="35.5" width="25" height="25" fill="currentColor" opacity="0.85" />
      <rect x="63" y="8" width="25" height="25" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function EarnioLogo({
  variant = 'full',
  showSlogan = false,
  className = '',
  iconClassName = 'h-5 w-5',
  href,
}: EarnioLogoProps) {
  if (variant === 'icon') {
    const mark = (
      <EarnioMark className={`${iconClassName} text-[#2E5BFF]`} />
    );

    return href ? (
      <Link href={href} className="inline-flex shrink-0">
        {mark}
      </Link>
    ) : (
      mark
    );
  }

  if (variant === 'wordmark') {
    const wordmark = (
      <span className={`text-[15px] font-semibold tracking-tight text-[#0B1220] dark:text-white ${className}`}>
        Earnio
      </span>
    );

    return href ? (
      <Link href={href}>
        {wordmark}
      </Link>
    ) : (
      wordmark
    );
  }

  // Full logo with icon and text
  const full = (
    <div className={`flex items-center gap-2.5 text-[#0B1220] dark:text-white ${className}`}>
      <EarnioMark className={`${iconClassName} text-[#2E5BFF]`} />
      <div className="min-w-0">
        <span className="block text-[15px] font-semibold tracking-tight">Earnio</span>
        {showSlogan ? (
          <p className="truncate text-[11px] font-medium text-[#5A6A85] dark:text-[#AEB9CC]">
            {EARNIO_SLOGAN}
          </p>
        ) : null}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="inline-flex">
      {full}
    </Link>
  ) : (
    full
  );
}
