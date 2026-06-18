# Earnio — Feature Checklist

> A comprehensive list of implemented, in-progress, and planned features as of June 2026.
> Last updated: June 18, 2026

---

## ✅ Implemented Features

### Authentication & Authorization

- [x] Creator signup with email/password
- [x] Sponsor signup with email/password
- [x] Email/password login
- [x] Logout with session cleanup
- [x] Access token (1 hour TTL) stored in httpOnly + session cookies
- [x] Refresh token (httpOnly cookie) with automatic renewal
- [x] Persistent login across browser restarts (sessionStorage + localStorage)
- [x] PKCE secure auth code flow
- [x] Role-based routing (creator vs. sponsor via `ct-user-type` cookie)
- [x] Middleware edge protection (`proxy.ts`) redirects based on role
- [x] Generic error messages (no email enumeration)
- [x] Terms & Privacy Policy acceptance on signup
- [x] User metadata storage (name, username, user_type, terms_accepted_at)

### Creator Dashboard (`/dashboard`)

- [x] Earnings summary card (total earned, pending payout, fees charged)
- [x] Monthly trend chart (earnings by month, last 12 months)
- [x] Per-platform breakdown (TikTok, YouTube, Instagram earnings)
- [x] Recent transactions list (latest earnings events)
- [x] Connected platforms status (shows which platforms are synced)
- [x] Getting-started checklist (onboarding tasks with progress)
- [x] Refresh earnings data button
- [x] Responsive layout (desktop sidebar + mobile bottom nav)

### Platform Connections (`/platforms`)

- [x] Connect TikTok by username
- [x] Connect YouTube by username
- [x] Connect Instagram by username
- [x] Sync earnings with one-click "Sync now" button
- [x] Sync history with timestamps and earnings update details
- [x] Mock platform provider (deterministic earnings simulation)
- [x] Earnings breakdown per platform after sync
- [x] Account disconnection (remove platform account)
- [x] Last sync timestamp display

### Sponsorship Marketplace (Creator)

- [x] Browse active sponsorship campaigns
- [x] Search/filter campaigns (placeholder for future enhancements)
- [x] View campaign detail page (budget, requirements, deadline, brief)
- [x] Submit application with pitch text
- [x] Track application status (pending, approved, rejected, completed)
- [x] View all my applications with status
- [x] Receive email notification on application decision
- [x] See earned amount after sponsor approval

### Sponsor Tools

- [x] Sponsor dashboard with overview metrics
- [x] Active campaigns list
- [x] Application count and status breakdown
- [x] Create new campaign (budget, title, brief, requirements, deadline)
- [x] Edit campaign details
- [x] Change campaign status (draft, active, closed)
- [x] View applications for each campaign
- [x] Approve/reject creator applications
- [x] Add optional notes when approving/rejecting
- [x] View creator profile/stats when reviewing
- [x] Receive notifications on new applications

### Wallet & Payouts (`/wallet`)

- [x] Balance summary (available, pending payout, total earned, fees)
- [x] Platform fee rate display (20%)
- [x] Transaction history (sortable, filterable)
- [x] Transaction types: `sponsorship_earned`, `platform_fee`, `pending_payout`, `completed_payout`
- [x] Add Mongolian bank account (Khan Bank, Golomt, etc.)
- [x] Bank account storage with secure masking in API responses
- [x] Request payout (minimum 50,000 MNT)
- [x] Payout creates pending transaction
- [x] Payout request sends in-app notification
- [x] Payout request sends email notification (if Resend configured)
- [x] Transaction date, amount, type, and description

### Notifications

- [x] In-app notification bell icon
- [x] Notification polling every 60 seconds
- [x] Mark notification as read
- [x] Notification types: application decision, payout request, new campaign, etc.
- [x] Email notifications via Resend (configurable)
- [x] Email templates for common events (signup, approval, payout, etc.)
- [x] Notification list view with timestamps

### Design & UX

- [x] Dark mode toggle in header
- [x] System preference detection (prefers-color-scheme)
- [x] Theme persistence (localStorage)
- [x] Earnio design system (colors, spacing, typography)
- [x] Responsive design (mobile-first)
- [x] Desktop sidebar navigation (creator)
- [x] Mobile bottom tab navigation
- [x] Profile dropdown in header
- [x] Navigation breadcrumbs where appropriate
- [x] Loading states (skeletons, spinners)
- [x] Error states with helpful messages
- [x] Offline detection banner
- [x] Empty states for lists

### Developer & Operations

- [x] Health check endpoint (`GET /api/health`)
- [x] Database connectivity check in health endpoint
- [x] Service role status indicator
- [x] Email provider status indicator
- [x] Cron sync status indicator
- [x] In-app documentation (`/docs` page)
- [x] Deployment guide markdown
- [x] QA manual checklist
- [x] Launch plan documentation
- [x] Backend tests (8 integration tests)
- [x] Frontend ESLint configuration and checks
- [x] GitHub Actions CI/CD pipeline
- [x] Docker Compose for local development
- [x] Comprehensive README with setup instructions

### Database & Security

- [x] 8 PostgreSQL tables (users, platform_accounts, earnings, sponsorships, applications, wallet_transactions, bank_accounts, notifications)
- [x] Row-level security (RLS) policies on all tables
- [x] Automatic user profile creation trigger on signup
- [x] User data isolation via RLS
- [x] Sponsor data isolation via RLS
- [x] Secure bank account number masking
- [x] JWT token verification on all API routes
- [x] CORS protection with configurable origin
- [x] Environment variable management (no secrets in code)

### Background Jobs

- [x] Platform sync scheduler (configurable 6-hour intervals)
- [x] In-process cron with setInterval (development/small scale)
- [x] External cron endpoint (`POST /api/sync/cron` with secret)
- [x] Sync updates earnings history
- [x] Sync updates platform account stats
- [x] Sync sends notification to user

---

## 🚧 In Progress / Partial Implementation

- **Mobile app** — Capacitor iOS wrapper exists but not tested on real devices
- **E2E tests** — No automated end-to-end tests yet (manual testing only)
- **Accessibility** — Not fully audited for WCAG compliance
- **Performance optimization** — No Lighthouse budget automation
- **i18n** — No multi-language support (English only)

---

## 📋 Planned Features

### High Priority (Before real users/money)

- [ ] Replace mock platform provider with real TikTok/YouTube/Instagram OAuth + APIs
- [ ] Integrate real payment provider for Mongolian payouts (Khan Bank, Golomt APIs)
- [ ] Bank account verification flow (KYC, micro-deposits, or manual)
- [ ] Audit and test all Supabase RLS policies
- [ ] Automated Supabase RLS policy tests
- [ ] Require `SUPABASE_SERVICE_ROLE_KEY` in production deployment
- [ ] Security audit (penetration testing)

### Medium Priority (Reliability & Quality)

- [ ] Add Playwright E2E tests (signup → apply → approve flow)
- [ ] Add frontend component tests (Jest/React Testing Library)
- [ ] Expand backend test coverage to 50%+
- [ ] Add E2E token refresh test
- [ ] Add E2E concurrent request handling tests
- [ ] Migrate sync scheduler to external job queue (BullMQ, AWS Lambda, Google Cloud Tasks)
- [ ] Add Sentry error tracking integration
- [ ] Add PostHog or Plausible analytics
- [ ] Set up Lighthouse CI budget

### Medium Priority (Product Completeness)

- [ ] Instagram in creator platform dropdown (already in mock, needs UI completion)
- [ ] Campaign filters/search with saved preferences
- [ ] Campaign drafts (save without publishing)
- [ ] Creator public profiles (`@username` pages for sponsors to view)
- [ ] Password reset flow (email link)
- [ ] Email verification flow (if Supabase has it enabled)
- [ ] Admin panel for dispute handling, pending payouts, user management
- [ ] Payment dispute/chargeback handling

### Low Priority (Polish & Growth)

- [ ] i18n support (Mongolian UI copy, localized currency formatting)
- [ ] Mobile app push notifications (Capacitor)
- [ ] Creator messaging / DM system
- [ ] Creator portfolio/reel showcase
- [ ] Brand discovery recommendations
- [ ] Creator tier/badge system (verified, top performer, etc.)
- [ ] Referral program (creator → creator, brand → creator)
- [ ] SMS notifications (if market demands)
- [ ] Creator content calendar / scheduling
- [ ] API public endpoint for creator stats (embeddable widgets)

---

## 🗂 Feature Organization by Route

### Public Routes

| Route | Status | Features |
|-------|--------|----------|
| `/` | ✅ | Creator landing, hero, benefits, FAQ, testimonials, CTA |
| `/brands` | ✅ | Sponsor landing, value prop, CTAs |
| `/login/creator` | ✅ | Email/password form |
| `/login/sponsor` | ✅ | Email/password form |
| `/signup/creator` | ✅ | Email/password form, T&C acceptance |
| `/signup/sponsor` | ✅ | Email/password form, T&C acceptance |
| `/docs` | ✅ | In-app documentation (deployment, QA, launch plan) |

### Creator App

| Route | Status | Features |
|--------|--------|----------|
| `/dashboard` | ✅ | Summary, trends, checklist, platform status |
| `/sponsorships` | ✅ | Campaign list, search, filtering |
| `/sponsorships/[id]` | ✅ | Campaign detail, apply with pitch |
| `/sponsorships/applications` | ✅ | My applications, status tracking |
| `/platforms` | ✅ | Connect TikTok/YouTube/Instagram, sync, history |
| `/wallet` | ✅ | Balance, transactions, bank accounts, payouts |
| `/settings` | 🚧 | Profile management (partial) |

### Sponsor App

| Route | Status | Features |
|--------|--------|----------|
| `/sponsor/dashboard` | ✅ | Overview, metrics, activity |
| `/sponsor/campaigns` | ✅ | Campaign list, create, edit, delete |
| `/sponsor/campaigns/new` | ✅ | Campaign form, validation |
| `/sponsor/campaigns/[id]` | ✅ | Campaign detail, applications, approval workflow |

---

## 📊 Test Coverage

| Area | Status | Coverage |
|------|--------|----------|
| Backend unit tests | ✅ | 8 integration tests |
| Backend integration tests | ✅ | 8 tests covering auth, dashboard, sync |
| Frontend component tests | 🚧 | 0 (planned with Jest) |
| Frontend E2E tests | 🚧 | 0 (planned with Playwright) |
| Database RLS policy tests | 🚧 | 0 (manual verification only) |

---

## 🚀 Deployment Readiness

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend build | ✅ | Next.js production build tested |
| Backend build | ✅ | Express production build tested |
| Database schema | ✅ | Migrations reviewed and applied |
| RLS policies | ✅ | Policies exist but need formal audit |
| Email integration | ✅ | Resend working with verified domains |
| CI/CD | ✅ | GitHub Actions pipeline in place |
| Deployment docs | ✅ | Vercel + Railway setup guide |
| Health monitoring | ✅ | Health endpoint and basic checks |
| Error tracking | 🚧 | Sentry integration planned |
| Analytics | 🚧 | PostHog/Plausible planned |

---

## 🔄 Recent Updates (May–June 2026)

1. **Persistent login** — Sessions now survive browser restarts via sessionStorage + localStorage
2. **Dark mode** — Theme toggle in header with system preference detection
3. **Design system** — Centralized Earnio design tokens (`.agents/skills/earnio-design`)
4. **Navigation refactor** — Single-tab creator navigation with profile dropdown
5. **Visual polish** — Dashboard colors, hero illustrations, explore/wallet page updates
6. **PKCE auth** — Secure code flow implementation
7. **Middleware role checks** — Edge-level protection with cookie-based routing
8. **Icon improvements** — Lucide icon integration throughout UI
9. **CSS class cleanup** — Creator-prefixed styling for consistency
10. **Test coverage** — Backend test count increased to 8 with improved scenarios

---

## 📝 How to Use This Document

- **For developers** — Use to understand what's built and what's planned
- **For product managers** — Reference for roadmap planning
- **For QA** — Use to know what to test
- **For investors** — Reference for feature completeness and progress
- **Update frequency** — After each major feature or bug fix, update the relevant section

*Last reviewed: June 18, 2026*
