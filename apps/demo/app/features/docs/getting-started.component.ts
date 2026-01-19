import { Component } from '@angular/core';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  template: `
    <section class="mb-16 scroll-m-20">
      <h1 class="text-[32px] font-bold text-[color:var(--foreground,#1a1b1f)] mb-2 pb-4 border-b border-[var(--border,#e0e0e0)]">Getting Started</h1>
      <p class="text-lg text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">Learn how to install and configure Apsara Angular DevKit in your project.</p>

      <div class="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg my-6 text-[color:var(--primary,#005cbb)]">
        <strong>Prerequisites:</strong> Angular 17+ and Node.js 18+
      </div>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Installation</h2>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>npm install @apsaradigital/angular-devkit</code></pre>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Quick Start</h2>
      <p class="text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">Import the module in your application:</p>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>import {{ '{' }} provideApsara {{ '}' }} from '@apsaradigital/angular-devkit';

@NgModule({{ '{' }}
  imports: [/* ... */],
  providers: [provideApsara()]
{{ '}' }})
export class AppModule {{ '{' }} {{ '}' }}</code></pre>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Configuration</h2>
      <p class="text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">Create an <code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-sm">apsara.config.ts</code> file in your project root:</p>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>import {{ '{' }} defineConfig {{ '}' }} from '@apsaradigital/angular-devkit';

export default defineConfig({{ '{' }}
  theme: 'light',
  components: {{ '{' }}
    prefix: 'app'
  {{ '}' }}
{{ '}' }});</code></pre>
    </section>
  `
})
export class GettingStartedComponent {}
