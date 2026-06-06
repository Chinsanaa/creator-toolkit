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
  if (!doc) return { title: 'Docs | Creator Toolkit' };
  return {
    title: `${doc.title} | Creator Toolkit`,
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
      <div className="mb-8 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <p className="text-sm font-medium text-violet-600 dark:text-violet-400">Guide</p>
        <h1 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {doc.title}
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{doc.description}</p>
      </div>
      <MarkdownView content={content} />
    </>
  );
}
