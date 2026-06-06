import { Logo } from '@/components/ui/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col lg:flex-row">
      <aside className="relative hidden overflow-hidden border-r border-[color:var(--border)]/60 lg:flex lg:w-[42%] lg:flex-col lg:justify-between lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color:var(--primary)] via-[color:var(--mesh-2)] to-[color:var(--accent)] opacity-90"
          aria-hidden
        />
        <div className="relative z-10">
          <Logo href="/" variant="on-dark" />
        </div>
        <div className="relative z-10 text-white">
          <p className="font-display text-3xl font-bold leading-tight">
            Your creator economy,
            <br />
            one toolkit.
          </p>
          <p className="mt-4 max-w-sm text-sm text-white/85">
            Earnings, sponsorships, and payouts designed for Mongolian creators and brands.
          </p>
        </div>
        <p className="relative z-10 text-xs text-white/60">© Creator Toolkit</p>
      </aside>

      <div className="flex flex-1 items-center justify-center px-4 py-12 lg:py-16">
        <div className="w-full max-w-md lg:hidden mb-8 text-center">
          <Logo href="/" className="justify-center" />
        </div>
        {children}
      </div>
    </div>
  );
}
