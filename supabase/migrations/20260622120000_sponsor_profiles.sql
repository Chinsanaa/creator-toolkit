CREATE TABLE IF NOT EXISTS public.sponsor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  company_name text,
  website_url text,
  logo_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS sponsor_profiles_user_idx ON public.sponsor_profiles(user_id);

ALTER TABLE public.sponsor_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS sponsor_profiles_select_own ON public.sponsor_profiles;
CREATE POLICY sponsor_profiles_select_own ON public.sponsor_profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS sponsor_profiles_insert_own ON public.sponsor_profiles;
CREATE POLICY sponsor_profiles_insert_own ON public.sponsor_profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS sponsor_profiles_update_own ON public.sponsor_profiles;
CREATE POLICY sponsor_profiles_update_own ON public.sponsor_profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS sponsor_profiles_set_updated_at ON public.sponsor_profiles;
CREATE TRIGGER sponsor_profiles_set_updated_at
  BEFORE UPDATE ON public.sponsor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT SELECT, INSERT, UPDATE ON public.sponsor_profiles TO authenticated;
