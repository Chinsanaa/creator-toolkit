# EARNIO: The 6 Project Documents

Original product specifications. Build rules: [../instructions.md](../instructions.md). Repo map: [../context.md](../context.md).

**Project:** Creator monetization platform for Mongolian UGC creators and brands  
**Status:** MVP (12-week build, option B: custom video content)  
**Revenue:** 20% commission on sponsorships (creators earn 80%)

---

## Document 01 — PRD: Product Requirements Document

### App Name
**Earnio**

### Tagline
**Earn more, create more**

### Problem
Mongolian Gen Z creators (18–30) lack centralized platform to find brand sponsorship deals, earn money from custom content, manage MNT payouts. Brands lack access to vetted creator network at scale.

### Target User
Content creators aged 18–30 in Mongolia with active TikTok/YouTube/Instagram (5K+ followers). Motivated by supplemental income. Early adopters willing to film custom sponsored videos for brands.

### Revenue Model
**20% commission on sponsorship deals** (creators earn 80%). Optional: $7/month Pro tier for premium sponsorships (future, not MVP).

### Supported Platforms
- TikTok (mock data, no real API integration)
- YouTube (mock data, no real API integration)
- Instagram (mock data, no real API integration)

### Must Have Features
- Creator & sponsor auth (email/password, Supabase JWT)
- Campaign marketplace (CRUD)
- Creator application system with pitch
- Mock earnings sync (TikTok, YouTube, Instagram)
- Wallet with transaction history
- Payout requests (mock Khan Bank)
- Email notifications (Resend test mode)

### Nice to Have
- Creator portfolio/verified badge
- Advanced search/filters (sponsors)
- Campaign analytics (sponsors)
- Creator reputation system

### Out of Scope (MVP)
- Real TikTok/YouTube/Instagram OAuth
- Real Stripe payments
- Cron scheduler
- Creator KYC/verification

### User Stories

**Creator:**
- As a creator, I want to connect multiple social accounts so I can track earnings in one place
- As a creator, I want to browse brand campaigns so I can find sponsorship opportunities
- As a creator, I want to apply to campaigns with a pitch so I can secure deals
- As a creator, I want to request payouts so I can withdraw earnings to my bank account

**Sponsor:**
- As a sponsor, I want to create a campaign so creators can apply
- As a sponsor, I want to review creator applications so I can assess fit
- As a sponsor, I want to approve/reject applicants so I can confirm partnerships

### Success Metrics (MVP)
- Creator signup: 5+ test accounts with multiple platform connections
- Sponsor campaign creation: 1 (Maybee Pop&Joy)
- Application submissions: 3+
- End-to-end flow working (apply → approve → payout)
- Both deploys live (Vercel + Railway)

---

## Document 02 — TRD: Technical Requirements Document

### Frontend
**Next.js 16+** (App Router, TypeScript, Tailwind CSS)

### Backend
**Express.js 5** (TypeScript)

### Database
**PostgreSQL via Supabase** (existing project)

### Auth
**Supabase Auth** (email/password, JWT)

### Hosting
- Frontend: **Vercel**
- Backend: **Railway**
- Database: **Supabase**

### Email
**Resend** (test mode, no real sending)

### Payment
**Mock Stripe checkout** (no real processing)

### Platform Data
**Mock TikTok, YouTube, Instagram sync** (no real OAuth)

### Key Environment Variables
- `NEXT_PUBLIC_API_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `FRONTEND_URL`

### Constraints
- Mobile responsive required
- Dark mode primary
- Free tier services preferred
- No real API integrations (all mock)

### Key Libraries
- React Query (frontend data fetching)
- Zod (validation)
- Lucide Icons (UI)

---

## Document 03 — App Flow: Navigation & User Journeys

### All Routes

**Public:**
- `/` (creator landing)
- `/login/creator`, `/signup/creator`
- `/login/sponsor`, `/signup/sponsor`
- `/brands` (sponsor landing)
- `/docs` (documentation)

**Creator App (requires login):**
- `/dashboard` (earnings summary, checklist)
- `/sponsorships` (browse campaigns)
- `/sponsorships/[id]` (campaign detail, apply with pitch)
- `/sponsorships/applications` (track status)
- `/platforms` (connect TikTok/YouTube/Instagram, sync)
- `/wallet` (balance, payouts, transactions)

**Sponsor App (requires login):**
- `/sponsor/dashboard` (overview)
- `/sponsor/campaigns` (list campaigns)
- `/sponsor/campaigns/new` (create campaign)
- `/sponsor/campaigns/[id]` (manage & review applications)

### Navigation Structure
- **Desktop:** Sidebar (CreatorShell for creators, SponsorShell for sponsors)
- **Mobile:** Bottom tab navigation

### Creator Core Journey

1. Visit earnio.mn landing page
2. Click "Get Started" → `/signup/creator`
3. Create account (email, password, accept terms)
4. Redirected to `/dashboard` (empty state, getting-started checklist)
5. Navigate to `/platforms`, connect TikTok/YouTube/Instagram (username input, mock sync)
6. Earnings appear on `/dashboard`
7. Browse `/sponsorships` (search, filter)
8. Click campaign → `/sponsorships/[id]`, read brief, submit application with pitch
9. Track status on `/sponsorships/applications`
10. Payout request on `/wallet`

### Sponsor Core Journey

1. Visit `/brands` landing page
2. Click "Get Started" → `/signup/sponsor`
3. Create account (email, password, accept terms)
4. Redirected to `/sponsor/dashboard`
5. Navigate to `/sponsor/campaigns/new`, fill campaign form (name, brief, target, budget, engagement goal, deadline)
6. Campaign published (status: active)
7. Track applications on `/sponsor/campaigns/[id]`
8. Review creator profiles & pitches
9. Approve/reject applicants
10. (Future) View campaign analytics

### Auth Flow

- Signup → Email/password entry
- Accept ToS/Privacy → Confirmation (Resend test email)
- Redirected to dashboard (creator or sponsor)
- Login → Email/password → JWT token stored in memory + HttpOnly cookie
- Protected routes check token, redirect to `/login` if missing

### Empty States & Redirects

- No campaigns found: "No sponsorships available yet. Check back soon."
- No applications: "You haven't applied to any campaigns."
- No earnings: "Connect TikTok to see earnings."
- Unauthenticated user on `/dashboard` → redirect to `/login`

### Platforms Page Detail

Creators can connect multiple accounts. Display list of connected platforms (TikTok, YouTube, Instagram) with sync buttons. Each platform shows:
- Last synced time
- Total earnings this month
- Followers count (mock)

One-click sync pulls fake earnings data and displays on dashboard.

---

## Document 04 — UI/UX Design Brief

### Aesthetic
Minimal, clean, modern. Dark mode primary. Like Linear or Vercel.

### Color Palette
- **Primary Color:** `#2E5BFF` (Earnio blue)
- **Background:** `#0D0D0D` (dark), `#FFFFFF` (light optional)
- **Text:** `#F5F5F7` (light text on dark)
- **Accent/CTA:** `#2E5BFF` (blue buttons, links)

### Typography
- **Headings:** Poppins (24px–14px)
- **Body:** Montserrat (14px–12px)

### Components
- Border Radius: **8px** (cards, inputs, buttons)
- Shadows: **Subtle** (0 4px 8px rgba(0,0,0,0.1))
- Cards (campaigns, applications)
- Tables (transaction history)
- Forms (signup, campaign creation)
- Modals (confirm actions)

### Mobile & Responsiveness
- Fully responsive
- Bottom tab navigation on mobile
- Tabs: Dashboard, Sponsorships, Wallet (for creators)

### Accessibility
- WCAG AA contrast ratios
- Touch targets min 44px
- Keyboard navigation supported

---

## Document 05 — Backend Schema: Data Model

### Tables

#### users
```
id (uuid, primary key)
email (text, unique)
password_hash (text)
name (text)
user_type (enum: 'creator' | 'sponsor')
created_at (timestamp)
updated_at (timestamp)
```

#### platforms
```
id (uuid, primary key)
user_id (FK → users.id)
platform (enum: 'tiktok' | 'youtube' | 'instagram')
username (text)
connected_at (timestamp)
last_synced (timestamp)
```

#### earnings
```
id (uuid, primary key)
user_id (FK → users.id)
platform (text: 'tiktok' | 'youtube' | 'instagram')
amount_mnt (decimal)
views (int)
engagement (int)
followers (int)
earned_at (timestamp)
```

#### campaigns
```
id (uuid, primary key)
sponsor_id (FK → users.id)
title (text)
brief (text)
content_type (text)
target_audience (text)
budget_mnt (decimal)
views_target (int)
engagement_target (int)
deadline (timestamp)
status (enum: 'draft' | 'active' | 'closed')
created_at (timestamp)
updated_at (timestamp)
```

#### applications
```
id (uuid, primary key)
campaign_id (FK → campaigns.id)
creator_id (FK → users.id)
pitch (text)
status (enum: 'pending' | 'approved' | 'rejected')
created_at (timestamp)
updated_at (timestamp)
```

#### wallet_transactions
```
id (uuid, primary key)
user_id (FK → users.id)
type (enum: 'earning' | 'payout' | 'fee')
amount_mnt (decimal)
related_application_id (FK → applications.id, nullable)
status (enum: 'pending' | 'completed' | 'failed')
created_at (timestamp)
updated_at (timestamp)
```

#### bank_accounts
```
id (uuid, primary key)
user_id (FK → users.id)
bank_name (text)
account_number (text)
account_holder (text)
created_at (timestamp)
updated_at (timestamp)
```

#### notifications
```
id (uuid, primary key)
user_id (FK → users.id)
type (text)
message (text)
read (boolean)
created_at (timestamp)
updated_at (timestamp)
```

### Relationships
- `users` (1) → (many) `platforms`, `earnings`, `campaigns`, `applications`, `wallet_transactions`, `bank_accounts`, `notifications`
- `campaigns` (1) → (many) `applications`
- `applications` (many) → (1) `campaigns`, (1) `users` (creators)

### Auth & Security
- **Auth Provider:** Supabase Auth (JWT tokens, email/password)
- **Session:** JWT access token (15 min expiry) stored in memory + HttpOnly refresh token cookie
- **Row Level Security:** Users can only read/write their own data. Sponsors can only create/edit their own campaigns. Creators can only see campaigns and their own applications.

### Indexes
- `users.email` (unique)
- `platforms.user_id`
- `earnings.user_id`
- `campaigns.sponsor_id`
- `applications.campaign_id`
- `applications.creator_id`
- `wallet_transactions.user_id`
- `notifications.user_id`

### Changes from Previous Versions
- `platforms.platform` now includes `'instagram'`
- `earnings.platform` includes `'instagram'`
- `earnings` adds `'followers'` column to track follower counts across all 3 platforms

---

## Document 06 — Implementation Plan: 12-Week Build Roadmap

### Phase 1–2: Setup & Database (Weeks 1–2)

**Goals:**
- Project scaffold
- GitHub repo setup
- Env vars configured
- Supabase migrations applied
- Local dev environment working

**Done Criteria:**
- `npm run dev:frontend` && `npm run dev:backend` both start without errors
- Supabase migrations applied
- `.env` files configured
- All 8 tables created
- Foreign keys linked
- RLS policies blocking unauthorized access
- Dummy creator & sponsor accounts in DB

### Phase 3–4: Backend + Frontend Auth (Weeks 2–4)

**Goals:**
- Backend auth routes (signup, login, logout, me, refresh)
- Frontend signup/login pages (creator & sponsor)
- Auth context (React)
- Protected route middleware
- Session persistence

**Done Criteria:**
- Signup creates user in DB
- Login returns JWT + refresh token
- Refresh endpoint extends session
- Me endpoint returns authenticated user
- Signup → dashboard redirect works
- Login sets token in cookie & memory
- Logout clears session
- Unauthenticated users redirected to `/login`

### Phase 5–6: Dashboard + Platforms Sync (Weeks 4–6)

**Goals:**
- Creator dashboard with earnings summary
- Mock earnings data from all 3 platforms (TikTok, YouTube, Instagram)
- Getting-started checklist
- `/platforms` page (connect & sync)
- Manual sync endpoint

**Done Criteria:**
- Dashboard shows fake earnings data
- Chart renders monthly trend
- Checklist shows 4 items (connect platform, apply, add bank, done)
- Creators can enter username for each platform
- Clicking 'Sync' populates mock earnings
- Earnings appear in `/dashboard`
- `/platforms` shows connection status

### Phase 7–8: Sponsorships + Sponsor Dashboard (Weeks 6–8)

**Goals:**
- GET `/api/sponsorships` (list all)
- GET `/api/sponsorships/[id]` (detail)
- POST `/api/sponsorships/apply` (create application)
- Frontend browse & detail pages
- Sponsor dashboard (overview)
- Campaign CRUD
- Application review page

**Done Criteria:**
- Sponsorships page lists Maybee Pop&Joy campaign
- Campaign detail shows brief, target, budget
- Apply form accepts pitch text
- Application created in DB
- Sponsor can create campaign
- Campaign appears in `/sponsor/campaigns`
- Review page shows creator applications
- Approve/reject updates DB

### Phase 9–10: Wallet + Email (Weeks 8–10)

**Goals:**
- GET `/api/wallet/summary` (balance)
- GET `/api/wallet/transactions` (history)
- POST `/api/wallet/bank-accounts` (add)
- POST `/api/wallet/payouts` (request, mock)
- Resend integration (test mode)
- Email templates (signup, application, approval)
- Frontend wallet page

**Done Criteria:**
- Wallet shows balance from applications
- Transaction history lists earnings & payouts
- Payout request form accepts bank details
- Mock payout creates transaction record
- Signup sends confirmation email
- Application approval sends notification
- Email templates render correctly

### Phase 11–12: Polish + Deploy (Weeks 10–12)

**Goals:**
- Mobile responsive (all pages)
- Dark mode consistency
- Button states (hover, active, disabled)
- Loading spinners & empty states
- Error messages
- Deploy frontend to Vercel
- Deploy backend to Railway
- Database migrations in prod
- Smoke tests pass

**Done Criteria:**
- All pages work on mobile (iPhone 375px)
- Dark mode theme applied everywhere
- Forms have success/error states
- Loading states show spinners
- Creator signup → apply → approval → payout works end-to-end
- Sponsor campaign creation → review → approval works
- Both deploys live & accessible
- No console errors in browser

---

## Done Criteria (Final)

**MVP is complete when:**

1. ✅ Creator can connect TikTok + YouTube + Instagram and see combined earnings
2. ✅ Creator signup → apply → approval → payout works end-to-end
3. ✅ Sponsor campaign creation → review → approval works
4. ✅ Both live on production (Vercel + Railway)
5. ✅ Founder can demo the entire flow with Maybee Pop&Joy campaign

---

## Key Notes

- **Mock Data is Sacred:** Don't add real APIs. They add 60+ hours to timeline.
- **Focus on Flow:** End-to-end demo matters more than polish.
- **Scope Creep is the Enemy:** If it's not in these 6 documents, don't build it.
- **12 Weeks is Tight:** Protect it. No extensions.

---

**Earn more. Create more. Ship it.**
