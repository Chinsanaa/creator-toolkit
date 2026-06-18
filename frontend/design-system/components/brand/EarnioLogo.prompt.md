The Earnio logo — three ascending squares (the Fragmented Growth mark) plus the wordmark. The opacity fade (100 / 85 / 70) is baked in and must never be flattened.

```jsx
<EarnioLogo variant="full" size={28} />
<EarnioLogo variant="icon" size={40} />
<EarnioMark size={48} color="#FFFFFF" />   {/* mono on dark */}
```

Use `variant="full"` in nav/sidebar, `icon` for favicons/compact spots, `wordmark` when the mark sits elsewhere. Pass `color` to render a single-color (mono) mark; pass `wordColor="#fff"` over dark surfaces. Default colors are the three blue shades.
