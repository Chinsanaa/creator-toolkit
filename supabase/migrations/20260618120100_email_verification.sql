-- Create email verification codes table for 2FA during signup

CREATE TABLE IF NOT EXISTS public.email_verification_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  code text,
  expires_at timestamptz NOT NULL,
  attempts integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS email_verification_codes_user_id_idx ON public.email_verification_codes(user_id);
CREATE INDEX IF NOT EXISTS email_verification_codes_code_idx ON public.email_verification_codes(code);
CREATE INDEX IF NOT EXISTS email_verification_codes_expires_at_idx ON public.email_verification_codes(expires_at);

-- RLS policies
ALTER TABLE public.email_verification_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_only_email_verification" ON public.email_verification_codes
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Trigger to auto-delete expired codes
CREATE OR REPLACE FUNCTION public.delete_expired_email_verification_codes()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.email_verification_codes
  WHERE expires_at < now() AND created_at < now() - interval '24 hours';
$$;
