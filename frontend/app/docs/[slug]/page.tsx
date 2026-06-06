import { notFound } from 'next/navigation';
import { MarkdownView } from '@/components/docs/MarkdownView';
import { DOCS, getDoc } from '@/lib/docs/catalog';
import { loadDocMarkdown } from '@/lib/docs/load';

export function generateStaticParams() {
  return DOCS.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return { title: 'Docs | Earnio' };
  return {
    title: `${doc.title} | Earnio`,
    description: doc.description,
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const raw = loadDocMarkdown(slug);
  const content = raw.replace(/^#\s+[^\n]+\n+/, '');

  return (
    <>
      <div className="mb-8 border-b border-border pb-6 dark:border-border">
        <p className="text-sm font-medium text-primary dark:text-primary">Guide</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
          {doc.title}
        </h1>
        <p className="mt-2 text-sm text-muted">{doc.description}</p>
      </div>
      <MarkdownView content={content} />
    </>
  );
}
