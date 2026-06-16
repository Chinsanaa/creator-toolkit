# Button

Pill-shaped button. Four variants, three sizes, optional icons.

## Usage
- `primary` — solid Earnio Blue gradient, default CTA
- `dark` — ink-900 gradient, marketing hero CTA
- `secondary` — white bordered, secondary actions
- `ghost` — text-only, tertiary actions

## Props
- `variant`: primary | dark | secondary | ghost (default: primary)
- `size`: sm | md | lg (default: md)
- `fullWidth`: boolean
- `iconLeft` / `iconRight`: ReactNode
- `disabled`: boolean

## Rules
- Always use pill shape (border-radius: full)
- Primary buttons get brand glow shadow on hover
- Money amounts in buttons use ₮ + JetBrains Mono inline
