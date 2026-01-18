import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <section class="features-section px-6 py-16 max-w-7xl mx-auto">
      <h2 class="section-title text-3xl font-semibold text-gray-900 dark:text-white mb-2 text-center">Key Features</h2>
      <div class="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (feature of features(); track feature.title) {
          <div class="feature-card bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-xl">
            <div class="feature-icon w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <mat-icon class="text-2xl text-white">{{ feature.icon }}</mat-icon>
            </div>
            <h3 class="feature-title text-xl font-semibold text-gray-900 dark:text-white mb-3">{{ feature.title }}</h3>
            <p class="feature-description text-sm text-gray-600 dark:text-gray-400 m-0 leading-relaxed">{{ feature.description }}</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FeaturesSectionComponent {
  features = signal<Feature[]>([
    { icon: 'speed', title: 'High Performance', description: 'Optimized Angular build with lazy loading and efficient change detection' },
    { icon: 'verified', title: 'Type Safe', description: 'Strict TypeScript configuration with full type inference' },
    { icon: 'palette', title: 'Custom Design', description: 'Beautiful Tailwind-based design system' },
    { icon: 'widgets', title: 'Standalone Components', description: 'Modern Angular architecture without NgModules' },
    { icon: 'architecture', title: 'Clean Architecture', description: 'Well-organized folder structure following best practices' },
    { icon: 'sync', title: 'Signals Ready', description: 'Reactive state management using Angular Signals' }
  ]);
}
