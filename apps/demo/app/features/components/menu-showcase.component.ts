import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface MenuProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-menu-showcase',
  standalone: true,
  imports: [CommonModule, MenuComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <section id="menu" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Menu</h2>
        <p class="text-dimmed">A dropdown menu component for navigation and actions</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex flex-wrap gap-4">
                <app-menu
                  [label]="'File'"
                  [icon]="'description'"
                  [items]="fileMenuItems"
                  (itemClicked)="onMenuClick($event)" />
                <app-menu
                  [label]="'Edit'"
                  [items]="editMenuItems"
                  (itemClicked)="onMenuClick($event)" />
                <app-menu
                  [label]="'Help'"
                  [items]="helpMenuItems"
                  (itemClicked)="onMenuClick($event)" />
              </div>
              <div class="p-4 bg-blue-50 rounded-lg mt-4">
                <p class="text-sm text-blue-600">
                  <strong>Last clicked:</strong> {{ lastClicked() || 'None' }}
                </p>
              </div>
            </div>
          } @else {
            <app-code-snippet [code]="basicCode" language="html" />
          }
        </app-tabs>
      </app-card>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Installation</h3>
        <app-code-snippet [code]="installCode" language="bash" />
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Usage</h3>
        <app-code-snippet [code]="importCode" language="typescript" />
        <app-code-snippet [code]="usageCode" language="html" />
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 border-b border-border text-foreground text-dimmed">{{ prop.type }}</td>
          <td class="p-3 border-b border-border text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="tableHeader" [tableCellTemplate]="tableCell" />
      </div>
    </section>
  `
})
export class MenuShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  lastClicked = signal<string>('');

  fileMenuItems = [
    { label: 'New', icon: 'note_add', shortcut: 'Ctrl+N' },
    { label: 'Open', icon: 'folder_open', shortcut: 'Ctrl+O' },
    { divider: true },
    { label: 'Save', icon: 'save', shortcut: 'Ctrl+S' },
    { label: 'Save As...', icon: 'save_as' },
    { divider: true },
    { label: 'Exit', icon: 'exit_to_app' }
  ];

  editMenuItems = [
    { label: 'Undo', icon: 'undo', shortcut: 'Ctrl+Z' },
    { label: 'Redo', icon: 'redo', shortcut: 'Ctrl+Y' },
    { divider: true },
    { label: 'Cut', icon: 'cut', shortcut: 'Ctrl+X' },
    { label: 'Copy', icon: 'content_copy', shortcut: 'Ctrl+C' },
    { label: 'Paste', icon: 'content_paste', shortcut: 'Ctrl+V' }
  ];

  helpMenuItems = [
    { label: 'Help Center', icon: 'help' },
    { label: 'Documentation', icon: 'menu_book' },
    { divider: true },
    { label: 'About', icon: 'info' }
  ];

  installCode = `npm install @apsara/ui/menu`;

  importCode = `import { MenuComponent } from '@apsara/ui/menu';`;

  usageCode = `<app-menu
  [label]="'File'"
  [items]="menuItems"
  (itemClicked)="onItemClick($event)" />`;

  basicCode = `<app-menu
  [label]="'File'"
  [icon]="'description'"
  [items]="fileMenuItems"
  (itemClicked)="onMenuClick($event)" />
<app-menu
  [label]="'Edit'"
  [items]="editMenuItems"
  (itemClicked)="onMenuClick($event)" />`;

  propsData = (): MenuProp[] => [
    { name: 'label', type: 'string', description: 'Menu button label' },
    { name: 'icon', type: 'string', description: 'Icon name for the button' },
    { name: 'items', type: 'MenuItem[]', description: 'Array of menu items' },
    { name: 'itemClicked', type: 'EventEmitter<string>', description: 'Emitted when menu item is clicked' }
  ];

  onMenuClick(value: unknown): void {
    this.lastClicked.set(value as string);
  }
}
