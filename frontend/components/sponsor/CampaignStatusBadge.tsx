import { campaignStatusLabel } from '@/lib/sponsor/campaignForm';

export function CampaignStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active:
      'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300',
    closed:
      'border-[color:var(--border)] bg-[color:var(--card-muted)] text-[color:var(--muted-foreground)]',
    draft:
      'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200',
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${styles[status] ?? styles.closed}`}
    >
      {campaignStatusLabel(status)}
    </span>
  );
}
