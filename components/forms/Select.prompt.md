Styled native select with a custom chevron — used for bank pickers, filters, campaign settings.

```jsx
<Select label="Bank account" options={['Khan Bank', 'Golomt Bank', 'XacBank']} />
<Select label="Status" options={[{value:'active',label:'Active'},{value:'draft',label:'Draft'}]} />
```

Props: `label`, `options` (string[] or {value,label}[]), plus native `<select>` attributes. Or pass `<option>` children directly.
