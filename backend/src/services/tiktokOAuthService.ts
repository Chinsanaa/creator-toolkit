import { URL } from 'url';
import { getAuthenticatedClient, supabaseAdmin } from '../database/supabase';
import platformService from './platformService';

interface TikTokOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

interface TokenExchangeResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  open_id?: string;
}

class TikTokOAuthService {
  private config: TikTokOAuthConfig | null = null;

  constructor() {
    this.loadConfig();
  }

  private loadConfig(): void {
    const { TIKTOK_CLIENT_ID, TIKTOK_CLIENT_SECRET, BACKEND_REDIRECT_URI } = process.env;

    if (!TIKTOK_CLIENT_ID || !TIKTOK_CLIENT_SECRET || !BACKEND_REDIRECT_URI) {
      console.warn(
        'TikTok OAuth not configured. Set TIKTOK_CLIENT_ID, TIKTOK_CLIENT_SECRET, and BACKEND_REDIRECT_URI'
      );
      return;
    }

    this.config = {
      clientId: TIKTOK_CLIENT_ID,
      clientSecret: TIKTOK_CLIENT_SECRET,
      redirectUri: BACKEND_REDIRECT_URI,
    };
  }

  /**
   * Generate TikTok OAuth authorization URL
   * User should be redirected to this URL to authorize the app
   */
  public generateAuthorizationUrl(state: string, scope = 'user.info.basic,video.list'): string {
    if (!this.config) {
      throw new Error('TikTok OAuth is not configured');
    }

    const params = new URLSearchParams({
      client_key: this.config.clientId,
      response_type: 'code',
      scope,
      redirect_uri: this.config.redirectUri,
      state,
    });

    return `https://www.tiktok.com/v1/oauth/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   * Called after user authorizes on TikTok
   */
  public async exchangeCodeForToken(code: string): Promise<TokenExchangeResponse> {
    if (!this.config) {
      throw new Error('TikTok OAuth is not configured');
    }

    const response = await fetch('https://open.tiktokapis.com/v1/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_key: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.config.redirectUri,
      }).toString(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `TikTok token exchange failed: ${error.error_description || error.message || response.statusText}`
      );
    }

    const data = (await response.json()) as TokenExchangeResponse;
    return data;
  }

  /**
   * Connect TikTok platform account via OAuth
   * Stores tokens and creates/updates platform account record
   */
  public async connectAccount(
    userId: string,
    accessToken: string,
    code: string
  ): Promise<{ id: string; platform: string; platform_username: string }> {
    if (!supabaseAdmin) {
      throw new Error('Platform sync is temporarily unavailable');
    }

    // Exchange code for tokens
    let tokenData: TokenExchangeResponse;
    try {
      tokenData = await this.exchangeCodeForToken(code);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to exchange OAuth code');
    }

    // For now, use a placeholder username. In future, fetch from TikTok API using the token
    const platformUsername = `@tiktok_oauth_${userId.slice(0, 8)}`;
    const platformUserId = `oauth_${userId}_tiktok`;
    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000).toISOString();

    const client = getAuthenticatedClient(accessToken);

    // Check if account already exists
    const { data: existing } = await client
      .from('platform_accounts')
      .select('id')
      .eq('user_id', userId)
      .eq('platform', 'tiktok')
      .maybeSingle();

    if (existing) {
      // Update existing account with new tokens
      const { data, error } = await client
        .from('platform_accounts')
        .update({
          oauth_access_token: tokenData.access_token,
          oauth_refresh_token: tokenData.refresh_token,
          oauth_token_expires_at: expiresAt,
          oauth_connected_at: new Date().toISOString(),
          status: 'connected',
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select('id, platform, platform_username')
        .single();

      if (error) {
        throw new Error(`Failed to update TikTok account: ${error.message}`);
      }

      return data as { id: string; platform: string; platform_username: string };
    }

    // Create new account record
    const { data, error } = await client
      .from('platform_accounts')
      .insert({
        user_id: userId,
        platform: 'tiktok',
        platform_username: platformUsername,
        platform_user_id: platformUserId,
        oauth_access_token: tokenData.access_token,
        oauth_refresh_token: tokenData.refresh_token,
        oauth_token_expires_at: expiresAt,
        oauth_connected_at: new Date().toISOString(),
        status: 'connected',
        follower_count: 0,
      })
      .select('id, platform, platform_username')
      .single();

    if (error) {
      throw new Error(`Failed to create TikTok account: ${error.message}`);
    }

    return data as { id: string; platform: string; platform_username: string };
  }

  /**
   * Refresh an OAuth access token if it's expired
   */
  public async refreshAccessToken(platformAccountId: string): Promise<string> {
    if (!supabaseAdmin) {
      throw new Error('Platform sync is temporarily unavailable');
    }

    const { data: account } = await supabaseAdmin
      .from('platform_accounts')
      .select('oauth_refresh_token, oauth_token_expires_at')
      .eq('id', platformAccountId)
      .single();

    if (!account?.oauth_refresh_token) {
      throw new Error('No refresh token available for this account');
    }

    if (!this.config) {
      throw new Error('TikTok OAuth is not configured');
    }

    // Check if token is still valid
    if (account.oauth_token_expires_at) {
      const expiresAt = new Date(account.oauth_token_expires_at).getTime();
      if (expiresAt > Date.now() + 60000) {
        // Token is valid for at least 1 minute, no need to refresh
        const { data: accountData } = await supabaseAdmin
          .from('platform_accounts')
          .select('oauth_access_token')
          .eq('id', platformAccountId)
          .single();
        if (accountData?.oauth_access_token) {
          return accountData.oauth_access_token;
        }
      }
    }

    // Refresh the token
    const response = await fetch('https://open.tiktokapis.com/v1/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_key: this.config.clientId,
        client_secret: this.config.clientSecret,
        refresh_token: account.oauth_refresh_token,
        grant_type: 'refresh_token',
      }).toString(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `TikTok token refresh failed: ${error.error_description || error.message || response.statusText}`
      );
    }

    const tokenData = (await response.json()) as TokenExchangeResponse;
    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000).toISOString();

    // Update the stored token
    await supabaseAdmin
      .from('platform_accounts')
      .update({
        oauth_access_token: tokenData.access_token,
        oauth_refresh_token: tokenData.refresh_token,
        oauth_token_expires_at: expiresAt,
        updated_at: new Date().toISOString(),
      })
      .eq('id', platformAccountId);

    return tokenData.access_token;
  }
}

export default new TikTokOAuthService();
