import { getAuthenticatedClient } from '../database/supabase';

export interface EarningsRow {
  id: string;
  platform: string;
  amount_mnt: number;
  amount_usd: number | null;
  period_start: string;
  period_end: string;
  source_type: string | null;
}

export interface PlatformAccountRow {
  id: string;
  platform: string;
  platform_username: string;
  follower_count: number | null;
  status: string | null;
  last_synced_at: string | null;
}

export interface DashboardSummary {
  totalEarningsMnt: number;
  totalEarningsUsd: number;
  earningsThisMonth: number;
  earningsLastMonth: number;
  monthOverMonthChange: number | null;
  connectedPlatforms: PlatformAccountRow[];
  byPlatform: { platform: string; totalMnt: number; share: number }[];
  monthlyTrend: { month: string; label: string; amountMnt: number }[];
  recentEarnings: EarningsRow[];
}

function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  return typeof value === 'number' ? value : parseFloat(value);
}

function monthKey(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(key: string): string {
  const [year, month] = key.split('-');
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

class DashboardService {
  public async getSummary(userId: string, accessToken: string): Promise<DashboardSummary> {
    const client = getAuthenticatedClient(accessToken);

    const [earningsResult, platformsResult] = await Promise.all([
      client
        .from('earnings')
        .select(
          'id, platform, amount_mnt, amount_usd, period_start, period_end, source_type'
        )
        .eq('user_id', userId)
        .order('period_start', { ascending: false }),
      client
        .from('platform_accounts')
        .select('id, platform, platform_username, follower_count, status, last_synced_at')
        .eq('user_id', userId)
        .order('platform', { ascending: true }),
    ]);

    if (earningsResult.error) {
      throw new Error(`Failed to load earnings: ${earningsResult.error.message}`);
    }
    if (platformsResult.error) {
      throw new Error(`Failed to load platforms: ${platformsResult.error.message}`);
    }

    const earnings: EarningsRow[] = (earningsResult.data ?? []).map((row) => ({
      id: row.id,
      platform: row.platform,
      amount_mnt: toNumber(row.amount_mnt),
      amount_usd: row.amount_usd != null ? toNumber(row.amount_usd) : null,
      period_start: row.period_start,
      period_end: row.period_end,
      source_type: row.source_type,
    }));

    const connectedPlatforms: PlatformAccountRow[] = (platformsResult.data ?? []).map(
      (row) => ({
        id: row.id,
        platform: row.platform,
        platform_username: row.platform_username,
        follower_count: row.follower_count,
        status: row.status,
        last_synced_at: row.last_synced_at,
      })
    );

    const totalEarningsMnt = earnings.reduce((sum, e) => sum + e.amount_mnt, 0);
    const totalEarningsUsd = earnings.reduce((sum, e) => sum + (e.amount_usd ?? 0), 0);

    const now = new Date();
    const thisMonthKey = monthKey(now.toISOString());
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthKey = monthKey(lastMonthDate.toISOString());

    const earningsThisMonth = earnings
      .filter((e) => monthKey(e.period_start) === thisMonthKey)
      .reduce((sum, e) => sum + e.amount_mnt, 0);

    const earningsLastMonth = earnings
      .filter((e) => monthKey(e.period_start) === lastMonthKey)
      .reduce((sum, e) => sum + e.amount_mnt, 0);

    let monthOverMonthChange: number | null = null;
    if (earningsLastMonth > 0) {
      monthOverMonthChange =
        ((earningsThisMonth - earningsLastMonth) / earningsLastMonth) * 100;
    } else if (earningsThisMonth > 0) {
      monthOverMonthChange = 100;
    }

    const platformTotals = new Map<string, number>();
    for (const e of earnings) {
      platformTotals.set(e.platform, (platformTotals.get(e.platform) ?? 0) + e.amount_mnt);
    }

    const byPlatform = Array.from(platformTotals.entries())
      .map(([platform, totalMnt]) => ({
        platform,
        totalMnt,
        share: totalEarningsMnt > 0 ? (totalMnt / totalEarningsMnt) * 100 : 0,
      }))
      .sort((a, b) => b.totalMnt - a.totalMnt);

    const monthlyMap = new Map<string, number>();
    for (const e of earnings) {
      const key = monthKey(e.period_start);
      monthlyMap.set(key, (monthlyMap.get(key) ?? 0) + e.amount_mnt);
    }

    const trendKeys: string[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      trendKeys.push(monthKey(d.toISOString()));
    }

    const monthlyTrend = trendKeys.map((key) => ({
      month: key,
      label: monthLabel(key),
      amountMnt: monthlyMap.get(key) ?? 0,
    }));

    const recentEarnings = earnings.slice(0, 8);

    return {
      totalEarningsMnt,
      totalEarningsUsd,
      earningsThisMonth,
      earningsLastMonth,
      monthOverMonthChange,
      connectedPlatforms,
      byPlatform,
      monthlyTrend,
      recentEarnings,
    };
  }
}

export default new DashboardService();
