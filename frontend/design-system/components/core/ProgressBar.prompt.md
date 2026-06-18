A rounded track-and-fill bar for onboarding progress, platform-revenue shares, and campaign budgets.

```jsx
<ProgressBar value={2} max={3} />
<ProgressBar value={68} gradient />
<ProgressBar value={40} color="var(--success)" height={6} />
```

Default fill is Earnio Blue; `gradient` uses the spark blue→cyan. Override `color`/`trackColor` for platform breakdowns (e.g. brand colors per platform).
