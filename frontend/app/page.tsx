import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

const FEATURES = [
  {
    title: 'Unified earnings',
    description: 'TikTok, YouTube, and Instagram revenue in one live dashboard.',
    accent: 'from-rose-500 to-pink-500',
  },
  {
    title: 'Brand deals',
    description: 'Browse sponsorships, apply in one tap, track status in MNT.',
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Fast payouts',
    description: 'Wallet, Mongolian banks, and transparent fees built in.',
    accent: 'from-violet-500 to-fuchsia-500',
  },
] as const;

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-[color:var(--border)]/50 bg-[color:var(--card)]/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Logo href="/" />
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link href="/docs" className="btn-secondary hidden min-h-11 sm:inline-flex">
              Docs
            </Link>
            <Link href="/login" className="btn-secondary min-h-11">
              Sign in
            </Link>
            <Link href="/signup" className="btn-primary w-auto px-5 sm:min-w-[140px]">
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:py-24">
        <section className="relative">
          <div
            className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[color:var(--primary)]/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-10 top-20 h-48 w-48 rounded-full bg-[color:var(--accent)]/25 blur-3xl"
            aria-hidden
          />

          <p className="badge-pill">Mongolian creator monetization</p>
          <h1 className="font-display mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-[color:var(--foreground)] sm:text-6xl">
            One dashboard for{' '}
            <span className="text-gradient">TikTok, YouTube</span>
            <br />
            and brand deals.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[color:var(--muted-foreground)]">
            Track earnings, land sponsorships, and get paid in MNT. Built for Mongolian Gen Z
            creators who move fast.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/signup" className="btn-primary w-auto px-8 sm:min-w-[200px]">
              Create free account
            </Link>
            <Link href="/login" className="btn-secondary w-auto px-6 sm:min-w-[160px]">
              Sign in
            </Link>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="glass-panel group p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${f.accent}`}
                  aria-hidden
                />
                <h2 className="font-display text-lg font-bold text-[color:var(--foreground)]">
                  {f.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                  {f.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--accent)] p-8 text-white shadow-[var(--shadow-glow)] sm:p-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready to monetize smarter?</h2>
          <p className="mt-2 max-w-lg text-white/90">
            Join creators and brands already using Creator Toolkit to close deals in MNT.
          </p>
          <Link
            href="/signup/creator"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-[color:var(--primary)] transition hover:bg-white/95"
          >
            Start as a creator
          </Link>
        </section>
      </main>
    </div>
  );
}
