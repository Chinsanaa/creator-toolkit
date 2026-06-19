# Testing the Earnio iOS App (before App Store)

You can validate the full UI **without deploying** using **Demo mode** in the iOS Simulator. No backend or Supabase required.

---

## Fastest path: Demo mode (recommended first)

1. **On a Mac** with Xcode 15+ installed, open the native app workspace:
   ```bash
   cd ios
   open EarnioNative/EarnioNative.xcodeproj
   ```
2. Select **iPhone 15** (or any iOS 17+ simulator).
3. Press **⌘R** to build and run.
4. On the login screen, tap **Demo Creator** or **Demo Sponsor**.
5. Walk through all tabs:
   - **Creator:** Dashboard → Platforms → Wallet → Deals → Settings
   - **Sponsor:** Dashboard → Campaigns → Alerts → Settings

Demo mode uses realistic **MNT** sample data (Maybee Pop&Joy campaign, Khan Bank wallet, etc.). An orange banner confirms you are in demo mode.

---

## What demo mode validates

| Flow | Demo behavior |
|------|----------------|
| Auth | Instant login, no network |
| Dashboard | Earnings chart + platform breakdown |
| Platforms | Connect + sync (simulated delay) |
| Wallet | Balance, banks, payout request |
| Sponsorships | Browse, apply, track applications |
| Sponsor campaigns | List, create, view applications, approve/reject |
| Notifications | List, mark read |

This is enough to answer: *“Does the app feel right before we ship?”*

---

## Live API mode (backend required)

Use this to test against your real Express API before production.

### 1. Start the backend

```bash
cd backend && npm run dev   # :3001
```

### 2. Configure the simulator

The app defaults to `http://127.0.0.1:3001/api` (works in Simulator).

For a **physical iPhone**, set your Mac’s LAN IP in Xcode:

**Product → Scheme → Edit Scheme → Run → Arguments → Environment Variables**

| Variable | Example |
|----------|---------|
| `EARNIO_API_URL` | `http://192.168.1.10:3001/api` |

### 3. Log in with real credentials

Use **Log in with API** (not Demo buttons) on the auth screen with a creator or sponsor account from your local Supabase seed.

---

## Build requirements

| Requirement | Version |
|-------------|---------|
| macOS | Ventura+ |
| Xcode | 15+ |
| iOS deployment target | 17.0 |
| Swift | 5.9+ |

The **EarnioNative** target links the local Swift package (`Package.swift` → `Sources/`). The separate **App/** folder is the Capacitor web wrapper — not used for this native SwiftUI app.

---

## Pre–App Store checklist

- [ ] Demo Creator flow: all 5 tabs load without crashes
- [ ] Demo Sponsor flow: approve/reject an application in Campaigns
- [ ] Live API: creator login → dashboard shows real data
- [ ] Live API: sponsor login → create campaign
- [ ] Wallet payout shows validation for minimum ₮50,000
- [ ] Logout returns to auth screen
- [ ] Test on at least one physical iPhone (Live API + LAN IP)
- [ ] Dark mode readable on all screens (Settings → system appearance)

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails “No such module Earnio” | Open `EarnioNative.xcodeproj`, not `App.xcworkspace` |
| Live login decode error | Ensure backend is running; check `/api/health` |
| Physical device can’t reach API | Set `EARNIO_API_URL` to Mac IP; same Wi‑Fi network |
| Capacitor project opens instead | Use `EarnioNative/` for native SwiftUI testing |

→ Architecture: [README.md](./README.md) · Project map: [../context.md](../context.md)
