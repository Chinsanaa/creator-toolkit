import Link from 'next/link';
import { DOCS } from '@/lib/docs/catalog';

export const metadata = {
  title: 'Docs | Creator Toolkit',
  description: 'Deployment, QA, and launch guides for Creator Toolkit.',
};

export default function DocsIndexPage() {
  return (
    <div className="page-enter">
      <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Documentation</h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Launch guides and checklists for deploying and shipping Creator Toolkit. Same content as
        the repo markdown files, formatted for the web.
      </p>

      <ul className="mt-10 space-y-4">
        {DOCS.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/docs/${doc.slug}`}
              className="block rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-violet-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-violet-800"
            >
              <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">{doc.title}</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{doc.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-violet-600 dark:text-violet-400">
                Read guide →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
