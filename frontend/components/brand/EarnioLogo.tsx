'use client';

import { EARNIO_SLOGAN } from '@/lib/brand/earnio';

export { EARNIO_SLOGAN };

type EarnioLogoProps = {
  variant?: 'icon' | 'wordmark' | 'full';
  showSlogan?: boolean;
  className?: string;
  iconClassName?: string;
};

function EarnioPlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
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

export function EarnioLogo({
  variant = 'full',
  showSlogan = false,
  className = '',
  iconClassName = 'h-5 w-5',
}: EarnioLogoProps) {
  if (variant === 'icon') {
    return <EarnioPlaneIcon className={iconClassName} />;
  }

  if (variant === 'wordmark') {
    return (
      <span className={`text-[15px] font-semibold tracking-tight text-landing-fg ${className}`}>
        Earnio
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 text-landing-fg ${className}`}>
      <EarnioPlaneIcon className={iconClassName} />
      <div className="min-w-0">
        <span className="text-[15px] font-semibold tracking-tight">Earnio</span>
        {showSlogan ? (
          <p className="truncate text-[11px] font-medium text-landing-muted">{EARNIO_SLOGAN}</p>
        ) : null}
      </div>
    </div>
  );
}
