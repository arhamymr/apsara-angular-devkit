import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resources-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="resources-section">
      <h2 class="section-title">Resources</h2>
      <div class="resources-grid">
        <a routerLink="/about" class="resource-link">
          <span>About Page</span>
        </a>
        <a routerLink="/settings" class="resource-link">
          <span>Settings Page</span>
        </a>
        <a routerLink="/docs" class="resource-link">
          <span>Documentation</span>
        </a>
        <a routerLink="/auth/login" class="resource-link">
          <span>Login</span>
        </a>
      </div>
    </section>
  `,
  styles: [`
    .resources-section {
      text-align: center;
      padding: 64px 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      font-size: 28px;
      font-weight: 600;
      color: #1c1b1f;
      margin: 0 0 40px;
    }

    .resources-grid {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .resource-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 24px;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      text-decoration: none;
      color: #1c1b1f;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .resource-link:hover {
      border-color: #1976d2;
      color: #1976d2;
    }
  `]
})
export class ResourcesSectionComponent {}
