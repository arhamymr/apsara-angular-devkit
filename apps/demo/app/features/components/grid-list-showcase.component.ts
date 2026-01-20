import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridListComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface GridListProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-grid-list-showcase',
  standalone: true,
  imports: [CommonModule, GridListComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="grid-list" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Grid List</h2>
        <p class="text-dimmed">A grid layout component for displaying items in a grid</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <app-grid-list [cols]="2">
                @for (item of items(); track $index) {
                  <div class="bg-gray-100 rounded-lg p-6 text-center">
                    <p class="font-medium text-gray-900">Item {{ $index + 1 }}</p>
                  </div>
                }
              </app-grid-list>
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Different Column Counts</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="colsTab()" (changed)="colsTab.set($event)">
            @if (colsTab() === 'preview') {
              <div class="p-6">
                <div class="space-y-6">
                  <div>
                    <span class="text-xs text-dimmed font-medium mb-2 block">2 Columns</span>
                    <app-grid-list [cols]="2">
                      @for (item of items(); track $index) {
                        <div class="bg-gray-100 rounded-lg p-4 text-center">
                          <p class="font-medium text-gray-900">{{ $index + 1 }}</p>
                        </div>
                      }
                    </app-grid-list>
                  </div>
                  <div>
                    <span class="text-xs text-dimmed font-medium mb-2 block">3 Columns</span>
                    <app-grid-list [cols]="3" [gap]="'1.5rem'">
                      @for (item of items(); track $index) {
                        <div class="bg-blue-50 rounded-lg p-4 text-center">
                          <p class="font-medium text-blue-900">Card {{ $index + 1 }}</p>
                        </div>
                      }
                    </app-grid-list>
                  </div>
                  <div>
                    <span class="text-xs text-dimmed font-medium mb-2 block">4 Columns</span>
                    <app-grid-list [cols]="4">
                      @for (item of items(); track $index) {
                        <div class="bg-green-50 rounded-lg p-4 text-center">
                          <p class="font-medium text-green-900">{{ $index + 1 }}</p>
                        </div>
                      }
                    </app-grid-list>
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="colsCode" language="html" />
            }
          </app-tabs>
        </app-card>
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
export class GridListShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  colsTab = signal<string>('preview');

  items = signal([1, 2, 3, 4, 5, 6]);

  installCode = `npm install @apsara/ui/grid-list`;

  importCode = `import { GridListComponent } from '@apsara/ui/grid-list';`;

  usageCode = `<app-grid-list [cols]="2" [gap]="'1rem'">
  @for (item of items; track $index) {
    <div>Item {{ $index + 1 }}</div>
  }
</app-grid-list>`;

  basicCode = `<app-grid-list [cols]="2">
  @for (item of items(); track $index) {
    <div class="bg-gray-100 rounded-lg p-6 text-center">
      <p class="font-medium text-gray-900">Item {{ $index + 1 }}</p>
    </div>
  }
</app-grid-list>`;

  colsCode = `<app-grid-list [cols]="2">...</app-grid-list>
<app-grid-list [cols]="3">...</app-grid-list>
<app-grid-list [cols]="4">...</app-grid-list>`;

  propsData = (): GridListProp[] => [
    { name: 'cols', type: 'number', default: '1', description: 'Number of columns in the grid' },
    { name: 'gap', type: 'string', default: "'1rem'", description: 'Gap between grid items' }
  ];
}
