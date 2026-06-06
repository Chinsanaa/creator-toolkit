import { formatMnt, platformLabel, sourceLabel } from '@/lib/format';
import type { EarningsEntry } from '@/lib/types/dashboard';

export function RecentEarnings({ data }: { data: EarningsEntry[] }) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-foreground">Recent earnings</h2>
      {data.length === 0 ? (
        <p className="mt-4 text-sm text-muted">
          No earnings yet. Connect a platform or wait for your first sync.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="pb-3 pr-4 font-medium">Period</th>
                <th className="pb-3 pr-4 font-medium">Platform</th>
                <th className="pb-3 pr-4 font-medium">Source</th>
                <th className="pb-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="border-b border-border/60 last:border-0">
                  <td className="py-3 pr-4 text-foreground">
                    {formatPeriod(row.period_start, row.period_end)}
                  </td>
                  <td className="py-3 pr-4">{platformLabel(row.platform)}</td>
                  <td className="py-3 pr-4 text-muted">{sourceLabel(row.source_type)}</td>
                  <td className="py-3 text-right font-medium text-foreground">
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
