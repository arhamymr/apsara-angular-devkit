import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { FormsModule } from '@angular/forms';

interface SelectProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-select-showcase',
  standalone: true,
  imports: [CommonModule, SelectComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent, FormsModule],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="select" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Select</h2>
        <p class="text-dimmed">A select dropdown component for choosing from options</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
                <div class="flex flex-col gap-2">
                  <app-select
                    [options]="countryOptions"
                    [placeholder]="'Select a country'"
                    [(ngModel)]="selectedCountry"
                    (changed)="onCountryChange($event)" />
                </div>
                <div class="flex flex-col gap-2">
                  <app-select
                    [options]="priorityOptions"
                    [placeholder]="'Select priority'"
                    [(ngModel)]="selectedPriority" />
                </div>
              </div>
              <div class="p-4 bg-blue-50 rounded-lg mt-4">
                <p class="text-sm text-blue-600">
                  <strong>Selected Country:</strong> {{ selectedCountry() || 'None' }}
                </p>
                <p class="text-sm text-blue-600">
                  <strong>Selected Priority:</strong> {{ selectedPriority() || 'None' }}
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
export class SelectShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');

  selectedCountry = signal<string>('us');
  selectedPriority = signal<string>('medium');

  countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' }
  ];

  priorityOptions = [
    { value: 'low', label: 'Low Priority', icon: 'arrow_downward' },
    { value: 'medium', label: 'Medium Priority', icon: 'remove' },
    { value: 'high', label: 'High Priority', icon: 'arrow_upward' }
  ];

  installCode = `npm install @apsara/ui/select`;

  importCode = `import { SelectComponent } from '@apsara/ui/select';`;

  usageCode = `<app-select
  [options]="countryOptions"
  [placeholder]="'Select a country'"
  [(ngModel)]="selectedCountry"
  (changed)="onCountryChange($event)" />`;

  basicCode = `<app-select
  [options]="countryOptions"
  [placeholder]="'Select a country'"
  [(ngModel)]="selectedCountry"
  (changed)="onCountryChange($event)" />

<app-select
  [options]="priorityOptions"
  [placeholder]="'Select priority'"
  [(ngModel)]="selectedPriority" />`;

  propsData = (): SelectProp[] => [
    { name: 'options', type: 'SelectOption[]', description: 'Array of select options' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text' },
    { name: 'value', type: 'string', description: 'Currently selected value' },
    { name: 'changed', type: 'EventEmitter<string>', description: 'Emitted when selection changes' }
  ];

  onCountryChange(value: string): void {
    this.selectedCountry.set(value);
  }
}
