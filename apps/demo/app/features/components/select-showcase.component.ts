import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

interface SelectProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-select-showcase',
  standalone: true,
  imports: [CommonModule, SelectComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent, FormsModule, ReactiveFormsModule],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="select" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Select</h2>
        <p class="text-muted-foreground">A select dropdown component for choosing from options</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Country</label>
                  <app-select
                    [options]="countryOptions"
                    [placeholder]="'Select a country'"
                    [(ngModel)]="selectedCountry"
                    (changed)="onCountryChange($event)" />
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Priority</label>
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Searchable</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="searchTab()" (changed)="searchTab.set($event)">
            @if (searchTab() === 'preview') {
              <div class="p-6">
                <div class="max-w-sm">
                  <label class="text-sm font-medium leading-none mb-2 block">Framework</label>
                  <app-select
                    [options]="frameworkOptions"
                    [placeholder]="'Select a framework'"
                    [searchEnabled]="true"
                    [noResultsText]="'No framework found'"
                    [(ngModel)]="selectedFramework" />
                </div>
                <div class="p-4 bg-blue-50 rounded-lg mt-4 max-w-sm">
                  <p class="text-sm text-blue-600">
                    <strong>Selected:</strong> {{ selectedFramework() || 'None' }}
                  </p>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="searchCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Disabled State</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="disabledTab()" (changed)="disabledTab.set($event)">
            @if (disabledTab() === 'preview') {
              <div class="p-6">
                <div class="max-w-sm">
                  <label class="text-sm font-medium leading-none mb-2 block">Disabled Select</label>
                  <app-select
                    [options]="countryOptions"
                    [placeholder]="'Cannot select'"
                    [disabled]="true" />
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="disabledCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Reactive Forms</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="reactiveTab()" (changed)="reactiveTab.set($event)">
            @if (reactiveTab() === 'preview') {
              <div class="p-6">
                <div class="max-w-sm">
                  <label class="text-sm font-medium leading-none mb-2 block">Role</label>
                  <app-select
                    [options]="roleOptions"
                    [placeholder]="'Select a role'"
                    [formControl]="roleControl" />
                </div>
                <div class="mt-4">
                  <button class="px-3 py-1 bg-gray-200 rounded mr-2" (click)="roleControl.disable()">Disable</button>
                  <button class="px-3 py-1 bg-gray-200 rounded" (click)="roleControl.enable()">Enable</button>
                </div>
                <div class="p-4 bg-green-50 rounded-lg mt-4 max-w-sm">
                  <p class="text-sm text-green-600">
                    <strong>Form Value:</strong> {{ roleControl.value }}
                  </p>
                  <p class="text-sm text-green-600">
                    <strong>Form Status:</strong> {{ roleControl.status }}
                  </p>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="reactiveCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 text-foreground"><code class="bg-muted px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 text-foreground">{{ prop.type }}</td>
          <td class="p-3 text-foreground">{{ prop.description }}</td>
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
  searchTab = signal<string>('preview');
  disabledTab = signal<string>('preview');
  reactiveTab = signal<string>('preview');

  selectedCountry = signal<string>('us');
  selectedPriority = signal<string>('medium');
  selectedFramework = signal<string>('');

  roleControl = new FormControl('admin');

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

  frameworkOptions = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'next', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt' }
  ];

  roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' }
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

  searchCode = `<app-select
  [options]="frameworkOptions"
  [placeholder]="'Select a framework'"
  [searchEnabled]="true"
  [noResultsText]="'No framework found'"
  [(ngModel)]="selectedFramework" />`;

  disabledCode = `<app-select
  [options]="countryOptions"
  [placeholder]="'Cannot select'"
  [disabled]="true" />`;

  reactiveCode = `<!-- TS -->
roleControl = new FormControl('admin');

<!-- HTML -->
<app-select
  [options]="roleOptions"
  [placeholder]="'Select a role'"
  [formControl]="roleControl" />`;

  propsData = (): SelectProp[] => [
    { name: 'options', type: 'SelectOption[]', description: 'Array of select options' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text' },
    { name: 'searchEnabled', type: 'boolean', description: 'Enable search functionality' },
    { name: 'noResultsText', type: 'string', description: 'Text to show when no search results found' },
    { name: 'disabled', type: 'boolean', description: 'Disables the select' },
    { name: 'modelValue', type: 'string', description: 'Currently selected value (Signal)' },
    { name: 'ariaLabel', type: 'string', description: 'ARIA label for accessibility' },
    { name: 'changed', type: 'output<string>', description: 'Emitted when selection changes' },
    { name: 'opened', type: 'output<void>', description: 'Emitted when dropdown opens' },
    { name: 'closed', type: 'output<void>', description: 'Emitted when dropdown closes' }
  ];

  onCountryChange(value: string): void {
    this.selectedCountry.set(value);
  }
}
