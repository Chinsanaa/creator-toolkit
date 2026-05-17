import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <span className="text-sm font-semibold tracking-wide text-violet-600">
            Creator Toolkit
          </span>
          <nav className="flex items-center gap-3 text-sm">
            <Link
              href="/docs"
              className="hidden min-h-11 items-center px-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 sm:inline-flex"
            >
              Docs
            </Link>
            <Link href="/login" className="btn-secondary min-h-11 px-4">
              Sign in
            </Link>
            <Link href="/signup" className="btn-primary min-h-11 w-auto px-4">
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-20">
        <p className="text-sm font-medium uppercase tracking-wide text-violet-600">
          Mongolian creator monetization
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          One dashboard for TikTok, YouTube, and brand deals.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Track earnings, find sponsorships, and get paid in MNT. Built for Mongolian Gen Z
          creators.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/signup" className="btn-primary w-auto px-6 sm:min-w-[180px]">
            Create free account
          </Link>
          <Link href="/login" className="btn-secondary w-auto px-6 sm:min-w-[140px]">
            Sign in
          </Link>
        </div>
      </main>
    </div>
  );
}

