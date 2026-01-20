import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimepickerComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { FormsModule } from '@angular/forms';

interface TimepickerProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-timepicker-showcase',
  standalone: true,
  imports: [CommonModule, TimepickerComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent, FormsModule],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="timepicker" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Timepicker</h2>
        <p class="text-dimmed">A time selection input component</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex flex-col gap-4 max-w-[240px]">
                <app-timepicker
                  [(ngModel)]="selectedTime"
                  (changed)="onTimeChange($event)" />
              </div>
              <div class="p-4 bg-blue-50 rounded-lg mt-4">
                <p class="text-sm text-blue-600">
                  <strong>Selected Time:</strong> {{ selectedTime() || 'None' }}
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
export class TimepickerShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  selectedTime = signal<string>('12:00');

  installCode = `npm install @apsara/ui/timepicker`;

  importCode = `import { TimepickerComponent } from '@apsara/ui/timepicker';`;

  usageCode = `<app-timepicker
  [(ngModel)]="selectedTime"
  (changed)="onTimeChange($event)" />`;

  basicCode = `<app-timepicker
  [(ngModel)]="selectedTime"
  (changed)="onTimeChange($event)" />`;

  propsData = (): TimepickerProp[] => [
    { name: 'value', type: 'string', description: 'Selected time value' },
    { name: 'changed', type: 'EventEmitter<string>', description: 'Emitted when time changes' }
  ];

  onTimeChange(value: string): void {
    this.selectedTime.set(value);
  }
}
