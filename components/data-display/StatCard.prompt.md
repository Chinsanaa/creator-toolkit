Dashboard metric card — label, big mono value, optional trend delta and icon. The core of the earnings dashboard and wallet.

```jsx
<StatCard label="Total earnings" value="₮12.4M" delta="18.2%" trend="up" hint="vs last month" icon={<TrendingUpIcon />} />
<StatCard label="This month" value="₮2.4M" hint="Last month: ₮2.0M" />
```

Props: `label`, `value`, `delta`, `trend` (`up|down`), `hint`, `icon`. Value renders in JetBrains Mono; the card lifts to a blue border on hover.
