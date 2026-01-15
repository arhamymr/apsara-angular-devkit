import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface DocSection {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div class="docs-layout">
      <aside class="docs-sidebar">
        <div class="sidebar-header">
          <img
            ngSrc="https://assets.apsaradigital.com/logo-angular.png"
            width="100"
            height="24"
            alt="Apsara Logo">
          <span class="version-badge">v1.0.0</span>
        </div>

        <nav class="sidebar-nav">
          @for (section of sections; track section.id) {
            <button
              class="nav-item"
              [class.active]="activeSection() === section.id"
              (click)="setActiveSection(section.id)">
              <span class="nav-icon">{{ section.icon }}</span>
              <span class="nav-text">{{ section.title }}</span>
            </button>
          }
        </nav>

        <div class="sidebar-footer">
          <a href="https://github.com/apsaradigital" target="_blank" class="footer-link">
            GitHub
          </a>
          <a href="https://angular.dev" target="_blank" class="footer-link">
            Angular Docs
          </a>
        </div>
      </aside>

      <main class="docs-content">
        @switch (activeSection()) {
          @case ('getting-started') {
            <section class="doc-section">
              <h1>Getting Started</h1>
              <p class="lead">Learn how to install and configure Apsara Angular DevKit in your project.</p>

              <div class="info-box">
                <strong>Prerequisites:</strong> Angular 17+ and Node.js 18+
              </div>

              <h2>Installation</h2>
              <pre class="code-block"><code>npm install @apsaradigital/angular-devkit</code></pre>

              <h2>Quick Start</h2>
              <p>Import the module in your application:</p>
              <pre class="code-block"><code>import {{ '{' }} provideApsara {{ '}' }} from '@apsaradigital/angular-devkit';

@NgModule({{ '{' }}
  imports: [/* ... */],
  providers: [provideApsara()]
{{ '}' }})
export class AppModule {{ '{' }} {{ '}' }}</code></pre>

              <h2>Configuration</h2>
              <p>Create an <code>apsara.config.ts</code> file in your project root:</p>
              <pre class="code-block"><code>import {{ '{' }} defineConfig {{ '}' }} from '@apsaradigital/angular-devkit';

export default defineConfig({{ '{' }}
  theme: 'light',
  components: {{ '{' }}
    prefix: 'app'
  {{ '}' }}
{{ '}' }});</code></pre>
            </section>
          }

          @case ('components') {
            <section class="doc-section">
              <h1>Components</h1>
              <p class="lead">Apsara provides a set of reusable UI components built with Angular.</p>

              <h2>Button</h2>
              <p>The Button component supports multiple variants and sizes.</p>
              <pre class="code-block"><code>import {{ '{' }} ButtonComponent {{ '}' }} from '@apsaradigital/ui';</code></pre>

              <h3>Usage</h3>
              <pre class="code-block"><code>&lt;button apsaraButton variant="primary" size="md"&gt;
  Click me
&lt;/button&gt;</code></pre>

              <h3>Props</h3>
              <table class="props-table">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>variant</code></td>
                    <td>'primary' | 'secondary' | 'outline' | 'ghost'</td>
                    <td>'primary'</td>
                    <td>Visual style variant</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td>'sm' | 'md' | 'lg'</td>
                    <td>'md'</td>
                    <td>Button size</td>
                  </tr>
                  <tr>
                    <td><code>disabled</code></td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>Disable the button</td>
                  </tr>
                </tbody>
              </table>

              <h2>Card</h2>
              <p>Card components for displaying grouped content.</p>
              <pre class="code-block"><code>import {{ '{' }} CardComponent {{ '}' }} from '@apsaradigital/ui';</code></pre>

              <h2>Input</h2>
              <p>Form inputs with validation and styling.</p>
              <pre class="code-block"><code>import {{ '{' }} InputComponent {{ '}' }} from '@apsaradigital/ui';</code></pre>
            </section>
          }

          @case ('theming') {
            <section class="doc-section">
              <h1>Theming</h1>
              <p class="lead">Customize the look and feel of your application with our theming system.</p>

              <h2>Light & Dark Mode</h2>
              <p>Apsara supports both light and dark themes out of the box.</p>
              <pre class="code-block"><code>import {{ '{' }} ThemeService {{ '}' }} from '@apsaradigital/core';

// In your component
constructor(private themeService: ThemeService) {{ '{' }} {{ '}' }}

toggleTheme() {{ '{' }}
  this.themeService.toggle();
{{ '}' }}</code></pre>

              <h2>Custom Colors</h2>
              <p>Define custom colors in your global styles:</p>
              <pre class="code-block"><code>:root {{ '{' }}
  --apsara-primary: #3b82f6;
  --apsara-secondary: #6366f1;
  --apsara-success: #22c55e;
  --apsara-warning: #f59e0b;
  --apsara-error: #ef4444;
{{ '}' }}</code></pre>

              <h2>CSS Variables</h2>
              <table class="props-table">
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>--apsara-primary</code></td>
                    <td>Primary brand color</td>
                  </tr>
                  <tr>
                    <td><code>--apsara-text</code></td>
                    <td>Primary text color</td>
                  </tr>
                  <tr>
                    <td><code>--apsara-bg</code></td>
                    <td>Background color</td>
                  </tr>
                  <tr>
                    <td><code>--apsara-border</code></td>
                    <td>Border color</td>
                  </tr>
                </tbody>
              </table>
            </section>
          }

          @case ('cli') {
            <section class="doc-section">
              <h1>CLI Commands</h1>
              <p class="lead">Apsara CLI provides commands to streamline your development workflow.</p>

              <h2>Initialize Project</h2>
              <pre class="code-block"><code>apsara init my-project</code></pre>

              <h2>Add Component</h2>
              <pre class="code-block"><code>apsara add component my-component</code></pre>

              <h2>Available Commands</h2>
              <table class="props-table">
                <thead>
                  <tr>
                    <th>Command</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>init [name]</code></td>
                    <td>Initialize a new Apsara project</td>
                  </tr>
                  <tr>
                    <td><code>add &lt;type&gt; [name]</code></td>
                    <td>Add a new component, service, or feature</td>
                  </tr>
                  <tr>
                    <td><code>list</code></td>
                    <td>List available templates</td>
                  </tr>
                  <tr>
                    <td><code>--help</code></td>
                    <td>Show help information</td>
                  </tr>
                </tbody>
              </table>
            </section>
          }

          @case ('guides') {
            <section class="doc-section">
              <h1>Guides</h1>
              <p class="lead">Step-by-step tutorials for common tasks.</p>

              <h2>Creating a New Feature</h2>
              <ol class="guide-steps">
                <li>Use the CLI to generate a new feature: <pre><code>apsara add feature user-management</code></pre></li>
                <li>The CLI creates the following structure:
                  <pre class="code-block"><code>src/app/features/user-management/
├── components/
├── services/
├── user-management.routes.ts
└── index.ts</code></pre>
                </li>
                <li>Add your components and services to the feature</li>
                <li>Register routes in your app routes file</li>
              </ol>

              <h2>Adding a New Component</h2>
              <ol class="guide-steps">
                <li>Run the component generator:
                  <pre class="code-block"><code>apsara add component my-button</code></pre>
                </li>
                <li>The component will be created with proper standalone configuration</li>
                <li>Import and use it in your templates</li>
              </ol>

              <h2>Setting Up API Service</h2>
              <pre class="code-block"><code>import {{ '{' }} inject {{ '}' }} from '@angular/core';
import {{ '{' }} ApiService {{ '}' }} from '@apsaradigital/core';

@Component({{ '{' }})
export class UserComponent {{ '{' }}
  private api = inject(ApiService);

  users = this.api.get&lt;User[]&gt;('/users');
{{ '}' }}</code></pre>
            </section>
          }

          @case ('resources') {
            <section class="doc-section">
              <h1>Resources</h1>
              <p class="lead">Additional learning materials and references.</p>

              <h2>Official Links</h2>
              <ul class="resource-list">
                <li>
                  <strong>Angular Documentation</strong>
                  <a href="https://angular.dev" target="_blank">angular.dev</a>
                </li>
                <li>
                  <strong>Apsara GitHub</strong>
                  <a href="https://github.com/apsaradigital" target="_blank">github.com/apsaradigital</a>
                </li>
                <li>
                  <strong>Angular GitHub</strong>
                  <a href="https://github.com/angular/angular" target="_blank">github.com/angular</a>
                </li>
              </ul>

              <h2>Learning Resources</h2>
              <ul class="resource-list">
                <li>
                  <strong>Angular YouTube Channel</strong>
                  <span>Official tutorials and updates</span>
                </li>
                <li>
                  <strong>Angular Blog</strong>
                  <span>Latest announcements and guides</span>
                </li>
                <li>
                  <strong>Angular Signals</strong>
                  <a href="https://angular.dev/guide/signals" target="_blank">Learn about reactive state</a>
                </li>
              </ul>

              <h2>Community</h2>
              <ul class="resource-list">
                <li>
                  <strong>Discord</strong>
                  <span>Join our community chat</span>
                </li>
                <li>
                  <strong>Stack Overflow</strong>
                  <span>Ask and answer questions</span>
                </li>
              </ul>
            </section>
          }
        }
      </main>
    </div>
  `,
  styles: [`
    .docs-layout {
      display: flex;
      min-height: calc(100vh - 64px);
    }

    .docs-sidebar {
      width: 280px;
      background: var(--color-bg-secondary);
      border-right: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 64px;
      height: calc(100vh - 64px);
      overflow-y: auto;
    }

    .sidebar-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .version-badge {
      background: var(--color-primary-light);
      color: var(--color-primary);
      font-size: 12px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .sidebar-nav {
      flex: 1;
      padding: 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border: none;
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      text-align: left;
      transition: all 0.2s;
      color: var(--color-text-secondary);
      font-size: 14px;
      font-weight: 500;
    }

    .nav-item:hover {
      background: var(--color-bg-hover);
    }

    .nav-item.active {
      background: var(--color-primary);
      color: white;
    }

    .nav-icon {
      font-size: 18px;
      width: 24px;
      text-align: center;
    }

    .sidebar-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .footer-link {
      color: var(--color-text-secondary);
      text-decoration: none;
      font-size: 13px;
      transition: color 0.2s;
    }

    .footer-link:hover {
      color: var(--color-primary);
    }

    .docs-content {
      flex: 1;
      padding: 48px 64px;
      max-width: 800px;
    }

    .doc-section h1 {
      font-size: 32px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 0 0 8px 0;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--color-border);
    }

    .doc-section .lead {
      font-size: 18px;
      color: var(--color-text-secondary);
      margin: 16px 0 32px 0;
      line-height: 1.6;
    }

    .doc-section h2 {
      font-size: 24px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin: 40px 0 16px 0;
    }

    .doc-section h3 {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin: 24px 0 12px 0;
    }

    .doc-section p {
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin: 16px 0;
    }

    .doc-section code {
      background: var(--color-bg-tertiary);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 14px;
      color: var(--color-text-primary);
    }

    .info-box {
      background: var(--color-primary-light);
      border-left: 4px solid var(--color-primary);
      padding: 16px 20px;
      border-radius: 0 8px 8px 0;
      margin: 24px 0;
      color: var(--color-primary);
    }

    .code-block {
      background: var(--color-bg-tertiary);
      color: var(--color-text-primary);
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 14px;
      line-height: 1.6;
      margin: 16px 0;
    }

    .code-block code {
      background: transparent;
      padding: 0;
      color: inherit;
    }

    .props-table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-size: 14px;
      background: var(--color-bg-card);
      border-radius: 8px;
      overflow: hidden;
    }

    .props-table th,
    .props-table td {
      text-align: left;
      padding: 12px 16px;
      border-bottom: 1px solid var(--color-border);
    }

    .props-table th {
      background: var(--color-bg-tertiary);
      font-weight: 600;
      color: var(--color-text-secondary);
    }

    .props-table td {
      color: var(--color-text-primary);
    }

    .props-table code {
      font-size: 13px;
    }

    .guide-steps {
      list-style: none;
      padding: 0;
      margin: 16px 0;
    }

    .guide-steps li {
      padding: 16px 0;
      border-bottom: 1px solid var(--color-border);
      color: var(--color-text-secondary);
    }

    .guide-steps li:last-child {
      border-bottom: none;
    }

    .guide-steps pre {
      margin: 12px 0 0 0;
    }

    .resource-list {
      list-style: none;
      padding: 0;
      margin: 16px 0;
    }

    .resource-list li {
      padding: 16px 20px;
      background: var(--color-bg-secondary);
      border-radius: 8px;
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .resource-list strong {
      color: var(--color-text-primary);
    }

    .resource-list a {
      color: var(--color-primary);
      text-decoration: none;
      font-size: 14px;
    }

    .resource-list a:hover {
      text-decoration: underline;
    }

    .resource-list span {
      color: var(--color-text-secondary);
      font-size: 14px;
    }
  `]
})
export class DocsComponent {
  activeSection = signal<string>('getting-started');

  sections: DocSection[] = [
    { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
    { id: 'components', title: 'Components', icon: '🧩' },
    { id: 'theming', title: 'Theming', icon: '🎨' },
    { id: 'cli', title: 'CLI Commands', icon: '⚡' },
    { id: 'guides', title: 'Guides', icon: '📚' },
    { id: 'resources', title: 'Resources', icon: '🔗' }
  ];

  setActiveSection(sectionId: string) {
    this.activeSection.set(sectionId);
  }
}
