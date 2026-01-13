# Minimal with Lucide Icons

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5.

## Lucide Icons

This boilerplate includes [Lucide Angular](https://lucide.dev/guide/packages/lucide-angular) for beautiful, consistent iconography.

### Using Icons

Import icons from `lucide-angular` and use them in your templates:

```typescript
import { Component } from '@angular/core';
import { LucideAngularModule, Home, User, Settings } from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [LucideAngularModule],
  template: `
    <lucide-angular [img]="HomeIcon" [size]="32"></lucide-angular>
    <lucide-angular [img]="UserIcon" [size]="24" color="blue"></lucide-angular>
  `
})
export class App {
  readonly HomeIcon = Home;
  readonly UserIcon = User;
}
```

### Available Icons

The demo in `app.component.html` showcases icons like Home, File, Menu, User, and Settings. For a complete list of available icons, visit [Lucide Icons](https://lucide.dev/icons).

### Customization

Icons support these properties:
- `[size]`: Icon size in pixels (default: 24)
- `[color]`: Icon color (default: currentColor)
- `[strokeWidth]`: Stroke width (default: 2)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
