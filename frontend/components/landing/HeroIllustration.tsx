function FloatingCard({
  className,
  metric,
  delay,
}: {
  className?: string;
  metric: string;
  delay?: string;
}) {
  return (
    <div
      className={`landing-float-card absolute flex items-center gap-2 rounded-2xl px-3 py-2.5 ${className ?? ''}`}
      style={delay ? { animationDelay: delay } : undefined}
    >
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <span className="absolute h-9 w-9 rounded-full bg-violet-400/15" />
        <span className="absolute h-6 w-6 rounded-full bg-violet-400/25" />
        <span className="relative h-3 w-3 rounded-full bg-violet-500/90" />
      </div>
      <div className="flex items-center gap-1 text-sm font-semibold text-landing-fg">
        <svg className="h-3.5 w-3.5 fill-landing-fg" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        {metric}
      </div>
    </div>
  );
}

export function HeroIllustration({
  metrics = ['2.4M', '890K', '₮12M'],
}: {
  metrics?: [string, string, string];
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px] lg:max-w-none">
      {/* Light rays */}
      <div className="landing-rays pointer-events-none absolute inset-0" aria-hidden />

      {/* Orbital paths */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-white/60"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden
      >
        <ellipse cx="200" cy="200" rx="160" ry="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
        <ellipse
          cx="200"
          cy="200"
          rx="120"
          ry="70"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 6"
          transform="rotate(-15 200 200)"
        />
      </svg>

      <FloatingCard className="left-[2%] top-[18%] landing-float" metric={metrics[0]} delay="0s" />
      <FloatingCard className="right-[0%] top-[8%] landing-float" metric={metrics[1]} delay="0.5s" />
      <FloatingCard className="bottom-[28%] left-[8%] landing-float" metric={metrics[2]} delay="1s" />

      {/* Paper plane */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg
          className="h-48 w-48 drop-shadow-2xl sm:h-56 sm:w-56 lg:h-64 lg:w-64"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="#cbd5e1" opacity="0.5" />
            </pattern>
            <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
          </defs>
          <path
            d="M20 100 L180 30 L120 170 L95 115 Z"
            fill="url(#planeGrad)"
            stroke="#e2e8f0"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M95 115 L120 170 L75 130 Z" fill="url(#dots)" opacity="0.6" />
          <path
            d="M20 100 L180 30 L120 170 L95 115 Z"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
}
