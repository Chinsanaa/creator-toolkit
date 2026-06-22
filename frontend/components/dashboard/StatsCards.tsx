import { Link2, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMnt, formatPercent, formatUsd } from '@/lib/format';
import type { DashboardSummary } from '@/lib/types/dashboard';

export function StatsCards({ data }: { data: DashboardSummary }) {
  const mom = data.monthOverMonthChange;
  const momPositive = mom !== null && mom >= 0;

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={Wallet}
        label="Total earnings"
        value={formatMnt(data.totalEarningsMnt)}
        detail={`${formatUsd(data.totalEarningsUsd)} approx.`}
      />
      <StatCard
        icon={Wallet}
        label="This month"
        value={formatMnt(data.earningsThisMonth)}
        detail={`Last month: ${formatMnt(data.earningsLastMonth)}`}
      />
      <StatCard
        icon={momPositive ? TrendingUp : TrendingDown}
        tone={mom === null ? '' : momPositive ? 'text-success' : 'text-destructive'}
        label="Month over month"
        value={mom === null ? '—' : formatPercent(mom)}
        detail={mom === null ? 'No prior month data' : 'vs last month'}
      />
      <StatCard
        icon={Link2}
        label="Connected platforms"
        value={String(data.connectedPlatforms.length)}
        detail={
          data.connectedPlatforms.length > 0
            ? data.connectedPlatforms.map((p) => p.platform).join(', ')
            : 'Connect a platform'
        }
      />
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = '',
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
  detail: string;
  tone?: string;
}) {
  return (
    <Card className="min-h-28 rounded-2xl py-4">
      <CardHeader className="flex flex-row items-center gap-2 px-4 pb-2">
        <div className="flex items-center justify-center rounded-full bg-primary-soft p-2">
          <Icon className="size-5 text-primary" />
        </div>
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className={`text-2xl font-semibold tracking-tight ${tone}`}>{value}</div>
        <p className="mt-1 text-xs text-muted">{detail}</p>
      </CardContent>
    </Card>
  );
}
