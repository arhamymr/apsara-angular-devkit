import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface DividerProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-divider-showcase',
  standalone: true,
  imports: [CommonModule, DividerComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="divider" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Divider</h2>
        <p class="text-dimmed">A divider component to separate content</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="space-y-2">
                <p class="text-sm text-gray-600">Section 1 content goes here.</p>
                <app-divider />
                <p class="text-sm text-gray-600">Section 2 content goes here.</p>
                <app-divider />
                <p class="text-sm text-gray-600">Section 3 content goes here.</p>
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
        <h3 class="text-lg font-semibold text-foreground mb-4">With Text</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="textTab()" (changed)="textTab.set($event)">
            @if (textTab() === 'preview') {
              <div class="p-6">
                <div class="flex items-center gap-4">
                  <span class="text-sm text-gray-500">Left side</span>
                  <app-divider class="flex-1" />
                  <span class="text-sm text-gray-500">Right side</span>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="textCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Vertical Divider</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="verticalTab()" (changed)="verticalTab.set($event)">
            @if (verticalTab() === 'preview') {
              <div class="p-6">
                <div class="flex h-16 items-center gap-4">
                  <span class="text-sm text-gray-600">Left</span>
                  <app-divider orientation="vertical" />
                  <span class="text-sm text-gray-600">Right</span>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="verticalCode" language="html" />
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
export class DividerShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  textTab = signal<string>('preview');
  verticalTab = signal<string>('preview');

  installCode = `npm install @apsara/ui/divider`;

  importCode = `import { DividerComponent } from '@apsara/ui/divider';`;

  usageCode = `<app-divider />`;

  basicCode = `<p class="text-sm text-gray-600">Section 1 content.</p>
<app-divider />
<p class="text-sm text-gray-600">Section 2 content.</p>`;

  textCode = `<div class="flex items-center gap-4">
  <span class="text-sm text-gray-500">Left side</span>
  <app-divider class="flex-1" />
  <span class="text-sm text-gray-500">Right side</span>
</div>`;

  verticalCode = `<div class="flex items-center gap-4">
  <span class="text-sm text-gray-600">Left</span>
  <app-divider orientation="vertical" />
  <span class="text-sm text-gray-600">Right</span>
</div>`;

  propsData = (): DividerProp[] => [
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Divider orientation' },
    { name: 'class', type: 'string', description: 'Additional CSS classes' }
  ];
}
