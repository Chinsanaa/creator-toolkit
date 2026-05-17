import { formatMnt, platformLabel, sourceLabel } from '@/lib/format';
import type { EarningsEntry } from '@/lib/types/dashboard';

export function RecentEarnings({ data }: { data: EarningsEntry[] }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Recent earnings</h2>
      {data.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-500">
          No earnings yet. Connect a platform or wait for your first sync.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
                <th className="pb-3 pr-4 font-medium">Period</th>
                <th className="pb-3 pr-4 font-medium">Platform</th>
                <th className="pb-3 pr-4 font-medium">Source</th>
                <th className="pb-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-zinc-100 last:border-0 dark:border-zinc-900"
                >
                  <td className="py-3 pr-4 text-zinc-700 dark:text-zinc-300">
                    {formatPeriod(row.period_start, row.period_end)}
                  </td>
                  <td className="py-3 pr-4">{platformLabel(row.platform)}</td>
                  <td className="py-3 pr-4 text-zinc-500">{sourceLabel(row.source_type)}</td>
                  <td className="py-3 text-right font-medium text-zinc-900 dark:text-zinc-100">
                    {formatMnt(row.amount_mnt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatPeriod(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return s.toLocaleDateString('en-US', opts);
  }
  return `${s.toLocaleDateString('en-US', { month: 'short' })} – ${e.toLocaleDateString('en-US', opts)}`;
}
