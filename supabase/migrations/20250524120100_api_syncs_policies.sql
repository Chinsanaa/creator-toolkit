DROP POLICY IF EXISTS api_syncs_insert_own ON public.api_syncs;
CREATE POLICY api_syncs_insert_own ON public.api_syncs
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS api_syncs_update_own ON public.api_syncs;
CREATE POLICY api_syncs_update_own ON public.api_syncs
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

GRANT INSERT, UPDATE ON public.api_syncs TO authenticated;
