import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface ProgressProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-progress-bar-showcase',
  standalone: true,
  imports: [CommonModule, ProgressComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="progress" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Progress</h2>
        <p class="text-dimmed">A progress bar component for showing completion status</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex flex-col gap-6">
                <app-progress
                  [value]="progressValue()"
                  [max]="100"
                  color="primary" />
                <div class="flex items-center gap-2">
                  <app-button size="sm" label="-10%" (clicked)="decreaseProgress()" />
                  <app-button size="sm" label="+10%" (clicked)="increaseProgress()" />
                </div>
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Colors</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="colorsTab()" (changed)="colorsTab.set($event)">
            @if (colorsTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-col gap-4">
                  <app-progress [value]="25" color="primary" />
                  <app-progress [value]="50" color="success" />
                  <app-progress [value]="75" color="warning" />
                  <app-progress [value]="100" color="danger" />
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="colorsCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Sizes</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="sizesTab()" (changed)="sizesTab.set($event)">
            @if (sizesTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-col gap-4">
                  <app-progress [value]="60" size="sm" />
                  <app-progress [value]="60" size="md" />
                  <app-progress [value]="60" size="lg" />
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="sizesCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Default</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 text-foreground">{{ prop.type }}</td>
          <td class="p-3 text-foreground">{{ prop.default || '-' }}</td>
          <td class="p-3 text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="tableHeader" [tableCellTemplate]="tableCell" />
      </div>
    </section>
  `
})
export class ProgressBarShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  colorsTab = signal<string>('preview');
  sizesTab = signal<string>('preview');

  progressValue = signal(60);

  installCode = `npm install @apsara/ui/progress-bar`;

  importCode = `import { ProgressComponent } from '@apsara/ui/progress-bar';`;

  usageCode = `<app-progress
  [value]="progressValue"
  [max]="100"
  color="primary" />`;

  basicCode = `<app-progress
  [value]="progressValue()"
  [max]="100"
  color="primary" />

<div class="flex items-center gap-2">
  <app-button size="sm" label="-10%" (clicked)="decreaseProgress()" />
  <app-button size="sm" label="+10%" (clicked)="increaseProgress()" />
</div>`;

  colorsCode = `<app-progress [value]="25" color="primary" />
<app-progress [value]="50" color="success" />
<app-progress [value]="75" color="warning" />
<app-progress [value]="100" color="danger" />`;

  sizesCode = `<app-progress [value]="60" size="sm" />
<app-progress [value]="60" size="md" />
<app-progress [value]="60" size="lg" />`;

  propsData = (): ProgressProp[] => [
    { name: 'value', type: 'number', description: 'Current progress value' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
    { name: 'color', type: "'primary' | 'success' | 'warning' | 'danger'", default: "'primary'", description: 'Progress bar color' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Progress bar size' }
  ];

  increaseProgress(): void {
    this.progressValue.update(v => Math.min(v + 10, 100));
  }

  decreaseProgress(): void {
    this.progressValue.update(v => Math.max(v - 10, 0));
  }
}
