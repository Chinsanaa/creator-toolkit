# Earnio iOS App

Native SwiftUI application (iOS 17+) for creators and sponsors.

→ **Test before App Store:** [TESTING.md](./TESTING.md)  
→ **Project map:** [../context.md](../context.md) · **Design:** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

---

## Quick test (Demo mode)

On a Mac with Xcode 15+:

```bash
cd ios
chmod +x setup-native-xcode.sh
./setup-native-xcode.sh          # requires: brew install xcodegen
open EarnioNative/EarnioNative.xcodeproj
```

Run in Simulator (⌘R) → tap **Demo Creator** or **Demo Sponsor**. No backend needed.

---

## Two iOS paths in this repo

| Path | What it is |
|------|------------|
| **`EarnioNative/`** | Native SwiftUI app (this document) — use for App Store prep |
| **`App/`** | Capacitor web wrapper — loads the Next.js site |

For UI/UX validation before shipping, use **EarnioNative** with demo mode.

---

## Folder layout

```
ios/
├── Package.swift              # Swift package (Earnio library)
├── Sources/App/               # All SwiftUI screens + API client
├── EarnioNative/              # Xcode app target (@main entry)
├── TESTING.md                 # Demo + live API testing guide
└── App/                       # Capacitor shell (separate)
```

---

## Modes

| Mode | How | Use when |
|------|-----|----------|
| **Demo** | Tap Demo Creator/Sponsor on auth screen | UI review, investor demo, no server |
| **Live API** | Log in with API + backend on :3001 | Integration testing |

Live API URL: `http://127.0.0.1:3001/api` (Simulator). Override with env var `EARNIO_API_URL` in Xcode scheme.

---

## Features (SwiftUI)

**Creator:** Dashboard, platforms sync, wallet/payouts, sponsorship marketplace, settings  
**Sponsor:** Dashboard, campaign CRUD, application approve/reject, notifications

Currency: **MNT (₮)** — matches the web app.

---

## Requirements

- iOS 17+, Xcode 15+, Swift 5.9+
- macOS for building (Windows/Linux cannot compile iOS)

See [TESTING.md](./TESTING.md) for the full pre–App Store checklist.
