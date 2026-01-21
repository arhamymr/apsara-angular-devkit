<img src="https://assets.apsaradigital.com/aether-logo-white.png" alt="Aether UI Logo" width="200">

# aether-ui (v0 Alpha)

A customizable UI component library and CLI for Angular. Copy components directly into your project with full customization control.

## Overview

This is an Nx monorepo containing reusable Angular UI components, a CLI tool for installing components, and project templates.

## Table of Contents

1. [Quick Start](#quick-start)
2. [CLI Commands](#cli-commands)
3. [Available Components](#available-components)
4. [Project Structure](#project-structure)
5. [Technical Details](#technical-details)
6. [Building and Publishing](#building-and-publishing)
7. [Architecture](#architecture)
8. [Adding New Components](#adding-new-components)
9. [License](#license)

---

## Quick Start

```bash
# Initialize a new project (interactive)
npx aether-ui init

# Navigate to project
cd my-project

# Install dependencies
pnpm install

# Add components
npx aether-ui add button input card

# Start development server
pnpm start
```

---

## CLI Commands

### `npx aether-ui init`

Initialize a new Angular project with aether-ui.

```bash
npx aether-ui init
```

**Interactive prompts:**
1. Choose boilerplate (Minimal / Complex)
2. Enter project name

**What it does:**
- Copies the selected boilerplate template to a new directory
- Replaces `{{PROJECT_NAME}}` placeholder with your project name
- Installs base components automatically (button, input, card)

### `npx aether-ui add <components...>`

Add components to your existing project.

```bash
# Add single component
npx aether-ui add button

# Add multiple components
npx aether-ui add button input card

# Add all available components
npx aether-ui add button input card
```

**What it does:**
- Copies component files from `@aether/ui` to `src/app/ui/`
- Creates `src/app/ui/index.ts` with re-exports
- Validates component names before copying
- Skips components that already exist

### `npx aether-ui list`

List all available components.

```bash
npx aether-ui list
```

**Output:**
```
Available components:

  button     - Button with multiple variants (filled, outlined, text, soft)
  card       - Container with multiple variants (elevated, outlined, tonal)
  input      - Form input with label, error handling, and icons

Usage: npx aether-ui add button card input
```

---

## Available Components

| Component | Description | Files |
|-----------|-------------|-------|
| `button` | Button with 4 variants, 5 colors, 3 sizes | `button.component.ts`, `index.ts` |
| `input` | Form input with label, error, icons support | `input.component.ts`, `index.ts` |
| `card` | Container with 3 variants, 4 padding options | `card.component.ts`, `index.ts` |

---

## Project Structure

```
Aether-ui/
├── apps/
│   ├── boilerplate/                      # Project templates
│   │   └── minimal/
│   │       ├── angular.json
│   │       ├── tsconfig.json
│   │       ├── src/
│   │       │   ├── app/
│   │       │   │   ├── ui/               # Pre-installed components
│   │       │   │   ├── components/
│   │       │   │   ├── app.component.ts
│   │       │   │   ├── app.config.ts
│   │       │   │   └── app.routes.ts
│   │       │   ├── main.ts
│   │       │   ├── index.html
│   │       │   └── styles.css
│   │       ├── package.json
│   │       └── README.md
│   │
│   └── demo/                             # Demo/documentation app
│       ├── src/
│       ├── app/
│       ├── styles.css
│       └── angular.json
│
├── libs/
│   ├── ui/                               # UI component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   │   ├── button.component.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── input/
│   │   │   │   │   ├── input.component.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── card/
│   │   │   │       ├── card.component.ts
│   │   │   │       └── index.ts
│   │   │   ├── index.ts                  # Barrel export
│   │   │   └── public-api.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsup.config.ts                # Bundling config
│   │
│   ├── cli/                              # CLI tool
│   │   ├── src/
│   │   │   ├── main.ts                   # Entry point
│   │   │   ├── commands/
│   │   │   │   ├── init.ts               # init command
│   │   │   │   ├── add.ts                # add command
│   │   │   │   └── list.ts               # list command
│   │   │   └── utils/
│   │   │       ├── components.ts         # Component discovery
│   │   │       └── logger.ts             # Colored console output
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── tools/                            # Build tools and utilities
│
├── packages/                             # Legacy package directory
│   └── boilerplate/                      # Project templates (deprecated)
│
├── nx.json                               # Nx workspace config
├── angular.json                          # Angular CLI config
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

---

## Technical Details

### Component Architecture

Each component follows Angular standalone component patterns:

```typescript
// button.component.ts
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'soft';
export type ButtonColor = 'primary' | 'accent' | 'warn' | 'success' | 'neutral';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `...`,
  styles: [`...`]
})
export class ButtonComponent {
  readonly label = input<string>('');
  readonly variant = input<ButtonVariant>('filled');
  readonly color = input<ButtonColor>('primary');
  readonly size = input<ButtonSize>('medium');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
  readonly clicked = output<Event>();
}
```

### Signal-Based API

All components use Angular signals for reactive inputs:

- `input<T>()` - Signal-based input (Angular 18+)
- `output<Event>()` - Signal-based output
- Type exports for component props

### Component Features

**Button Component:**
- 4 variants: filled, outlined, text, soft
- 5 colors: primary, accent, warn, success, neutral
- 3 sizes: small, medium, large
- Loading state with spinner
- Disabled state
- Full width option
- Click event output

**Input Component:**
- 6 types: text, email, password, number, tel, url
- Label with required indicator
- Error message display
- Hint text
- Prefix/suffix icons
- Password visibility toggle
- ControlValueAccessor for form integration

**Card Component:**
- 3 variants: elevated, outlined, tonal
- 4 padding options: none, small, medium, large
- Content projection via `<ng-content>`
- Hover shadow effect

### CLI Architecture

The CLI is built with Commander.js:

```typescript
// main.ts
import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';

const program = new Command();

program
  .name('aether-ui')
  .description('UI component installer for Angular')
  .version('1.0.0');

program.addCommand(initCommand().name('init'));
program.addCommand(addCommand().name('add'));
program.addCommand(listCommand().name('list'));

program.parse();
```

**Path Resolution:**

CLI resolves paths relative to the package location:

```typescript
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsPath = path.resolve(__dirname, '../../../ui/src/components');
```

This resolves `libs/cli/src/commands/` to `libs/ui/src/components`.

### Boilerplate Template

The minimal boilerplate includes:

- Angular 18+ with standalone components
- Tailwind CSS v4
- TypeScript with strict mode
- Basic routing setup
- Pre-configured `src/app/ui/` directory

---

## Building and Publishing

### Building the CLI

```bash
# Navigate to CLI package
cd libs/cli

# Install dependencies
pnpm install

# Build
pnpm run build

# Output: dist/main.js, dist/commands/*.js, dist/utils/*.js
```

### Building the UI Library

```bash
# Navigate to UI package
cd libs/ui

# Install dependencies
pnpm install

# Build (generates dist/)
pnpm run build

# Output: dist/index.js, dist/index.d.ts
```

### Publishing to npm

**For UI library:**

```bash
cd libs/ui
pnpm publish
```

**For CLI:**

```bash
cd libs/cli
pnpm publish
```

### Local Development

```bash
# Install root dependencies
pnpm install

# Build both packages
pnpm run build

# Test CLI locally
node libs/cli/dist/main.js list
node libs/cli/dist/main.js init
```

### Nx Commands

```bash
# Run demo app
npx nx serve demo

# Run boilerplate
npx nx serve boilerplate

# Build all libraries
npx nx run-many --target=build --projects=ui,cli

# Run tests
npx nx test
```

---

## Architecture

### Design Principles

1. **Source Code Ownership**
   - Components are copied into user projects
   - Users fully own and can modify the code
   - No npm dependency on @aether/ui after installation

2. **Minimal Dependencies**
   - Only Tailwind CSS for styling
   - No third-party UI libraries
   - Native Angular features (signals, standalone)

3. **Type Safety**
   - Full TypeScript support
   - Strict mode enabled
   - Type exports for component props

4. **Accessibility**
   - Semantic HTML
   - ARIA attributes where needed
   - Focus management

### Component Discovery

The CLI discovers available components by scanning the UI package:

```typescript
function getAvailableComponents(componentsPath: string): string[] {
  const entries = fs.readdirSync(componentsPath, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
}
```

### File Copy Process

When adding components:

1. Validate component names against available list
2. Copy component directory to `src/app/ui/<component>/`
3. Update `src/app/ui/index.ts` with re-exports
4. Log success for each copied component

---

## Adding New Components

### 1. Create Component Files

Create in `libs/ui/src/components/<component-name>/`:

```typescript
// libs/ui/src/components/new-component/new-component.component.ts
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-component',
  standalone: true,
  imports: [CommonModule],
  template: `...`,
  styles: [`...`]
})
export class NewComponentComponent {
  // Define inputs using signal API
  readonly label = input<string>('');
}
```

### 2. Create Index Export

```typescript
// libs/ui/src/components/new-component/index.ts
export { NewComponentComponent } from './new-component.component';
```

### 3. Update UI Package Index

```typescript
// libs/ui/src/index.ts
export * from './button';
export * from './input';
export * from './card';
export * from './new-component';  // Add this
```

### 4. Add CLI Component Description

Update `libs/cli/src/commands/list.ts`:

```typescript
const componentDescriptions: Record<string, string> = {
  button: 'Button with multiple variants (filled, outlined, text, soft)',
  input: 'Form input with label, error handling, and icons',
  card: 'Container with multiple variants (elevated, outlined, tonal)',
  new-component: 'Description of new component'  // Add this
};
```

### 5. Rebuild CLI

```bash
cd libs/cli && pnpm run build
```

---

## License

MIT
