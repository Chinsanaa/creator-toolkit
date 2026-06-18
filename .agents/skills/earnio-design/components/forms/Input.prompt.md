Labelled text input — the standard form field across auth and wallet flows.

```jsx
<Input label="Email" type="email" placeholder="you@example.com" />
<Input label="Amount (MNT)" icon={<SearchIcon />} hint="Minimum ₮50,000" />
<Input label="Account number" error="Required" />
```

Props: `label`, `hint`, `error`, `icon`, plus all native `<input>` attributes. Error state overrides hint and turns the border red.
