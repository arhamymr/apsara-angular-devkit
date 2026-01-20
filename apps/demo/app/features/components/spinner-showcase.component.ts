import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface SpinnerProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-spinner-showcase',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <section id="spinner" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Spinner</h2>
        <p class="text-dimmed">A loading spinner component</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="sizesTab()" (changed)="sizesTab.set($event)">
          @if (sizesTab() === 'preview') {
            <div class="p-6">
              <div class="space-y-8">
                <div>
                  <span class="text-xs text-dimmed font-medium mb-4 block">Sizes</span>
                  <div class="flex items-center gap-6">
                    <div class="flex flex-col items-center gap-2">
                      <app-spinner size="sm" />
                      <span class="text-xs text-gray-500">Small</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                      <app-spinner size="md" />
                      <span class="text-xs text-gray-500">Medium</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                      <app-spinner size="lg" />
                      <span class="text-xs text-gray-500">Large</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span class="text-xs text-dimmed font-medium mb-4 block">Loading States</span>
                  <div class="flex items-center gap-6">
                    <div class="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                      <app-spinner size="md" />
                      <span class="text-xs text-gray-500">Loading content</span>
                    </div>
                    <div class="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                      <app-spinner size="md" />
                      <span class="text-xs text-gray-500">Processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } @else {
            <app-code-snippet [code]="sizesCode" language="html" />
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
export class SpinnerShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  sizesTab = signal<string>('preview');

  installCode = `npm install @apsara/ui/spinner`;

  importCode = `import { SpinnerComponent } from '@apsara/ui/spinner';`;

  usageCode = `<app-spinner size="md" />`;

  sizesCode = `<app-spinner size="sm" />
<app-spinner size="md" />
<app-spinner size="lg" />`;

  propsData = (): SpinnerProp[] => [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Spinner size' }
  ];
}
