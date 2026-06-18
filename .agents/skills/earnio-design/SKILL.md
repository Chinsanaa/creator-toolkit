---
name: earnio-design
description: Use this skill to generate well-branded interfaces and assets for Earnio — a blue, Gen-Z monetization marketplace for Mongolian creators and brands — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, logo assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `readme.md` — brand story, content fundamentals, visual foundations, iconography, full index.
- `styles.css` — the one stylesheet to link; `@import`s everything in `tokens/`.
- `tokens/` — colors (Earnio Blue scale, slate neutrals, semantic), typography (Space Grotesk · Plus Jakarta Sans · JetBrains Mono), spacing, radii, shadows, motion.
- `assets/logo/` — the Earnio mark (gradient + monochrome SVG).
- `components/` — React primitives (Button, IconButton, Input, Select, Checkbox, Switch, Badge, Avatar, StatCard, ProgressBar, Card, Tabs). Each has a `.prompt.md` with usage.
- `ui_kits/website/` & `ui_kits/app/` — full-screen recreations to copy from.

## Non-negotiables
- Primary brand color is **Earnio Blue `#2E5BFF`**; never reintroduce the legacy purple/coral/rose. Money-positive = green `#10B981`.
- Type: Space Grotesk (display), Plus Jakarta Sans (UI/body), JetBrains Mono (money & stats). Sentence case everywhere; no emoji in copy.
- Money is always MNT with the `₮` symbol. Audience is Mongolian Gen-Z creators + brands.
- Pills, soft cool shadows, near-white mesh backgrounds, 8px-base radii. Avoid heavy gradients and grey (use cool slate).
