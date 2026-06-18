-- Create password reset tokens table for password recovery flow

CREATE TABLE IF NOT EXISTS public.password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS password_reset_tokens_user_id_idx ON public.password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS password_reset_tokens_token_hash_idx ON public.password_reset_tokens(token_hash);
CREATE INDEX IF NOT EXISTS password_reset_tokens_expires_at_idx ON public.password_reset_tokens(expires_at);

-- RLS policies
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_only_reset_tokens" ON public.password_reset_tokens
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Trigger to auto-delete expired tokens (cleanup)
CREATE OR REPLACE FUNCTION public.delete_expired_password_reset_tokens()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.password_reset_tokens
  WHERE expires_at < now() AND used_at IS NULL
    AND created_at < now() - interval '24 hours';
$$;

-- Optional: Add a function to verify and mark token as used
CREATE OR REPLACE FUNCTION public.verify_and_consume_password_reset_token(
  p_token_hash text,
  p_user_id uuid
)
RETURNS TABLE(valid boolean, user_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  UPDATE public.password_reset_tokens
  SET used_at = now()
  WHERE token_hash = p_token_hash
    AND user_id = p_user_id
    AND expires_at > now()
    AND used_at IS NULL
  RETURNING true, user_id;
END;
$$;
