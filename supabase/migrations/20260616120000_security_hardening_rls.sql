-- Security hardening: block client-side financial manipulation and role escalation.

-- Prevent authenticated users from changing their account role.
CREATE OR REPLACE FUNCTION public.prevent_user_type_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.user_type IS DISTINCT FROM NEW.user_type THEN
    IF COALESCE(auth.jwt() ->> 'role', '') <> 'service_role' THEN
      RAISE EXCEPTION 'user_type cannot be changed';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_user_type_change_trigger ON public.users;
CREATE TRIGGER prevent_user_type_change_trigger
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_user_type_change();

-- Wallet: users may only request payouts (pending). Credits/fees/adjustments are server-only.
DROP POLICY IF EXISTS "Users can insert own wallet transactions" ON public.wallet_transactions;
DROP POLICY IF EXISTS "Users can update own wallet transactions" ON public.wallet_transactions;

CREATE POLICY wallet_transactions_insert_payout_only ON public.wallet_transactions
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND type = 'payout'
    AND status = 'pending'
  );

REVOKE UPDATE ON public.wallet_transactions FROM authenticated;

-- Earnings: platform sync and admin jobs write via service role only.
DROP POLICY IF EXISTS earnings_insert_own ON public.earnings;
DROP POLICY IF EXISTS earnings_update_own ON public.earnings;

REVOKE INSERT, UPDATE ON public.earnings FROM authenticated;
