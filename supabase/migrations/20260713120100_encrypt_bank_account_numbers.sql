-- Support application-level encryption of bank account numbers at rest.
--
-- account_number now stores AES-256-GCM ciphertext. Because ciphertext uses a
-- random IV, the old UNIQUE (user_id, account_number) constraint can no longer
-- enforce "one entry per real account number", and display masking must not
-- require decrypting every row. Two helper columns fix both:
--   * account_number_last4 — plaintext last 4 digits, for masked display
--   * account_number_hash  — deterministic HMAC of the number, for uniqueness
--
-- Columns are nullable so pre-existing / demo rows keep working; the app reads
-- them when present and falls back to the (legacy-plaintext) account_number.

ALTER TABLE public.bank_accounts
  ADD COLUMN IF NOT EXISTS account_number_last4 text,
  ADD COLUMN IF NOT EXISTS account_number_hash text;

-- Swap the uniqueness guard from the (now encrypted) number to its keyed hash.
ALTER TABLE public.bank_accounts
  DROP CONSTRAINT IF EXISTS bank_accounts_user_id_account_number_key;

CREATE UNIQUE INDEX IF NOT EXISTS bank_accounts_user_account_hash_key
  ON public.bank_accounts (user_id, account_number_hash)
  WHERE account_number_hash IS NOT NULL;
