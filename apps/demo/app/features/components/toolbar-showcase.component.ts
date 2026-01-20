import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { LucideAngularModule, Search, Bell, MoreVertical } from 'lucide-angular';

interface ToolbarProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-toolbar-showcase',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, CardComponent, TabsComponent, TableComponent, LucideAngularModule, CodeSnippetComponent],
  template: `
    <section id="toolbar" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Toolbar</h2>
        <p class="text-dimmed">A toolbar component for app headers</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6 space-y-6">
              <div>
                <span class="text-xs text-dimmed font-medium mb-3 block">Default Toolbar</span>
                <app-toolbar
                  [title]="'My Application'"
                  [hasMenu]="true"
                  (menuClicked)="onMenuClick()">
                  <button toolbar-actions class="p-2 rounded hover:bg-gray-100">
                    <lucide-angular [img]="Search" />
                  </button>
                  <button toolbar-actions class="p-2 rounded hover:bg-gray-100">
                    <lucide-angular [img]="Bell" />
                  </button>
                </app-toolbar>
              </div>
              <div>
                <span class="text-xs text-dimmed font-medium mb-3 block">Dense Toolbar</span>
                <app-toolbar
                  [title]="'Settings'"
                  [dense]="true"
                  [hasMenu]="true">
                  <button toolbar-actions class="p-2 rounded hover:bg-gray-100">
                    <lucide-angular [img]="MoreVertical" />
                  </button>
                </app-toolbar>
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
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Default</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 border-b border-border text-foreground text-dimmed">{{ prop.type }}</td>
          <td class="p-3 border-b border-border text-foreground text-dimmed">{{ prop.default || '-' }}</td>
          <td class="p-3 border-b border-border text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="tableHeader" [tableCellTemplate]="tableCell" />
      </div>
    </section>
  `
})
export class ToolbarShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');

  Search = Search;
  Bell = Bell;
  MoreVertical = MoreVertical;

  installCode = `npm install @apsara/ui/toolbar`;

  importCode = `import { ToolbarComponent } from '@apsara/ui/toolbar';`;

  usageCode = `<app-toolbar
  [title]="'My Application'"
  [hasMenu]="true"
  (menuClicked)="onMenuClick()">
  <button toolbar-actions class="p-2 rounded hover:bg-gray-100">
    <lucide-angular [img]="Search" />
  </button>
</app-toolbar>`;

  basicCode = `<app-toolbar
  [title]="'My Application'"
  [hasMenu]="true"
  (menuClicked)="onMenuClick()">
  <button toolbar-actions class="p-2 rounded hover:bg-gray-100">
    <lucide-angular [img]="Search" />
  </button>
  <button toolbar-actions class="p-2 rounded hover:bg-gray-100">
    <lucide-angular [img]="Bell" />
  </button>
</app-toolbar>

<app-toolbar
  [title]="'Settings'"
  [dense]="true"
  [hasMenu]="true">
  <button toolbar-actions class="p-2 rounded hover:bg-gray-100">
    <lucide-angular [img]="MoreVertical" />
  </button>
</app-toolbar>`;

  propsData = (): ToolbarProp[] => [
    { name: 'title', type: 'string', description: 'Toolbar title' },
    { name: 'hasMenu', type: 'boolean', default: 'false', description: 'Shows menu button' },
    { name: 'dense', type: 'boolean', default: 'false', description: 'Uses dense spacing' },
    { name: 'menuClicked', type: 'EventEmitter<void>', description: 'Emitted when menu button is clicked' }
  ];

  onMenuClick(): void {
    console.log('Menu clicked');
  }
}
