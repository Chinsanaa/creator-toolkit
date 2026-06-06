import type { ReactNode } from 'react';

export function CreatorPageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="creator-page-header">
      <div>
        <h1 className="creator-page-title">{title}</h1>
        {subtitle ? <p className="creator-page-subtitle">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
