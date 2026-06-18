-- Fix INSERT RLS policies to properly enforce user_id ownership

-- Fix api_syncs INSERT policy
DROP POLICY IF EXISTS api_syncs_insert_own ON public.api_syncs;
CREATE POLICY api_syncs_insert_own ON public.api_syncs
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Fix earnings INSERT policy
DROP POLICY IF EXISTS earnings_insert_own ON public.earnings;
CREATE POLICY earnings_insert_own ON public.earnings
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Fix platform_accounts INSERT policy
DROP POLICY IF EXISTS platform_accounts_insert_own ON public.platform_accounts;
CREATE POLICY platform_accounts_insert_own ON public.platform_accounts
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Fix bank_accounts INSERT policy
DROP POLICY IF EXISTS "Users can create bank accounts" ON public.bank_accounts;
CREATE POLICY "Users can create bank accounts" ON public.bank_accounts
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Fix wallet_transactions INSERT policy
DROP POLICY IF EXISTS "Users can insert own wallet transactions" ON public.wallet_transactions;
CREATE POLICY "Users can insert own wallet transactions" ON public.wallet_transactions
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Fix sponsorship_applications INSERT policy
DROP POLICY IF EXISTS "Creators can create applications" ON public.sponsorship_applications;
CREATE POLICY "Creators can create applications" ON public.sponsorship_applications
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = creator_user_id);

-- Add DELETE policy for bank_accounts
DROP POLICY IF EXISTS "Users can delete own bank accounts" ON public.bank_accounts;
CREATE POLICY "Users can delete own bank accounts" ON public.bank_accounts
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Add DELETE policy for platform_accounts
DROP POLICY IF EXISTS "Users can delete own platform accounts" ON public.platform_accounts;
CREATE POLICY "Users can delete own platform accounts" ON public.platform_accounts
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
