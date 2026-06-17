Icon-only square button for top bars, toolbars and compact controls. Always give it an `aria-label` via `label`.

```jsx
<IconButton variant="outline" label="Notifications"><BellIcon /></IconButton>
<IconButton variant="solid" label="Add"><PlusIcon /></IconButton>
```

Variants: `solid` (brand blue), `outline` (bordered white), `ghost` (default, transparent). Sizes `sm | md | lg` (36/44/52px). Pass the icon as children.
