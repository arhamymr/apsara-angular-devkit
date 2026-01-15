# Apsara UI

shadcn-style UI components for Angular.

## Installation

### 1. Install Dependencies

First, install the required dependencies:

```bash
npm install clsx tailwind-merge
# or
pnpm add clsx tailwind-merge
# or
yarn add clsx tailwind-merge
```

### 2. Add Theme CSS

Import the theme CSS in your global styles file (e.g., `styles.css`):

```css
@import "tailwindcss";
@import "@apsara/ui/theme.css";
```

### 3. Add Base Styles

Add the base styles to your global styles file:

```css
@layer base {
  .dark {
    color-scheme: dark;
  }

  .root {
    isolation: isolate;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

### 4. Dark Mode

Add the `dark` class to your HTML element:

```html
<html>
  <body>
    <div class="dark">
      <!-- dark mode content -->
    </div>
  </body>
</html>
```

### 5. Import Components

Import components in your Angular modules or standalone components:

```typescript
import { ButtonComponent, CardComponent } from '@apsara/ui';

@Component({
  imports: [ButtonComponent, CardComponent],
  // ...
})
export class MyComponent {}
```

## Customization

### CSS Variables

Override any CSS variable in your global CSS to customize the theme:

```css
:root {
  --primary: oklch(0.5 0.2 250);
  --radius: 0.5rem;
}

.dark {
  --primary: oklch(0.6 0.2 250);
}
```

### Available Variables

- Colors: `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--danger`, `--danger-foreground`, `--tertiary`, `--tertiary-foreground`, `--muted`, `--border`, etc.
- Radius: `--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- Shadows: `--shadow`, `--shadow-card`, `--shadow-input`, `--shadow-popover`

## Components

- [Button](/libs/ui/src/components/button)
- [Card](/libs/ui/src/components/card)
- [Input](/libs/ui/src/components/input)
- [Tabs](/libs/ui/src/components/tabs)
- [Field](/libs/ui/src/components/field)

## Utilities

### cn()

Use the `cn()` utility to merge Tailwind CSS classes:

```typescript
import { cn } from '@apsara/ui';

@Component({
  template: `
    <div [class]="cn('base-class', condition && 'conditional-class')">
      Content
    </div>
  `
})
export class MyComponent {}
```
