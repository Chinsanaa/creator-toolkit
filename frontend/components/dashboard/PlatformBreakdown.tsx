import { formatMnt, platformLabel } from '@/lib/format';
import type { PlatformEarnings } from '@/lib/types/dashboard';

const PLATFORM_COLORS: Record<string, string> = {
  tiktok: 'bg-foreground',
  youtube: 'bg-red-600',
  instagram: 'bg-pink-600',
};

export function PlatformBreakdown({ data }: { data: PlatformEarnings[] }) {
  if (data.length === 0) {
    return (
      <div className="glass-card p-6">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">By platform</h2>
        <p className="mt-4 text-sm text-zinc-500">No earnings recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">By platform</h2>
      <ul className="mt-6 space-y-4">
        {data.map((row) => (
          <li key={row.platform}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{platformLabel(row.platform)}</span>
              <span className="text-muted">
                {formatMnt(row.totalMnt)} · {row.share.toFixed(0)}%
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface">
              <div
                className={`h-full rounded-full ${PLATFORM_COLORS[row.platform.toLowerCase()] ?? 'bg-primary'}`}
                style={{ width: `${row.share}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
