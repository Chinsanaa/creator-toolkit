# Earnio — Creator app UI kit

A high-fidelity recreation of the Earnio creator app (logged-in product), rebuilt on the new blue identity.

- **`index.html`** — open this. Renders the full app shell with switchable screens.
- **`creator-app.jsx`** — shell (sidebar + glass topbar) plus three core screens and two placeholders.

### Screens
- **Dashboard** — greeting header, four stat cards, a 12-month earnings bar chart, by-platform breakdown with progress bars, and a recent-earnings list.
- **Explore** — search + platform tabs over a grid of sponsorship cards (Maybee Pop&Joy, Gobi, Khan Bank…). **Apply now** fires a toast and flips the card to an "Applied" badge.
- **Wallet** — balance stat cards, a working **Request payout** form (amount + bank select → success), bank-account list, and a transaction-history table.
- **Platforms / Settings** — placeholders reusing the same shell.

### What's interactive
- **Sidebar** switches screens (active state = ink pill).
- **Apply now** → toast + "Applied" badge. **Request payout** → success message + toast. **Explore search & tabs** filter live.

### Composition notes
- Uses design-system primitives from `_ds_bundle.js`: `StatCard`, `Card`, `Badge`, `Avatar`, `Button`, `IconButton`, `Tabs`, `Input`, `Select`, `ProgressBar`.
- Layout mirrors the product's `CreatorAppShell` (desktop sidebar + sticky top bar) and the dashboard/sponsorships/wallet routes.
- All money is MNT (₮), tabular mono. Mock data uses real Mongolian brands and banks.

> Recreation, not production code — data and interactions are mocked client-side.
