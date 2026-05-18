import { formatMnt, formatPercent, formatUsd } from '@/lib/format';
import type { DashboardSummary } from '@/lib/types/dashboard';

export function StatsCards({ data }: { data: DashboardSummary }) {
  const mom = data.monthOverMonthChange;
  const momPositive = mom !== null && mom >= 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total earnings"
        value={formatMnt(data.totalEarningsMnt)}
        hint={formatUsd(data.totalEarningsUsd) + ' approx.'}
      />
      <StatCard
        label="This month"
        value={formatMnt(data.earningsThisMonth)}
        hint={`Last month: ${formatMnt(data.earningsLastMonth)}`}
      />
      <StatCard
        label="Month over month"
        value={mom === null ? '—' : formatPercent(mom)}
        hint={mom === null ? 'No prior month data' : 'vs last month'}
        valueClassName={
          mom === null
            ? ''
            : momPositive
              ? 'text-[color:var(--success)]'
              : 'text-[color:var(--destructive)]'
        }
      />
      <StatCard
        label="Connected platforms"
        value={String(data.connectedPlatforms.length)}
        hint={
          data.connectedPlatforms.length > 0
            ? data.connectedPlatforms.map((p) => p.platform).join(', ')
            : 'Connect a platform'
        }
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  valueClassName = '',
}: {
  label: string;
  value: string;
  hint: string;
  valueClassName?: string;
}) {
  return (
    <article className="stat-card">
      <p className="text-sm font-medium text-[color:var(--muted-foreground)]">{label}</p>
      <p
        className={`font-mono-stat mt-2 text-2xl font-semibold tracking-tight text-[color:var(--foreground)] ${valueClassName}`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-[color:var(--muted)]">{hint}</p>
    </article>
  );
}
