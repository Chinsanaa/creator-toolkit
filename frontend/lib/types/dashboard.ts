export interface PlatformAccount {
  id: string;
  platform: string;
  platform_username: string;
  follower_count: number | null;
  status: string | null;
  last_synced_at: string | null;
}

export interface EarningsEntry {
  id: string;
  platform: string;
  amount_mnt: number;
  amount_usd: number | null;
  period_start: string;
  period_end: string;
  source_type: string | null;
}

export interface PlatformEarnings {
  platform: string;
  totalMnt: number;
  share: number;
}

export interface MonthlyEarnings {
  month: string;
  label: string;
  amountMnt: number;
}

export interface DashboardSummary {
  totalEarningsMnt: number;
  totalEarningsUsd: number;
  earningsThisMonth: number;
  earningsLastMonth: number;
  monthOverMonthChange: number | null;
  connectedPlatforms: PlatformAccount[];
  byPlatform: PlatformEarnings[];
  monthlyTrend: MonthlyEarnings[];
  recentEarnings: EarningsEntry[];
}
