# Input

Labeled text input with hint and error states. Min-height 44px.

## Props
- `label`: string — rendered as <label>
- `hint`: string — helper text below input
- `error`: string — shows red border + message
- `icon`: ReactNode — leading icon (16px, left-aligned)

## Rules
- Always include a label for accessibility
- Error message replaces hint when both provided
- Use ₮ in placeholder for money fields
