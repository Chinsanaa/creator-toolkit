import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mb-6 text-3xl font-semibold tracking-tight text-foreground">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-10 scroll-mt-24 text-xl font-semibold text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-lg font-medium text-foreground dark:text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed text-muted">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-muted">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-muted">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary underline-offset-2 hover:underline dark:text-primary"
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
        <code className="block overflow-x-auto rounded-lg bg-surface p-4 text-sm text-foreground dark:bg-surface dark:text-foreground">
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-surface px-1.5 py-0.5 text-sm text-primary dark:bg-surface dark:text-primary">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-xl border border-border bg-surface dark:border-border dark:bg-surface/80">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mb-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[480px] text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-border bg-surface dark:border-border dark:bg-surface">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 font-medium text-foreground">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-t border-border px-4 py-3 text-muted dark:border-border dark:text-muted-foreground">
      {children}
    </td>
  ),
  hr: () => <hr className="my-10 border-border" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-4 border-l-4 border-primary pl-4 text-muted">
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
