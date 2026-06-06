import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { DocsNav } from '@/components/docs/DocsNav';

export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-semibold tracking-wide text-violet-600 hover:text-violet-700"
            >
              Creator Toolkit
            </Link>
            <span className="hidden text-zinc-300 dark:text-zinc-700 sm:inline">/</span>
            <Link
              href="/docs"
              className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 sm:inline"
            >
              Docs
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" className="btn-secondary min-h-10 px-3 text-sm">
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 lg:flex-row lg:py-10">
        <aside className="lg:w-56 lg:shrink-0">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Guides
          </p>
          <DocsNav />
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
