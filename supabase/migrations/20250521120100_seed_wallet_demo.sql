DELETE FROM public.wallet_transactions WHERE description LIKE '[Demo]%';

INSERT INTO public.wallet_transactions (user_id, type, amount_mnt, status, description, reference_type, created_at)
SELECT u.id, t.type, t.amount_mnt, t.status, t.description, t.reference_type, t.created_at
FROM public.users u
CROSS JOIN (
  VALUES
    ('earning_credit', 1250000, 'completed', '[Demo] TikTok + YouTube earnings (Apr 2026)', 'earnings', NOW() - INTERVAL '12 days'),
    ('sponsorship_credit', 360000, 'completed', '[Demo] Skincare campaign payout (net)', 'sponsorship', NOW() - INTERVAL '8 days'),
    ('platform_fee', 90000, 'completed', '[Demo] Platform fee (20% on sponsorship)', 'sponsorship', NOW() - INTERVAL '8 days'),
    ('payout', 200000, 'completed', '[Demo] Withdrawal to Khan Bank', 'bank_payout', NOW() - INTERVAL '5 days'),
    ('earning_credit', 1820000, 'completed', '[Demo] TikTok + YouTube earnings (May 2026)', 'earnings', NOW() - INTERVAL '2 days')
) AS t(type, amount_mnt, status, description, reference_type, created_at);
