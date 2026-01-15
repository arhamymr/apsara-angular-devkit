import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarItem {
  label: string;
  route: string;
}

interface SidebarCategory {
  name: string;
  items: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Components</h2>
        <p class="sidebar-subtitle">UI Library Documentation</p>
      </div>

      <nav class="sidebar-nav">
        @for (category of categories(); track category.name) {
          <div class="category">
            <button
              class="category-header"
              [class.expanded]="isExpanded(category.name)"
              (click)="toggleCategory(category.name)">
              <span class="category-icon">
                @if (isExpanded(category.name)) {
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                } @else {
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                }
              </span>
              <span class="category-name">{{ category.name }}</span>
            </button>

            @if (isExpanded(category.name)) {
              <ul class="category-items">
                @for (item of category.items; track item.route) {
                  <li>
                    <a
                      [routerLink]="item.route"
                      routerLinkActive="active"
                      [routerLinkActiveOptions]="{ exact: item.route === '/' }">
                      {{ item.label }}
                    </a>
                  </li>
                }
              </ul>
            }
          </div>
        }
      </nav>
    </aside>
  `,
  styles: [`
    :host {
      display: block;
    }

    .sidebar {
      width: 260px;
      background: #f8fafc;
      border-right: 1px solid #e2e8f0;
      position: sticky;
      top: 64px;
      height: calc(100vh - 64px);
      overflow-y: auto;
      flex-shrink: 0;
    }

    .sidebar-header {
      padding: 20px 16px 12px;
      border-bottom: 1px solid #e2e8f0;
    }

    .sidebar-header h2 {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 4px;
    }

    .sidebar-subtitle {
      font-size: 12px;
      color: #64748b;
      margin: 0;
    }

    .sidebar-nav {
      padding: 8px 0;
    }

    .category {
      border-bottom: 1px solid #e2e8f0;
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 10px 16px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      color: #475569;
      text-align: left;
      transition: background 0.15s;
    }

    .category-header:hover {
      background: #e2e8f0;
    }

    .category-header.expanded {
      background: #e2e8f0;
    }

    .category-icon {
      display: flex;
      align-items: center;
      color: #64748b;
    }

    .category-name {
      flex: 1;
    }

    .category-items {
      list-style: none;
      margin: 0;
      padding: 4px 0 4px 36px;
    }

    .category-items li a {
      display: block;
      padding: 8px 12px;
      font-size: 13px;
      color: #64748b;
      text-decoration: none;
      border-radius: 6px;
      transition: background 0.15s, color 0.15s;
    }

    .category-items li a:hover {
      background: #e2e8f0;
      color: #1e293b;
    }

    .category-items li a.active {
      background: #dbeafe;
      color: #1d4ed8;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .sidebar {
        display: none;
      }
    }
  `]
})
export class SidebarComponent {
  categories = input.required<SidebarCategory[]>();
  expandedCategories = input.required<ReadonlySet<string>>();
  toggleCategoryEvent = output<string>();

  isExpanded(categoryName: string): boolean {
    return this.expandedCategories().has(categoryName);
  }

  toggleCategory(categoryName: string): void {
    this.toggleCategoryEvent.emit(categoryName);
  }
}
