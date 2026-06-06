import Link from 'next/link';
import { DOCS } from '@/lib/docs/catalog';

export const metadata = {
  title: 'Docs | Creator Toolkit',
  description: 'Deployment, QA, and launch guides for Creator Toolkit.',
};

export default function DocsIndexPage() {
  return (
    <div className="page-enter">
      <h1 className="text-3xl font-semibold text-foreground">Documentation</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Launch guides and checklists for deploying and shipping Creator Toolkit. Same content as
        the repo markdown files, formatted for the web.
      </p>

      <ul className="mt-10 space-y-4">
        {DOCS.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/docs/${doc.slug}`}
              className="block rounded-2xl border border-border bg-card p-6 transition hover:border-primary/30 hover:shadow-sm dark:border-border dark:bg-background dark:hover:border-primary/40"
            >
              <h2 className="text-lg font-medium text-foreground">{doc.title}</h2>
              <p className="mt-2 text-sm text-muted">{doc.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-primary dark:text-primary">
                Read guide →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
