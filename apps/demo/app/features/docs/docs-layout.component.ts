import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IconComponent } from '@apsara/ui';
import { FormsModule } from '@angular/forms';

interface DocSection {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-docs-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, IconComponent, FormsModule],
  template: `
    <div class="flex min-h-[calc(100vh-64px)]">
      <aside class="w-[280px] flex-shrink-0 bg-background border-r border-border overflow-y-auto sticky top-16 h-[calc(100vh-64px)]">
        <nav class="py-6 px-0">
          <a routerLink="/docs" class="flex items-center gap-2 py-3 px-6 text-[color:var(--foreground-variant,#666)] no-underline text-sm mb-4 hover:text-[color:var(--primary,#005cbb)] transition-colors duration-150">
            <app-icon name="arrow_back" class="!text-[18px] !w-[18px] !h-[18px]" />
            <span>Back to Overview</span>
          </a>
          <div class="px-6 mb-6">
            <div class="relative">
              <app-icon name="search" class="!text-[18px] !w-[18px] !h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--foreground-variant,#999)]" />
              <input 
                type="text" 
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)" 
                placeholder="Search docs..."
                class="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
              />
              @if (searchQuery()) {
                <button (click)="searchQuery.set('')" class="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-[var(--surface-variant,#f5f5f5)] rounded-full transition-colors">
                  <app-icon name="close" class="!text-[14px] !w-[14px] !h-[14px] text-[color:var(--foreground-variant,#999)]" />
                </button>
              }
            </div>
          </div>
          @if (searchQuery() && filteredSections().length === 0) {
            <div class="px-6 text-center">
              <app-icon name="search_off" class="!text-[48px] !w-[48px] !h-[48px] text-[color:var(--foreground-variant,#ccc)] mb-3" />
              <p class="text-sm text-[color:var(--foreground-variant,#666)]">No sections found</p>
              <p class="text-xs text-[color:var(--foreground-variant,#999)] mt-1">Try a different search term</p>
            </div>
          } @else {
            <ul class="list-none p-0 m-0">
              @for (section of filteredSections(); track section.id) {
                <li>
                  <a [routerLink]="'/docs/' + section.id" 
                      routerLinkActive="bg-card text-primary"
                      class="flex items-center gap-3 py-2.5 px-6 text-[color:var(--foreground,#1a1b1f)] no-underline text-sm transition-all duration-150 border-l-2 border-transparent hover:bg-primary/10">
                    <app-icon [name]="section.icon" class="!text-[20px] !w-[20px] !h-[20px] text-[color:var(--foreground-variant,#666)]" />
                    <span>{{ section.title }}</span>
                  </a>
                </li>
              }
            </ul>
          }
        </nav>
      </aside>
      <main class="flex-1 p-8 min-w-0 bg-[var(--background,#fafafa)]">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DocsLayoutComponent {
  searchQuery = signal('');

  sections: DocSection[] = [
    { id: 'getting-started', title: 'Getting Started', icon: 'rocket_launch' },
    { id: 'theming', title: 'Theming', icon: 'palette' },
    { id: 'cli', title: 'CLI Commands', icon: 'terminal' },
    { id: 'icons', title: 'Icons', icon: 'emoji_symbols' },
    { id: 'guides', title: 'Guides', icon: 'menu_book' },
    { id: 'resources', title: 'Resources', icon: 'link' }
  ];

  filteredSections = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.sections;

    return this.sections.filter(
      section => section.title.toLowerCase().includes(query) || section.id.toLowerCase().includes(query)
    );
  });
}
