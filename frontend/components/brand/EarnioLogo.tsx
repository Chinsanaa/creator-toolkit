'use client';

import { EARNIO_SLOGAN } from '@/lib/brand/earnio';

export { EARNIO_SLOGAN };

type EarnioLogoProps = {
  variant?: 'icon' | 'wordmark' | 'full';
  showSlogan?: boolean;
  className?: string;
  iconClassName?: string;
};

function EarnioMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden>
      <path d="M26 64 L44 47 L57 56 L72 31" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M57 31 H72 V46" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="26" cy="64" r="5.4" fill="currentColor"/>
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
    return <EarnioMark className={iconClassName} />;
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
      <EarnioMark className={iconClassName} />
      <div className="min-w-0">
        <span className="text-[15px] font-semibold tracking-tight">Earnio</span>
        {showSlogan ? (
          <p className="truncate text-[11px] font-medium text-landing-muted">{EARNIO_SLOGAN}</p>
        ) : null}
      </div>
    </div>
  );
}
