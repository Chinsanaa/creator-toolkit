-- Enforce at most one pending payout per user at the database level.
-- Balance and "already has a pending payout" checks in walletService run in
-- application code and can race under concurrent requests. This partial unique
-- index makes the invariant atomic: two simultaneous payout inserts can never
-- both succeed, which also prevents balance overdraw via concurrency (a user
-- can only ever hold a single pending payout).
CREATE UNIQUE INDEX IF NOT EXISTS one_pending_payout_per_user
  ON public.wallet_transactions (user_id)
  WHERE type = 'payout' AND status = 'pending';
