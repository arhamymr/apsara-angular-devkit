import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-[var(--border)] bg-[var(--surface)] py-6">
      <div class="max-w-[1400px] mx-auto px-4 text-center sm:text-left">
        <p class="text-sm text-[var(--dimmed)]">
          Built by
          <a href="https://apsaradigital.com" target="_blank" rel="noopener noreferrer" class="text-[var(--primary)] hover:underline">
            apsaradigital.com
          </a>
        </p>
      </div>
    </footer>
  `
})
export class FooterComponent {}
