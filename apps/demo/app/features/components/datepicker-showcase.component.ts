import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { FormsModule } from '@angular/forms';

interface DatepickerProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-datepicker-showcase',
  standalone: true,
  imports: [CommonModule, DatepickerComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent, FormsModule],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="datepicker" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Datepicker</h2>
        <p class="text-dimmed">A date selection input component</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">Basic</span>
                  <app-datepicker
                    [placeholder]="'Select a date'"
                    [(ngModel)]="selectedDate"
                    (changed)="onDateChange($event)" />
                </div>
              </div>
              <div class="p-4 bg-blue-50 rounded-lg mt-4">
                <p class="text-sm text-blue-600">
                  <strong>Selected Date:</strong> {{ formatDate(selectedDate()) }}
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
        <h3 class="text-lg font-semibold text-foreground mb-4">With Min/Max Dates</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="rangeTab()" (changed)="rangeTab.set($event)">
            @if (rangeTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-col gap-2 max-w-[240px]">
                  <app-datepicker
                    [placeholder]="'Select booking date'"
                    [minDate]="minDate"
                    [maxDate]="maxDate"
                    [(ngModel)]="bookingDate" />
                </div>
                <div class="p-4 bg-blue-50 rounded-lg mt-4">
                  <p class="text-sm text-blue-600">
                    <strong>Booking Date:</strong> {{ formatDate(bookingDate()) }}
                  </p>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="rangeCode" language="html" />
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
export class DatepickerShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  rangeTab = signal<string>('preview');

  selectedDate = signal<Date | null>(null);
  bookingDate = signal<Date | null>(null);
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3));

  installCode = `npm install @apsara/ui/datepicker`;

  importCode = `import { DatepickerComponent } from '@apsara/ui/datepicker';`;

  usageCode = `<app-datepicker
  [placeholder]="'Select a date'"
  [(ngModel)]="selectedDate"
  (changed)="onDateChange($event)" />`;

  basicCode = `<app-datepicker
  [placeholder]="'Select a date'"
  [(ngModel)]="selectedDate"
  (changed)="onDateChange($event)" />`;

  rangeCode = `<app-datepicker
  [placeholder]="'Select booking date'"
  [minDate]="minDate"
  [maxDate]="maxDate"
  [(ngModel)]="bookingDate" />`;

  propsData = (): DatepickerProp[] => [
    { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text' },
    { name: 'minDate', type: 'Date', description: 'Minimum selectable date' },
    { name: 'maxDate', type: 'Date', description: 'Maximum selectable date' },
    { name: 'value', type: 'Date | null', description: 'Selected date value' },
    { name: 'changed', type: 'EventEmitter<Date | null>', description: 'Emitted when date changes' }
  ];

  onDateChange(date: Date | null): void {
    this.selectedDate.set(date);
  }

  formatDate(date: Date | null): string {
    if (!date) return 'None';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
