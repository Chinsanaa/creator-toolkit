# StatCard

Dashboard metric card. Blue border lift on hover.

## Props
- `label`: string — metric name
- `value`: string | number — rendered in JetBrains Mono
- `delta`: string — trend value (e.g. "+12.4%")
- `deltaUp`: boolean — true = green up arrow, false = red down
- `hint`: string — secondary label
- `icon`: ReactNode — optional icon top-right

## Rules
- Always use ₮ prefix for money values
- Values render in JetBrains Mono with tabular figures
