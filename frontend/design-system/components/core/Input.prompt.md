A labeled text field — the standard form input across auth and app screens.

```jsx
<Input label="Email" type="email" placeholder="you@example.com" />
<Input label="Account number" hint="Mongolian bank account" />
<Input label="Amount" error="Exceeds available balance" />
```

Supports all native `<input>` props. Use `error` for validation (border + message go danger-red), `hint` for helper text. Focus shows the 3px Earnio-Blue ring.
