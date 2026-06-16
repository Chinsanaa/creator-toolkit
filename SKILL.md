# Earnio Design System Skill

Use this file to brief any AI assistant on the Earnio design system so it can generate on-brand UI without guessing.

## Brand

- **Product**: Earnio — creator monetization platform for Mongolian Gen-Z creators
- **Audience**: Mongolian Gen-Z content creators + brands/agencies
- **Tone**: Friendly, direct, sentence case, no emoji in copy

## Colors

| Role | Token | Hex |
|------|-------|-----|
| Primary | `--blue-500` | `#2E5BFF` |
| Primary dark | `--blue-700` | `#1A3799` |
| Primary soft | `--primary-soft` | `#EEF3FF` |
| Success | `--success` | `#10B981` |
| Warning | `--warning` | `#F5A524` |
| Danger | `--danger` | `#F0455A` |
| Spark | `--spark` | `#12C2F3` |
| Ink 900 (text) | `--ink-900` | `#0B1220` |
| Surface | `--surface` | `#FFFFFF` |

Gradients:
- Brand: `linear-gradient(135deg, #4D74FF, #2E5BFF, #1736B8)`
- Spark: `linear-gradient(115deg, #2E5BFF, #12C2F3)`
- Ink: `linear-gradient(160deg, #0B1220, #1A2840)`

## Typography

- **Display**: Space Grotesk 600/700, tracking `-0.02em` to `-0.035em`, leading `1.05`
- **Body/UI**: Plus Jakarta Sans 400–800, 14–18px, leading `1.5–1.65`
- **Numerals**: JetBrains Mono 500/600, `font-feature-settings: 'tnum' 1` — always for ₮ amounts

## Spacing & Shape

- Base unit: 4px (`--space-1` = 4px … `--space-16` = 64px)
- Radii: `--radius-sm` 8px / `--radius-md` 12px / `--radius-lg` 16px / `--radius-full` 999px
- Buttons, badges, toggles, search: always pill (`border-radius: var(--radius-full)`)

## Shadows

Cool navy-tinted (never black):
- `--shadow-sm`: subtle elevation
- `--shadow-brand`: `0 4px 16px rgba(46,91,255,.32)` — primary buttons
- `--shadow-glow`: `0 0 20px rgba(46,91,255,.4)` — hover state

## Rules (non-negotiable)

1. No legacy purple, coral, or rose — Earnio Blue `#2E5BFF` only
2. Fonts from Google Fonts only (Space Grotesk, Plus Jakarta Sans, JetBrains Mono)
3. Money = `₮` symbol + JetBrains Mono, tabular figures on
4. Pill shapes on all interactive elements (buttons, badges, tabs, inputs)
5. Mesh backgrounds: three-layer radial gradients using `--mesh-1/2/3`
6. Glass surfaces: `background: rgba(255,255,255,0.85); backdrop-filter: blur(16px)`

## Component Quick Reference

| Component | Class prefix | Notes |
|-----------|-------------|-------|
| Button | `.ern-btn` | pill, 4 variants, 3 sizes |
| IconButton | `.ern-icon-btn` | 34/44/52px |
| Input | `.ern-input` | min-height 44px |
| Select | `.ern-select` | native + custom chevron |
| Checkbox | `.ern-checkbox-*` | 20px, animated pop |
| Switch | `.ern-switch-*` | 44×26px, spring thumb |
| Badge | `.ern-badge` | 7 tones, optional dot |
| Avatar | `.ern-avatar` | 28/36/44/56px, initials fallback |
| StatCard | `.ern-stat-card` | mono value, delta, hover-lift |
| ProgressBar | `.ern-progress` | spark gradient fill |
| Card | `.ern-card` | glass + interactive variants |
| Tabs | `.ern-tabs` | pill or underline |

## File Structure

```
styles.css                  ← @import all tokens
tokens/
  colors.css fonts.css typography.css spacing.css effects.css
assets/logo/
  earnio-mark.svg earnio-mark-mono.svg
components/
  buttons/ forms/ data-display/ surfaces/ navigation/
guidelines/                 ← specimen cards
ui_kits/
  website/ app/ ios/
```
