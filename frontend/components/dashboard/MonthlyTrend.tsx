import { formatMnt } from '@/lib/format';
import type { MonthlyEarnings } from '@/lib/types/dashboard';

export function MonthlyTrend({ data }: { data: MonthlyEarnings[] }) {
  const max = Math.max(...data.map((d) => d.amountMnt), 1);

  return (
<<<<<<< HEAD
    <div>
      <div className="-mx-2 overflow-x-auto px-2">
        <div className="flex h-40 min-w-[280px] items-end justify-between gap-2 sm:min-w-0">
          {data.map((month) => (
            <div key={month.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-medium text-landing-fg">
                {month.amountMnt > 0 ? `${Math.round(month.amountMnt / 1000)}k` : '0'}
              </span>
              <div
                className="w-full max-w-12 rounded-t-lg bg-primary transition-all"
                style={{ height: `${Math.max((month.amountMnt / max) * 100, 4)}%` }}
                title={formatMnt(month.amountMnt)}
              />
              <span className="text-[10px] text-landing-muted">
                {month.label.split(' ')[0]}
              </span>
            </div>
          ))}
=======
    <div className="glass-card p-6">
      <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Earnings trend</h2>
      <p className="mt-1 text-sm text-zinc-500">Last 6 months (MNT)</p>
      <div className="mt-6 -mx-2 overflow-x-auto px-2">
        <div className="flex min-w-[280px] items-end justify-between gap-2 h-40 sm:min-w-0">
        {data.map((month) => (
          <div key={month.month} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {month.amountMnt > 0
                ? `${Math.round(month.amountMnt / 1000)}k`
                : '0'}
            </span>
            <div
              className="w-full max-w-12 rounded-t-md bg-violet-500 transition-all dark:bg-violet-600"
              style={{ height: `${Math.max((month.amountMnt / max) * 100, 4)}%` }}
              title={formatMnt(month.amountMnt)}
            />
            <span className="text-[10px] text-zinc-500">{month.label.split(' ')[0]}</span>
          </div>
        ))}
>>>>>>> refs/remotes/origin/cursor/2026-06-07-9o3t-79105
        </div>
      </div>
    </div>
  );
}
