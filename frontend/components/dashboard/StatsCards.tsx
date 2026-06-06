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
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-red-600 dark:text-red-400'
        }
      />
      <StatCard
        label="Connected platforms"
        value={String(data.connectedPlatforms.length)}
        hint={
          data.connectedPlatforms.length > 0
            ? data.connectedPlatforms.map((p) => p.platform).join(', ')
            : 'Connect TikTok or YouTube'
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
    <div className="card p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-2 text-2xl font-semibold text-foreground ${valueClassName}`}>{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
