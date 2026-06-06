export type SupportedPlatform = 'tiktok' | 'youtube' | 'instagram';

export interface PlatformSyncResult {
  followerCount: number;
  earningsMnt: number;
  amountUsd: number;
  periodStart: string;
  periodEnd: string;
}

function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function monthBounds(date = new Date()): { start: string; end: string } {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return { start: fmt(start), end: fmt(end) };
}

/** Simulates TikTok / YouTube Creator API earnings pull for dev & demo. */
export function fetchPlatformData(
  platform: SupportedPlatform,
  platformUserId: string
): PlatformSyncResult {
  const seed = hashSeed(`${platform}:${platformUserId}`);
  const { start, end } = monthBounds();

  const baseFollowers =
    platform === 'tiktok' ? 80_000 : platform === 'youtube' ? 35_000 : 20_000;
  const followerCount = baseFollowers + (seed % 50_000);

  const baseEarnings =
    platform === 'tiktok' ? 520_000 : platform === 'youtube' ? 280_000 : 150_000;
  const earningsMnt = baseEarnings + (seed % 200_000);
  const amountUsd = Math.round(earningsMnt / 3400);

  return {
    followerCount,
    earningsMnt,
    amountUsd,
    periodStart: start,
    periodEnd: end,
  };
}

export function isSupportedPlatform(value: string): value is SupportedPlatform {
  return value === 'tiktok' || value === 'youtube' || value === 'instagram';
}
