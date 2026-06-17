Earnio's pill-shaped button — use for any action; `primary` is the default app CTA, `dark` is the marketing-site primary.

```jsx
<Button variant="primary" size="md">Get started</Button>
<Button variant="dark" rightIcon={<ArrowIcon />}>Explore sponsorships</Button>
<Button variant="secondary">My applications</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

Variants: `primary` (solid Earnio Blue + brand glow), `dark` (navy ink pill, marketing primary), `secondary` (white, bordered), `ghost` (text only). Sizes `sm | md | lg`. Props: `fullWidth`, `leftIcon`, `rightIcon`, plus all native `<button>` attributes (`onClick`, `disabled`, `type`).
