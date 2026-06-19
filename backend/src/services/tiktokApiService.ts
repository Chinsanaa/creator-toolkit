import { getAuthenticatedClient, supabaseAdmin } from '../database/supabase';

interface TikTokUserInfo {
  display_name: string;
  follower_count: number;
  video_count: number;
  bio: string;
}

interface TikTokVideo {
  id: string;
  title: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
  create_time: number;
}

interface TikTokApiResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

const TIKTOK_API_BASE = 'https://open.tiktokapis.com/v1';

class TikTokApiService {
  /**
   * Fetch creator profile info from TikTok
   */
  public async fetchCreatorProfile(accessToken: string): Promise<TikTokUserInfo> {
    const response = await fetch(`${TIKTOK_API_BASE}/user/info/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch TikTok profile: ${response.statusText}`);
    }

    const data = (await response.json()) as TikTokApiResponse<{
      user: TikTokUserInfo;
    }>;

    if (data.error) {
      throw new Error(`TikTok API error: ${data.error.message}`);
    }

    if (!data.data?.user) {
      throw new Error('No user data in TikTok response');
    }

    return data.data.user;
  }

  /**
   * Fetch recent videos and their performance metrics
   */
  public async fetchRecentVideos(accessToken: string, limit = 10): Promise<TikTokVideo[]> {
    const response = await fetch(
      `${TIKTOK_API_BASE}/video/list/?fields=id,title,view_count,like_count,comment_count,share_count,create_time`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch TikTok videos: ${response.statusText}`);
    }

    const data = (await response.json()) as TikTokApiResponse<{
      videos: TikTokVideo[];
    }>;

    if (data.error) {
      throw new Error(`TikTok API error: ${data.error.message}`);
    }

    const videos = data.data?.videos ?? [];
    return videos.slice(0, limit);
  }

  /**
   * Calculate earnings from engagement metrics
   * Formula: (engagement_rate * follower_count) / 1000
   * engagement_rate is engagement points per 1000 followers
   * Default: 0.5 MNT per engagement point (configurable)
   */
  public calculateEarnings(
    videos: TikTokVideo[],
    followerCount: number,
    engagementRate = 0.5
  ): number {
    if (videos.length === 0) return 0;

    // Calculate total engagement
    const totalEngagement = videos.reduce((sum, video) => {
      // Engagement = likes + comments + shares (views are not counted as engagement)
      return sum + video.like_count + video.comment_count + video.share_count;
    }, 0);

    // Average engagement per video
    const avgEngagementPerVideo = totalEngagement / videos.length;

    // Calculate earnings based on engagement rate and followers
    // earnings = (follower_count * engagement_points_per_1000) * engagement_rate
    const earnings = (followerCount * (avgEngagementPerVideo / 1000)) * engagementRate;

    return Math.round(earnings);
  }
}

export default new TikTokApiService();
