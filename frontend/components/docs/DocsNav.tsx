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
                ? 'bg-primary-subtle font-medium text-primary dark:bg-primary-subtle dark:text-primary'
                : 'text-muted hover:bg-surface dark:text-muted-foreground dark:hover:bg-surface'
            }`}
          >
            {doc.title}
          </Link>
        );
      })}
    </nav>
  );
}
