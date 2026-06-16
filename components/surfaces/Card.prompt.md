# Card

White rounded surface. Optional header with title, subtitle, action slot.

## Props
- `title`: string
- `subtitle`: string
- `action`: ReactNode — top-right slot (button, badge, etc.)
- `size`: sm | md | lg (default: md)
- `glass`: boolean — frosted glass effect (backdrop-blur)
- `interactive`: boolean — hover-lift animation

## Rules
- Use glass variant for nav/sidebar overlays
- Interactive cards get pointer cursor automatically
