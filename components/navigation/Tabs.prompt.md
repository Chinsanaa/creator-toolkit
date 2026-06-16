# Tabs

Pill (segmented) or underline variant. Controlled via value/onChange.

## Props
- `tabs`: Array<{ value, label, count? }>
- `value`: active tab value
- `onChange`: (value: string) => void
- `variant`: pill | underline (default: pill)

## Rules
- Pill variant: use for filtering/segmenting within a page
- Underline variant: use for page-level section navigation
- count badges show numeric indicators on tab labels
