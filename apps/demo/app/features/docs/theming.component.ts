import { Component } from '@angular/core';

@Component({
  selector: 'app-theming',
  standalone: true,
  template: `
    <section class="mb-16 scroll-m-20">
      <h1 class="text-[32px] font-bold text-[color:var(--foreground,#1a1b1f)] mb-2 pb-4 border-b border-[var(--border,#e0e0e0)]">Theming</h1>
      <p class="text-lg text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">Customize the look and feel of your application with our theming system.</p>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Light &amp; Dark Mode</h2>
      <p class="text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">Apsara supports both light and dark themes out of the box.</p>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>import {{ '{' }} ThemeService {{ '}' }} from '@apsaradigital/core';

constructor(private themeService: ThemeService) {{ '{' }} {{ '}' }}

toggleTheme() {{ '{' }}
  this.themeService.toggle();
{{ '}' }}</code></pre>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Custom Colors</h2>
      <p class="text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">Define custom colors in your global styles:</p>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>:root {{ '{' }}
  --apsara-primary: #3b82f6;
  --apsara-secondary: #6366f1;
  --apsara-success: #22c55e;
  --apsara-warning: #f59e0b;
  --apsara-error: #ef4444;
{{ '}' }}</code></pre>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">CSS Variables</h2>
      <table class="w-full border-collapse my-4 text-sm bg-background rounded-lg overflow-hidden shadow-sm border border-[var(--border,#e0e0e0)]">
        <thead>
          <tr>
            <th class="text-left p-3 border-b border-[var(--border,#e0e0e0)] bg-[var(--surface-variant,#f5f5f5)] font-semibold text-[color:var(--foreground-variant,#666)] text-xs uppercase tracking-wide">Variable</th>
            <th class="text-left p-3 border-b border-[var(--border,#e0e0e0)] bg-[var(--surface-variant,#f5f5f5)] font-semibold text-[color:var(--foreground-variant,#666)] text-xs uppercase tracking-wide">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">--apsara-primary</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Primary brand color</td>
          </tr>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">--apsara-text</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Primary text color</td>
          </tr>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">--apsara-bg</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Background color</td>
          </tr>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">--apsara-border</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Border color</td>
          </tr>
        </tbody>
      </table>
    </section>
  `
})
export class ThemingComponent {}
