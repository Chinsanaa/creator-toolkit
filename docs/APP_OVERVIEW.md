# Creator Toolkit — Application Overview

> **Audience:** Anyone new to the project (investors, collaborators, QA, future you).  
> **Last updated:** May 2026 · **Repo:** monorepo (`frontend/` + `backend/` + `supabase/migrations/`)

---

## 1. What is this app?

**Creator Toolkit** is a web platform for **Mongolian content creators** (especially Gen Z on TikTok and YouTube) to:

- See **earnings** from connected platforms in one place  
- Find and apply for **brand sponsorships** (paid in **MNT** — Mongolian Tugrik)  
- Manage a **wallet**, link **local bank accounts**, and request **payouts**  

**Brands / sponsors** use a separate experience to post campaigns, review applications, and approve or reject creators.

The product tagline on the landing page: *“One dashboard for TikTok, YouTube, and brand deals.”*

---

## 2. Who is it for?

| Persona | Goal | Main screens |
|--------|------|----------------|
| **Creator** | Track money, grow via sponsorships, get paid | `/dashboard`, `/platforms`, `/sponsorships`, `/wallet` |
| **Sponsor (brand)** | Run campaigns, pick creators | `/sponsor/dashboard`, `/sponsor/campaigns` |
| **Operator / dev** | Deploy, monitor health, run QA | `/api/health`, `/docs`, CI, Supabase |

**Geographic focus:** Mongolia — MNT currency, Mongolian bank names (Khan Bank, Golomt, etc.) in the wallet UI.

---

## 3. High-level architecture

```
┌─────────────────┐     HTTPS + cookies      ┌─────────────────┐
│  Next.js 16      │  ──────────────────────► │  Express 5 API   │
│  (frontend)      │     Bearer access token   │  (backend)       │
│  port 3000       │     + httpOnly refresh    │  port 3001       │
└────────┬────────┘                           └────────┬────────┘
         │                                              │
         │  Middleware: cookie present?                 │  Supabase JS client
         │  (no role check at edge)                   │  (anon + user JWT)
         ▼                                              ▼
   React UI + AuthContext                         ┌─────────────────┐
                                                 │  Supabase        │
                                                 │  Postgres + Auth │
                                                 │  + RLS policies  │
                                                 └─────────────────┘
                                                         │
                                                         ▼
                                                 Optional: Resend (email)
```

| Layer | Tech | Role |
|-------|------|------|
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind 4 | UI, client auth state, API calls |
| **Backend** | Express 5, TypeScript | Auth proxy, business logic, cron-friendly sync endpoint |
| **Database** | Supabase (PostgreSQL + Auth) | Users, earnings, sponsorships, wallet, notifications |
| **Email** | Resend (optional) | Notification emails when configured |
| **CI** | GitHub Actions | Backend tests + frontend production build |
| **Docker** | `docker-compose.yml` | Optional local full stack |

---

## 4. Core features (what works today)

### 4.1 Authentication

- **Sign up / log in** as **creator** or **sponsor** (separate flows under `/signup/creator`, `/signup/sponsor`, etc.).
- Backend uses **Supabase Auth**; profile row in `users` table (trigger on signup).
- **Access token** stored in a browser cookie (`ct-access-token`, ~1 hour).
- **Refresh token** in **httpOnly** cookie; `/api/auth/refresh` renews access.
- **Logout** clears refresh cookie and client access token.
- Generic error messages for bad login (no email enumeration).

### 4.2 Creator dashboard (`/dashboard`)

- Aggregated stats: totals, monthly trend, per-platform breakdown, recent earnings, connected platforms.
- Data comes from Supabase via authenticated API (`/api/dashboard/*`).
- Demo seed migrations can prepopulate sample earnings for new environments.

### 4.3 Platform connections (`/platforms`)

- Connect **TikTok** or **YouTube** by username (no OAuth yet).
- **“Sync now”** pulls earnings into the database.
- **Important:** sync uses a **mock provider** (`backend/src/platforms/mockPlatformProvider.ts`) — deterministic fake followers/earnings from a hash of platform + user id. UI states this is simulated and production should use real OAuth/API keys.
- Background job: if `ENABLE_SYNC_CRON=true`, server runs sync every **6 hours** (in-process `setInterval`, not a separate worker).

### 4.4 Sponsorship marketplace (creators)

- Browse active campaigns (`/sponsorships`).
- View detail, submit application with pitch text (`/sponsorships/[id]`).
- Track applications (`/sponsorships/applications`).

### 4.5 Sponsor tools

- Dashboard stats: active campaigns, applications, budget (`/sponsor/dashboard`).
- Create campaigns (`/sponsor/campaigns/new`).
- List and manage campaigns; approve/reject applications with optional notes (`/sponsor/campaigns/[id]`).
- Backend enforces **sponsor role** via `assertSponsor()` on sponsor API routes.

### 4.6 Wallet & payouts (`/wallet`)

- Balance summary (available, pending payout, earned, fees).
- Transaction history.
- Add **Mongolian bank accounts** (stored in DB; account numbers masked in API responses).
- **Request payout** (min **50,000 MNT**); creates a `pending` payout transaction and sends in-app (+ email if Resend configured) notification.
- **Platform fee rate** (20%) is exposed in summary; fee rows depend on completed `platform_fee` transactions in DB (not auto-deducted on every sync in code reviewed).

### 4.7 Notifications

- In-app bell with polling (60s).
- Email via Resend when `RESEND_API_KEY` + `EMAIL_FROM` are set.

### 4.8 Docs & ops

- In-app docs at `/docs` (deployment, launch plan, QA checklist markdown).
- Health: `GET /api/health` — database ping, service role / email / cron flags.
- Deployment guide: `docs/DEPLOYMENT.md` (Vercel + Railway/Render + Supabase).

### 4.9 UX polish (partial)

- Dark mode (`ThemeProvider`, localStorage).
- Offline banner (`navigator.onLine`).
- Global error boundary; API timeouts (30s) and offline messaging in `apiFetch`.

---

## 5. Repository layout (where to look)

```
creator-toolkit/
├── frontend/          # Next.js app (pages, components, lib/api)
├── backend/           # Express API (routes, services, jobs)
├── supabase/migrations/  # SQL schema, RLS, seeds
├── docs/              # DEPLOYMENT.md, QA_MANUAL_CHECKLIST.md, this file
├── .github/workflows/ci.yml
└── docker-compose.yml
```

**Key backend routes**

| Prefix | Purpose |
|--------|---------|
| `/api/auth` | signup, login, logout, refresh, me |
| `/api/dashboard` | creator analytics |
| `/api/platforms` | connect, list, sync |
| `/api/sponsorships` | marketplace & applications (creator) |
| `/api/sponsor` | campaigns & application review |
| `/api/wallet` | balance, banks, payouts |
| `/api/notifications` | list, mark read |
| `/api/sync` | manual/cron platform sync trigger |
| `/api/health` | readiness |

---

## 6. Environment & running locally

### Backend (`backend/.env`)

| Variable | Required | Notes |
|----------|----------|--------|
| `SUPABASE_URL` | Yes | |
| `SUPABASE_ANON_KEY` | Yes | |
| `SUPABASE_SERVICE_ROLE_KEY` | Strongly recommended | Username checks, admin writes; warns if missing |
| `FRONTEND_URL` | No | CORS default `http://localhost:3000` |
| `RESEND_API_KEY` / `EMAIL_FROM` | No | Email off if unset |
| `ENABLE_SYNC_CRON` | No | `true` enables 6h in-process sync |
| `SYNC_CRON_SECRET` | For `/api/sync/cron` | Protect external cron calls |

### Frontend (`frontend/.env.local`)

| Variable | Notes |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | Default `http://localhost:3001` |

### Commands

```bash
# Terminal 1
cd backend && npm install && npm run dev    # :3001

# Terminal 2
cd frontend && npm install && npm run dev   # :3000

# Tests
cd backend && npm test                      # 3 API tests
cd frontend && npm run lint && npm run build
```

---

## 7. Diagnosis — what is **not** production-ready / logic gaps

This section is for **honest triage**: what an outsider might assume works but does not yet, or works only partially.

### 7.1 Simulated / stubbed business logic

| Area | Current behavior | Risk |
|------|------------------|------|
| **Platform sync** | Mock hash-based earnings, not TikTok/YouTube APIs | Dashboard numbers are **demo data** after sync |
| **Instagram** | Supported in mock provider | **Not** in frontend connect dropdown (only TikTok, YouTube) |
| **Bank payouts** | Inserts `pending` row in `wallet_transactions` | **No** integration with Mongolian payment rails; no automatic `completed` payout |
| **Bank verification** | `verified: false` on insert | No KYC / micro-deposit flow |
| **OAuth** | Username-only connect | No token refresh from platforms, no revoked-access handling |

### 7.2 Security & access control gaps

| Issue | Detail |
|-------|--------|
| **Edge middleware** | ~~Token-only~~ **Fixed:** `proxy.ts` reads `ct-user-type` and redirects wrong-role routes. Cookie must be set (login/signup/`getMe`); legacy sessions fall back to client shells. |
| **Role redirects** | `CreatorShell` / `SponsorShell` still redirect in `useEffect` as a backup. |
| **Sponsor APIs** | Backend **does** call `assertSponsor()` — good. Creator calling sponsor API gets error, not UI block at edge. |
| **Service role** | Optional; some admin paths degraded without it. |
| **RLS** | Security depends on Supabase policies + correct JWT; must be verified per migration in production. |

### 7.3 Auth & session edge cases

| Issue | Detail |
|-------|--------|
| **Access token TTL** | Cookie `max-age` 1 hour; relies on refresh flow. |
| **Logged-in redirect** | Middleware sends any authed user from `/login` → `/dashboard` (not sponsor home). |
| **Email confirmation** | Supabase may require confirmed email; error mapped in auth service but depends on project settings. |
| **Supabase in frontend** | Packages exist at repo root; **not** wired in Next.js app — all data via REST API. |

### 7.4 Operations & quality

| Issue | Detail |
|-------|--------|
| **Test coverage** | Only **3** backend integration tests; **no** frontend tests, **no** E2E. |
| **CI** | Runs backend tests, frontend **lint** + build. |
| **Sync scheduler** | In-process cron **disabled in production** by default; use `POST /api/sync/cron` with `x-cron-secret`. |
| **Cron** | Prefer external cron hitting `/api/sync/cron` with secret in multi-instance deploys. |
| **Hydration** | Theme read from `localStorage` on client init — possible brief light/dark flash. |

### 7.5 QA checklist vs reality (manual gaps)

From `frontend/content/docs/qa-checklist.md` — treat as **aspirational** until repeatedly verified each release:

- Mobile Lighthouse ≥ 80 — **not automated**
- Sticky apply button on mobile — **verify manually**
- Token auto-refresh on expiry — implemented in `apiFetch` but **needs manual test**
- Sponsor/creator route isolation — **partial** (client redirect + API assert)

### 7.6 Recently fixed (May 2026)

- Frontend **ESLint** `react-hooks/set-state-in-effect` errors (9 files) — resolved; `npm run lint` passes.
- Backend tests and production build pass in CI/local runs.

---

## 8. Troubleshooting guide

| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| Backend won’t start | Missing `SUPABASE_URL` / `SUPABASE_ANON_KEY` | Copy `backend/.env.example` → `.env` |
| Health `database: error` | Wrong Supabase URL/key or migrations not applied | Run migrations; check dashboard |
| Signup fails username | No service role key | Set `SUPABASE_SERVICE_ROLE_KEY` |
| Sponsor signup fails | RLS or trigger | Check `supabase/migrations` applied |
| 401 on all API calls | Expired/missing token | Log in again; check refresh cookie + CORS `credentials` |
| CORS errors | `FRONTEND_URL` mismatch | Match exact origin (no trailing slash) |
| No emails | Resend not configured | Set `RESEND_API_KEY`, `EMAIL_FROM`; verify domain |
| Sync does nothing | Cron disabled | `ENABLE_SYNC_CRON=true` or manual sync on Platforms page |
| Earnings don’t change much | Mock uses monthly seed | Same user+platform → similar range; new month changes bounds |
| Creator sees sponsor UI briefly | Client-only redirect | See to-do: middleware role check |
| `npm run build` warning | Multiple `package-lock.json` | Cosmetic; set `turbopack.root` in `next.config.ts` if desired |

**Health check**

```bash
curl http://localhost:3001/api/health
```

Expect `status: "ok"` and `checks.database: "ok"` when Supabase is reachable.

---

## 9. Data model (conceptual)

| Domain | Main tables (Supabase) |
|--------|-------------------------|
| Users | `users` (profile; linked to `auth.users`) |
| Platforms | platform accounts, sync history, platform earnings |
| Sponsorships | `sponsorships`, applications |
| Wallet | `wallet_transactions`, `bank_accounts` |
| Notifications | notifications table + optional email |

Exact columns and RLS: see `supabase/migrations/*.sql`.

---

## 10. Future to-do list (prioritized)

Use this as a living backlog for editing and improving the product.

### P0 — Before real users / money

- [ ] Replace **mock platform provider** with TikTok/YouTube OAuth + real earnings APIs (or official partner APIs).
- [ ] Integrate **real payout provider** (Mongolian bank API or payment partner); admin flow to mark payouts `completed` / `failed`.
- [ ] **Bank account verification** flow (manual or automated).
- [x] **Middleware role checks** — `ct-user-type` cookie + `proxy.ts` redirects at the edge (May 2026).
- [ ] Audit **Supabase RLS** on all tables; add automated policy tests.
- [x] Require `SUPABASE_SERVICE_ROLE_KEY` in production; API fails startup if missing (May 2026).

### P1 — Reliability & quality

- [x] Add **frontend lint** to CI (`.github/workflows/ci.yml`) (May 2026).
- [x] Expand **backend tests** — 8 tests including 401 guards + cron auth (May 2026).
- [ ] Add **E2E** (Playwright): signup → dashboard → apply → sponsor approve.
- [x] Move platform sync to **external cron** in production — in-process scheduler skipped unless `ENABLE_IN_PROCESS_SYNC_CRON=true` (May 2026).
- [ ] **E2E refresh token** test (expire access, confirm silent refresh).
- [x] Fix login redirect: authed **sponsor** → `/sponsor/dashboard` via proxy + cookies (May 2026).

### P2 — Product completeness

- [x] Add **Instagram** to Platforms UI (May 2026).
- [ ] **Platform fee** automation — document when fees are charged; implement on payout or credit if intended.
- [ ] **Mobile navigation** (hamburger / bottom nav) per launch-plan doc.
- [ ] **Password reset** / email verification UX if Supabase requires confirmation.
- [ ] **Admin panel** for pending payouts and dispute handling.
- [ ] **Analytics** (PostHog/Plausible) and error tracking (Sentry).

### P3 — Polish & growth

- [ ] i18n (**Mongolian** UI copy).
- [ ] Creator public profiles for sponsors (`@username` pages).
- [ ] Campaign filters/search, saved drafts.
- [ ] Push notifications (beyond email).
- [ ] Lighthouse performance budget in CI.
- [ ] Remove unused root `package.json` Supabase deps or wire SSR auth properly.

---

## 11. How this document stays useful

1. After any major feature, update **§4** (features) and **§7** (diagnosis).  
2. When closing a to-do, move it to a **Changelog** subsection with date.  
3. Before launch, run `docs/QA_MANUAL_CHECKLIST.md` and tick items in the in-app `/docs/qa-checklist`.  
4. Keep `docs/DEPLOYMENT.md` in sync with real hosting URLs and secrets naming.

---

## 12. Quick reference — “Is it working?”

| Check | Command / URL | Pass criteria |
|-------|----------------|---------------|
| Backend tests | `cd backend && npm test` | 8/8 pass |
| Frontend lint | `cd frontend && npm run lint` | 0 errors |
| Frontend build | `cd frontend && npm run build` | Success |
| API health | `GET /api/health` | `status: ok`, `database: ok` |
| App smoke | Login as creator + sponsor | Dashboards load, no 401 loops |

---

*For deployment steps see [DEPLOYMENT.md](./DEPLOYMENT.md). For manual QA see [QA_MANUAL_CHECKLIST.md](./QA_MANUAL_CHECKLIST.md) or `/docs/qa-checklist` in the running app.*
