# Earnio — Application Status & Operations

> **Audience:** QA, operators, future maintainers.  
> **Not duplicated here:** architecture, features list, env setup, or quick start — see [context.md](../context.md).

**Last updated:** June 2026 · **Status:** MVP with comprehensive features; mock platform sync and payouts.

---

## What is this app?

**Earnio** helps Mongolian creators track earnings, find brand sponsorships (MNT), and manage payouts. Brands post campaigns and review applications. Two roles: **creator** and **sponsor**, with separate landing pages and app shells.

| Persona | Main screens |
|---------|--------------|
| Creator | `/dashboard`, `/platforms`, `/sponsorships`, `/wallet` |
| Sponsor | `/sponsor/dashboard`, `/sponsor/campaigns` |

---

## Honest triage — what is not production-ready

### Simulated / stubbed logic

| Area | Current behavior | Risk |
|------|------------------|------|
| **Platform sync** | Mock hash-based earnings | Dashboard numbers are demo data |
| **Bank payouts** | Inserts `pending` transaction | No Mongolian payment rail integration |
| **Bank verification** | `verified: false` on insert | No KYC flow |
| **OAuth** | Username connect + partial OAuth infra | Real tokens not required for MVP |

### Security & access (mostly addressed)

| Item | Status |
|------|--------|
| Edge role routing (`ct-user-type` cookie) | Fixed — `proxy.ts` redirects wrong-role routes |
| Sponsor API enforcement | Backend `assertSponsor()` on sponsor routes |
| RLS | Must be verified per migration in production |

### Quality gaps

| Item | Detail |
|------|--------|
| Test coverage | Backend integration tests only; no frontend/E2E |
| Sync scheduler | In-process cron off in production; use `POST /api/sync/cron` |
| Lighthouse / mobile QA | Not automated — use [QA_MANUAL_CHECKLIST.md](./QA_MANUAL_CHECKLIST.md) |

Full feature checklist: [FEATURES.md](./FEATURES.md). Architecture: [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Backend won't start | Missing Supabase env | Copy `backend/.env.example` → `.env` |
| Health `database: error` | Wrong keys or migrations | Apply `supabase/migrations/` |
| Signup fails username check | No service role key | Set `SUPABASE_SERVICE_ROLE_KEY` |
| 401 on API calls | Expired/missing token | Re-login; check CORS + cookies |
| CORS errors | Origin mismatch | Match `FRONTEND_URL` exactly |
| No emails | Resend not configured | Set `RESEND_API_KEY`, `EMAIL_FROM` |
| Sync idle | Cron disabled | `ENABLE_SYNC_CRON=true` or manual sync on Platforms |

```bash
curl http://localhost:3001/api/health
# Expect status: "ok", checks.database: "ok"
```

---

## Backlog (prioritized)

### P0 — Before real users / money

- [ ] Replace mock platform provider with real OAuth + earnings APIs
- [ ] Real payout provider + admin completion flow
- [ ] Bank account verification
- [ ] Audit Supabase RLS; add policy tests

### P1 — Reliability

- [ ] Playwright E2E (signup → apply → approve → payout)
- [ ] External job queue for sync
- [ ] Sentry / analytics

### P2 — Product

- [ ] Campaign drafts, filters, creator public profiles
- [ ] Admin panel for payouts and disputes

See [FEATURES.md](./FEATURES.md) for the full implemented/planned list.

---

## Pre-release checks

| Check | Command / URL | Pass |
|-------|----------------|------|
| Backend tests | `cd backend && npm test` | All pass |
| Frontend lint | `cd frontend && npm run lint` | 0 errors |
| Frontend build | `cd frontend && npm run build` | Success |
| API health | `GET /api/health` | `status: ok` |
| Manual QA | [QA_MANUAL_CHECKLIST.md](./QA_MANUAL_CHECKLIST.md) | All critical paths |

---

*Deploy: [DEPLOYMENT.md](./DEPLOYMENT.md) · Specs: [EARNIO_PROJECT_DOCS.md](./EARNIO_PROJECT_DOCS.md)*
