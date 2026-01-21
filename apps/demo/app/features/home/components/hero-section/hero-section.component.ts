import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@apsara/ui';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <section class="w-full px-6 py-20 text-center text-foreground border border-border rounded-xl mx-auto">
      <div class="w-full">
        <h1 class="text-4xl md:text-5xl mb-4 leading-tight">Angular Components UI</h1>
        <p class="max-w-2xl mx-auto text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
          A comprehensive Angular component library built with Angular Material.
          Accessible, customizable, and performant UI components for modern web applications.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <app-button
            (clicked)="navigateTo('/components')">
            Browse Components
          </app-button>
          <app-button
            variant="outline"
            (clicked)="navigateTo('/docs')">
            Documentation
          </app-button>
        </div>
      </div>
    </section>
  `
})
export class HeroSectionComponent {
  private readonly router = inject(Router);

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
