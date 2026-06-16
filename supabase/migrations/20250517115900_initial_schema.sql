-- Phase 1 base schema for local + fresh Supabase environments
-- Creates the 8 core tables referenced by backend services and demo seeds.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  name text NOT NULL DEFAULT '',
  username text NOT NULL,
  phone text,
  user_type text NOT NULL DEFAULT 'creator' CHECK (user_type IN ('creator', 'sponsor')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted')),
  is_verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS users_username_lower_unique
  ON public.users (lower(username));

CREATE TABLE IF NOT EXISTS public.platform_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('tiktok', 'youtube', 'instagram')),
  platform_username text NOT NULL,
  platform_user_id text NOT NULL,
  follower_count integer NOT NULL DEFAULT 0 CHECK (follower_count >= 0),
  status text NOT NULL DEFAULT 'connected' CHECK (status IN ('connected', 'disconnected', 'error')),
  last_synced_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, platform),
  UNIQUE (platform_user_id)
);

CREATE INDEX IF NOT EXISTS platform_accounts_user_idx ON public.platform_accounts(user_id);
CREATE INDEX IF NOT EXISTS platform_accounts_platform_idx ON public.platform_accounts(platform);

CREATE TABLE IF NOT EXISTS public.earnings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('tiktok', 'youtube', 'instagram')),
  amount_mnt numeric NOT NULL CHECK (amount_mnt >= 0),
  amount_usd numeric,
  currency text NOT NULL DEFAULT 'MNT',
  period_start date NOT NULL,
  period_end date NOT NULL,
  source_type text NOT NULL DEFAULT 'ad_revenue' CHECK (
    source_type IN ('ad_revenue', 'gift', 'sponsorship', 'manual_adjustment')
  ),
  synced_from_api boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (period_end >= period_start),
  UNIQUE (user_id, platform, period_start, period_end, source_type)
);

CREATE INDEX IF NOT EXISTS earnings_user_period_idx
  ON public.earnings(user_id, period_start DESC, period_end DESC);

CREATE TABLE IF NOT EXISTS public.api_syncs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('tiktok', 'youtube', 'instagram')),
  sync_type text NOT NULL DEFAULT 'earnings',
  status text NOT NULL CHECK (status IN ('pending', 'running', 'success', 'failed')),
  records_synced integer NOT NULL DEFAULT 0 CHECK (records_synced >= 0),
  error_message text,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS api_syncs_user_started_idx
  ON public.api_syncs(user_id, started_at DESC);

CREATE TABLE IF NOT EXISTS public.sponsorships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  payment_amount_mnt numeric NOT NULL CHECK (payment_amount_mnt > 0),
  content_type text NOT NULL DEFAULT 'short_video',
  required_followers_min integer CHECK (required_followers_min IS NULL OR required_followers_min >= 0),
  required_followers_max integer CHECK (
    required_followers_max IS NULL
    OR (
      required_followers_max >= 0
      AND (required_followers_min IS NULL OR required_followers_max >= required_followers_min)
    )
  ),
  engagement_rate_min numeric CHECK (engagement_rate_min IS NULL OR engagement_rate_min >= 0),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed')),
  deadline_apply date,
  deadline_complete date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (deadline_complete IS NULL OR deadline_apply IS NULL OR deadline_complete >= deadline_apply)
);

CREATE INDEX IF NOT EXISTS sponsorships_sponsor_status_idx
  ON public.sponsorships(sponsor_user_id, status);
CREATE INDEX IF NOT EXISTS sponsorships_status_created_idx
  ON public.sponsorships(status, created_at DESC);

CREATE TABLE IF NOT EXISTS public.sponsorship_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsorship_id uuid NOT NULL REFERENCES public.sponsorships(id) ON DELETE CASCADE,
  creator_user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn')),
  response_text text NOT NULL,
  sponsor_notes text,
  applied_at timestamptz NOT NULL DEFAULT now(),
  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (sponsorship_id, creator_user_id)
);

CREATE INDEX IF NOT EXISTS sponsorship_applications_creator_idx
  ON public.sponsorship_applications(creator_user_id, applied_at DESC);
CREATE INDEX IF NOT EXISTS sponsorship_applications_sponsorship_idx
  ON public.sponsorship_applications(sponsorship_id, applied_at DESC);

CREATE TABLE IF NOT EXISTS public.bank_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  bank_name text NOT NULL,
  account_number text NOT NULL,
  account_holder_name text NOT NULL,
  is_default boolean NOT NULL DEFAULT false,
  verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, account_number)
);

CREATE INDEX IF NOT EXISTS bank_accounts_user_default_idx
  ON public.bank_accounts(user_id, is_default DESC, created_at DESC);

DROP TRIGGER IF EXISTS users_set_updated_at ON public.users;
CREATE TRIGGER users_set_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS platform_accounts_set_updated_at ON public.platform_accounts;
CREATE TRIGGER platform_accounts_set_updated_at
  BEFORE UPDATE ON public.platform_accounts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS earnings_set_updated_at ON public.earnings;
CREATE TRIGGER earnings_set_updated_at
  BEFORE UPDATE ON public.earnings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS sponsorships_set_updated_at ON public.sponsorships;
CREATE TRIGGER sponsorships_set_updated_at
  BEFORE UPDATE ON public.sponsorships
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS sponsorship_applications_set_updated_at ON public.sponsorship_applications;
CREATE TRIGGER sponsorship_applications_set_updated_at
  BEFORE UPDATE ON public.sponsorship_applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS bank_accounts_set_updated_at ON public.bank_accounts;
CREATE TRIGGER bank_accounts_set_updated_at
  BEFORE UPDATE ON public.bank_accounts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_syncs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsorship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS users_select_own ON public.users;
CREATE POLICY users_select_own ON public.users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS users_update_own ON public.users;
CREATE POLICY users_update_own ON public.users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS platform_accounts_select_own ON public.platform_accounts;
CREATE POLICY platform_accounts_select_own ON public.platform_accounts
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS platform_accounts_insert_own ON public.platform_accounts;
CREATE POLICY platform_accounts_insert_own ON public.platform_accounts
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS platform_accounts_update_own ON public.platform_accounts;
CREATE POLICY platform_accounts_update_own ON public.platform_accounts
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own platform accounts" ON public.platform_accounts;
CREATE POLICY "Users can delete own platform accounts" ON public.platform_accounts
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS earnings_select_own ON public.earnings;
CREATE POLICY earnings_select_own ON public.earnings
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS earnings_insert_own ON public.earnings;
CREATE POLICY earnings_insert_own ON public.earnings
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS earnings_update_own ON public.earnings;
CREATE POLICY earnings_update_own ON public.earnings
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS api_syncs_select_own ON public.api_syncs;
CREATE POLICY api_syncs_select_own ON public.api_syncs
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS api_syncs_insert_own ON public.api_syncs;
CREATE POLICY api_syncs_insert_own ON public.api_syncs
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS api_syncs_update_own ON public.api_syncs;
CREATE POLICY api_syncs_update_own ON public.api_syncs
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS sponsorships_select_visible ON public.sponsorships;
CREATE POLICY sponsorships_select_visible ON public.sponsorships
  FOR SELECT TO authenticated
  USING (status = 'active' OR sponsor_user_id = auth.uid());

DROP POLICY IF EXISTS sponsorships_insert_own ON public.sponsorships;
CREATE POLICY sponsorships_insert_own ON public.sponsorships
  FOR INSERT TO authenticated
  WITH CHECK (sponsor_user_id = auth.uid());

DROP POLICY IF EXISTS sponsorships_update_own ON public.sponsorships;
CREATE POLICY sponsorships_update_own ON public.sponsorships
  FOR UPDATE TO authenticated
  USING (sponsor_user_id = auth.uid())
  WITH CHECK (sponsor_user_id = auth.uid());

DROP POLICY IF EXISTS sponsorships_delete_own ON public.sponsorships;
CREATE POLICY sponsorships_delete_own ON public.sponsorships
  FOR DELETE TO authenticated
  USING (sponsor_user_id = auth.uid());

DROP POLICY IF EXISTS sponsorship_applications_select_visible ON public.sponsorship_applications;
CREATE POLICY sponsorship_applications_select_visible ON public.sponsorship_applications
  FOR SELECT TO authenticated
  USING (
    creator_user_id = auth.uid()
    OR EXISTS (
      SELECT 1
      FROM public.sponsorships s
      WHERE s.id = sponsorship_applications.sponsorship_id
        AND s.sponsor_user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Creators can create applications" ON public.sponsorship_applications;
CREATE POLICY "Creators can create applications" ON public.sponsorship_applications
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = creator_user_id);

DROP POLICY IF EXISTS bank_accounts_select_own ON public.bank_accounts;
CREATE POLICY bank_accounts_select_own ON public.bank_accounts
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create bank accounts" ON public.bank_accounts;
CREATE POLICY "Users can create bank accounts" ON public.bank_accounts
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS bank_accounts_update_own ON public.bank_accounts;
CREATE POLICY bank_accounts_update_own ON public.bank_accounts
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own bank accounts" ON public.bank_accounts;
CREATE POLICY "Users can delete own bank accounts" ON public.bank_accounts
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

GRANT SELECT, UPDATE ON public.users TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.platform_accounts TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.earnings TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.api_syncs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sponsorships TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.sponsorship_applications TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bank_accounts TO authenticated;
