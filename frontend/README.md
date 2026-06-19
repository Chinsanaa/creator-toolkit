# Earnio Frontend

Next.js 16 web app — marketing pages, creator/sponsor dashboards, auth, and in-app docs.

→ **Project map:** [../context.md](../context.md) · **UI guide:** [../docs/FRONTEND.md](../docs/FRONTEND.md) · **Design tokens:** [design-system/MASTER.md](./design-system/MASTER.md)

---

## Quick start

```bash
npm install
npm run dev    # http://localhost:3000
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Folder layout

```
frontend/
├── app/                    # App Router routes
│   ├── (auth)/             # Login, signup, password reset, email verification
│   ├── dashboard/          # Creator dashboard
│   ├── sponsorships/       # Marketplace & applications
│   ├── platforms/          # Platform connections
│   ├── wallet/             # Wallet & payouts
│   ├── sponsor/            # Sponsor app
│   └── docs/               # In-app docs UI (loads from ../docs/)
├── components/             # UI by domain (landing, auth, layout, dashboard, …)
├── contexts/AuthContext.tsx
├── lib/
│   ├── api/                # REST client (client.ts + feature modules)
│   ├── auth/               # Session helpers
│   ├── docs/               # Doc catalog + loader
│   └── i18n/               # en.ts, mn.ts
├── design-system/          # Tokens, component prompts
├── proxy.ts                # Edge auth + role-based redirects
└── tailwind.config.ts
```

---

## Key integration points

| Concern | Location |
|---------|----------|
| API calls | `lib/api/client.ts` — Bearer token, 401 refresh, 30s timeout |
| Auth state | `contexts/AuthContext.tsx` |
| Route protection | `proxy.ts` + `components/auth/ProtectedRoute.tsx` |
| Landing copy | `lib/landing/content.ts` |
| Brand constants | `lib/brand/earnio.ts` |

Auth flows (password reset, email verification, rate limits): [../SECURITY_AUDIT.md](../SECURITY_AUDIT.md).

---

## Commands

```bash
npm run dev          # Turbopack dev server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript (if configured)
```

---

## Agent note

Next.js 16 has breaking changes vs. older versions. Read [AGENTS.md](./AGENTS.md) before modifying frontend code.

---

## Further reading

- [docs/FRONTEND.md](../docs/FRONTEND.md) — Landing nav, auth UI, route map
- [design-system/MASTER.md](./design-system/MASTER.md) — Colors, typography, spacing
- [docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md) — Vercel deploy
