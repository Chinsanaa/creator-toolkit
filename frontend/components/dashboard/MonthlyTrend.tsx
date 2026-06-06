import { formatMnt } from '@/lib/format';
import type { MonthlyEarnings } from '@/lib/types/dashboard';

export function MonthlyTrend({ data }: { data: MonthlyEarnings[] }) {
  const max = Math.max(...data.map((d) => d.amountMnt), 1);

  return (
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
        </div>
      </div>
    </div>
  );
}
