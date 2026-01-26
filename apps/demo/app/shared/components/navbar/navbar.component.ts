import { Component, signal, inject, HostListener } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services';
import { ButtonComponent, BottomSheetComponent } from '@apsara/ui';
import { LucideAngularModule, Sun, Moon, Menu, X } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage, ButtonComponent, LucideAngularModule, BottomSheetComponent],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <div class="max-w-[1400px] mx-auto flex items-center justify-between h-16 px-6">
        <div class="flex items-center gap-3">
          <a routerLink="/" class="flex items-center">
            <img
              [ngSrc]="themeService.theme() === 'dark' ? 'https://assets.apsaradigital.com/aether-logo-white.png' : 'https://assets.apsaradigital.com/aether-logo.png'"
              width="140"
              height="32"
              alt="Aether Logo"
              class="h-5.5 w-auto"
            />
          </a>
          <span class="bg-[oklch(0.55_0.2_250/0.1)] text-primary text-[11px] font-semibold px-2 py-1 rounded-sm">
            v0 (alpha)
          </span>
        </div>

        <div class="flex items-center gap-4">
          <div class="hidden md:flex items-center gap-4">
            <app-button variant="plain" routerLink="/components" routerLinkActive="text-foreground rounded-xl font-medium bg-accent/50" [routerLinkActiveOptions]="{exact: false}" class="text-foreground">
              Components
            </app-button>
            <app-button variant="plain" routerLink="/docs" routerLinkActive="text-foreground rounded-xl font-medium bg-accent/50">Docs</app-button>
            <app-button
              variant="outline"
              size="icon"
              (clicked)="themeService.toggle()">
              @if (themeService.theme() === 'dark') {
                <lucide-angular [img]="Sun" [size]="16" />
              } @else {
                <lucide-angular [img]="Moon" [size]="16" />
              }
            </app-button>
          </div>
          <button
            class="md:hidden p-2 rounded-lg hover:bg-accent text-foreground transition-colors"
            (click)="openMobileMenu()"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded="false">
            <lucide-angular [img]="Menu" [size]="24" />
          </button>
        </div>
      </div>
    </nav>

    <app-bottom-sheet
      id="mobile-menu"
      [isOpen]="mobileMenuOpen()"
      title="Navigation"
      [hasHandle]="true"
      (closed)="closeMobileMenu()">
      <div class="flex flex-col gap-1">
        <a
          routerLink="/"
          (click)="closeMobileMenu()"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent text-foreground transition-colors cursor-pointer">
          <span class="flex-1">Home</span>
        </a>
        <a
          routerLink="/components"
          (click)="closeMobileMenu()"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent text-foreground transition-colors cursor-pointer">
          <span class="flex-1">Components</span>
        </a>
        <a
          routerLink="/docs"
          (click)="closeMobileMenu()"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent text-foreground transition-colors cursor-pointer">
          <span class="flex-1">Docs</span>
        </a>
        <div class="border-t border-border my-2"></div>
        <button
          (click)="themeService.toggle()"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent text-foreground transition-colors cursor-pointer">
          @if (themeService.theme() === 'dark') {
            <lucide-angular [img]="Sun" [size]="20" />
          } @else {
            <lucide-angular [img]="Moon" [size]="20" />
          }
          <span>Toggle Theme</span>
        </button>
      </div>
    </app-bottom-sheet>
  `
})


export class NavbarComponent {
  readonly mobileMenuOpen = signal(false);
  readonly themeService = inject(ThemeService);
  readonly Sun = Sun;
  readonly Moon = Moon;
  readonly Menu = Menu;
  readonly X = X;

  openMobileMenu(): void {
    this.mobileMenuOpen.set(true);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  @HostListener('window:keydown.esc')
  onEscape(): void {
    if (this.mobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }
}
