# Deployment guide (Phases 11–15)

Production stack: **Vercel** (frontend), **Railway or Render** (backend), **Supabase** (database/auth).

## Prerequisites

- GitHub repo with CI passing (`npm test` in `backend/`, frontend `npm run build`)
- Supabase project with migrations applied and RLS verified
- Resend domain verified for production email

## Frontend (Vercel)

1. Import the repo in [Vercel](https://vercel.com) and set **Root Directory** to `frontend`.
2. Environment variables (see `frontend/.env.example`):

   | Variable | Example |
   |----------|---------|
   | `NEXT_PUBLIC_API_URL` | `https://api.yourdomain.com` |
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |

3. Deploy; confirm the app loads and `/login` works.

## Backend (Railway or Render)

1. Create a service from the repo with **Root Directory** `backend`.
2. Build: `npm install && npm run build`
3. Start: `npm start`
4. Environment variables (see `backend/.env.example`):

   | Variable | Notes |
   |----------|--------|
   | `PORT` | Platform may inject this |
   | `NODE_ENV` | `production` |
   | `FRONTEND_URL` | Vercel URL (no trailing slash) |
   | `SUPABASE_URL` | |
   | `SUPABASE_ANON_KEY` | |
   | `SUPABASE_SERVICE_ROLE_KEY` | Required for sponsor signup / admin writes |
   | `RESEND_API_KEY` | |
   | `EMAIL_FROM` | Verified sender |
   | `ENABLE_SYNC_CRON` | `true` in production if using platform cron |
   | `SYNC_CRON_SECRET` | Random secret for `/api/sync/cron` |

5. Health check: `GET /api/health` should return `200` when the database is reachable.

## Docker (optional)

From repo root:

```bash
docker compose up --build
```

Use the same env vars as above in `docker-compose.yml` or a `.env` file (never commit secrets).

## Domain & SSL

- Point the frontend CNAME to Vercel.
- Point the API subdomain to Railway/Render.
- Enable HTTPS on both (automatic on Vercel/Railway/Render).

## Post-deploy smoke test

```bash
curl https://your-frontend.vercel.app
curl https://api.yourdomain.com/api/health
```

Manual QA: see the [QA checklist](/docs/qa-checklist).
