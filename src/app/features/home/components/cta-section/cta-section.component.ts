import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/ui/button/button.component';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <section class="cta-section">
      <div class="cta-card">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Build?</h2>
          <p class="cta-text">
            Start your next Angular project with this boilerplate.
            It includes everything you need to build modern, scalable applications.
          </p>
          <div class="cta-buttons">
            <app-button
              label="Get Started"
              (clicked)="navigateTo('/auth/register')" />
            <app-button
              variant="outlined"
              label="Learn More"
              (clicked)="navigateTo('/about')" />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta-section {
      max-width: 800px;
      margin: 0 auto;
      padding: 64px 24px;
    }

    .cta-card {
      background: white;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    }

    .cta-content {
      text-align: center;
    }

    .cta-title {
      font-size: 28px;
      font-weight: 600;
      color: #1c1b1f;
      margin: 0 0 16px;
    }

    .cta-text {
      font-size: 16px;
      color: #616161;
      margin: 0 0 32px;
      line-height: 1.6;
    }

    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }
  `]
})
export class CtaSectionComponent {
  private readonly router = inject(Router);

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
