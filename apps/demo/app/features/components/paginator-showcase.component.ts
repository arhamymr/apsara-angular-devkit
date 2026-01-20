import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface PaginatorProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-paginator-showcase',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <section id="paginator" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Paginator</h2>
        <p class="text-dimmed">A pagination component for navigating through pages</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <app-paginator
                [length]="100"
                [pageSize]="pageSize()"
                [pageIndex]="pageIndex()"
                (pageChange)="onPageChange($event)" />
              <div class="p-4 bg-blue-50 rounded-lg mt-4">
                <p class="text-sm text-blue-600">
                  <strong>Current Page:</strong> {{ pageIndex() + 1 }} |
                  <strong>Page Size:</strong> {{ pageSize() }}
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
export class PaginatorShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  pageIndex = signal(0);
  pageSize = signal(10);

  installCode = `npm install @apsara/ui/paginator`;

  importCode = `import { PaginatorComponent } from '@apsara/ui/paginator';`;

  usageCode = `<app-paginator
  [length]="100"
  [pageSize]="pageSize()"
  [pageIndex]="pageIndex()"
  (pageChange)="onPageChange($event)" />`;

  basicCode = `<app-paginator
  [length]="100"
  [pageSize]="pageSize()"
  [pageIndex]="pageIndex()"
  (pageChange)="onPageChange($event)" />`;

  propsData = (): PaginatorProp[] => [
    { name: 'length', type: 'number', description: 'Total number of items' },
    { name: 'pageSize', type: 'number', description: 'Number of items per page' },
    { name: 'pageIndex', type: 'number', description: 'Current page index (0-based)' },
    { name: 'pageSizeOptions', type: 'number[]', description: 'Available page size options' },
    { name: 'pageChange', type: 'EventEmitter<PageEvent>', description: 'Emitted when page changes' }
  ];

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
