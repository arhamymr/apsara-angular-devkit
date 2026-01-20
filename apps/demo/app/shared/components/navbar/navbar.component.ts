import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services';
import { ButtonComponent } from '@apsara/ui';
import { LucideAngularModule, Sun, Moon } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage, ButtonComponent, LucideAngularModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background px-4">
      <div class="max-w-[1400px] mx-auto flex items-center justify-between h-16">
        <div class="flex items-center gap-3">
          <a routerLink="/" class="flex items-center">
            <img
              [ngSrc]="themeService.theme() === 'dark' ? 'https://assets.apsaradigital.com/logo-angular-white.png' : 'https://assets.apsaradigital.com/logo-angular.png'"
              width="100"
              height="25"
              alt="Logo"
              class="h-5 w-auto">
          </a>
          <span class="bg-[oklch(0.55_0.2_250/0.1)] text-primary text-[11px] font-semibold px-2 py-1 rounded-sm">
            v0 (alpha)
          </span>
        </div>

        <div class="flex items-center gap-1">
          <a routerLink="/components" routerLinkActive="bg-accent text-foreground" [routerLinkActiveOptions]="{exact: false}"
             class="text-foreground no-underline px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent">
            Components
          </a>
          <a routerLink="/docs" routerLinkActive="bg-accent text-foreground"
             class="text-foreground no-underline px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent">
            Docs
          </a>

          <app-button
            variant="plain"
            size="icon"
            class="ml-2"
            (clicked)="themeService.toggle()">
            @if (themeService.theme() === 'dark') {
              <lucide-angular [img]="Sun" [size]="16" />
            } @else {
              <lucide-angular [img]="Moon" [size]="16" />
            }
          </app-button>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  themeService: ThemeService;
  Sun = Sun;
  Moon = Moon;

  constructor(themeService: ThemeService) {
    this.themeService = themeService;
  }
}
