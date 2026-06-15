-- Fix earnings table: add instagram to platform check constraint
ALTER TABLE public.earnings
  DROP CONSTRAINT IF EXISTS earnings_platform_check;

ALTER TABLE public.earnings
  ADD CONSTRAINT earnings_platform_check
  CHECK (platform = ANY (ARRAY['tiktok'::text, 'youtube'::text, 'instagram'::text]));

-- Fix api_syncs table: add instagram to platform check constraint
ALTER TABLE public.api_syncs
  DROP CONSTRAINT IF EXISTS api_syncs_platform_check;

ALTER TABLE public.api_syncs
  ADD CONSTRAINT api_syncs_platform_check
  CHECK (platform = ANY (ARRAY['tiktok'::text, 'youtube'::text, 'instagram'::text]));
