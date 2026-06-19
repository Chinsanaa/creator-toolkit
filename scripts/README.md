# Scripts — Dev & Smoke Test Utilities

Node scripts invoked from the repo root `package.json`.

→ Project map: [../context.md](../context.md)

---

## Files

| Script | npm command | Purpose |
|--------|-------------|---------|
| `dev.mjs` | `npm run dev` | Spawns frontend (`:3000`) and backend (`:3001`) in one terminal with prefixed logs |
| `smoke-test.mjs` | `npm run smoke` | HTTP checks for public frontend routes and backend API endpoints |

---

## Usage

```bash
# Start both dev servers (from repo root)
npm run dev

# Smoke test (servers must be running)
npm run smoke

# Override URLs
FRONTEND_URL=http://localhost:3000 BACKEND_URL=http://localhost:3001 npm run smoke
```

`smoke-test.mjs` tests health, auth guards (401), and key public pages. It does not replace [../docs/QA_MANUAL_CHECKLIST.md](../docs/QA_MANUAL_CHECKLIST.md).
