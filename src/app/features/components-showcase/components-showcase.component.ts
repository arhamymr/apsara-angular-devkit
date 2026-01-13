import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-components-showcase',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="page-container p-6">
      <h1 class="text-2xl font-semibold mb-2">Components</h1>
      <p class="text-gray-600 mb-6">Component library - Coming soon</p>
      <div class="placeholder-card p-8 text-center text-gray-400">
        Component library under development
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1200px; margin: 0 auto; padding: 32px; }
    .placeholder-card { background: #f5f5f5; border-radius: 8px; }
  `]
})
export class ComponentsShowcaseComponent {}
