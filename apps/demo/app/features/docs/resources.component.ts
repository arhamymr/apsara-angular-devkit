import { Component } from '@angular/core';

@Component({
  selector: 'app-resources',
  standalone: true,
  template: `
    <section class="mb-16 scroll-m-20">
      <h1 class="text-[32px] font-bold text-[color:var(--foreground,#1a1b1f)] mb-2 pb-4 border-b border-[var(--border,#e0e0e0)]">Resources</h1>
      <p class="text-lg text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">Additional learning materials and references.</p>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Official Links</h2>
      <ul class="list-none p-0 my-4">
        <li class="p-4 bg-[var(--surface-variant,#f5f5f5)] rounded-lg mb-3 flex flex-col gap-1">
          <strong class="text-[color:var(--foreground,#1a1b1f)]">Angular Documentation</strong>
          <a href="https://angular.dev" target="_blank" class="text-[color:var(--primary,#005cbb)] no-underline text-sm hover:underline">angular.dev</a>
        </li>
        <li class="p-4 bg-[var(--surface-variant,#f5f5f5)] rounded-lg mb-3 flex flex-col gap-1">
          <strong class="text-[color:var(--foreground,#1a1b1f)]">Apsara GitHub</strong>
          <a href="https://github.com/apsaradigital" target="_blank" class="text-[color:var(--primary,#005cbb)] no-underline text-sm hover:underline">github.com/apsaradigital</a>
        </li>
        <li class="p-4 bg-[var(--surface-variant,#f5f5f5)] rounded-lg mb-3 flex flex-col gap-1">
          <strong class="text-[color:var(--foreground,#1a1b1f)]">Angular GitHub</strong>
          <a href="https://github.com/angular/angular" target="_blank" class="text-[color:var(--primary,#005cbb)] no-underline text-sm hover:underline">github.com/angular</a>
        </li>
      </ul>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Learning Resources</h2>
      <ul class="list-none p-0 my-4">
        <li class="p-4 bg-[var(--surface-variant,#f5f5f5)] rounded-lg mb-3 flex flex-col gap-1">
          <strong class="text-[color:var(--foreground,#1a1b1f)]">Angular YouTube Channel</strong>
          <span class="text-[color:var(--foreground-variant,#666)] text-sm">Official tutorials and updates</span>
        </li>
        <li class="p-4 bg-[var(--surface-variant,#f5f5f5)] rounded-lg mb-3 flex flex-col gap-1">
          <strong class="text-[color:var(--foreground,#1a1b1f)]">Angular Blog</strong>
          <span class="text-[color:var(--foreground-variant,#666)] text-sm">Latest announcements and guides</span>
        </li>
        <li class="p-4 bg-[var(--surface-variant,#f5f5f5)] rounded-lg mb-3 flex flex-col gap-1">
          <strong class="text-[color:var(--foreground,#1a1b1f)]">Angular Signals</strong>
          <a href="https://angular.dev/guide/signals" target="_blank" class="text-[color:var(--primary,#005cbb)] no-underline text-sm hover:underline">Learn about reactive state</a>
        </li>
      </ul>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Community</h2>
      <ul class="list-none p-0 my-4">
        <li class="p-4 bg-[var(--surface-variant,#f5f5f5)] rounded-lg mb-3 flex flex-col gap-1">
          <strong class="text-[color:var(--foreground,#1a1b1f)]">Discord</strong>
          <span class="text-[color:var(--foreground-variant,#666)] text-sm">Join our community chat</span>
        </li>
        <li class="p-4 bg-[var(--surface-variant,#f5f5f5)] rounded-lg mb-3 flex flex-col gap-1">
          <strong class="text-[color:var(--foreground,#1a1b1f)]">Stack Overflow</strong>
          <span class="text-[color:var(--foreground-variant,#666)] text-sm">Ask and answer questions</span>
        </li>
      </ul>
    </section>
  `
})
export class ResourcesComponent {}
