import { cn } from '@/lib/utils';

const PLATFORM_STYLES: Record<string, string> = {
  tiktok: 'bg-foreground',
  youtube: 'bg-red-600',
  instagram: 'bg-pink-600',
};

export function PlatformBadge({ platform, size = 'md' }: { platform: string; size?: 'sm' | 'md' }) {
  const key = platform.toLowerCase();

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white shadow-[inset_0_1px_2px_1px_rgba(255,255,255,0.2),inset_0px_-1px_2px_1px_rgba(0,0,0,0.08)]',
        size === 'sm' ? 'size-6' : 'size-9',
        PLATFORM_STYLES[key] ?? 'bg-primary'
      )}
    >
      {platform.slice(0, 1).toUpperCase()}
    </span>
  );
}
