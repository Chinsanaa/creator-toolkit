import { getAuthenticatedClient, supabaseAdmin } from '../database/supabase';

interface YouTubeOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

interface TokenExchangeResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

class YouTubeOAuthService {
  private config: YouTubeOAuthConfig | null = null;

  constructor() {
    this.loadConfig();
  }

  private loadConfig(): void {
    const { YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, BACKEND_REDIRECT_URI } = process.env;

    if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET || !BACKEND_REDIRECT_URI) {
      console.warn(
        'YouTube OAuth not configured. Set YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, and BACKEND_REDIRECT_URI'
      );
      return;
    }

    this.config = {
      clientId: YOUTUBE_CLIENT_ID,
      clientSecret: YOUTUBE_CLIENT_SECRET,
      redirectUri: BACKEND_REDIRECT_URI,
    };
  }

  /**
   * Generate YouTube OAuth authorization URL
   */
  public generateAuthorizationUrl(state: string): string {
    if (!this.config) {
      throw new Error('YouTube OAuth is not configured');
    }

    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl',
      state,
      access_type: 'offline',
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  public async exchangeCodeForToken(code: string): Promise<TokenExchangeResponse> {
    if (!this.config) {
      throw new Error('YouTube OAuth is not configured');
    }

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.config.redirectUri,
      }).toString(),
    });

    if (!response.ok) {
      let errorMsg = response.statusText;
      try {
        const errorData = (await response.json()) as Record<string, unknown>;
        if (typeof errorData.error_description === 'string') {
          errorMsg = errorData.error_description;
        } else if (typeof errorData.error === 'string') {
          errorMsg = errorData.error;
        }
      } catch {
        // Ignore JSON parse errors
      }
      throw new Error(`YouTube token exchange failed: ${errorMsg}`);
    }

    const data = (await response.json()) as TokenExchangeResponse;
    return data;
  }

  /**
   * Connect YouTube account via OAuth
   */
  public async connectAccount(
    userId: string,
    accessToken: string,
    code: string
  ): Promise<{ id: string; platform: string; platform_username: string }> {
    if (!supabaseAdmin) {
      throw new Error('Platform sync is temporarily unavailable');
    }

    let tokenData: TokenExchangeResponse;
    try {
      tokenData = await this.exchangeCodeForToken(code);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to exchange OAuth code');
    }

    const platformUsername = `@youtube_oauth_${userId.slice(0, 8)}`;
    const platformUserId = `oauth_${userId}_youtube`;
    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000).toISOString();

    const client = getAuthenticatedClient(accessToken);

    // Check if account already exists
    const { data: existing } = await client
      .from('platform_accounts')
      .select('id')
      .eq('user_id', userId)
      .eq('platform', 'youtube')
      .maybeSingle();

    if (existing) {
      const { data, error } = await client
        .from('platform_accounts')
        .update({
          oauth_access_token: tokenData.access_token,
          oauth_refresh_token: tokenData.refresh_token || null,
          oauth_token_expires_at: expiresAt,
          oauth_connected_at: new Date().toISOString(),
          status: 'connected',
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select('id, platform, platform_username')
        .single();

      if (error) {
        throw new Error(`Failed to update YouTube account: ${error.message}`);
      }

      return data as { id: string; platform: string; platform_username: string };
    }

    const { data, error } = await client
      .from('platform_accounts')
      .insert({
        user_id: userId,
        platform: 'youtube',
        platform_username: platformUsername,
        platform_user_id: platformUserId,
        oauth_access_token: tokenData.access_token,
        oauth_refresh_token: tokenData.refresh_token || null,
        oauth_token_expires_at: expiresAt,
        oauth_connected_at: new Date().toISOString(),
        status: 'connected',
        follower_count: 0,
      })
      .select('id, platform, platform_username')
      .single();

    if (error) {
      throw new Error(`Failed to create YouTube account: ${error.message}`);
    }

    return data as { id: string; platform: string; platform_username: string };
  }
}

export default new YouTubeOAuthService();
