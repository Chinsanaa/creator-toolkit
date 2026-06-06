# Frontend UI Guide

This document explains the **landing pages**, auth flows, and **design system** for **Earnio**. Use it as the source of truth when changing marketing or auth UI.

**Brand:** Earnio — *Earn more, create more*. Logo, palette, and typography live in `frontend/lib/brand/earnio.ts` and `frontend/components/brand/EarnioLogo.tsx`.

---

## Product purpose

**Earnio** serves two audiences:

| Audience | Landing | Auth | App shell |
|----------|---------|------|-----------|
| **Creators** | `/` | `/login/creator`, `/signup/creator` | Dashboard, platforms, deals, wallet |
| **Brands (sponsors)** | `/brands` | `/login/sponsor`, `/signup/sponsor` | Sponsor dashboard, campaigns |

Creators track TikTok/YouTube earnings, find sponsorships, and get paid in MNT. Brands post campaigns and review creator applications.

---

## Landing pages

Two audience-specific marketing pages. Creator page follows [SideShift creators](https://sideshift.app/creators) layout; brand page keeps the original hero + sections UI.

| Route | Audience | Component |
|-------|----------|-----------|
| `/` | Creator | `CreatorLandingPage` — scroll nav, features, testimonials, FAQ |
| `/brands` | Brand / sponsor | `BrandLandingPage` — original layout, app-route nav |

Config: `frontend/lib/landing/content.ts`

### Page regions

| Region | Component | Purpose |
|--------|-----------|---------|
| Header | `LandingNav` | Sticky nav, audience switcher, login, signup CTA |
| Hero | inline + `HeroIllustration` | Headline, value prop, primary CTA |
| How it works | `HowItWorks` | 4-step walkthrough + CTAs |
| Footer | inline | Docs, login, signup links |

### Visual identity (landing + auth)

Sky-blue marketing palette (`.landing-page` in `globals.css`):

| Token | Value | Usage |
|-------|-------|-------|
| `--landing-fg` | `#141414` | Headlines, dark buttons, auth logo |
| `--landing-muted` | `#6b7280` | Body copy, labels |
| `--landing-bg-top` | `#eef6ff` | Gradient start |
| `--landing-bg-bottom` | `#ffffff` | Gradient end |

**Buttons:** `.landing-btn-dark` (primary), `.landing-btn-light` (secondary). Pill shape, near-black fill on primary.

---

## Landing navigation and CTAs

### Creator landing (`/`)

Nav links scroll to on-page sections (no app-route jumps).

| Element | Destination | Behavior |
|---------|-------------|----------|
| Logo | `/` | Creator home |
| **How it works** | `#how-it-works` | Scroll to steps |
| **Features** | `#features` | Scroll to dashboard features |
| **FAQ** | `#faq` | Scroll to FAQ |
| **For Brands** | `/brands` | Switch to brand landing |
| **Log in** | `/login/creator` | Creator sign-in form |
| **Get started** | `/signup/creator` | Creator signup form |
| Hero **Explore sponsorships** | `#features` | Scroll to features |

### Brand landing (`/brands`)

| Element | Destination | Behavior |
|---------|-------------|----------|
| Logo | `/brands` | Brand home |
| Campaigns / Dashboard / Resources | Sponsor routes / `/docs` | Product preview (auth may be required) |
| **For Creators** | `/` | Switch to creator landing |
| **Log in** | `/login/sponsor` | Sponsor sign-in form |
| **Get started** | `/signup/sponsor` | Sponsor signup form |

Brand nav uses app-route links (Campaigns, Dashboard, Resources) with chevrons — previous UI.

### Hero, footer, and section CTAs

No “free trial” copy. Creator CTAs use **Get started**; brand uses **Get started** for sponsor signup.

`/login` and `/signup` redirect to creator auth (`/login/creator`, `/signup/creator`).

---

## Authentication flows

Auth uses the landing gradient background (`.landing-page.auth-layout`) and `.auth-card` styling.

```
Creator path                    Brand path
────────────                    ──────────
/  (landing)                    /brands (landing)
    │                               │
    ├─ /login/creator               ├─ /login/sponsor
    └─ /signup/creator              └─ /signup/sponsor
            │                               │
            ▼                               ▼
      /dashboard                    /sponsor/dashboard
```

### Auth forms (`AuthForm`)

| Page | Redirect after login/signup |
|------|----------------------------|
| `/login/creator` | `/dashboard` |
| `/signup/creator` | `/dashboard` |
| `/login/sponsor` | `/sponsor/dashboard` |
| `/signup/sponsor` | `/sponsor/dashboard` |

**Back links:** `AuthTypeBackLink` — creators return to `/`, brands to `/brands`.

### Auth UI classes

| Class | Role |
|-------|------|
| `.auth-card` | Frosted white card (matches landing feature cards) |
| `.auth-input` | Sky-bordered inputs, dark focus ring |
| `.auth-link` | Near-black text links |
| `.landing-btn-dark.auth-submit` | Full-width submit button |

---

## App shell (post-login)

Authenticated pages use `AppShell` with warm coral theme (`--primary: #e85d4c`). This is intentional: marketing/auth = cool sky; product UI = warm coral.

---

## Color scheme summary

| Surface | Palette | Primary CTA |
|---------|---------|-------------|
| Landing `/`, `/brands` | Sky gradient, `#141414` text | `.landing-btn-dark` |
| Auth `/login/*`, `/signup/*` | Same as landing | `.landing-btn-dark` |
| App dashboard+ | Warm cream `#faf8f5`, coral `#e85d4c` | `.btn-primary` |

---

## Route map

| Route | Access | UI |
|-------|--------|-----|
| `/` | Public | Creator landing |
| `/brands` | Public | Brand landing |
| `/login`, `/signup` | Public | Redirect → creator auth |
| `/login/creator`, `/signup/creator` | Public | Creator auth |
| `/login/sponsor`, `/signup/sponsor` | Public | Sponsor auth |
| `/docs` | Public | Docs shell |
| `/dashboard`, `/platforms`, … | Creator auth | Creator shell |
| `/sponsor/*` | Sponsor auth | Sponsor shell |

---

## File reference

| Area | Path |
|------|------|
| Landing content config | `frontend/lib/landing/content.ts` |
| Landing page shell | `frontend/components/landing/LandingPage.tsx` |
| Creator landing | `frontend/app/page.tsx` |
| Brand landing | `frontend/app/brands/page.tsx` |
| Global styles | `frontend/app/globals.css` |
| Auth layout | `frontend/app/(auth)/layout.tsx` |
| Auth components | `frontend/components/auth/*` |

---

## QA checklist

- [ ] `/` shows creator copy; **For Brands** goes to `/brands`
- [ ] `/brands` shows brand copy; **For Creators** goes to `/`
- [ ] Creator **Log in** / **Get started** → `/login/creator` and `/signup/creator`
- [ ] Creator nav scrolls to `#how-it-works`, `#features`, `#faq`
- [ ] Brand **Log in** / **Get Started** → `/login/sponsor` and `/signup/sponsor`
- [ ] Auth pages match landing sky gradient and dark pill submit button
- [ ] Auth back links return to correct landing (`/` or `/brands`)
- [ ] `/login` and `/signup` redirect to creator flows
