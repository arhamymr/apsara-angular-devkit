import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { ButtonShowcaseComponent } from './button-showcase.component';
import { CardShowcaseComponent } from './card-showcase.component';
import { InputShowcaseComponent } from './input-showcase.component';

interface SidebarItem {
  label: string;
  route: string;
}

interface SidebarCategory {
  name: string;
  items: SidebarItem[];
}

@Component({
  selector: 'app-components-showcase',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    SidebarComponent,
    ButtonShowcaseComponent,
    CardShowcaseComponent,
    InputShowcaseComponent
  ],
  template: `
    <div class="layout">
      <app-sidebar
        [categories]="categories"
        [expandedCategories]="expandedCategories()"
        (categoryToggle)="toggleCategory($event)" />

      <main class="content">
        <div class="page-container">
          <header class="page-header">
            <h1>Components</h1>
            <p>A collection of reusable UI components built with Angular signals</p>
          </header>

          <app-button-showcase />
          <app-card-showcase />
          <app-input-showcase />
        </div>
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      min-height: calc(100vh - 64px);
    }

    .content {
      flex: 1;
      overflow-y: auto;
    }

    .page-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 32px 40px;
    }

    .page-header {
      margin-bottom: 40px;
    }

    .page-header h1 {
      font-size: 32px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 0 0 8px;
    }

    .page-header p {
      font-size: 16px;
      color: var(--color-text-secondary);
      margin: 0;
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 24px 16px;
      }
    }
  `]
})
export class ComponentsShowcaseComponent {
  categories: SidebarCategory[] = [
    {
      name: 'Actions',
      items: [
        { label: 'Button', route: '/components#button' }
      ]
    },
    {
      name: 'Layout',
      items: [
        { label: 'Card', route: '/components#card' }
      ]
    },
    {
      name: 'Forms',
      items: [
        { label: 'Input', route: '/components#input' }
      ]
    }
  ];

  expandedCategories = signal<Set<string>>(new Set(['Actions', 'Layout', 'Forms']));

  toggleCategory(categoryName: string): void {
    this.expandedCategories.update(set => {
      const newSet = new Set(set);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  }
}
