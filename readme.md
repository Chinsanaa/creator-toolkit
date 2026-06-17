# Earnio Design System

> **Earn more, create more.**

Earnio is a monetization marketplace for **Mongolian Gen-Z content creators** and the **brands** that sponsor them. Creators connect TikTok, YouTube and Instagram, track earnings in one dashboard, apply to brand campaigns, and withdraw money in MNT (₮). Brands post sponsorship campaigns, review applications, and manage partnerships from a separate dashboard. Earnio takes a 20% commission; creators keep 80%.

This project is the **brand & product design system** for Earnio — a freshly redrawn, blue, Gen-Z-leaning identity with reusable tokens, components, and full-screen UI kits for both the marketing website and the creator app.

---

## Source material

This system was built by reading the real Earnio product code. If you have access, explore these to go deeper:

- **GitHub — product monorepo:** https://github.com/Chinsanaa/creator-toolkit
  - `frontend/` — Next.js 16 website + creator/sponsor apps (Tailwind CSS 4)
  - `frontend/lib/landing/content.ts` — all marketing copy & nav (single source)
  - `frontend/app/globals.css` — the product's original design tokens
  - `README.md` / `instructions.md` / `Earnio_6_Documents.pdf` — product spec, journeys, brand notes

> **Brand refresh note.** The original product shipped an inconsistent palette (purple `#6336F1` in docs, coral `#e85d4c` in brand constants, rose/pink in `globals.css`) on Poppins/Montserrat. Per the founder's direction this system **replaces** all of that with a single coherent **electric-blue identity**, a **new logo**, and a modern type pairing (Space Grotesk + Plus Jakarta Sans). Product *structure, routes, and copy* are preserved; only the visual language is new.

---

## Products represented

| Surface | What it is | UI kit |
|---|---|---|
| **Marketing website** | Creator & brand landing pages, auth (login/signup) | `ui_kits/website/` |
| **Creator app** | Dashboard, sponsorship explore, wallet & payouts, platforms | `ui_kits/app/` |

A sponsor (brand) app also exists in the product (campaign CRUD + application review); its screens reuse the same shell and components as the creator app.

---

## Content fundamentals — how Earnio writes

**Voice:** confident, plain-spoken, and encouraging — a smart friend who handles the boring money stuff so you can create. Never corporate, never hype-y.

- **Person:** Speaks to the creator as **"you"**; Earnio refers to itself as **"Earnio"** (third person), rarely "we". Headlines are about *the creator's outcome*, not the company.
- **Casing:** **Sentence case everywhere** — headings, buttons, nav. The only ALL-CAPS usage is tiny eyebrow labels / table headers with wide letter-spacing (e.g. `HOW IT WORKS`). Never title-case buttons.
- **Length:** Short. Hero titles are one line ("The platform for Mongolian creators"). Feature names are 2–3 words ending in a period as a stylistic device: *"Centralized opportunities."*, *"Payments built-in."*, *"Track performance."*
- **CTAs:** Verb-first and friendly — **"Get started"**, **"Explore sponsorships"**, **"Request payout"**, **"Apply now"**. Primary CTA across the product is **"Get started"**.
- **Money & locale:** Always MNT, formatted with the **₮** symbol (e.g. `₮12M`, `₮1,250,000`). Mongolian creator names are used in testimonials (Bold-Erdene, Sarnai, Temuulen). Real local banks appear in flows (Khan Bank, Golomt, XacBank, TDB).
- **Numbers:** Stats and money render in the **mono** typeface (JetBrains Mono) for a precise, dashboard feel. Big reach numbers are abbreviated: `2.4M`, `890K`.
- **Emoji:** **Not used** in product UI or marketing copy. Energy comes from color, motion and type — not emoji. (Platform *logos* — TikTok/YouTube/Instagram — are fine and encouraged.)
- **Tone examples:**
  - Hero: *"Earnio connects you with local brands, handles sponsorships and payouts, and lets you focus on creating."*
  - Empty state: *"No active sponsorships right now — check back soon."*
  - Microcopy is reassuring, never blaming: *"Add a bank account first to request a payout."*

**Vibe in three words:** *clean · upbeat · in-control.*

---

## Visual foundations

The aesthetic is **bright, airy fintech-for-creators**: a near-white canvas, generous whitespace, soft cool shadows, and confident electric-blue accents. Modern and a little playful — sleek enough to feel trustworthy with money, energetic enough for a Gen-Z audience.

- **Color & vibe.** One dominant brand blue — **Earnio Blue `#2E5BFF`** — with a deep navy ink for text and a cool slate neutral ramp. A cyan **"spark" `#12C2F3`** appears *only* as a small highlight (logo dot, gradient tails, the occasional active glow). Money-positive values use **green `#10B981`**. Backgrounds are white / pale-blue (`#F7FAFF`), never grey. Imagery, when present, skews **cool and bright** (daylight, screens, clean product shots) — no warm/sepia grading.
- **Type.** Display = **Space Grotesk** (geometric, slightly techy) for headlines and the wordmark, set tight (`-0.02em` to `-0.035em`). Body/UI = **Plus Jakarta Sans** (friendly, highly legible). Numerals/money = **JetBrains Mono**, tabular. Hierarchy comes from size + weight, not many colors.
- **Backgrounds.** Mostly flat white surfaces. Hero and section atmospheres use a **soft radial "mesh"** of pale blue/cyan blooms (`--mesh-1/2/3`) — subtle, never a saturated purple gradient. No textures, no noise, no hand-drawn illustration. Decorative geometry (dashed orbital paths, floating metric chips) is line-light and optional.
- **Corner radii.** Friendly and rounded. Base **8px** (inputs, chips), **12px** buttons/rows, **16px** cards, **20–28px** panels & hero cards, **full** pills/avatars. Pills (`border-radius: full`) are a signature — used for primary buttons, nav items and badges.
- **Cards.** White (or 80–90% white glass with backdrop-blur on busy backgrounds), `1px` cool border (`--border`), `--radius-lg/xl`, and a **soft navy-tinted shadow** (`--shadow-sm`/`md`) — never a hard black drop shadow. Hover lifts a card's border to blue and deepens the shadow slightly.
- **Shadows.** Two systems: (1) **elevation** shadows that are low-contrast and navy-tinted, and (2) a **brand glow** (`--shadow-brand`, blue) reserved for the primary CTA and hero focal points. No inner shadows except subtle input focus rings.
- **Buttons & states.** Primary = solid Earnio Blue pill, white text, brand glow. There's also a signature **dark "ink" pill** (navy) used as the marketing primary. Secondary = white pill with border. Ghost = transparent. **Hover:** color darkens one step (`--primary-hover`) and/or the element lifts `translateY(-1px)`. **Press:** `scale(0.97–0.98)` — a quick, springy squeeze. **Focus:** 3px blue ring (`--focus-ring`).
- **Borders.** Hairline `1px` in cool slate (`--border` = `#D7DEEA`). Dividers are the same. Inputs use the same border, focusing to blue + ring.
- **Transparency & blur.** Used purposefully on **overlay chrome** — sticky navs, sidebars, modals, mobile menus get `rgba(white, .6–.9)` + `backdrop-filter: blur(12–14px)` to feel light and layered over the mesh. Body content stays opaque.
- **Motion.** Calm and confident. Default easing `--ease-out` `cubic-bezier(0.22,1,0.36,1)`; durations 140–360ms. Page/section content **fades up** ~8–16px on enter (staggered). A gentle 4s **float** loops on hero chips. A springy ease (`--ease-spring`) is reserved for small playful pops (toggles, badges). Everything respects `prefers-reduced-motion`.
- **Layout rules.** Centered max-width containers (`1200–1320px`). The app uses a **left sidebar on desktop / tablet** and a **fixed bottom tab bar on mobile**; sticky translucent top bar. Comfortable density — this is a consumer product, not a dense console.

---

## Iconography

- **Set:** **[Lucide](https://lucide.dev)** — a clean, open-source line set at **~1.75px stroke, rounded caps/joins**, which matches Earnio's friendly-geometric feel. The original product hand-rolled one-off inline SVGs with **no formal icon library**, so this system *standardizes* on Lucide. **(Substitution flagged — confirm with the team or swap if you adopt a different set.)** Load from CDN:
  ```html
  <script src="https://unpkg.com/lucide@latest"></script>
  <i data-lucide="wallet"></i> <script>lucide.createIcons()</script>
  ```
- **Style rules:** line icons only (no filled/duotone), inherit `currentColor`, default 20–24px, sit on the `--text-muted` → `--text-strong` ramp. Never mix icon families.
- **Platform icons:** TikTok / YouTube / Instagram appear throughout (connect, sync, sponsorship cards). Use the official **brand glyphs** in their brand colors (or monochrome ink). Pull from [Simple Icons](https://simpleicons.org) when you need them.
- **Emoji:** not used as iconography anywhere in the product.
- **The Earnio mark** (`assets/logo/earnio-mark*.svg`) is the one bespoke glyph — the rising-trend arrow. It is *not* part of the icon set and should not be used inline as a generic icon.

---

## What's in this system (index)

```
styles.css                  → global entry (consumers link this). @import manifest only.
tokens/
  fonts.css                 → webfont @imports (Space Grotesk · Plus Jakarta Sans · JetBrains Mono)
  colors.css                → brand blue scale, slate neutrals, semantic + aliases, dark theme
  typography.css            → families, type scale, weights, leading, tracking
  spacing.css               → 4px spacing scale, radii, container widths
  effects.css               → shadows, focus ring, blur, motion easings/durations
assets/
  logo/earnio-mark.svg      → primary gradient app tile
  logo/earnio-mark-mono.svg → monochrome mark (currentColor)
  *.card.html               → Brand specimen cards (logo, gradients, icons)
components/
  buttons/                  → Button, IconButton
  forms/                    → Input, Select, Checkbox, Switch
  data-display/             → Badge, Avatar, StatCard, ProgressBar
  surfaces/                 → Card
  navigation/               → Tabs
ui_kits/
  website/                  → marketing site recreation (hero, how-it-works, features, FAQ, auth)
  app/                      → creator app recreation (dashboard, sponsorships, wallet)
guidelines/                 → foundation specimen cards (Type / Colors / Spacing)
SKILL.md                    → portable Agent Skill manifest
```

See the **Design System tab** for every specimen and component card rendered live.

---

*Built from the Earnio product monorepo. Fonts are loaded from the Google Fonts CDN; swap `tokens/fonts.css` to self-hosted woff2 for offline use.*
