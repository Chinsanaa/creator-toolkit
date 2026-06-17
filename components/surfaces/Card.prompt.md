The base surface for everything — panels, list containers, sponsorship cards.

```jsx
<Card title="Request payout" subtitle="Minimum ₮50,000" action={<Badge tone="brand">Wallet</Badge>}>
  …content…
</Card>
<Card interactive glass rounded="xl">…</Card>
```

Props: `title`, `subtitle`, `action`, `padding` (`sm|md|lg`), `rounded` (`lg|xl`), `glass` (frosted, for use over the mesh), `interactive` (hover-lift for clickable cards).
