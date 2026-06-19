# Manual QA checklist (Phase 13)

→ Also rendered at `/docs/qa-checklist` · Map: [../context.md](../context.md)

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

## Password Reset Flow

- [ ] Click "Forgot password?" on login page → redirects to `/forgot-password`
- [ ] Empty email field shows validation error
- [ ] Valid email submits; shows "Check your email" message
- [ ] Reset email arrives within 30 seconds
- [ ] Reset link includes token and email as URL parameters
- [ ] Clicking reset link loads password form with countdown timer
- [ ] Invalid or expired token shows error; offers "Request new link"
- [ ] Password requirements are clearly displayed
- [ ] Submitting new password auto-logs in user
- [ ] After reset, redirects to correct dashboard (creator vs. sponsor)
- [ ] Attempting password reset 4+ times in 30 min shows rate limit error (429)

## Email Verification (2FA)

- [ ] After signup, user sees "Verify your email" prompt/modal
- [ ] Clicking "Send code" triggers email delivery (check Resend logs)
- [ ] Email arrives within 30 seconds with 6-digit code
- [ ] Code input accepts 6 numeric digits only
- [ ] Entering wrong code shows error message
- [ ] Entering wrong code 3 times locks account; shows "Too many attempts"
- [ ] Clicking "Resend code" unlocks and sends new code
- [ ] Entering correct code shows success message
- [ ] After verification, redirects to dashboard
- [ ] Code expires after 15 minutes (show countdown timer)
- [ ] Attempting verification 6+ times in 15 min shows rate limit error (429)

## Username Validation

- [ ] Signup form has username field
- [ ] Typing username triggers 300ms debounce before API call
- [ ] Available username shows green checkmark
- [ ] Taken username shows red X with message "Username already taken"
- [ ] Cannot submit signup form with taken username
- [ ] Whitespace-only username shows validation error
- [ ] API call is debounced (check network tab; should not spam requests)

## Rate Limiting

Test rate limits by making rapid requests:

- [ ] **Login/Signup:** 5 requests per 15 min per IP → 6th attempt returns 429
  - Command: `for i in {1..6}; do curl -X POST https://api.earnio.app/api/auth/login -d '{}'; done`
- [ ] **Forgot Password:** 3 requests per 30 min per IP → 4th attempt returns 429
  - Command: `for i in {1..4}; do curl -X POST https://api.earnio.app/api/auth/forgot-password -d '{"email":"test@example.com"}'; done`
- [ ] **Reset Password:** 2 requests per 60 min per IP → 3rd attempt returns 429
- [ ] **Email Verification:** 5 requests per 15 min per IP → 6th attempt returns 429
- [ ] 429 responses show user-friendly "Too many requests. Try again later." message
- [ ] After rate limit window expires, requests work again

## Resilience

- [ ] Offline banner when network disabled
- [ ] API timeout shows friendly message
- [ ] Dark mode toggle persists after reload

## Performance (spot check)

- [ ] Lighthouse mobile score ≥ 80 on landing and dashboard
- [ ] No horizontal scroll on 375px width except tables/charts
