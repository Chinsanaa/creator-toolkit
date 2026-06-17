# Earnio — Marketing website UI kit

A high-fidelity recreation of the Earnio creator marketing site, rebuilt on the new blue identity.

- **`index.html`** — open this. Renders the full interactive landing.
- **`site-landing.jsx`** — the whole composition: sticky glass nav, hero with a floating earnings-card visual, how-it-works, features, testimonials, FAQ accordion, dark CTA band, footer, and a signup/login modal.

### What's interactive
- **Audience toggle** (For creators / For brands) in the nav swaps the hero, how-it-works and features copy.
- **Get started / Log in** open a modal with a working form → success state.
- **FAQ** items expand/collapse.

### Composition notes
- Uses the design-system primitives from `_ds_bundle.js`: `Button`, `Card`, `Badge`, `Input`, `Checkbox`, `Avatar`.
- Copy is lifted verbatim from the product's `lib/landing/content.ts` (hero, steps, features, testimonials, FAQ).
- Visual language: near-white mesh background, dark "ink" pill as the marketing primary CTA, glass nav, soft cool shadows — per the Visual Foundations in the root readme.
- Icons are inline Lucide-style glyphs; platform marks (TikTok/YouTube/Instagram) are inline brand glyphs.

> Recreation, not production code — interactions are mocked client-side.
