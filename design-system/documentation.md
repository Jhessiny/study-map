# Student Collaboration App - Design System

## Brand Personality

Light, playful, energetic, approachable, creative, collaborative

---

## Color Palette

### Primary Colors (Deep Teal)

```
--primary-50: #F0FDFB    /* Lightest tint */
--primary-100: #CCFBF0   /* Light backgrounds, hover states */
--primary-200: #99F6E0   /* Subtle highlights */
--primary-300: #5EEAD4   /* Borders, dividers - Darker, greener version */
--primary-400: #2DD4BF   /* Interactive elements */
--primary-500: #14B8A6   /* Main brand color - buttons, links */
--primary-600: #0D9488   /* Hover states */
--primary-700: #0F766E   /* Active states */
--primary-800: #115E59   /* Text emphasis */
--primary-900: #134E4A   /* Headers, strong emphasis */
```

**Usage:** Main actions, CTAs, navigation highlights, active states

### Secondary Colors (Powder Blush)

```
--secondary-50: #FFF5F7   /* Lightest tint */
--secondary-100: #FFE4E8  /* Light backgrounds */
--secondary-200: #FFCCD5  /* Subtle highlights */
--secondary-300: #FFB3C1  /* Borders, dividers */
--secondary-400: #FF99AD  /* Interactive elements */
--secondary-500: #FFA69E  /* Secondary actions - YOUR COLOR */
--secondary-600: #FF8A80  /* Hover states */
--secondary-700: #FF6E63  /* Active states */
--secondary-800: #E85850  /* Text emphasis */
--secondary-900: #CC4540  /* Strong emphasis */
```

**Usage:** Notifications, badges, highlights, warm accents

### Accent Colors

**Eggshell (Warm Neutral)**

```
--accent-eggshell: #FAF3DD
--accent-eggshell-dark: #F0E9CD
```

**Usage:** Warm backgrounds, card highlights, subtle sections

**Light Blue (Sky)**

```
--accent-sky-50: #F5FBFD
--accent-sky-100: #EBF7FB
--accent-sky-200: #D7EFF7
--accent-sky-300: #C3E7F3
--accent-sky-400: #AFDFEF
--accent-sky-500: #AED9E0
--accent-sky-600: #8FC9D6
--accent-sky-700: #70B9CC
--accent-sky-800: #51A9C2
--accent-sky-900: #3299B8
```

**Usage:** Info messages, links, calm interactive elements

**Blue Slate (Grounded)**

```
--accent-slate-50: #F2F3F5
--accent-slate-100: #E5E7EB
--accent-slate-200: #CBCFD6
--accent-slate-300: #B1B7C2
--accent-slate-400: #979FAD
--accent-slate-500: #5E6472
--accent-slate-600: #4B515E
--accent-slate-700: #383E49
--accent-slate-800: #252B35
--accent-slate-900: #121820
```

**Usage:** Text, navigation, grounding elements, professional touches

### Success (Green)

```
--success-50: #F0FDF4
--success-100: #DCFCE7
--success-500: #22C55E    /* Success messages, completed tasks */
--success-600: #16A34A
--success-700: #15803D
```

### Warning (Yellow)

```
--warning-50: #FFFBEB
--warning-100: #FEF3C7
--warning-500: #F59E0B    /* Warnings, pending items */
--warning-600: #D97706
```

### Error (Red)

```
--error-50: #FEF2F2
--error-100: #FEE2E2
--error-500: #EF4444      /* Errors, destructive actions */
--error-600: #DC2626
--error-700: #B91C1C
```

### Neutral Palette

```
--neutral-50: #FAFAFA     /* Page backgrounds */
--neutral-100: #F5F5F5    /* Card backgrounds */
--neutral-200: #E5E5E5    /* Borders */
--neutral-300: #D4D4D4    /* Dividers */
--neutral-400: #A3A3A3    /* Disabled text */
--neutral-500: #737373    /* Secondary text */
--neutral-600: #525252    /* Body text */
--neutral-700: #404040    /* Headings */
--neutral-800: #262626    /* Strong emphasis */
--neutral-900: #171717    /* Maximum contrast */
```

---

## Typography

### Font Families

**Headings:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) or [DM Sans](https://fonts.google.com/specimen/DM+Sans)

- Modern, clean, geometric
- Slightly rounded for friendly feel
- Professional yet approachable
- Alternative: [Outfit](https://fonts.google.com/specimen/Outfit)

**Body:** [Inter](https://fonts.google.com/specimen/Inter) or [Work Sans](https://fonts.google.com/specimen/Work+Sans)

- Clean, highly readable
- Excellent for body text and UI elements
- Neutral and versatile
- Alternative: [Public Sans](https://fonts.google.com/specimen/Public+Sans)

**Code/Monospace:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

- For code snippets in collaboration

**Font Pairing Recommendation:**

- Primary: **Plus Jakarta Sans** (headings) + **Inter** (body) - Modern, clean, balanced
- Alternative: **DM Sans** (headings) + **Work Sans** (body) - Slightly softer but still professional

### Type Scale (1.250 - Major Third)

```css
/* Font Sizes */
--text-xs: 0.75rem; /* 12px - Labels, captions */
--text-sm: 0.875rem; /* 14px - Small text, metadata */
--text-base: 1rem; /* 16px - Body text */
--text-lg: 1.125rem; /* 18px - Lead paragraphs */
--text-xl: 1.25rem; /* 20px - Section headings */
--text-2xl: 1.563rem; /* 25px - Card titles */
--text-3xl: 1.953rem; /* 31px - Page titles */
--text-4xl: 2.441rem; /* 39px - Hero headings */
--text-5xl: 3.052rem; /* 49px - Large display */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;

/* Line Heights */
--leading-tight: 1.25; /* Headings */
--leading-snug: 1.375; /* Short text blocks */
--leading-normal: 1.5; /* Body text */
--leading-relaxed: 1.625; /* Long-form content */
--leading-loose: 2; /* Very spacious */
```

### Typography Usage Examples

```css
/* Headings */
h1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}
h2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}
h3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
}
h4 {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
}

/* Body */
body {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

/* Small text */
.caption {
  font-size: var(--text-sm);
  color: var(--neutral-500);
}
.label {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## Spacing System (8px base)

```css
--space-0: 0;
--space-1: 0.25rem; /* 4px - Tight spacing */
--space-2: 0.5rem; /* 8px - Base unit */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px - Standard gap */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px - Card padding */
--space-8: 2rem; /* 32px - Section spacing */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px - Large gaps */
--space-16: 4rem; /* 64px - Page sections */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px - Hero sections */
```

**Usage Guidelines:**

- Component internal padding: space-4 to space-6
- Between components: space-6 to space-8
- Section margins: space-12 to space-16

---

## Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem; /* 4px - Buttons, inputs */
--radius-base: 0.5rem; /* 8px - Cards, containers */
--radius-md: 0.75rem; /* 12px - Large cards */
--radius-lg: 1rem; /* 16px - Modals */
--radius-xl: 1.5rem; /* 24px - Hero sections */
--radius-full: 9999px; /* Circular - Avatars, pills */
```

**Playful touch:** Use slightly larger border radius (8-12px) for main containers to create friendly, approachable feel

---

## Shadows

```css
/* Subtle, soft shadows for playful feel */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-base:
  0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-md:
  0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-lg:
  0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Colored shadows for playful emphasis */
--shadow-primary: 0 10px 25px -5px rgba(99, 102, 241, 0.3);
--shadow-secondary: 0 10px 25px -5px rgba(249, 115, 22, 0.3);
```

**Usage:**

- Cards: shadow-sm or shadow-base
- Hover states: shadow-md
- Modals/dropdowns: shadow-lg
- Feature cards: shadow-primary (sparingly, for emphasis)

---

## Component Styles

### Buttons

**Primary Button**

```css
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-sm);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  border: none;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--primary-600);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.btn-primary:active {
  background: var(--primary-700);
  transform: translateY(0);
}
```

**Secondary Button**

```css
.btn-secondary {
  background: var(--secondary-500);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-sm);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  border: none;
  box-shadow: var(--shadow-sm);
}
```

**Ghost Button**

```css
.btn-ghost {
  background: transparent;
  color: var(--primary-600);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-sm);
  font-weight: var(--font-semibold);
  border: 2px solid var(--primary-200);
}

.btn-ghost:hover {
  background: var(--primary-50);
  border-color: var(--primary-300);
}
```

### Input Fields

```css
.input {
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--neutral-200);
  border-radius: var(--radius-sm);
  font-size: var(--text-base);
  color: var(--neutral-700);
  background: white;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-400);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.input::placeholder {
  color: var(--neutral-400);
}
```

### Cards

```css
.card {
  background: white;
  border-radius: var(--radius-base);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--neutral-100);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-playful {
  background: linear-gradient(
    135deg,
    var(--primary-50) 0%,
    var(--secondary-50) 100%
  );
  border: 2px solid var(--primary-100);
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.badge-primary {
  background: var(--primary-100);
  color: var(--primary-700);
}

.badge-success {
  background: var(--success-100);
  color: var(--success-700);
}

.badge-warning {
  background: var(--warning-100);
  color: var(--warning-700);
}
```

### Avatars

```css
.avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  border: 2px solid white;
  box-shadow: var(--shadow-sm);
}

.avatar-sm {
  width: 32px;
  height: 32px;
}
.avatar-lg {
  width: 56px;
  height: 56px;
}
.avatar-xl {
  width: 80px;
  height: 80px;
}
```

---

## Playful Design Elements

### Micro-interactions

- Add subtle bounce animations on hover (scale: 1.02)
- Use ease-out transitions for snappy feel
- Add playful loading spinners with color gradients

### Gradient Accents

```css
--gradient-primary: linear-gradient(
  135deg,
  var(--primary-400) 0%,
  var(--primary-600) 100%
);
--gradient-playful: linear-gradient(
  135deg,
  var(--primary-400) 0%,
  var(--secondary-400) 100%
);
--gradient-subtle: linear-gradient(180deg, var(--primary-50) 0%, white 100%);
```

### Illustrations

- Use soft, rounded illustration style
- Incorporate primary and secondary colors
- Consider undraw.co or illustrations.co for consistent style

### Icons

- Recommended: Lucide Icons, Phosphor Icons, or Heroicons
- Style: Rounded or outline style (not sharp corners)
- Size: 20px or 24px for consistency

---

## Layout Patterns

### Container Widths

```css
--container-sm: 640px; /* Mobile content */
--container-md: 768px; /* Tablets */
--container-lg: 1024px; /* Desktop */
--container-xl: 1280px; /* Wide screens */
--container-full: 100%; /* Full width */
```

### Grid System

- Use CSS Grid for main layouts
- 12-column grid for flexibility
- Gap: var(--space-6) or var(--space-8)

---

## Accessibility

### Color Contrast

- All text on backgrounds must meet WCAG AA standards (4.5:1 for normal text)
- Primary-500 on white: ✓ Pass
- Neutral-600 on white: ✓ Pass
- Use neutral-700 or darker for body text

### Focus States

- Always include visible focus indicators
- Use box-shadow for focus rings (not just outline)
- Color: primary-400 with 3-4px offset

### Motion

- Respect `prefers-reduced-motion` media query
- Disable animations for users who prefer reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Implementation Quick Start

### CSS Custom Properties

```css
:root {
  /* Copy all color, spacing, and other variables here */
}
```

### Tailwind Configuration (if using Tailwind)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F4FF'
          // ... rest of primary colors
        }
        // ... other color palettes
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
      // ... other customizations
    }
  }
}
```

---

## Design System Files Recommended

1. **Figma/Design Tool**: Create component library
2. **CSS Variables**: Central stylesheet with all tokens
3. **Component Library**: Reusable React/Vue/Web Components
4. **Documentation Site**: Storybook or custom doc site
5. **Style Guide**: This document + visual examples

---

## Next Steps

1. ✅ Set up color palette in your project
2. ✅ Import and configure fonts
3. ✅ Create base component styles
4. ✅ Build a sample page to test the system
5. ✅ Iterate based on actual usage
6. Document component variations as you build

**Remember:** A design system is living and should evolve with your app. Start with these foundations and refine as you learn what works best for your student users!
