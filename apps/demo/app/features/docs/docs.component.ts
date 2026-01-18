import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface DocSection {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [NgOptimizedImage, MatIconModule],
  template: `
    <div class="flex min-h-[calc(100vh-64px)]">
      <aside class="w-[280px] bg-secondary border-r border-border flex flex-col sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        <div class="p-6 border-b border-border flex items-center gap-3">
          <img
            ngSrc="https://assets.apsaradigital.com/logo-angular.png"
            width="100"
            height="24"
            alt="Apsara Logo">
          <span class="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded">v1.0.0</span>
        </div>

        <nav class="flex-1 p-4 flex flex-col gap-1">
          @for (section of sections; track section.id) {
            <button
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg border-none bg-transparent cursor-pointer text-left transition-all duration-200 text-dimmed text-sm font-medium"
              [class.bg-primary]="activeSection() === section.id"
              [class.text-white]="activeSection() === section.id"
              [class.hover:bg-accent]="activeSection() !== section.id"
              (click)="setActiveSection(section.id)">
              <mat-icon class="w-6 text-center">{{ section.icon }}</mat-icon>
              <span>{{ section.title }}</span>
            </button>
          }
        </nav>

        <div class="p-6 border-t border-border flex flex-col gap-2">
          <a href="https://github.com/apsaradigital" target="_blank" class="text-dimmed text-xs hover:text-primary transition-colors no-underline">
            GitHub
          </a>
          <a href="https://angular.dev" target="_blank" class="text-dimmed text-xs hover:text-primary transition-colors no-underline">
            Angular Docs
          </a>
        </div>
      </aside>

      <main class="flex-1 p-12 max-w-[800px]">
        @switch (activeSection()) {
          @case ('getting-started') {
            <section class="mb-16 scroll-m-20">
              <h1 class="text-[32px] font-bold text-foreground mb-2 pb-4 border-b border-border">Getting Started</h1>
              <p class="text-lg text-dimmed my-4 leading-relaxed">Learn how to install and configure Apsara Angular DevKit in your project.</p>

              <div class="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg my-6 text-primary">
                <strong>Prerequisites:</strong> Angular 17+ and Node.js 18+
              </div>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Installation</h2>
              <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>npm install @apsaradigital/angular-devkit</code></pre>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Quick Start</h2>
              <p class="text-dimmed my-4 leading-relaxed">Import the module in your application:</p>
              <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>import {{ '{' }} provideApsara {{ '}' }} from '@apsaradigital/angular-devkit';

@NgModule({{ '{' }}
  imports: [/* ... */],
  providers: [provideApsara()]
{{ '}' }})
export class AppModule {{ '{' }} {{ '}' }}</code></pre>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Configuration</h2>
              <p class="text-dimmed my-4 leading-relaxed">Create an <code class="bg-tertiary px-1.5 py-0.5 rounded text-sm">apsara.config.ts</code> file in your project root:</p>
              <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>import {{ '{' }} defineConfig {{ '}' }} from '@apsaradigital/angular-devkit';

export default defineConfig({{ '{' }}
  theme: 'light',
  components: {{ '{' }}
    prefix: 'app'
  {{ '}' }}
{{ '}' }});</code></pre>
            </section>
          }

          @case ('components') {
            <section class="mb-16 scroll-m-20">
              <h1 class="text-[32px] font-bold text-foreground mb-2 pb-4 border-b border-border">Components</h1>
              <p class="text-lg text-dimmed my-4 leading-relaxed">Apsara provides a set of reusable UI components built with Angular.</p>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Button</h2>
              <p class="text-dimmed my-4 leading-relaxed">The Button component supports multiple variants and sizes.</p>
              <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>import {{ '{' }} ButtonComponent {{ '}' }} from '@apsara/ui';</code></pre>

              <h3 class="text-lg font-semibold text-foreground mt-6 mb-3">Usage</h3>
              <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>&lt;button apsaraButton variant="primary" size="md"&gt;
  Click me
&lt;/button&gt;</code></pre>

              <h3 class="text-lg font-semibold text-foreground mt-6 mb-3">Props</h3>
              <table class="w-full border-collapse my-4 text-sm bg-card rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr>
                    <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
                    <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
                    <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Default</th>
                    <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">variant</code></td>
                    <td class="p-3 border-b border-border text-foreground">'primary' | 'secondary' | 'outline' | 'ghost'</td>
                    <td class="p-3 border-b border-border text-foreground">'primary'</td>
                    <td class="p-3 border-b border-border text-foreground">Visual style variant</td>
                  </tr>
                  <tr>
                    <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">size</code></td>
                    <td class="p-3 border-b border-border text-foreground">'sm' | 'md' | 'lg'</td>
                    <td class="p-3 border-b border-border text-foreground">'md'</td>
                    <td class="p-3 border-b border-border text-foreground">Button size</td>
                  </tr>
                  <tr>
                    <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">disabled</code></td>
                    <td class="p-3 border-b border-border text-foreground">boolean</td>
                    <td class="p-3 border-b border-border text-foreground">false</td>
                    <td class="p-3 border-b border-border text-foreground">Disable the button</td>
                  </tr>
                </tbody>
              </table>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Card</h2>
              <p class="text-dimmed my-4 leading-relaxed">Card components for displaying grouped content.</p>
              <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>import {{ '{' }} CardComponent {{ '}' }} from '@apsara/ui';</code></pre>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Input</h2>
              <p class="text-dimmed my-4 leading-relaxed">Form inputs with validation and styling.</p>
              <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>import {{ '{' }} InputComponent {{ '}' }} from '@apsara/ui';</code></pre>
            </section>
          }

          @case ('theming') {
            <section class="mb-16 scroll-m-20">
              <h1 class="text-[32px] font-bold text-foreground mb-2 pb-4 border-b border-border">Theming</h1>
              <p class="text-lg text-dimmed my-4 leading-relaxed">Customize the look and feel of your application with our theming system.</p>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Light &amp; Dark Mode</h2>
              <p class="text-dimmed my-4 leading-relaxed">Apsara supports both light and dark themes out of the box.</p>
              <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>import {{ '{' }} ThemeService {{ '}' }} from '@apsaradigital/core';

// In your component
constructor(private themeService: ThemeService) {{ '{' }} {{ '}' }}

toggleTheme() {{ '{' }}
  this.themeService.toggle();
{{ '}' }}</code></pre>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Custom Colors</h2>
              <p class="text-dimmed my-4 leading-relaxed">Define custom colors in your global styles:</p>
              <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>:root {{ '{' }}
  --apsara-primary: #3b82f6;
  --apsara-secondary: #6366f1;
  --apsara-success: #22c55e;
  --apsara-warning: #f59e0b;
  --apsara-error: #ef4444;
{{ '}' }}</code></pre>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">CSS Variables</h2>
              <table class="w-full border-collapse my-4 text-sm bg-card rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr>
                    <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Variable</th>
                    <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">--apsara-primary</code></td>
                    <td class="p-3 border-b border-border text-foreground">Primary brand color</td>
                  </tr>
                  <tr>
                    <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">--apsara-text</code></td>
                    <td class="p-3 border-b border-border text-foreground">Primary text color</td>
                  </tr>
                  <tr>
                    <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">--apsara-bg</code></td>
                    <td class="p-3 border-b border-border text-foreground">Background color</td>
                  </tr>
                  <tr>
                    <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">--apsara-border</code></td>
                    <td class="p-3 border-b border-border text-foreground">Border color</td>
                  </tr>
                </tbody>
              </table>
            </section>
          }

          @case ('cli') {
            <section class="mb-16 scroll-m-20">
              <h1 class="text-[32px] font-bold text-foreground mb-2 pb-4 border-b border-border">CLI Commands</h1>
              <p class="text-lg text-dimmed my-4 leading-relaxed">Apsara CLI provides commands to streamline your development workflow.</p>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Initialize Project</h2>
              <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>apsara init my-project</code></pre>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Add Component</h2>
              <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>apsara add component my-component</code></pre>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Available Commands</h2>
              <table class="w-full border-collapse my-4 text-sm bg-card rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr>
                    <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Command</th>
                    <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">init [name]</code></td>
                    <td class="p-3 border-b border-border text-foreground">Initialize a new Apsara project</td>
                  </tr>
                  <tr>
                    <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">add &lt;type&gt; [name]</code></td>
                    <td class="p-3 border-b border-border text-foreground">Add a new component, service, or feature</td>
                  </tr>
                  <tr>
                    <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">list</code></td>
                    <td class="p-3 border-b border-border text-foreground">List available templates</td>
                  </tr>
                  <tr>
                    <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">--help</code></td>
                    <td class="p-3 border-b border-border text-foreground">Show help information</td>
                  </tr>
                </tbody>
              </table>
            </section>
          }

          @case ('guides') {
            <section class="mb-16 scroll-m-20">
              <h1 class="text-[32px] font-bold text-foreground mb-2 pb-4 border-b border-border">Guides</h1>
              <p class="text-lg text-dimmed my-4 leading-relaxed">Step-by-step tutorials for common tasks.</p>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Creating a New Feature</h2>
              <ol class="list-none p-0 my-4">
                <li class="py-4 border-b border-border text-dimmed">Use the CLI to generate a new feature: <pre class="mt-3"><code>apsara add feature user-management</code></pre></li>
                <li class="py-4 border-b border-border text-dimmed">The CLI creates the following structure:
                  <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed mt-3"><code>src/app/features/user-management/
├── components/
├── services/
├── user-management.routes.ts
└── index.ts</code></pre>
                </li>
                <li class="py-4 border-b border-border text-dimmed">Add your components and services to the feature</li>
                <li class="py-4 text-dimmed">Register routes in your app routes file</li>
              </ol>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Adding a New Component</h2>
              <ol class="list-none p-0 my-4">
                <li class="py-4 border-b border-border text-dimmed">Run the component generator:
                  <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed mt-3"><code>apsara add component my-button</code></pre>
                </li>
                <li class="py-4 border-b border-border text-dimmed">The component will be created with proper standalone configuration</li>
                <li class="py-4 text-dimmed">Import and use it in your templates</li>
              </ol>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Setting Up API Service</h2>
              <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>import {{ '{' }} inject {{ '}' }} from '@angular/core';
import {{ '{' }} ApiService {{ '}' }} from '@apsaradigital/core';

@Component({{ '{' }})
export class UserComponent {{ '{' }}
  private api = inject(ApiService);

  users = this.api.get&lt;User[]&gt;('/users');
{{ '}' }}</code></pre>
            </section>
          }

          @case ('resources') {
            <section class="mb-16 scroll-m-20">
              <h1 class="text-[32px] font-bold text-foreground mb-2 pb-4 border-b border-border">Resources</h1>
              <p class="text-lg text-dimmed my-4 leading-relaxed">Additional learning materials and references.</p>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Official Links</h2>
              <ul class="list-none p-0 my-4">
                <li class="p-4 bg-secondary rounded-lg mb-3 flex flex-col gap-1">
                  <strong class="text-foreground">Angular Documentation</strong>
                  <a href="https://angular.dev" target="_blank" class="text-primary no-underline text-sm hover:underline">angular.dev</a>
                </li>
                <li class="p-4 bg-secondary rounded-lg mb-3 flex flex-col gap-1">
                  <strong class="text-foreground">Apsara GitHub</strong>
                  <a href="https://github.com/apsaradigital" target="_blank" class="text-primary no-underline text-sm hover:underline">github.com/apsaradigital</a>
                </li>
                <li class="p-4 bg-secondary rounded-lg mb-3 flex flex-col gap-1">
                  <strong class="text-foreground">Angular GitHub</strong>
                  <a href="https://github.com/angular/angular" target="_blank" class="text-primary no-underline text-sm hover:underline">github.com/angular</a>
                </li>
              </ul>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Learning Resources</h2>
              <ul class="list-none p-0 my-4">
                <li class="p-4 bg-secondary rounded-lg mb-3 flex flex-col gap-1">
                  <strong class="text-foreground">Angular YouTube Channel</strong>
                  <span class="text-dimmed text-sm">Official tutorials and updates</span>
                </li>
                <li class="p-4 bg-secondary rounded-lg mb-3 flex flex-col gap-1">
                  <strong class="text-foreground">Angular Blog</strong>
                  <span class="text-dimmed text-sm">Latest announcements and guides</span>
                </li>
                <li class="p-4 bg-secondary rounded-lg mb-3 flex flex-col gap-1">
                  <strong class="text-foreground">Angular Signals</strong>
                  <a href="https://angular.dev/guide/signals" target="_blank" class="text-primary no-underline text-sm hover:underline">Learn about reactive state</a>
                </li>
              </ul>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Community</h2>
              <ul class="list-none p-0 my-4">
                <li class="p-4 bg-secondary rounded-lg mb-3 flex flex-col gap-1">
                  <strong class="text-foreground">Discord</strong>
                  <span class="text-dimmed text-sm">Join our community chat</span>
                </li>
                <li class="p-4 bg-secondary rounded-lg mb-3 flex flex-col gap-1">
                  <strong class="text-foreground">Stack Overflow</strong>
                  <span class="text-dimmed text-sm">Ask and answer questions</span>
                </li>
              </ul>
            </section>
          }
        }
      </main>
    </div>
  `
})
export class DocsComponent {
  activeSection = signal<string>('getting-started');

  sections: DocSection[] = [
    { id: 'getting-started', title: 'Getting Started', icon: 'rocket_launch' },
    { id: 'components', title: 'Components', icon: 'view_comfortable' },
    { id: 'theming', title: 'Theming', icon: 'palette' },
    { id: 'cli', title: 'CLI Commands', icon: 'terminal' },
    { id: 'guides', title: 'Guides', icon: 'menu_book' },
    { id: 'resources', title: 'Resources', icon: 'link' }
  ];

  setActiveSection(sectionId: string) {
    this.activeSection.set(sectionId);
  }
}
