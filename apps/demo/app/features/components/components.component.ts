import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { ButtonShowcaseComponent } from './button-showcase.component';
import { CardShowcaseComponent } from './card-showcase.component';
import { InputShowcaseComponent } from './input-showcase.component';
import { TabsShowcaseComponent } from './tabs-showcase.component';

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
    SidebarComponent,
    ButtonShowcaseComponent,
    CardShowcaseComponent,
    InputShowcaseComponent,
    TabsShowcaseComponent
  ],
  template: `
    <div class="layout">
      <app-sidebar [categories]="categories" />

      <main class="content">
        <div class="page-container">
          <header class="page-header">
            <h1>Components</h1>
            <p>A collection of reusable UI components built with Angular signals</p>
          </header>

          <app-button-showcase />
          <app-card-showcase />
          <app-input-showcase />
          <app-tabs-showcase />
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
      name: 'Prologue',
      items: [
        { label: 'Introduction', route: '/docs/introduction' },
        { label: 'Installation', route: '/docs/installation' },
        { label: 'Design Approach', route: '/docs/design-approach' },
        { label: 'Customization', route: '/docs/customization' }
      ]
    },
    {
      name: 'Components',
      items: [
        { label: 'Accordion', route: '/docs/accordion' },
        { label: 'Alert', route: '/docs/alert' },
        { label: 'Alert dialog', route: '/docs/alert-dialog' },
        { label: 'Autocomplete', route: '/docs/autocomplete' },
        { label: 'Avatar', route: '/docs/avatar' },
        { label: 'Badge', route: '/docs/badge' },
        { label: 'Button', route: '/docs/button' },
        { label: 'Card', route: '/docs/card' },
        { label: 'Checkbox', route: '/docs/checkbox' },
        { label: 'Chip', route: '/docs/chip' },
        { label: 'Collapsible', route: '/docs/collapsible' },
        { label: 'Combobox', route: '/docs/combobox' },
        { label: 'Command', route: '/docs/command' },
        { label: 'Dialog', route: '/docs/dialog' },
        { label: 'Divider', route: '/docs/divider' },
        { label: 'Field', route: '/docs/field' },
        { label: 'Fieldset', route: '/docs/fieldset' },
        { label: 'Form', route: '/docs/form' },
        { label: 'Heading', route: '/docs/heading' },
        { label: 'Icon box', route: '/docs/icon-box' },
        { label: 'Input', route: '/docs/input' },
        { label: 'Input group', route: '/docs/input-group' },
        { label: 'Item', route: '/docs/item' },
        { label: 'Kbd', route: '/docs/kbd' },
        { label: 'Label', route: '/docs/label' },
        { label: 'Menu', route: '/docs/menu' },
        { label: 'Menubar', route: '/docs/menubar' },
        { label: 'Meter', route: '/docs/meter' },
        { label: 'Number field', route: '/docs/number-field' },
        { label: 'Pagination', route: '/docs/pagination' },
        { label: 'Popover', route: '/docs/popover' },
        { label: 'Preview card', route: '/docs/preview-card' },
        { label: 'Progress', route: '/docs/progress' },
        { label: 'Radio', route: '/docs/radio' },
        { label: 'Scroll area', route: '/docs/scroll-area' },
        { label: 'Select', route: '/docs/select' },
        { label: 'Separator', route: '/docs/separator' },
        { label: 'Sidebar', route: '/docs/sidebar' },
        { label: 'Slider', route: '/docs/slider' },
        { label: 'Spinner', route: '/docs/spinner' },
        { label: 'Stack', route: '/docs/stack' },
        { label: 'Switch', route: '/docs/switch' },
        { label: 'Table', route: '/docs/table' },
        { label: 'Tabs', route: '/docs/tabs' },
        { label: 'Text', route: '/docs/text' },
        { label: 'Textarea', route: '/docs/textarea' },
        { label: 'Toast', route: '/docs/toast' },
        { label: 'Toggle', route: '/docs/toggle' },
        { label: 'Toggle group', route: '/docs/toggle-group' },
        { label: 'Toolbar', route: '/docs/toolbar' },
        { label: 'Tooltip', route: '/docs/tooltip' }
      ]
    }
  ];
}
