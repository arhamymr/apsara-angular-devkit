import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-xl font-semibold text-gray-900">{{ title }}</h1>
          <nav class="flex gap-4">
            <a href="/" class="text-gray-600 hover:text-gray-900">Home</a>
            <a href="/about" class="text-gray-600 hover:text-gray-900">About</a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 py-8">
        <router-outlet />
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = '{{PROJECT_NAME}}';
}
