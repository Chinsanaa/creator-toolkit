The base surface for grouping content. `card` and `elevated` are solid white app surfaces; `glass` and `hero` are the frosted, translucent panels used over the mesh background.

```jsx
<Panel variant="card" padding={24}>…</Panel>
<Panel variant="hero">  {/* blue→cyan gradient top-bar */}
  <h2>Welcome back, Sarnai</h2>
</Panel>
```

Use `hero` for the dashboard greeting / primary panel, `glass` for content panels over the landing mesh, `card`/`elevated` inside the app shell.
