Tab switcher — `pill` (segmented control) or `underline`. Used for filtering applications, wallet sections, dashboard ranges.

```jsx
const [tab, setTab] = React.useState('all');
<Tabs variant="pill" value={tab} onChange={setTab} tabs={[
  {value:'all', label:'All'},
  {value:'pending', label:'Pending', count:3},
  {value:'approved', label:'Approved', count:5},
]} />
```

Props: `tabs` ({value,label,count}[]), `value`, `onChange`, `variant` (`pill|underline`). Controlled — track the value in your own state.
