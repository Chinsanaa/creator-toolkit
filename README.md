# Earnio

**Earn more, create more.**

Earnio is a full-stack UGC (User-Generated Content) monetization platform for **Mongolian Gen Z content creators** and the **brands** that want to sponsor them. Creators connect TikTok, YouTube, and Instagram, track earnings in one place, apply to brand deals, and withdraw money in MNT. Brands post sponsorship campaigns, review applications, and manage partnerships from a separate dashboard.

This repository is a **monorepo** with a Next.js 16 website (frontend) and an Express 5 API (backend), backed by **Supabase** (PostgreSQL + authentication). The project is designed as an MVP with comprehensive features, responsive design, dark mode support, and mobile-ready interfaces.

**Design System:** Modern dark-mode interface with Earnio Blue (`#2E5BFF`) as the primary brand color, cool slate ink ramp, cyan spark accents, and 8px border radius for all components.

**Current Status:** Active development (June 2026) · **Platform Support:** Web + iOS (Capacitor)

---

## Table of contents

- [The big picture](#the-big-picture)
- [Who uses Earnio?](#who-uses-earnio)
- [How it works (user journeys)](#how-it-works-user-journeys)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Repository layout](#repository-layout)
- [Frontend](#frontend)
- [Backend](#backend)
- [Database & auth](#database--auth)
- [Running locally](#running-locally)
- [Environment variables](#environment-variables)
- [Scripts & CI](#scripts--ci)
- [Deployment](#deployment)
- [Further reading](#further-reading)

---

## The big picture

Most creators juggle multiple apps: one for analytics, another for brand DMs, spreadsheets for income, and a bank app for payouts. Earnio brings the workflow into a **single product**:

1. **Connect** social platforms (TikTok, YouTube, Instagram).
2. **See** earnings and trends on a dashboard.
3. **Explore** sponsorship opportunities from local brands.
4. **Apply** to campaigns and track application status.
5. **Get paid** through an in-app wallet with Mongolian bank payouts.

Brands get the mirror experience: create campaigns, receive creator applications, and manage deals without scattered email threads.

```
┌─────────────────────────────────────────────────────────────────┐
│                         earnio website                          │
│  Landing pages  →  Sign up / Log in  →  Creator or Brand app   │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS (JSON API)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Express backend (API)                      │
│   Auth · Dashboard · Platforms · Sponsorships · Wallet · …      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Supabase (Postgres + Auth)                   │
│   Users · Earnings · Campaigns · Applications · Wallet · …      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Who uses Earnio?

| Audience | What they do | Entry point |
|----------|--------------|-------------|
| **Creators** | Sync platform earnings, browse sponsorships, apply to deals, manage wallet & payouts | [earnio.app `/`](http://localhost:3000) (creator landing) |
| **Brands (sponsors)** | Post campaigns, review creator applications, track partnerships | [`/brands`](http://localhost:3000/brands) (brand landing) |

Each audience has its own landing page, login/signup flow, and logged-in experience. A creator account cannot access sponsor tools (and vice versa); the app redirects users to the correct home dashboard after login.

---

## How it works (user journeys)

### Creator journey

1. **Discover** — Visit the creator landing page. Learn how Earnio works, read FAQs, and click **Get Started**.
2. **Sign up** — Create an account at `/signup/creator`. You must accept the Terms and Privacy Policy (legal text is served from the API and can be replaced later).
3. **Onboard** — The dashboard shows a getting-started checklist:
   - Connect TikTok, YouTube, or Instagram
   - Apply to a sponsorship
   - Add a bank account for payouts
4. **Connect platforms** — On **Platforms**, link accounts by username. **Sync** pulls earnings into the dashboard (demo/mock provider in development).
5. **Explore deals** — On **Explore** (`/sponsorships`), search and browse brand campaigns. Open a listing, read the brief, and submit an application pitch.
6. **Track applications** — See status (pending, approved, rejected, etc.) on **My applications**.
7. **Wallet** — View balance, request payouts to a Mongolian bank (Khan Bank, Golomt, etc.), and review transaction history. Platform fees apply on sponsorship earnings.

### Brand (sponsor) journey

1. **Discover** — Visit `/brands` to learn how brand partnerships work.
2. **Sign up** — Create a sponsor account at `/signup/sponsor`.
3. **Dashboard** — Overview of campaigns and activity at `/sponsor/dashboard`.
4. **Campaigns** — Create sponsorship listings (budget, content type, deadlines, requirements). Manage status (draft, active, closed).
5. **Applications** — Review creator pitches on each campaign and approve or reject applicants.

---

## Architecture

Earnio follows a classic **SPA + REST API** pattern with edge middleware protection:

| Layer | Role |
|-------|------|
| **Frontend** | Next.js 16 App Router with Turbopack. Renders pages, handles navigation, manages auth state with persistent login, calls the API. Features dark mode, responsive design, and mobile-optimized UI. |
| **Backend** | Express 5 API with TypeScript. Validates auth, enforces role-based access, runs business logic, manages background sync jobs, integrates with Supabase. |
| **Supabase** | PostgreSQL database with row-level security (RLS) policies, email/password authentication, JWT tokens. |
| **Mobile** | Capacitor 7.x iOS wrapper for web app deployment to App Store. |

**Request flow (example: load dashboard)**

1. Browser loads `/dashboard` (Next.js page).
2. Middleware (`proxy.ts`) checks for auth cookie and user role (`ct-user-type`); redirects unauthenticated users to `/login`.
3. React component calls `GET /api/dashboard/summary` with Bearer token in headers.
4. Backend verifies JWT, checks user role, queries Supabase, returns earnings + platform data.
5. Frontend renders stats, charts, and the getting-started checklist with theme-aware styling.

**Authentication model**

- **Access token** — Short-lived JWT (1 hour) returned on login/signup; stored in httpOnly cookie + memory.
- **Refresh token** — Long-lived httpOnly cookie; used to silently refresh access token when expired.
- **Persistent login** — SessionStorage + localStorage maintain login state across browser restarts until explicit logout.
- **PKCE flow** — OAuth-compatible code flow for enhanced security.
- Protected API routes use `verifyToken` middleware; missing or invalid tokens receive `401`.
- **Role enforcement** — Middleware redirects users to correct dashboard (creator vs. sponsor) based on `ct-user-type` cookie.

---

## Tech stack

| Area | Technology |
|------|------------|
| Frontend framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack dev, Server Components) |
| Frontend UI | React 19, Tailwind CSS 4, Lucide Icons |
| Frontend state | Context API (Auth), localStorage + sessionStorage (persistence) |
| Backend | [Express 5](https://expressjs.com), TypeScript |
| Database & auth | [Supabase](https://supabase.com) (PostgreSQL 15+ with RLS policies, JWT Auth) |
| Email | [Resend](https://resend.com) (transactional notifications) |
| Mobile | [Capacitor 7.x](https://capacitorjs.com) (iOS native wrapper) |
| CI/CD | GitHub Actions (tests, linting, builds) |
| Containers | Docker Compose (local full-stack development) |
| Hosting (recommended) | Vercel (frontend), Railway/Render (backend), Supabase (database) |

**Brand & design system**

- Product name: **Earnio**
- Slogan: *Earn more, create more*
- Typography: Poppins (headings), Montserrat (body)
- Primary color: `#6336F1` (purple gradient in logo and CTAs)
- **Dark mode support** — Toggle in navigation; theme persisted in localStorage
- **Design tokens** — Centralized color, spacing, and typography in Tailwind config
- **Responsive design** — Mobile-first approach; sidebar (desktop) + bottom tab bar (mobile)

---

## Repository layout

```
creator-toolkit/          # monorepo root (npm scripts delegate to frontend/backend)
├── frontend/             # Next.js website — port 3000
│   ├── app/              # Routes (pages, layouts, auth groups)
│   ├── components/       # UI (landing, auth, dashboard, layout, …)
│   ├── lib/              # API client, auth helpers, types, landing content
│   └── content/docs/     # Markdown docs shown at /docs
├── backend/              # Express API — port 3001
│   └── src/
│       ├── routes/       # HTTP endpoints
│       ├── services/     # Business logic
│       ├── content/legal/# Privacy policy & terms (markdown placeholders)
│       └── tests/        # API tests (node:test + supertest)
├── supabase/
│   └── migrations/       # SQL schema, RLS policies, demo seeds
├── docs/                 # Deployment & frontend guides
├── scripts/              # Smoke tests
└── docker-compose.yml    # Run frontend + backend in containers
```

---

## Core Features

### For Creators
✅ **Authentication** — Sign up / login with email and password; persistent login across sessions
✅ **Dashboard** — Real-time earnings summary, monthly trends, platform breakdown, getting-started checklist  
✅ **Platform connections** — Connect TikTok, YouTube, Instagram; sync earnings with one-click sync button  
✅ **Sponsorship marketplace** — Browse active brand campaigns, apply with pitch text, track application status  
✅ **Wallet management** — View balance, transaction history, request payouts to Mongolian bank accounts  
✅ **Notifications** — In-app bell (polling every 60s), email notifications via Resend  
✅ **Dark mode** — System-aware or manual toggle with persistent preference  

### For Brands/Sponsors
✅ **Campaign management** — Create, edit, and manage sponsorship listings (budget, requirements, deadlines)  
✅ **Application review** — Review creator pitches, approve or reject with optional notes  
✅ **Dashboard** — Overview of active campaigns, application metrics, budget tracking  

### Platform Features
✅ **Role-based routing** — Edge middleware enforces creator/sponsor separation  
✅ **Responsive design** — Mobile-optimized UI with adaptive navigation  
✅ **Mock platform integration** — Realistic demo data for TikTok/YouTube/Instagram earnings  
✅ **Background sync** — Periodic platform earnings synchronization (configurable 6h intervals)  
✅ **Email notifications** — Transactional emails for signups, approvals, payouts  
✅ **Row-level security** — PostgreSQL policies ensure data isolation per user  

---

## Frontend

The frontend is a **Next.js App Router** application in `frontend/`. It serves both marketing pages and the logged-in product.

### Public pages

| Route | Purpose |
|-------|---------|
| `/` | Creator landing — hero, how it works, features, testimonials, FAQ |
| `/brands` | Brand landing — sponsor-focused value proposition |
| `/login/creator`, `/signup/creator` | Creator authentication |
| `/login/sponsor`, `/signup/sponsor` | Sponsor authentication |
| `/docs` | Internal documentation (deployment, QA, launch plan) |

`/login` and `/signup` redirect to the creator auth flows by default.

### Creator app (requires login)

| Route | Purpose |
|-------|---------|
| `/dashboard` | Earnings summary, monthly trend, getting-started checklist |
| `/sponsorships` | Explore and search sponsorship listings |
| `/sponsorships/[id]` | Campaign detail + apply with a pitch |
| `/sponsorships/applications` | Track your applications |
| `/platforms` | Connect TikTok, YouTube, and Instagram and sync earnings |
| `/wallet` | Balances, payouts, bank accounts, transaction history |

Uses `CreatorShell` → sidebar (desktop) + bottom tab bar (mobile), Earnio purple theme with dark mode support. Recent updates include single-tab navigation system, profile dropdown in header, and improved visual hierarchy with consistent design tokens.

### Sponsor app (requires login)

| Route | Purpose |
|-------|---------|
| `/sponsor/dashboard` | Sponsor overview |
| `/sponsor/campaigns` | List campaigns |
| `/sponsor/campaigns/new` | Create a campaign |
| `/sponsor/campaigns/[id]` | Manage a campaign & applications |

### How the frontend talks to the backend

- API base URL: `NEXT_PUBLIC_API_URL` (default `http://localhost:3001`).
- Client module: `frontend/lib/api/client.ts` — wraps `fetch`, attaches Bearer token, retries on `401` via refresh.
- Feature modules: `lib/api/dashboard.ts`, `sponsorships.ts`, `wallet.ts`, etc.
- Auth state: `contexts/AuthContext.tsx` — login, signup, logout, session restore.
- Route protection: `frontend/proxy.ts` — redirects unauthenticated users away from app routes.

### Key frontend folders

| Path | What lives here |
|------|-----------------|
| `components/landing/` | Marketing sections (nav, hero, FAQ, features) |
| `components/auth/` | Login/signup forms, legal consent modal |
| `components/brand/` | Earnio logo component |
| `components/layout/` | `CreatorAppShell`, `SponsorShell`, navigation config |
| `lib/landing/content.ts` | All landing copy & nav links (single config file) |
| `lib/brand/earnio.ts` | Brand colors and slogan constants |

---

## Backend

The backend is an **Express 5** TypeScript API in `backend/`. It does not serve HTML; it only exposes JSON endpoints under `/api/*`.

### API routes

| Prefix | Endpoints (summary) | Auth |
|--------|---------------------|------|
| `/api/health` | Service health + DB connectivity | Public |
| `/api/auth` | `signup`, `login`, `logout`, `refresh`, `me` | Mixed |
| `/api/legal` | `privacy-policy`, `terms-and-conditions` (markdown) | Public |
| `/api/dashboard` | Creator earnings summary & trends | Required |
| `/api/platforms` | List/connect platforms, sync earnings, sync history | Required |
| `/api/sponsorships` | Listings, detail, apply, my applications | Required |
| `/api/wallet` | Summary, transactions, bank accounts, payouts | Required |
| `/api/sponsor` | Dashboard, campaigns CRUD, application review | Required |
| `/api/notifications` | List, mark read | Required |
| `/api/sync` | Cron trigger for platform sync jobs | Secret header |

### Backend structure

```
backend/src/
├── app.ts              # Express app factory (CORS, routes, error handler)
├── index.ts            # Server entry + sync scheduler
├── routes/             # Thin HTTP handlers
├── services/           # Business logic (auth, dashboard, wallet, …)
├── database/supabase.ts
├── proxy/authProxy.ts  # JWT verification middleware
├── jobs/syncScheduler.ts
└── emails/templates.ts # Notification email HTML
```

**Services** encapsulate Supabase queries and rules. **Routes** parse requests, call services, and return JSON. Errors use a consistent shape via `AppError`.

### Platform sync

A background scheduler (`syncScheduler`) can periodically sync creator platform earnings:

- **In-process cron** — When `ENABLE_SYNC_CRON=true`, syncs every 6 hours using `setInterval`
- **External cron** — In production, external scheduler hits `POST /api/sync/cron` with `SYNC_CRON_SECRET` header
- **Mock provider** — Current implementation uses deterministic hash-based earnings (`platforms/mockPlatformProvider.ts`), suitable for demos
- **Real integration** — Production should replace mock with official TikTok/YouTube/Instagram OAuth + earnings APIs

Sync updates earnings history, platform stats, and notifies users of new earnings in their dashboard.

---

## Database & auth

**Supabase** provides:

- **Auth** — Email/password signup and login. User metadata stores name, username, `user_type` (`creator` | `sponsor`), and terms acceptance timestamp.
- **PostgreSQL** — Application tables for users, platform accounts, earnings, sponsorships, applications, wallet transactions, bank accounts, notifications, etc.
- **Row Level Security (RLS)** — Policies so users only read/write their own data.

SQL migrations live in `supabase/migrations/`. Apply them to your Supabase project (CLI or dashboard). Demo seed migrations populate sample dashboard and sponsorship data for local development.

On signup, a database trigger (`handle_new_user`) copies the new auth user into `public.users` so the app has a profile row immediately.

---

## Running locally

### Prerequisites

- **Node.js 20+**
- **npm**
- A **Supabase** project with migrations applied (or use placeholder env vars for limited testing)

### 1. Install dependencies

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 2. Configure environment

Copy and fill in env files:

```bash
cp backend/.env.example backend/.env
```

Set at minimum in `backend/.env`:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `FRONTEND_URL=http://localhost:3000`

For the frontend, create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Start both services

**Terminal A — backend (port 3001)**

```bash
cd backend
npm run dev
```

**Terminal B — frontend (port 3000)**

```bash
cd frontend
npm run dev
```

Or from the repo root:

```bash
npm run dev:backend
npm run dev:frontend
```

### 4. Verify

- Website: http://localhost:3000
- API health: http://localhost:3001/api/health
- Creator signup: http://localhost:3000/signup/creator

### Docker (optional)

```bash
docker compose up --build
```

Runs frontend on `:3000` and backend on `:3001` with linked env.

---

## Environment variables

### Backend (`backend/.env`)

| Variable | Purpose |
|----------|---------|
| `PORT` | API port (default `3001`) |
| `FRONTEND_URL` | CORS origin (e.g. `http://localhost:3000`) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side admin operations |
| `RESEND_API_KEY` | Email delivery (optional in dev) |
| `EMAIL_FROM` | Sender address for notifications |
| `ENABLE_SYNC_CRON` | Enable in-process sync scheduler |
| `SYNC_CRON_SECRET` | Protects manual cron endpoint |

### Frontend (`frontend/.env.local`)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend base URL |

---

## Scripts & CI

From the **repo root**:

| Command | Description |
|---------|-------------|
| `npm run dev:frontend` | Start Next.js dev server |
| `npm run dev:backend` | Start Express with hot reload |
| `npm run build` | Production build (frontend) |
| `npm run build:backend` | Compile backend TypeScript |
| `npm run lint` | ESLint (frontend) |

**Backend tests** (from `backend/`):

```bash
npm test
```

**Smoke test** (routes + API, from repo root):

```bash
node scripts/smoke-test.mjs
```

**CI** (GitHub Actions) runs backend build + tests and frontend build on every push/PR to `main`/`master`.

---

## Deployment

Typical production setup:

| Component | Host |
|-----------|------|
| Frontend | [Vercel](https://vercel.com) — root directory `frontend/` |
| Backend | Railway, Render, or similar — root directory `backend/` |
| Database | Supabase (managed Postgres + Auth) |

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for step-by-step instructions, env vars, and post-deploy checks.

---

## Further reading

| Document | Contents |
|----------|----------|
| [docs/FRONTEND.md](docs/FRONTEND.md) | Landing pages, auth UI, design tokens, route map |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Production deployment guide |
| [docs/QA_MANUAL_CHECKLIST.md](docs/QA_MANUAL_CHECKLIST.md) | Manual QA checklist |
| [AGENTS.md](AGENTS.md) | Developer quick reference (ports, commands, gotchas) |

---

## License

Private project. All rights reserved unless otherwise specified.
