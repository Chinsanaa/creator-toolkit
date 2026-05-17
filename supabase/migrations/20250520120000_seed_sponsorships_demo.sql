-- Demo sponsorship marketplace listings (Phase 6)
UPDATE public.users
SET user_type = 'sponsor'
WHERE email = 'chinsanaa0202@gmail.com';

DELETE FROM public.sponsorship_applications
WHERE sponsorship_id IN (
  SELECT id FROM public.sponsorships WHERE title LIKE '[Demo]%'
);

DELETE FROM public.sponsorships WHERE title LIKE '[Demo]%';

INSERT INTO public.sponsorships (
  sponsor_user_id,
  title,
  description,
  payment_amount_mnt,
  content_type,
  required_followers_min,
  required_followers_max,
  engagement_rate_min,
  status,
  deadline_apply,
  deadline_complete
)
SELECT
  u.id,
  s.title,
  s.description,
  s.payment_mnt,
  s.content_type,
  s.followers_min,
  s.followers_max,
  s.engagement_min,
  'active',
  s.deadline_apply,
  s.deadline_complete
FROM public.users u
CROSS JOIN (
  VALUES
    (
      '[Demo] Mongolian skincare TikTok',
      'Create 1 TikTok video (60s+) featuring our vitamin C serum. Must be in Mongolian, show product use, and tag @demo_skincare.',
      450000,
      'tiktok_video',
      50000,
      500000,
      3.5,
      CURRENT_DATE + 14,
      CURRENT_DATE + 45
    ),
    (
      '[Demo] Ulaanbaatar cafe Reels',
      'Visit our Sukhbaatar district cafe and post an Instagram Reel or TikTok. Highlight ambiance + one signature drink.',
      280000,
      'short_video',
      20000,
      200000,
      2.5,
      CURRENT_DATE + 10,
      CURRENT_DATE + 30
    ),
    (
      '[Demo] YouTube tech unboxing',
      '10–15 min YouTube video unboxing our wireless earbuds. Honest review, Mongolian voiceover or subtitles required.',
      1200000,
      'youtube_video',
      10000,
      150000,
      4.0,
      CURRENT_DATE + 21,
      CURRENT_DATE + 60
    ),
    (
      '[Demo] Gen Z fashion haul',
      'TikTok haul featuring 3+ items from our spring collection. Use trending audio, link in bio for 7 days.',
      650000,
      'tiktok_video',
      80000,
      NULL::integer,
      5.0,
      CURRENT_DATE + 7,
      CURRENT_DATE + 35
    )
) AS s(title, description, payment_mnt, content_type, followers_min, followers_max, engagement_min, deadline_apply, deadline_complete)
WHERE u.email = 'chinsanaa0202@gmail.com';
