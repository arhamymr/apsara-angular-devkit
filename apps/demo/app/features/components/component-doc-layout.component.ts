import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

interface ComponentItem {
  id: string;
  title: string;
  icon: string;
  description?: string;
}

interface ComponentCategory {
  name: string;
  items: ComponentItem[];
}

@Component({
  selector: 'app-component-doc-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatIconModule, FormsModule],
  template: `
    <div class="flex min-h-[calc(100vh-72px)]">
      <aside class="w-[280px] flex-shrink-0 bg-background border-r border-border overflow-y-auto sticky top-[72px] h-[calc(100vh-72px)]">
        <nav class="py-6 px-0">
          <a routerLink="/components" class="flex items-center gap-2 py-3 px-6 text-[color:var(--foreground-variant,#666)] no-underline text-sm mb-4 hover:text-[color:var(--primary,#005cbb)] transition-colors duration-150">
            <mat-icon class="!text-[18px] !w-[18px] !h-[18px]">arrow_back</mat-icon>
            <span>Back to Overview</span>
          </a>
          <div class="px-6 mb-6">
            <div class="relative">
              <mat-icon class="!text-[18px] !w-[18px] !h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--foreground-variant,#999)]">search</mat-icon>
              <input 
                type="text" 
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)" 
                placeholder="Search components..."
                class="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
              />
              @if (searchQuery()) {
                <button (click)="searchQuery.set('')" class="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-[var(--surface-variant,#f5f5f5)] rounded-full transition-colors">
                  <mat-icon class="!text-[14px] !w-[14px] !h-[14px] text-[color:var(--foreground-variant,#999)]">close</mat-icon>
                </button>
              }
            </div>
          </div>
          @if (searchQuery() && filteredCategories().length === 0) {
            <div class="px-6 text-center">
              <mat-icon class="!text-[48px] !w-[48px] !h-[48px] text-[color:var(--foreground-variant,#ccc)] mb-3">search_off</mat-icon>
              <p class="text-sm text-[color:var(--foreground-variant,#666)]">No components found</p>
              <p class="text-xs text-[color:var(--foreground-variant,#999)] mt-1">Try a different search term</p>
            </div>
          } @else {
            @for (category of filteredCategories(); track category.name) {
              <div class="mb-6">
                <h3 class="text-xs font-semibold uppercase tracking-wide text-[color:var(--foreground-variant,#666)] px-6 mb-3">{{ category.name }}</h3>
                <ul class="list-none p-0 m-0">
                  @for (item of category.items; track item.id) {
                    <li>
                      <a [routerLink]="'/components/' + item.id" 
                          routerLinkActive="bg-card text-primary"
                          class="flex items-center gap-3 py-2.5 px-6 text-[color:var(--foreground,#1a1b1f)] no-underline text-sm transition-all duration-150 border-l-2 border-transparent hover:bg-primary/10">
                        <mat-icon class="!text-[20px] !w-[20px] !h-[20px] text-[color:var(--foreground-variant,#666)]">{{ item.icon }}</mat-icon>
                        <span>{{ item.title }}</span>
                      </a>
                    </li>
                  }
                </ul>
              </div>
            }
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
export class ComponentDocLayoutComponent {
  searchQuery = signal('');

  categories = [
    {
      name: 'Alert',
      items: [
        { id: 'alert', title: 'Alert', icon: 'warning' },
        { id: 'alert-action', title: 'Alert Action', icon: 'bolt' },
        { id: 'alert-description', title: 'Alert Description', icon: 'notes' },
        { id: 'alert-title', title: 'Alert Title', icon: 'title' }
      ]
    },
    {
      name: 'Form Controls',
      items: [
        { id: 'button', title: 'Button', icon: 'smart_button' },
        { id: 'checkbox', title: 'Checkbox', icon: 'check_box' },
        { id: 'radio', title: 'Radio', icon: 'radio_button_checked' },
        { id: 'slide-toggle', title: 'Slide Toggle', icon: 'toggle_on' },
        { id: 'button-toggle', title: 'Button Toggle', icon: 'toggle_button' },
        { id: 'input', title: 'Input', icon: 'text_fields' },
        { id: 'select', title: 'Select', icon: 'list' },
        { id: 'autocomplete', title: 'Autocomplete', icon: 'autocomplete' },
        { id: 'datepicker', title: 'Datepicker', icon: 'calendar_today' },
        { id: 'timepicker', title: 'Timepicker', icon: 'schedule' },
        { id: 'slider', title: 'Slider', icon: 'linear_scale' },
        { id: 'chips', title: 'Chips', icon: 'label' }
      ]
    },
    {
      name: 'Navigation',
      items: [
        { id: 'menu', title: 'Menu', icon: 'menu' },
        { id: 'sidenav', title: 'Sidenav', icon: 'vertical_split' },
        { id: 'toolbar', title: 'Toolbar', icon: 'toolbar' },
        { id: 'tabs', title: 'Tabs', icon: 'tab' },
        { id: 'list', title: 'List', icon: 'list' },
        { id: 'paginator', title: 'Paginator', icon: 'last_page' },
        { id: 'stepper', title: 'Stepper', icon: 'linear_scale' },
        { id: 'expansion-panel', title: 'Expansion Panel', icon: 'expand_more' }
      ]
    },
    {
      name: 'Data Display',
      items: [
        { id: 'card', title: 'Card', icon: 'crop_square' },
        { id: 'table', title: 'Table', icon: 'table_chart' },
        { id: 'tree', title: 'Tree', icon: 'account_tree' },
        { id: 'badge', title: 'Badge', icon: 'local_offer' },
        { id: 'icon', title: 'Icon', icon: 'insert_emoticon' },
        { id: 'progress-bar', title: 'Progress Bar', icon: 'progress_bar' },
        { id: 'spinner', title: 'Spinner', icon: 'refresh' },
        { id: 'sort-header', title: 'Sort Header', icon: 'sort' }
      ]
    },
    {
      name: 'Layout',
      items: [
        { id: 'divider', title: 'Divider', icon: 'horizontal_rule' },
        { id: 'grid-list', title: 'Grid List', icon: 'grid_on' }
      ]
    },
    {
      name: 'Overlay',
      items: [
        { id: 'dialog', title: 'Dialog', icon: 'picture_in_picture_alt' },
        { id: 'tooltip', title: 'Tooltip', icon: 'info' },
        { id: 'snackbar', title: 'Snackbar', icon: 'notifications' },
        { id: 'bottom-sheet', title: 'Bottom Sheet', icon: 'vertical_align_bottom' }
      ]
    },
    {
      name: 'Utility',
      items: [
        { id: 'ripples', title: 'Ripples', icon: 'blur_on' }
      ]
    }
  ];

  filteredCategories = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.categories;

    return this.categories
      .map(category => ({
        ...category,
        items: category.items.filter(
          item => item.title.toLowerCase().includes(query) || item.id.toLowerCase().includes(query)
        )
      }))
      .filter(category => category.items.length > 0);
  });
}
