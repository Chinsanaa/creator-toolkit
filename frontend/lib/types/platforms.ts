export interface PlatformAccount {
  id: string;
  platform: string;
  platform_username: string;
  follower_count: number | null;
  status: string | null;
  last_synced_at: string | null;
}

export interface SyncHistoryEntry {
  id: string;
  platform: string;
  sync_type: string;
  status: string;
  records_synced: number | null;
  error_message: string | null;
  started_at: string | null;
  completed_at: string | null;
}
