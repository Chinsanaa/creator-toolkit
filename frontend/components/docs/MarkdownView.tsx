import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mb-6 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-10 scroll-mt-24 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-lg font-medium text-zinc-800 dark:text-zinc-100">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed text-zinc-600 dark:text-zinc-400">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-zinc-600 dark:text-zinc-400">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-zinc-600 dark:text-zinc-400">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-violet-600 underline-offset-2 hover:underline dark:text-violet-400"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return (
        <code className="block overflow-x-auto rounded-lg bg-zinc-100 p-4 text-sm text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm text-violet-800 dark:bg-zinc-800 dark:text-violet-300">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/80">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mb-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full min-w-[480px] text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-t border-zinc-100 px-4 py-3 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      {children}
    </td>
  ),
  hr: () => <hr className="my-10 border-zinc-200 dark:border-zinc-800" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-zinc-800 dark:text-zinc-200">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-4 border-l-4 border-violet-500 pl-4 text-zinc-600 dark:text-zinc-400">
      {children}
    </blockquote>
  ),
};

export function MarkdownView({ content }: { content: string }) {
  return (
    <article className="page-enter max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
