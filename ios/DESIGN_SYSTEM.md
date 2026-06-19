# Earnio iOS Design System

→ Web design tokens: [../frontend/design-system/MASTER.md](../frontend/design-system/MASTER.md) · iOS app: [README.md](./README.md)

## Overview

The Earnio iOS app follows modern iOS design principles and uses SwiftUI for a native, consistent experience across all screens. The design is inspired by iOS 17's Liquid Glass and modern glassmorphism design trends.

## Color Palette

### Primary Colors
- **Blue** `#007AFF` - Primary action, navigation, focus states
- **Green** `#34C759` - Success, earnings, positive states
- **Red** `#FF3B30` - Errors, warnings, reject actions
- **Orange** `#FF9500` - Pending states, caution
- **Purple** `#AF52DE` - Highlights, secondary actions

### System Colors
- **Light Background** `#F2F2F7` - Light mode background
- **Dark Background** `#000000` - Dark mode background
- **Card Background** `#FFFFFF` - Light mode cards / `#1C1C1E` - Dark mode cards
- **Secondary Gray** `#A0A0A0` - Secondary text and borders

## Typography

### Font Stack
- **Primary Font** - San Francisco (System Font)
  - `-apple-system, system-ui, "SF Pro Display", "SF Pro Text"`

### Text Styles
- **Large Title** - 28pt, Weight 700
- **Title 1** - 24pt, Weight 700
- **Title 2** - 18pt, Weight 600
- **Title 3** - 16pt, Weight 600
- **Body** - 16pt, Weight 400
- **Callout** - 14pt, Weight 500
- **Subheading** - 14pt, Weight 400
- **Footnote** - 12pt, Weight 400
- **Caption** - 11pt, Weight 400

## Component Library

### Buttons

#### Primary Button
- Background: Blue (`#007AFF`)
- Text: White, Bold (16pt)
- Corner Radius: 8pt
- Height: 48pt

#### Secondary Button
- Background: Translucent Blue
- Text: Blue, Semibold (16pt)
- Border: 1pt Blue
- Corner Radius: 8pt

#### Destructive Button
- Background: Red (`#FF3B30`)
- Text: White, Bold (16pt)
- Corner Radius: 8pt

### Cards

#### Dashboard Cards
- Background: System Gray 6
- Corner Radius: 12pt
- Shadow: 0 2px 4px rgba(0,0,0,0.1)
- Padding: 16pt

#### Transaction Cards
- Background: System Gray 6
- Corner Radius: 12pt
- Padding: 12pt
- Height: Variable

### Navigation

#### Tab Bar
- 5 tabs for Creators, 4 tabs for Sponsors
- Icons + Labels (iOS 17 style)
- Tint Color: Blue
- Background: System Background with blur

#### Navigation Stack
- Swipe-to-go-back enabled
- Back button with chevron icon
- Large title on main screens
- Inline title on detail screens

### Lists

#### List Rows
- Height: 52pt (standard)
- Padding: 16pt horizontal
- Divider: 0.5pt separator line
- Icon: 30x30pt, radius 7pt

#### Section Headers
- 13pt, Gray (secondary color)
- All caps
- Padding: 8pt top, 6pt bottom

### Modal Sheets

#### Sheet Size
- Half-screen sheets for actions
- Full-screen for data entry
- Rounded corners: 26pt (top only)
- Drag handle on iOS 17

### Icons

#### System Icons
- SF Symbols 5.0+
- Weights: Regular, Semibold, Bold
- Colors: Blue, Green, Red, Orange as needed
- Sizes: 16pt (inline), 20pt (buttons), 24pt (nav), 44pt (large)

## Spacing System

### Padding/Margins
- **Extra Small** - 4pt
- **Small** - 8pt
- **Medium** - 12pt
- **Standard** - 16pt
- **Large** - 20pt
- **Extra Large** - 24pt
- **Section** - 40pt (between major sections)

### Component Spacing
- Card padding: 16pt
- Form field margin: 8pt
- Section spacing: 12pt
- List item spacing: 0pt (dividers used)

## Corner Radii

- **Extra Small** - 4pt
- **Small** - 8pt
- **Standard** - 12pt
- **Large** - 16pt
- **Extra Large** - 26pt (sheets/keyboards)
- **Pill** - 9999pt (infinite)

## Shadows

### Card Shadow
```
Blur: 4pt
X Offset: 0pt
Y Offset: 2pt
Color: Black (10% opacity)
```

### Button Shadow (Pressed)
```
Blur: 8pt
X Offset: 0pt
Y Offset: 4pt
Color: Black (15% opacity)
```

## Dark Mode Support

The app fully supports iOS dark mode with:
- Automatic color inversion for primary colors
- Adjusted opacity for backgrounds
- Enhanced contrast for readability
- System colors used throughout

## Accessibility

### Color Contrast
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text (18pt+)
- No color-only indicators (icons also used)

### Text Sizing
- Supports dynamic type scaling
- Readable at all size categories
- Labels paired with values

### Touch Targets
- Minimum 44pt x 44pt for interactive elements
- Adequate spacing between elements
- Large text labels for clarity

## Animation & Transitions

### Navigation Transitions
- Standard Push/Pop for navigation stacks
- Modal presentation for sheets
- Custom transitions for tab changes

### View Transitions
- 200ms fade-in for content
- 300ms slide-up for modals
- Spring animation for interactive elements

### Loading States
- Circular progress indicator
- 16pt size, medium weight
- Blue tint

## Layout Guidelines

### Safe Area
- Respect safe area insets
- Add padding to notch/Dynamic Island
- Leave space for home indicator

### Responsive Design
- Adapts to all iPhone sizes
- Portrait and landscape support
- Optimized for thumb reach

### Content Insets
- Horizontal padding: 16pt
- Vertical padding: 20pt between sections
- Bottom safe area padding for scrollable content

## Design Assets

### Mockup Files
- `Earnio Phone.dc.html` - Full phone mockup prototype
- `Earnio iOS.dc.html` - iOS-specific design references
- `ios-frame.jsx` - Reusable iOS component framework

### Colors in Figma
- Exported for use in design tools
- Updated in-sync with codebase
- All brand colors included

## Usage Guidelines

### Buttons
- Use blue primary buttons for main actions
- Use secondary buttons for alternative actions
- Use red only for destructive actions

### Colors
- Green for success messages and earnings
- Red for errors and warnings
- Orange for pending states
- Blue for information and navigation

### Icons
- Always pair with text labels
- Use consistent weight throughout
- Scale appropriately for context

### Typography
- Large titles for section headers
- Semibold for emphasis
- Secondary text for captions/hints
- Monospaced for numbers/codes

## Responsive Behavior

### Portrait Mode
- Full-width content with safe margins
- Stacked layouts
- Bottom tabs visible

### Landscape Mode
- Content adjusts to landscape
- May use compact layouts
- Tabs remain accessible

## Performance Optimization

- Use lightweight icons (SF Symbols)
- Minimize shadow complexity
- Lazy load images and content
- Cache frequently accessed assets

## References

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [iOS Design Resources](https://developer.apple.com/design/resources/)
