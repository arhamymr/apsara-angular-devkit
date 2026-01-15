import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <a routerLink="/" class="logo-link">
          <img
            [ngSrc]="themeService.theme() === 'dark' ? 'https://assets.apsaradigital.com/logo-angular-white.png' : 'https://assets.apsaradigital.com/logo-angular.png'"
            width="120"
            height="30"
            alt="Logo"
            class="logo">
        </a>

        <div class="nav-links">
          <a routerLink="/components" routerLinkActive="active">Components</a>
          <a routerLink="/docs" routerLinkActive="active">Docs</a>

          <button class="theme-toggle" (click)="themeService.toggle()">
            @if (themeService.theme() === 'dark') {
              <span>Light</span>
            } @else {
              <span>Dark</span>
            }
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: var(--color-background);
      border-bottom: 1px solid var(--color-border);
      padding: 0 1rem;
    }
    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }
    .logo-link {
      display: flex;
      align-items: center;
    }
    .logo {
      height: 24px;
      width: auto;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    .nav-links a {
      color: var(--color-foreground);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.2s;
    }
    .nav-links a:hover {
      background: var(--color-muted);
    }
    .nav-links a.active {
      background: var(--color-muted);
    }
    .theme-toggle {
      background: var(--color-muted);
      border: 1px solid var(--color-border);
      color: var(--color-foreground);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.2s;
    }
    .theme-toggle:hover {
      background: var(--color-border);
    }
  `]
})
export class NavbarComponent {
  themeService = inject(ThemeService);
}
