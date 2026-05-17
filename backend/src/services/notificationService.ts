import { getAuthenticatedClient, supabaseAdmin } from '../database/supabase';

export interface NotificationRow {
  id: string;
  type: string;
  title: string;
  body: string;
  metadata: Record<string, unknown> | null;
  read_at: string | null;
  created_at: string;
}

class NotificationService {
  public async create(
    userId: string,
    type: string,
    title: string,
    body: string,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    if (!supabaseAdmin) return;

    const { error } = await supabaseAdmin.from('notifications').insert({
      user_id: userId,
      type,
      title,
      body,
      metadata: metadata ?? null,
    });

    if (error) {
      console.error('Failed to create notification:', error.message);
    }
  }

  public async notifyApplicationStatus(
    creatorUserId: string,
    status: 'approved' | 'rejected',
    campaignTitle: string,
    sponsorNotes?: string
  ): Promise<void> {
    const title =
      status === 'approved' ? 'Sponsorship approved' : 'Sponsorship application update';
    const body =
      status === 'approved'
        ? `Your application for "${campaignTitle}" was approved.`
        : `Your application for "${campaignTitle}" was not selected this time.`;
    const note = sponsorNotes?.trim();
    await this.create(creatorUserId, `application_${status}`, title, note ? `${body} Note: ${note}` : body, {
      campaignTitle,
      status,
    });
  }

  public async notifyEarningsSynced(
    userId: string,
    platform: string,
    amountMnt: number
  ): Promise<void> {
    await this.create(
      userId,
      'earnings_synced',
      'Earnings synced',
      `New ${platform} earnings (₮${amountMnt.toLocaleString()}) were added to your dashboard.`,
      { platform, amountMnt }
    );
  }

  public async notifyPayoutRequested(
    userId: string,
    amountMnt: number
  ): Promise<void> {
    await this.create(
      userId,
      'payout_requested',
      'Payout requested',
      `Your withdrawal of ₮${amountMnt.toLocaleString()} is being processed.`,
      { amountMnt }
    );
  }

  public async list(
    userId: string,
    accessToken: string,
    limit = 30
  ): Promise<{ notifications: NotificationRow[]; unreadCount: number }> {
    const client = getAuthenticatedClient(accessToken);
    const { data, error } = await client
      .from('notifications')
      .select('id, type, title, body, metadata, read_at, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to load notifications: ${error.message}`);
    }

    const notifications = (data ?? []) as NotificationRow[];
    const unreadCount = notifications.filter((n) => !n.read_at).length;
    return { notifications, unreadCount };
  }

  public async markRead(
    userId: string,
    accessToken: string,
    notificationId: string
  ): Promise<void> {
    const client = getAuthenticatedClient(accessToken);
    const { error } = await client
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('id', notificationId)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to mark notification read: ${error.message}`);
    }
  }

  public async markAllRead(userId: string, accessToken: string): Promise<void> {
    const client = getAuthenticatedClient(accessToken);
    const { error } = await client
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('user_id', userId)
      .is('read_at', null);

    if (error) {
      throw new Error(`Failed to mark all read: ${error.message}`);
    }
  }
}

export default new NotificationService();
