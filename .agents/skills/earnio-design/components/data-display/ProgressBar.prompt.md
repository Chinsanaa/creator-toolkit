Slim progress bar — campaign budget used, payout goal, platform sync.

```jsx
<ProgressBar label="Campaign budget" value={3.2} max={5} valueFormat={(v,m)=>`₮${v}M / ₮${m}M`} />
<ProgressBar value={80} tone="success" />
```

Props: `value`, `max`, `label`, `showValue`, `tone` (`brand|success|warning`), `valueFormat`. The brand fill uses the spark gradient.
