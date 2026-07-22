# Manual QA checklist (Phase 13)

→ Also rendered at `/docs/qa-checklist` · Map: [../context.md](../context.md)

Run before each release. Use **fresh** creator + sponsor accounts for the money path (mark-paid credits wallets).

**Automated coverage:** Playwright `frontend/e2e/happy-path.spec.ts` covers signup → apply → approve → deliverable → mark paid → wallet credit → payout (when API is up). Auth redirect: `e2e/auth-redirect.spec.ts`.

## Creator

- [x] Sign up → confirm session and redirect to dashboard (Playwright happy-path)
- [ ] Log in / log out (spot-check in browser)
- [ ] Dashboard loads earnings and trend chart on mobile width
- [ ] Connect platform (mock) → sync now → earnings update
- [x] Browse sponsorships → apply (API path in Playwright; UI spot-check)
- [x] Wallet → request payout after mark-paid (Playwright happy-path)
- [ ] Notification bell shows new items; email received when Resend configured
- [ ] Settings: edit name, change password, email verify UI

## Sponsor

- [x] Sign up as sponsor → create campaign → approve → mark paid (Playwright happy-path)
- [ ] Create sponsorship visible in marketplace UI
- [ ] Review application UI → approve / reject notes

## Auth & security

- [x] `/dashboard` without login → redirect to login (Playwright + proxy)
- [x] Creator cannot access `/sponsor/*`; sponsor cannot access creator-only routes
- [ ] Wrong password shows generic error (no email enumeration)
- [ ] Expired session refreshes or redirects to login
- [x] `GET /api/health/detailed` without `x-cron-secret` → 401

## Password Reset Flow

- [ ] Click "Forgot password?" on login page → redirects to `/forgot-password`
- [ ] Empty email field shows validation error
- [ ] Valid email submits; shows "Check your email" message
- [ ] Reset email arrives within 30 seconds (**requires Resend**)
- [ ] Reset link includes token and email as URL parameters
- [ ] Clicking reset link loads password form with countdown timer
- [ ] Invalid or expired token shows error; offers "Request new link"
- [ ] Password requirements are clearly displayed
- [ ] Submitting new password auto-logs in user
- [ ] After reset, redirects to correct dashboard (creator vs. sponsor)
- [ ] Attempting password reset 4+ times in 30 min shows rate limit error (429)

## Email Verification

- [x] After signup, user sees "Verify your email" prompt/modal (UI wired; optional continue)
- [ ] Clicking "Send code" triggers email delivery (**requires Resend**)
- [ ] Email arrives within 30 seconds with 6-digit code
- [ ] Code input accepts 6 numeric digits only
- [ ] Entering wrong code shows error message
- [ ] Entering wrong code 3 times locks account; shows "Too many attempts"
- [ ] Clicking "Resend code" unlocks and sends new code
- [ ] Entering correct code shows success message
- [ ] Continue without verifying still reaches dashboard
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
- [ ] **Forgot Password:** 3 requests per 30 min per IP → 4th attempt returns 429
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
