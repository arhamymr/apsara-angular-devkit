import { Component } from '@angular/core';

@Component({
  selector: 'app-cli',
  standalone: true,
  template: `
    <section class="mb-16 scroll-m-20">
      <h1 class="text-[32px] font-bold text-[color:var(--foreground,#1a1b1f)] mb-2 pb-4 border-b border-[var(--border,#e0e0e0)]">CLI Commands</h1>
      <p class="text-lg text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">Apsara CLI provides commands to streamline your development workflow.</p>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Initialize Project</h2>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>apsara init my-project</code></pre>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Add Component</h2>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>apsara add component my-component</code></pre>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Available Commands</h2>
      <table class="w-full border-collapse my-4 text-sm bg-background rounded-lg overflow-hidden shadow-sm border border-[var(--border,#e0e0e0)]">
        <thead>
          <tr>
            <th class="text-left p-3 border-b border-[var(--border,#e0e0e0)] bg-[var(--surface-variant,#f5f5f5)] font-semibold text-[color:var(--foreground-variant,#666)] text-xs uppercase tracking-wide">Command</th>
            <th class="text-left p-3 border-b border-[var(--border,#e0e0e0)] bg-[var(--surface-variant,#f5f5f5)] font-semibold text-[color:var(--foreground-variant,#666)] text-xs uppercase tracking-wide">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">init [name]</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Initialize a new Apsara project</td>
          </tr>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">add &lt;type&gt; [name]</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Add a new component, service, or feature</td>
          </tr>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">list</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">List available templates</td>
          </tr>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">--help</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Show help information</td>
          </tr>
        </tbody>
      </table>
    </section>
  `
})
export class CliComponent {}
