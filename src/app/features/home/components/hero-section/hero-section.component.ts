import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/ui/button/button.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <section class="hero-section">
      <div class="hero-content">
        <div class="logo-badge">
          <span>&lt;/&gt;</span>
        </div>
        <h1 class="hero-title">Angular Dev Starter</h1>
        <p class="hero-subtitle">
          A modern Angular boilerplate with reusable components,
          Tailwind CSS, and best practices built-in. Jumpstart your next project!
        </p>
        <div class="hero-actions">
          <app-button
            label="Get Started"
            (clicked)="navigateTo('/auth/register')" />
          <app-button
            variant="outlined"
            label="Learn More"
            (clicked)="navigateTo('/about')" />
        </div>
      </div>

      <div class="tech-stack">
        <span class="tech-badge">Angular v19+</span>
        <span class="tech-badge">Tailwind CSS</span>
        <span class="tech-badge">TypeScript</span>
        <span class="tech-badge">Signals</span>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
      padding: 80px 24px;
      text-align: center;
      color: white;
    }

    .hero-content {
      max-width: 700px;
      margin: 0 auto 40px;
    }

    .logo-badge {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 32px;
      font-weight: bold;
    }

    .hero-title {
      font-size: 42px;
      font-weight: 700;
      margin: 0 0 16px;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 18px;
      opacity: 0.9;
      margin: 0 0 32px;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .tech-stack {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .tech-badge {
      background: rgba(255, 255, 255, 0.15);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 32px;
      }

      .hero-subtitle {
        font-size: 16px;
      }
    }
  `]
})
export class HeroSectionComponent {
  private readonly router = inject(Router);

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
