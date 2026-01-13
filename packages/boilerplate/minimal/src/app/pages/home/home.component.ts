import { Component } from '@angular/core';
import { ButtonComponent } from '../ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="space-y-8">
      <section class="text-center py-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Welcome to {{ title }}</h2>
        <p class="text-lg text-gray-600 mb-8">A minimal Angular + Tailwind boilerplate</p>

        <div class="flex justify-center gap-4">
          <app-button label="Get Started" (clicked)="onClick()" />
          <app-button label="Learn More" variant="outlined" (clicked)="onClick()" />
        </div>
      </section>

      <section class="grid md:grid-cols-3 gap-6">
        <app-card>
          <h3 class="text-lg font-semibold mb-2">Fast</h3>
          <p class="text-gray-600">Optimized Angular build with modern best practices.</p>
        </app-card>

        <app-card>
          <h3 class="text-lg font-semibold mb-2">Customizable</h3>
          <p class="text-gray-600">Tailwind CSS for rapid and flexible styling.</p>
        </app-card>

        <app-card>
          <h3 class="text-lg font-semibold mb-2">Type Safe</h3>
          <p class="text-gray-600">Full TypeScript support with strict mode enabled.</p>
        </app-card>
      </section>

      <section>
        <app-card variant="outlined">
          <h3 class="text-lg font-semibold mb-4">Components</h3>
          <p class="text-gray-600 mb-4">Install additional components with:</p>
          <code class="block bg-gray-100 p-3 rounded">npx apsara-ui add button input card</code>
        </app-card>
      </section>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  title = 'apsara-ui';

  onClick(): void {
    console.log('Button clicked!');
  }
}
