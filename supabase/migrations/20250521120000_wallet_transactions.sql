-- Wallet transactions for payouts, fees, and credits (Phase 7)
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (
    type = ANY (ARRAY[
      'sponsorship_credit',
      'earning_credit',
      'platform_fee',
      'payout',
      'adjustment'
    ])
  ),
  amount_mnt numeric NOT NULL CHECK (amount_mnt > 0),
  currency text NOT NULL DEFAULT 'MNT',
  status text NOT NULL DEFAULT 'completed' CHECK (
    status = ANY (ARRAY['pending', 'completed', 'failed', 'cancelled'])
  ),
  description text,
  reference_type text,
  reference_id uuid,
  bank_account_id uuid REFERENCES public.bank_accounts(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user ON public.wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_status ON public.wallet_transactions(status);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_created ON public.wallet_transactions(created_at DESC);

ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own wallet transactions"
  ON public.wallet_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wallet transactions"
  ON public.wallet_transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wallet transactions"
  ON public.wallet_transactions FOR UPDATE
  USING (auth.uid() = user_id);
