## Cursor Cloud specific instructions

### Project structure

Monorepo with three `package.json` files (root, `frontend/`, `backend/`). Each has its own `package-lock.json`; use `npm install` in each directory.

### Services

| Service | Directory | Dev command | Port | Notes |
|---------|-----------|-------------|------|-------|
| Frontend (Next.js 16) | `frontend/` | `npm run dev` | 3000 | Turbopack-based dev server |
| iOS app (Capacitor) | `ios/` | `npm run ios:open` | — | Requires macOS + Xcode; set `CAPACITOR_SERVER_URL` before `npm run cap:sync` |
| Backend (Express 5) | `backend/` | `npm run dev` | 3001 | Uses nodemon + ts-node for hot reload |

### Key commands

- **Lint (frontend only):** `npm run lint` in `frontend/`
- **Build frontend:** `npm run build` in `frontend/`
- **Build backend:** `npm run build` in `backend/` (runs `tsc`)
- **Backend health check:** `curl http://localhost:3001/api/health`

### Gotchas

- Next.js 16 warns about multiple lockfiles when building. The warning about `turbopack.root` is cosmetic and does not affect functionality.
- Supabase client libraries (`@supabase/supabase-js`, `@supabase/ssr`) are declared in the root `package.json` but not yet wired into application code. No Supabase environment variables are needed to run the current app.
- The backend has no lint script; only the frontend has ESLint configured.
- The `frontend/AGENTS.md` contains Next.js-specific agent rules about API changes in v16 — read it before modifying frontend code.
