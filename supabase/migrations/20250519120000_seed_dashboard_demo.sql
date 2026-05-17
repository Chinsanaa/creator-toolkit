-- Demo platform accounts and earnings for dashboard (Phase 5)
-- Safe to re-run: removes prior demo rows

DELETE FROM public.earnings WHERE synced_from_api = false AND period_start >= DATE '2025-12-01';
DELETE FROM public.platform_accounts WHERE platform_user_id LIKE 'demo_%';

INSERT INTO public.platform_accounts (
  user_id, platform, platform_username, platform_user_id,
  follower_count, status, last_synced_at
)
SELECT
  u.id,
  p.platform,
  '@' || u.username || '_' || p.platform,
  'demo_' || p.platform || '_' || u.id::text,
  p.followers,
  'connected',
  NOW() - INTERVAL '1 day'
FROM public.users u
CROSS JOIN (
  VALUES
    ('tiktok', 125000),
    ('youtube', 48000)
) AS p(platform, followers)
WHERE u.user_type = 'creator' OR u.user_type IS NULL;

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
    ('tiktok',  850000, DATE '2025-12-01', DATE '2025-12-31', 'ad_revenue'),
    ('youtube', 420000, DATE '2025-12-01', DATE '2025-12-31', 'ad_revenue'),
    ('tiktok',  920000, DATE '2026-01-01', DATE '2026-01-31', 'ad_revenue'),
    ('youtube', 380000, DATE '2026-01-01', DATE '2026-01-31', 'ad_revenue'),
    ('tiktok',  780000, DATE '2026-02-01', DATE '2026-02-28', 'ad_revenue'),
    ('youtube', 510000, DATE '2026-02-01', DATE '2026-02-28', 'gift'),
    ('tiktok',  1100000, DATE '2026-03-01', DATE '2026-03-31', 'ad_revenue'),
    ('youtube', 590000, DATE '2026-03-01', DATE '2026-03-31', 'ad_revenue'),
    ('tiktok',  950000, DATE '2026-04-01', DATE '2026-04-30', 'ad_revenue'),
    ('youtube', 440000, DATE '2026-04-01', DATE '2026-04-30', 'sponsorship'),
    ('tiktok',  1200000, DATE '2026-05-01', DATE '2026-05-31', 'ad_revenue'),
    ('youtube', 620000, DATE '2026-05-01', DATE '2026-05-31', 'ad_revenue')
) AS e(platform, amount_mnt, period_start, period_end, source_type);
