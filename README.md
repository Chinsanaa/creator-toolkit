# Earnio

**Earn more, create more.**

UGC monetization platform for Mongolian Gen Z creators and brands. Creators track earnings, apply to sponsorships, and withdraw MNT. Brands run campaigns and review applications.

**Stack:** Next.js 16 + Express 5 + Supabase · Web + iOS · Active development (June 2026)

→ **Full project map:** [context.md](./context.md)

---

## Quick start

**Prerequisites:** Node.js 20+, npm, Supabase project with migrations applied.

```bash
npm install
cd frontend && npm install && cd ../backend && npm install

cp backend/.env.example backend/.env
# Set SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, FRONTEND_URL

echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > frontend/.env.local

npm run dev          # from repo root — frontend :3000 + backend :3001
```

- **Web:** http://localhost:3000  
- **API health:** http://localhost:3001/api/health  
- **Creator signup:** http://localhost:3000/signup/creator  

**Docker:** `docker compose up --build`

---

## Repository layout

| Folder | What |
|--------|------|
| [frontend/](./frontend/) | Next.js website |
| [backend/](./backend/) | Express REST API |
| [supabase/](./supabase/) | SQL migrations |
| [ios/](./ios/) | Native SwiftUI iOS app |
| [docs/](./docs/) | Technical documentation |
| [scripts/](./scripts/) | Dev & smoke-test helpers |

Each folder has its own `README.md`. See [context.md](./context.md) for the complete map.

---

## Environment variables

### Backend (`backend/.env`)

| Variable | Purpose |
|----------|---------|
| `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Database & auth |
| `FRONTEND_URL` | CORS origin (default `http://localhost:3000`) |
| `RESEND_API_KEY`, `EMAIL_FROM` | Email (optional in dev) |
| `ENABLE_SYNC_CRON`, `SYNC_CRON_SECRET` | Platform sync scheduler |

See `backend/.env.example` for the full list.

### Frontend (`frontend/.env.local`)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend URL (default `http://localhost:3001`) |

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend |
| `npm run dev:frontend` | Next.js only |
| `npm run dev:backend` | Express only |
| `npm run build` | Production build (frontend) |
| `npm run lint` | ESLint (frontend) |
| `npm test` | Backend tests (run from `backend/`) |
| `npm run smoke` | HTTP smoke tests |

---

## Documentation

| Topic | Document |
|-------|----------|
| **Start here** | [context.md](./context.md) |
| Architecture | [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) |
| Features & status | [docs/FEATURES.md](./docs/FEATURES.md), [docs/APP_OVERVIEW.md](./docs/APP_OVERVIEW.md) |
| Frontend UI | [docs/FRONTEND.md](./docs/FRONTEND.md) |
| Deploy | [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) |
| QA | [docs/QA_MANUAL_CHECKLIST.md](./docs/QA_MANUAL_CHECKLIST.md) |
| MVP scope | [instructions.md](./instructions.md) |
| Security | [SECURITY_AUDIT.md](./SECURITY_AUDIT.md) |
| Agents (Cursor) | [AGENTS.md](./AGENTS.md) |

In-app guides: http://localhost:3000/docs

---

## License

Private project. All rights reserved.
