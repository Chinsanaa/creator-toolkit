import Link from 'next/link';

interface LogoProps {
  href?: string;
  className?: string;
  size?: 'sm' | 'md';
  variant?: 'default' | 'on-dark';
}

export function Logo({
  href = '/',
  className = '',
  size = 'md',
  variant = 'default',
}: LogoProps) {
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';
  const onDark = variant === 'on-dark';

  const mark = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white shadow-md ${
          onDark ? 'bg-white/20 backdrop-blur' : 'bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--accent)]'
        }`}
        aria-hidden
      >
        CT
      </span>
      <span
        className={`font-display font-bold tracking-tight ${textSize} ${
          onDark ? 'text-white' : 'text-[color:var(--foreground)]'
        }`}
      >
        Creator
        <span className={onDark ? 'text-white/90' : 'text-gradient'}>Toolkit</span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="transition opacity-90 hover:opacity-100">
        {mark}
      </Link>
    );
  }

  return mark;
}
