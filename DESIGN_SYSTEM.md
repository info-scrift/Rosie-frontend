
# BlueBridge Corporation Design System - Updated

## Color Palette

### Primary Colors
- **Primary Blue**: #1d4ed8 (blue-700) - Main brand color
- **Primary Blue Light**: #3b82f6 (blue-600) - Interactive elements
- **Primary Blue Dark**: #1e40af (blue-800) - Hover states

### Secondary Colors
- **White**: #ffffff - Background, cards
- **Slate 50**: #f8fafc - Light backgrounds
- **Slate 100**: #f1f5f9 - Subtle backgrounds
- **Slate 200**: #e2e8f0 - Borders, dividers
- **Slate 600**: #475569 - Secondary text color
- **Slate 700**: #334155 - Primary text color
- **Slate 900**: #0f172a - Dark text, headers

### Accent Colors
- **Blue 100**: #dbeafe - Light backgrounds for badges, avatars
- **Blue 50**: #eff6ff - Hover states for secondary buttons
- **Blue 500**: #3b82f6 - Icons, highlights
- **Red 100/800**: For error states and rejection badges
- **Green 100/800**: For success states and active badges

### ELIMINATED COLORS (Never Use)
- All orange variants (#fb923c, #ea580c, #c2410c)
- All yellow variants (#fbbf24, #f59e0b, #d97706)
- All amber variants (#f59e0b, #d97706, #b45309)
- All lime variants (#84cc16, #65a30d, #4d7c0f)

## Typography
- **Font Family**: Inter (display and body text)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Text Colors**: 
  - Primary: slate-900 (#0f172a)
  - Secondary: slate-600 (#475569)
  - Muted: slate-500 (#64748b)

## Component Styling Standards

### Buttons
- **Primary**: Blue gradient (blue-600 to blue-700), white text
- **Secondary**: White background, slate border, slate text, blue hover
- **Outline**: Blue border, blue text, white background
- **Focus States**: Blue ring (2px solid blue-500), no outlines

### Input Fields
- **Background**: Always white (#ffffff)
- **Border**: Slate-200 default, blue-500 on focus
- **Text**: Slate-700 (#334155)
- **Labels**: Slate-600 (#475569)
- **Placeholder**: Muted foreground
- **Focus**: Blue border and ring, no yellow/orange outlines

### Cards
- **Background**: White with subtle shadow
- **Border**: Slate-200 (#e2e8f0)
- **Hover**: Blue glow shadow effect
- **Text**: Slate-900 for headings, slate-600 for body

### Labels and Form Elements
- **All Labels**: Slate-600 (#475569) - NEVER orange/yellow
- **Form Text**: Slate-700 (#334155)
- **Helper Text**: Slate-500 (#64748b)

### Focus States (CRITICAL)
- **All Interactive Elements**: Blue ring (rgb(59 130 246))
- **NO Orange/Yellow Outlines**: Completely eliminated
- **Consistent Ring**: 2px solid blue-500 with offset
- **Buttons, Links, Inputs**: All use same blue focus treatment

### Badges/Status Indicators
- **Active**: Blue-100 background, blue-800 text
- **Pending**: Slate-100 background, slate-800 text
- **Success**: Blue-50 background, blue-700 text
- **Error**: Red-100 background, red-800 text
- **Skills**: Blue-50 background, blue-700 text, blue-200 border

### Navigation
- **Active**: Blue-600 text with blue-600 border
- **Inactive**: Slate-600, hover to slate-900
- **Background**: White/transparent
- **Focus**: Blue ring, no dark rectangles

### Tables and Data Display
- **Headers**: Slate-600 (#475569)
- **Cell Text**: Slate-900 (#0f172a)
- **Borders**: Slate-200 (#e2e8f0)
- **Hover**: Subtle blue-50 background

## Shadows and Effects
- **Soft**: Blue-tinted subtle shadow for cards
- **Glow**: Blue-tinted glow for interactive elements
- **Premium**: Enhanced shadow for elevated components

## Animation & Interactions
- **Hover**: Scale 1.05, blue glow shadow
- **Active**: Scale 0.98
- **Transitions**: 200-300ms duration
- **Focus**: Blue ring (2px solid blue-500)

## Layout
- **Container**: Max-width with responsive padding
- **Grid**: CSS Grid for layouts, Flexbox for components
- **Spacing**: Consistent 4px, 8px, 16px, 24px, 32px scale

## Page Transitions
- **Background**: Always white during transitions
- **No Flash**: Prevents yellow/orange backgrounds
- **Smooth**: Consistent white background maintained

## Critical Rules

### NEVER USE:
1. Orange text colors anywhere in the application
2. Yellow background colors on any element
3. Yellow/orange focus outlines or rings
4. Amber color variants
5. Default browser focus styling

### ALWAYS USE:
1. Blue-based focus states (rgb(59 130 246))
2. Slate-600 for form labels
3. Slate-700/900 for primary text
4. White backgrounds for form elements
5. Blue-based hover states

### Form Consistency:
- All labels: `text-slate-600 font-medium`
- All inputs: `bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500`
- All buttons: Blue-based variants with proper focus rings
- All selects: Consistent with input styling

### Focus Management:
- Every interactive element must have `focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`
- No exceptions for default browser styling
- Consistent blue treatment across all components

## Accessibility Compliance
- **Contrast Ratios**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Always visible blue ring, never yellow
- **Color Blindness**: Blue-based palette is accessible
- **Keyboard Navigation**: All interactive elements properly focusable

## Implementation Notes
- Use Tailwind CSS utility classes exclusively
- Apply consistent hover and focus states to all elements
- Maintain visual hierarchy with color and typography
- Ensure all form elements follow the design system
- Test all pages for color consistency
- No page transition color flashes (white background enforced)

## Quality Assurance Checklist
- [ ] No orange/yellow text anywhere
- [ ] No yellow button backgrounds
- [ ] No orange/yellow focus outlines
- [ ] All labels use slate-600
- [ ] All cards use slate-200 borders
- [ ] All focus states use blue rings
- [ ] Page transitions remain white
- [ ] Form elements follow consistent styling
- [ ] Navigation elements use proper colors
- [ ] Tables and data displays use slate colors

This design system ensures a consistent, professional blue-based theme throughout the entire application while completely eliminating problematic orange and yellow elements.
