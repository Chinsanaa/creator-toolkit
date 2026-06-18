The dashboard metric tile — pairs a label, a mono numeral value, and an optional delta/hint. Hovering lifts the border to Earnio Blue.

```jsx
<StatCard label="Total earnings" value="₮12,480,000" hint="$3,560 approx." />
<StatCard label="Month over month" value="+18.4%" delta={18.4} valueColor="var(--success)" />
```

Always format currency/numbers before passing in (`value` is rendered verbatim in JetBrains Mono). Use `delta` for MoM change; lay tiles out in a `grid` of 2–4 columns.
