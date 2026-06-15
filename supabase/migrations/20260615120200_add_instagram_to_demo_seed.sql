-- Add instagram platform to the demo seed (Phase 5 extension)
-- Adds instagram platform accounts and earnings for demo creators
-- Safe to re-run: uses ON CONFLICT DO NOTHING for insert

INSERT INTO public.platform_accounts (
  user_id, platform, platform_username, platform_user_id,
  follower_count, status, last_synced_at
)
SELECT
  u.id,
  'instagram',
  '@' || u.username || '_instagram',
  'demo_instagram_' || u.id::text,
  22000,
  'connected',
  NOW() - INTERVAL '1 day'
FROM public.users u
WHERE u.user_type = 'creator' OR u.user_type IS NULL
ON CONFLICT DO NOTHING;

-- Add instagram earnings for demo creators
INSERT INTO public.earnings (
  user_id, platform, amount_mnt, amount_usd, currency,
  period_start, period_end, source_type, synced_from_api
)
SELECT
  u.id,
  e.platform,
  e.amount_mnt,
  ROUND((e.amount_mnt / 3500.0)::numeric, 2),
  'MNT',
  e.period_start,
  e.period_end,
  e.source_type,
  false
FROM public.users u
CROSS JOIN (
  VALUES
    ('instagram', 180000, DATE '2025-12-01', DATE '2025-12-31', 'ad_revenue'),
    ('instagram', 210000, DATE '2026-01-01', DATE '2026-01-31', 'ad_revenue'),
    ('instagram', 165000, DATE '2026-02-01', DATE '2026-02-28', 'ad_revenue'),
    ('instagram', 240000, DATE '2026-03-01', DATE '2026-03-31', 'sponsorship'),
    ('instagram', 195000, DATE '2026-04-01', DATE '2026-04-30', 'ad_revenue'),
    ('instagram', 275000, DATE '2026-05-01', DATE '2026-05-31', 'ad_revenue')
) AS e(platform, amount_mnt, period_start, period_end, source_type)
WHERE u.user_type = 'creator' OR u.user_type IS NULL
ON CONFLICT DO NOTHING;
