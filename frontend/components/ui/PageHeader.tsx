interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && <p className="badge-pill mb-3">{eyebrow}</p>}
        <h1 className="font-display text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-base text-[color:var(--muted-foreground)]">{description}</p>
        )}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
