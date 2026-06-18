Earnio's action button — use for any clickable command; `primary` for the main action on a view, `secondary` for adjacent actions, `accent` (cyan) sparingly for highlights, `ghost` for low-emphasis.

```jsx
<Button variant="primary" size="md" onClick={save}>Get started</Button>
<Button variant="secondary" leftIcon={<i data-lucide="link" />}>Connect</Button>
<Button variant="primary" pill size="lg">Explore sponsorships</Button>
```

Variants: `primary` (Earnio Blue), `secondary` (bordered white), `accent` (spark cyan), `ghost` (text-only). Sizes: `sm` / `md` / `lg`. Use `pill` for landing-page CTAs, `fullWidth` inside forms and cards.
