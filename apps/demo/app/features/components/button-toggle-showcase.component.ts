import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface ButtonToggleProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-button-toggle-showcase',
  standalone: true,
  imports: [CommonModule, ButtonToggleComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="button-toggle" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Button Toggle</h2>
        <p class="text-dimmed">A group of toggleable buttons for single selection</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="space-y-6">
                <div>
                  <h4 class="text-sm font-semibold text-dimmed uppercase tracking-wide mb-3">View Mode</h4>
                  <app-button-toggle
                    [options]="viewOptions"
                    [modelValue]="selectedView()"
                    (changed)="onViewChange($event)" />
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-dimmed uppercase tracking-wide mb-3">Sort By</h4>
                  <app-button-toggle
                    [options]="sortOptions"
                    [modelValue]="selectedSort()"
                    (changed)="onSortChange($event)" />
                </div>
              </div>
              <div class="p-4 bg-blue-50 rounded-lg mt-4">
                <p class="text-sm text-blue-600">
                  <strong>Selected View:</strong> {{ selectedView() }}
                </p>
                <p class="text-sm text-blue-600">
                  <strong>Selected Sort:</strong> {{ selectedSort() }}
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
        <h3 class="text-lg font-semibold text-foreground mb-4">With Icons</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="iconsTab()" (changed)="iconsTab.set($event)">
            @if (iconsTab() === 'preview') {
              <div class="p-6">
                <div>
                  <h4 class="text-sm font-semibold text-dimmed uppercase tracking-wide mb-3">View Mode with Icons</h4>
                  <app-button-toggle
                    [options]="viewOptions"
                    [modelValue]="selectedView()"
                    (changed)="onViewChange($event)" />
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="iconsCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 text-foreground">{{ prop.type }}</td>
          <td class="p-3 text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="tableHeader" [tableCellTemplate]="tableCell" />
      </div>
    </section>
  `
})
export class ButtonToggleShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  iconsTab = signal<string>('preview');

  selectedView = signal<string>('grid');
  selectedSort = signal<string>('date');

  viewOptions = [
    { value: 'grid', label: 'Grid', icon: 'grid_view' },
    { value: 'list', label: 'List', icon: 'view_list' },
    { value: 'compact', label: 'Compact', icon: 'density_small' }
  ];

  sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' }
  ];

  installCode = `npm install @apsara/ui/button-toggle`;

  importCode = `import { ButtonToggleComponent } from '@apsara/ui/button-toggle';`;

  usageCode = `<app-button-toggle
  [options]="viewOptions"
  [modelValue]="selectedView()"
  (changed)="onViewChange($event)" />`;

  basicCode = `<app-button-toggle
  [options]="viewOptions"
  [modelValue]="selectedView()"
  (changed)="onViewChange($event)" />

<app-button-toggle
  [options]="sortOptions"
  [modelValue]="selectedSort()"
  (changed)="onSortChange($event)" />`;

  iconsCode = `<app-button-toggle
  [options]="viewOptions"
  [modelValue]="selectedView()"
  (changed)="onViewChange($event)" />`;

  onViewChange(value: string): void {
    this.selectedView.set(value);
  }

  onSortChange(value: string): void {
    this.selectedSort.set(value);
  }

  propsData = (): ButtonToggleProp[] => [
    { name: 'options', type: 'Array<{ value: string; label: string; icon?: string }>', description: 'Array of toggle options' },
    { name: 'modelValue', type: 'string', description: 'Currently selected value' },
    { name: 'changed', type: 'EventEmitter<string>', description: 'Emitted when selection changes' }
  ];
}
