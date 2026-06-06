# Manual QA checklist (Phase 13)

Run before each release. Use test accounts for creator and sponsor roles.

## Creator

- [ ] Sign up → confirm session and redirect to dashboard
- [ ] Log in / log out
- [ ] Dashboard loads earnings and trend chart on mobile width
- [ ] Connect platform (mock) → sync now → earnings update
- [ ] Browse sponsorships → open detail → apply (sticky submit on mobile)
- [ ] Wallet → request payout (validates balance)
- [ ] Notification bell shows new items; email received when configured

## Sponsor

- [ ] Sign up as sponsor → sponsor dashboard
- [ ] Create sponsorship → visible in marketplace
- [ ] Review application → approve / reject → creator notified

## Auth & security

- [x] `/dashboard` without login → redirect to login (covered by automated API + proxy tests; verify in browser)
- [x] Creator cannot access `/sponsor/*`; sponsor cannot access creator-only routes (edge proxy + `ct-user-type` cookie; verify in browser)
- [ ] Wrong password shows generic error (no email enumeration)
- [ ] Expired session refreshes or redirects to login

## Resilience

- [ ] Offline banner when network disabled
- [ ] API timeout shows friendly message
- [ ] Dark mode toggle persists after reload

## Performance (spot check)

- [ ] Lighthouse mobile score ≥ 80 on landing and dashboard
- [ ] No horizontal scroll on 375px width except tables/charts
