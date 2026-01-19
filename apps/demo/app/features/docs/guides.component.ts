import { Component } from '@angular/core';

@Component({
  selector: 'app-guides',
  standalone: true,
  template: `
    <section class="mb-16 scroll-m-20">
      <h1 class="text-[32px] font-bold text-[color:var(--foreground,#1a1b1f)] mb-2 pb-4 border-b border-[var(--border,#e0e0e0)]">Guides</h1>
      <p class="text-lg text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">Step-by-step tutorials for common tasks.</p>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Creating a New Feature</h2>
      <ol class="list-none p-0 my-4">
        <li class="py-4 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground-variant,#666)]">Use the CLI to generate a new feature: <pre class="mt-3"><code>apsara add feature user-management</code></pre></li>
        <li class="py-4 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground-variant,#666)]">The CLI creates the following structure:
          <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed mt-3"><code>src/app/features/user-management/
├── components/
├── services/
├── user-management.routes.ts
└── index.ts</code></pre>
        </li>
        <li class="py-4 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground-variant,#666)]">Add your components and services to the feature</li>
        <li class="py-4 text-[color:var(--foreground-variant,#666)]">Register routes in your app routes file</li>
      </ol>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Adding a New Component</h2>
      <ol class="list-none p-0 my-4">
        <li class="py-4 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground-variant,#666)]">Run the component generator:
          <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed mt-3"><code>apsara add component my-button</code></pre>
        </li>
        <li class="py-4 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground-variant,#666)]">The component will be created with proper standalone configuration</li>
        <li class="py-4 text-[color:var(--foreground-variant,#666)]">Import and use it in your templates</li>
      </ol>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Setting Up API Service</h2>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>import {{ '{' }} inject {{ '}' }} from '@angular/core';
import {{ '{' }} ApiService {{ '}' }} from '@apsaradigital/core';

@Component({{ '{' }})
export class UserComponent {{ '{' }}
  private api = inject(ApiService);

  users = this.api.get&lt;User[]&gt;('/users');
{{ '}' }}</code></pre>
    </section>
  `
})
export class GuidesComponent {}
