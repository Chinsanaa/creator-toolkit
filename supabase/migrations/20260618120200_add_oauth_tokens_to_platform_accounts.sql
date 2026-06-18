-- Add OAuth token storage to platform_accounts table
-- Supports secure storage of OAuth access and refresh tokens

ALTER TABLE public.platform_accounts
ADD COLUMN oauth_access_token text,
ADD COLUMN oauth_refresh_token text,
ADD COLUMN oauth_token_expires_at timestamptz,
ADD COLUMN oauth_connected_at timestamptz;

-- Index for finding accounts by refresh token (for token refresh flows)
CREATE INDEX IF NOT EXISTS platform_accounts_oauth_refresh_token_idx
  ON public.platform_accounts(oauth_refresh_token) WHERE oauth_refresh_token IS NOT NULL;
