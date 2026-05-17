import { formatMnt, platformLabel } from '@/lib/format';
import type { PlatformEarnings } from '@/lib/types/dashboard';

const PLATFORM_COLORS: Record<string, string> = {
  tiktok: 'bg-zinc-900',
  youtube: 'bg-red-600',
  instagram: 'bg-pink-600',
};

export function PlatformBreakdown({ data }: { data: PlatformEarnings[] }) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">By platform</h2>
        <p className="mt-4 text-sm text-zinc-500">No earnings recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">By platform</h2>
      <ul className="mt-6 space-y-4">
        {data.map((row) => (
          <li key={row.platform}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {platformLabel(row.platform)}
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">
                {formatMnt(row.totalMnt)} · {row.share.toFixed(0)}%
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className={`h-full rounded-full ${PLATFORM_COLORS[row.platform.toLowerCase()] ?? 'bg-violet-500'}`}
                style={{ width: `${row.share}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
