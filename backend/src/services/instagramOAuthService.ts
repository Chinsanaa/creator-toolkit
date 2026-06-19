import { getAuthenticatedClient, supabaseAdmin } from '../database/supabase';

interface InstagramOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

interface TokenExchangeResponse {
  access_token: string;
  user_id: string;
  token_type: string;
}

class InstagramOAuthService {
  private config: InstagramOAuthConfig | null = null;

  constructor() {
    this.loadConfig();
  }

  private loadConfig(): void {
    const { INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET, BACKEND_REDIRECT_URI } = process.env;

    if (!INSTAGRAM_CLIENT_ID || !INSTAGRAM_CLIENT_SECRET || !BACKEND_REDIRECT_URI) {
      console.warn(
        'Instagram OAuth not configured. Set INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET, and BACKEND_REDIRECT_URI'
      );
      return;
    }

    this.config = {
      clientId: INSTAGRAM_CLIENT_ID,
      clientSecret: INSTAGRAM_CLIENT_SECRET,
      redirectUri: BACKEND_REDIRECT_URI,
    };
  }

  /**
   * Generate Instagram OAuth authorization URL
   * Note: Instagram requires Business Account. Uses Facebook Graph API.
   */
  public generateAuthorizationUrl(state: string): string {
    if (!this.config) {
      throw new Error('Instagram OAuth is not configured');
    }

    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: 'instagram_graph_user_profile,instagram_graph_user_media',
      state,
    });

    return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  public async exchangeCodeForToken(code: string): Promise<TokenExchangeResponse> {
    if (!this.config) {
      throw new Error('Instagram OAuth is not configured');
    }

    const response = await fetch('https://graph.instagram.com/v18.0/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: this.config.redirectUri,
        code,
      }).toString(),
    });

    if (!response.ok) {
      let errorMsg = response.statusText;
      try {
        const errorData = (await response.json()) as Record<string, unknown>;
        if (typeof errorData.error === 'object' && errorData.error !== null) {
          const errorObj = errorData.error as Record<string, unknown>;
          if (typeof errorObj.message === 'string') {
            errorMsg = errorObj.message;
          }
        }
      } catch {
        // Ignore JSON parse errors
      }
      throw new Error(`Instagram token exchange failed: ${errorMsg}`);
    }

    const data = (await response.json()) as TokenExchangeResponse;
    return data;
  }

  /**
   * Connect Instagram account via OAuth
   * Note: Instagram tokens don't expire like other OAuth providers
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

    const platformUsername = `@instagram_oauth_${userId.slice(0, 8)}`;
    const platformUserId = `oauth_${tokenData.user_id}`;

    const client = getAuthenticatedClient(accessToken);

    // Check if account already exists
    const { data: existing } = await client
      .from('platform_accounts')
      .select('id')
      .eq('user_id', userId)
      .eq('platform', 'instagram')
      .maybeSingle();

    if (existing) {
      const { data, error } = await client
        .from('platform_accounts')
        .update({
          oauth_access_token: tokenData.access_token,
          oauth_refresh_token: null, // Instagram tokens don't expire
          oauth_token_expires_at: null,
          oauth_connected_at: new Date().toISOString(),
          status: 'connected',
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select('id, platform, platform_username')
        .single();

      if (error) {
        throw new Error(`Failed to update Instagram account: ${error.message}`);
      }

      return data as { id: string; platform: string; platform_username: string };
    }

    const { data, error } = await client
      .from('platform_accounts')
      .insert({
        user_id: userId,
        platform: 'instagram',
        platform_username: platformUsername,
        platform_user_id: platformUserId,
        oauth_access_token: tokenData.access_token,
        oauth_refresh_token: null, // Instagram tokens don't expire
        oauth_token_expires_at: null,
        oauth_connected_at: new Date().toISOString(),
        status: 'connected',
        follower_count: 0,
      })
      .select('id, platform, platform_username')
      .single();

    if (error) {
      throw new Error(`Failed to create Instagram account: ${error.message}`);
    }

    return data as { id: string; platform: string; platform_username: string };
  }
}

export default new InstagramOAuthService();
