# aether-ui

A **shadcn-style UI component installer for Angular**, making it easy to add beautiful, customizable UI components to your Angular projects.

[![npm version](https://img.shields.io/npm/v/aether-ui.svg)](https://www.npmjs.com/package/aether-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

✨ **shadcn-inspired** - Copy components directly into your project for full control  
🎨 **Tailwind CSS** - Beautiful, customizable components built with Tailwind  
📦 **Zero lock-in** - Components are yours to modify  
🚀 **Quick setup** - Get started in seconds  
🔧 **Multiple commands** - Add, remove, update, and list components  
🎯 **TypeScript** - Full TypeScript support  

## Installation

No installation required! Use `npx` to run commands directly:

```bash
npx aether-ui init
```

Or install globally:

```bash
npm install -g aether-ui
```

## Quick Start

### 1. Initialize a new project

```bash
npx aether-ui init
```

This will:
- Prompt you to choose a boilerplate (minimal or with Lucide icons)
- Create a new Angular project with Tailwind CSS configured
- Set up the necessary folder structure

### 2. Navigate to your project

```bash
cd your-project-name
npm install
```

### 3. Add components

```bash
npx aether-ui add button input card
```

### 4. Start developing

```bash
npm start
```

## Commands

### `init`

Initialize a new Angular project with aether-ui:

```bash
npx aether-ui init
```

**Options:**
- Interactive prompts for boilerplate selection and project name

---

### `add`

Add one or more components to your project:

```bash
npx aether-ui add <components...>
```

**Examples:**
```bash
# Add a single component
npx aether-ui add button

# Add multiple components
npx aether-ui add button input card

# Force overwrite existing components
npx aether-ui add button --force

# Preview what would be added (dry run)
npx aether-ui add button input --dry-run
```

**Options:**
- `-f, --force` - Overwrite existing components
- `-d, --dry-run` - Show what would be added without making changes

---

### `list`

List all available components:

```bash
npx aether-ui list
```

**Output example:**
```
Available components:

  button     - Button with multiple variants (filled, outlined, text, soft)
  input      - Form input with label, error handling, and icons
  card       - Container with multiple variants (elevated, outlined, tonal)

Usage: npx aether-ui add button input card
```

---

### `remove`

Remove components from your project:

```bash
npx aether-ui remove [components...]
```

**Examples:**
```bash
# Interactive selection
npx aether-ui remove

# Remove specific components
npx aether-ui remove button input

# Preview what would be removed (dry run)
npx aether-ui remove button --dry-run
```

**Options:**
- `-d, --dry-run` - Show what would be removed without making changes

---

### `update`

Update components to their latest version:

```bash
npx aether-ui update [components...]
```

**Examples:**
```bash
# Interactive selection
npx aether-ui update

# Update specific components
npx aether-ui update button input

# Update all installed components
npx aether-ui update --all

# Preview what would be updated (dry run)
npx aether-ui update --all --dry-run
```

**Options:**
- `-a, --all` - Update all installed components
- `-d, --dry-run` - Show what would be updated without making changes

---

## Component Structure

Components are copied into your project at `src/app/ui/`:

```
src/
└── app/
    └── ui/
        ├── button/
        │   ├── button.component.ts
        │   ├── button.component.html
        │   ├── button.component.css
        │   └── index.ts
        ├── input/
        └── index.ts
```

All components are automatically exported from `src/app/ui/index.ts` for easy importing:

```typescript
import { ButtonComponent, InputComponent } from './ui';
```

## Available Components

### Button
Multiple variants: filled, outlined, text, soft  
Supports icons, loading states, and disabled state

### Input
Form input with label support  
Error handling and validation states  
Icon support (prefix and suffix)

### Card
Container component  
Variants: elevated, outlined, tonal  
Composable with header, content, and actions

*More components coming soon!*

## Development

### Building from source

```bash
git clone https://github.com/arhamymr/aether-ui.git
cd apsara-angular-devkit/libs/cli
npm install
npm run build
```

### Running locally

```bash
npm link
aether-ui --version
```

### Debugging

Enable debug mode to see detailed logs:

```bash
DEBUG=1 npx aether-ui add button
```

## Requirements

- Node.js >= 18.0.0
- npm or yarn
- Angular CLI (for running the generated project)

## Philosophy

Inspired by [shadcn/ui](https://ui.shadcn.com/), aether-ui believes in giving developers full control over their components. Instead of installing components as dependencies, we copy them directly into your project. This means:

- ✅ Full control over component code
- ✅ Easy customization for your design system
- ✅ No version conflicts or update headaches
- ✅ Components are part of your codebase

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Arham Yaumil](https://github.com/arhamymr)

## Links

- [GitHub Repository](https://github.com/arhamymr/aether-ui)
- [Report Issues](https://github.com/arhamymr/aether-ui/issues)
- [NPM Package](https://www.npmjs.com/package/aether-ui)

## Acknowledgments

- Inspired by [shadcn/ui](https://ui.shadcn.com/)
- Built with [Commander.js](https://github.com/tj/commander.js/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
