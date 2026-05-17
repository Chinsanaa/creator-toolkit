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
              href="/login"
              className="rounded-lg px-3 py-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-violet-600 px-3 py-2 font-medium text-white hover:bg-violet-700"
            >
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
          <Link
            href="/signup"
            className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-medium text-white hover:bg-violet-700"
          >
            Create free account
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Sign in
          </Link>
        </div>
      </main>
    </div>
  );
}

