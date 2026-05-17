DROP POLICY IF EXISTS platform_accounts_insert_own ON public.platform_accounts;
CREATE POLICY platform_accounts_insert_own ON public.platform_accounts
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS earnings_insert_own ON public.earnings;
CREATE POLICY earnings_insert_own ON public.earnings
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS earnings_update_own ON public.earnings;
CREATE POLICY earnings_update_own ON public.earnings
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

GRANT INSERT ON public.platform_accounts TO authenticated;
GRANT INSERT, UPDATE ON public.earnings TO authenticated;
