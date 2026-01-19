import { Component, signal } from '@angular/core';
import { IconComponent } from '@apsara/ui';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [IconComponent],
  template: `
    <section class="mb-16 scroll-m-20">
      <h1 class="text-[32px] font-bold text-[color:var(--foreground,#1a1b1f)] mb-2 pb-4 border-b border-[var(--border,#e0e0e0)]">Icons</h1>
      <p class="text-lg text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">
        Apsara uses Material Icons by Google as its default icon system. The IconComponent provides a simple way to use icons in your application.
      </p>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Installation</h2>
      <p class="text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">Make sure Material Icons font is included in your HTML:</p>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>&lt;link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"&gt;</code></pre>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Basic Usage</h2>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>import {{ '{' }} IconComponent {{ '}' }} from '@apsara/ui';

@Component({{ '{' }}
  standalone: true,
  imports: [IconComponent],
  template: \`&lt;app-icon name="home" /&gt;\`
{{ '}' }})
export class ExampleComponent {{ '{' }} {{ '}' }}</code></pre>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Sizes</h2>
      <p class="text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">The IconComponent supports five predefined sizes:</p>
      <div class="flex items-center gap-6 my-4 p-4 bg-[var(--card,#fff)] border border-[var(--border,#e0e0e0)] rounded-lg">
        <div class="flex flex-col items-center gap-2">
          <app-icon name="home" size="xs" />
          <span class="text-xs text-[var(--dimmed,#666)]">xs</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <app-icon name="home" size="sm" />
          <span class="text-xs text-[var(--dimmed,#666)]">sm</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <app-icon name="home" size="md" />
          <span class="text-xs text-[var(--dimmed,#666)]">md</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <app-icon name="home" size="lg" />
          <span class="text-xs text-[var(--dimmed,#666)]">lg</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <app-icon name="home" size="xl" />
          <span class="text-xs text-[var(--dimmed,#666)]">xl</span>
        </div>
      </div>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>&lt;app-icon name="home" size="xs" /&gt;
&lt;app-icon name="home" size="sm" /&gt;
&lt;app-icon name="home" size="md" /&gt;
&lt;app-icon name="home" size="lg" /&gt;
&lt;app-icon name="home" size="xl" /&gt;</code></pre>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Icon Categories</h2>

      <h3 class="text-xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-8 mb-4">Action Icons</h3>
      <div class="flex flex-wrap gap-4 my-4 p-4 bg-[var(--card,#fff)] border border-[var(--border,#e0e0e0)] rounded-lg">
        <app-icon name="edit" size="md" />
        <app-icon name="delete" size="md" />
        <app-icon name="add" size="md" />
        <app-icon name="search" size="md" />
        <app-icon name="settings" size="md" />
        <app-icon name="save" size="md" />
        <app-icon name="download" size="md" />
        <app-icon name="upload" size="md" />
        <app-icon name="refresh" size="md" />
        <app-icon name="close" size="md" />
        <app-icon name="check" size="md" />
        <app-icon name="clear" size="md" />
      </div>

      <h3 class="text-xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-8 mb-4">Navigation Icons</h3>
      <div class="flex flex-wrap gap-4 my-4 p-4 bg-[var(--card,#fff)] border border-[var(--border,#e0e0e0)] rounded-lg">
        <app-icon name="chevron_left" size="md" />
        <app-icon name="chevron_right" size="md" />
        <app-icon name="expand_more" size="md" />
        <app-icon name="expand_less" size="md" />
        <app-icon name="menu" size="md" />
        <app-icon name="arrow_back" size="md" />
        <app-icon name="arrow_forward" size="md" />
        <app-icon name="arrow_drop_down" size="md" />
        <app-icon name="arrow_drop_up" size="md" />
        <app-icon name="home" size="md" />
      </div>

      <h3 class="text-xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-8 mb-4">Status Icons</h3>
      <div class="flex flex-wrap gap-4 my-4 p-4 bg-[var(--card,#fff)] border border-[var(--border,#e0e0e0)] rounded-lg">
        <app-icon name="info" size="md" />
        <app-icon name="warning" size="md" />
        <app-icon name="error" size="md" />
        <app-icon name="check_circle" size="md" />
        <app-icon name="cancel" size="md" />
        <app-icon name="help" size="md" />
        <app-icon name="sync" size="md" />
        <app-icon name="sync_problem" size="md" />
      </div>

      <h3 class="text-xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-8 mb-4">Communication Icons</h3>
      <div class="flex flex-wrap gap-4 my-4 p-4 bg-[var(--card,#fff)] border border-[var(--border,#e0e0e0)] rounded-lg">
        <app-icon name="mail" size="md" />
        <app-icon name="chat" size="md" />
        <app-icon name="phone" size="md" />
        <app-icon name="notifications" size="md" />
        <app-icon name="share" size="md" />
      </div>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Custom Styling</h2>
      <p class="text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">Use the className input to apply custom styles:</p>
      <div class="flex items-center gap-4 my-4 p-4 bg-[var(--card,#fff)] border border-[var(--border,#e0e0e0)] rounded-lg">
        <app-icon name="home" className="text-red-500" />
        <app-icon name="star" className="text-yellow-500" />
        <app-icon name="favorite" className="text-pink-500" />
        <app-icon name="verified" className="text-blue-500" />
      </div>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>&lt;app-icon name="home" className="text-red-500" /&gt;
&lt;app-icon name="star" className="text-yellow-500" /&gt;
&lt;app-icon name="favorite" className="text-pink-500" /&gt;</code></pre>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Props</h2>
      <table class="w-full border-collapse my-4 text-sm bg-background rounded-lg overflow-hidden shadow-sm border border-[var(--border,#e0e0e0)]">
        <thead>
          <tr>
            <th class="text-left p-3 border-b border-[var(--border,#e0e0e0)] bg-[var(--surface-variant,#f5f5f5)] font-semibold text-[color:var(--foreground-variant,#666)] text-xs uppercase tracking-wide">Prop</th>
            <th class="text-left p-3 border-b border-[var(--border,#e0e0e0)] bg-[var(--surface-variant,#f5f5f5)] font-semibold text-[color:var(--foreground-variant,#666)] text-xs uppercase tracking-wide">Type</th>
            <th class="text-left p-3 border-b border-[var(--border,#e0e0e0)] bg-[var(--surface-variant,#f5f5f5)] font-semibold text-[color:var(--foreground-variant,#666)] text-xs uppercase tracking-wide">Default</th>
            <th class="text-left p-3 border-b border-[var(--border,#e0e0e0)] bg-[var(--surface-variant,#f5f5f5)] font-semibold text-[color:var(--foreground-variant,#666)] text-xs uppercase tracking-wide">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">name</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">string</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">required</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Material Icons name (e.g., 'home', 'settings')</td>
          </tr>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">size</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">'md'</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Predefined size of the icon</td>
          </tr>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">ariaHidden</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">boolean</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">true</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Whether to hide the icon from screen readers</td>
          </tr>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">className</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">string</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">''</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Additional CSS classes to apply</td>
          </tr>
        </tbody>
      </table>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">All Available Icons</h2>
      <p class="text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">
        For a complete list of available Material Icons, visit the 
        <a href="https://fonts.google.com/icons" target="_blank" class="text-[color:var(--primary,#005cbb)] hover:underline">Google Material Icons</a> gallery.
      </p>
    </section>
  `
})
export class IconsComponent {}
