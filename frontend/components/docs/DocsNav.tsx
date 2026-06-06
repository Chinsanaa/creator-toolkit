'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DOCS } from '@/lib/docs/catalog';

export function DocsNav() {
  const pathname = usePathname();
  const activeSlug = pathname.startsWith('/docs/') ? pathname.replace('/docs/', '') : undefined;

  return (
    <nav className="flex flex-col gap-1">
      {DOCS.map((doc) => {
        const active = doc.slug === activeSlug;
        return (
          <Link
            key={doc.slug}
            href={`/docs/${doc.slug}`}
            className={`rounded-lg px-3 py-2.5 text-sm transition ${
              active
                ? 'bg-violet-50 font-medium text-violet-800 dark:bg-violet-950/50 dark:text-violet-200'
                : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'
            }`}
          >
            {doc.title}
          </Link>
        );
      })}
    </nav>
  );
}
