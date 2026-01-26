import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

interface RadioProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-radio-showcase',
  standalone: true,
  imports: [CommonModule, RadioComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent, FormsModule, ReactiveFormsModule],
  template: `
    <section id="radio" class="mb-16 scroll-m-20">
      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="space-y-6">
                <div>
                  <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Gender Selection</h4>
                  <app-radio
                    [name]="'gender'"
                    [options]="genderOptions"
                    [(ngModel)]="selectedGender" />
                </div>
              </div>
              <div class="p-4 bg-blue-50 rounded-lg mt-4">
                <p class="text-sm text-blue-600">
                  <strong>Selected:</strong> {{ selectedGender() || 'None' }}
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Disabled State</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="disabledTab()" (changed)="disabledTab.set($event)">
            @if (disabledTab() === 'preview') {
              <div class="p-6 space-y-6">
                <div>
                  <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Group Disabled</h4>
                  <app-radio
                    name="disabled-group"
                    [options]="deliveryOptions"
                    [disabled]="true"
                    [(ngModel)]="selectedDelivery" />
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Option Disabled</h4>
                  <app-radio
                    name="option-disabled"
                    [options]="genderOptions"
                    [(ngModel)]="selectedGender" />
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
                <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Select Plan</h4>
                <app-radio
                  name="plan"
                  [options]="planOptions"
                  [formControl]="planControl" />
                <div class="mt-4">
                  <button class="px-3 py-1 bg-gray-200 rounded mr-2" (click)="planControl.disable()">Disable</button>
                  <button class="px-3 py-1 bg-gray-200 rounded" (click)="planControl.enable()">Enable</button>
                </div>
                <div class="p-4 bg-green-50 rounded-lg mt-4">
                  <p class="text-sm text-green-600">
                    <strong>Form Value:</strong> {{ planControl.value }}
                  </p>
                  <p class="text-sm text-green-600">
                    <strong>Form Status:</strong> {{ planControl.status }}
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
export class RadioShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  disabledTab = signal<string>('preview');
  reactiveTab = signal<string>('preview');

  selectedGender = signal<string>('female');
  selectedDelivery = signal<string>('standard');

  planControl = new FormControl('pro');

  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other', disabled: true }
  ];

  deliveryOptions = [
    { value: 'standard', label: 'Standard (5-7 days)' },
    { value: 'express', label: 'Express (2-3 days)' },
    { value: 'overnight', label: 'Overnight' }
  ];

  planOptions = [
    { value: 'starter', label: 'Starter Plan ($10/mo)' },
    { value: 'pro', label: 'Pro Plan ($20/mo)' },
    { value: 'enterprise', label: 'Enterprise Plan ($50/mo)' }
  ];

  installCode = `npm install @apsara/ui/radio`;

  importCode = `import { RadioComponent } from '@apsara/ui/radio';`;

  usageCode = `<app-radio
  [name]="'gender'"
  [options]="genderOptions"
  [(ngModel)]="selectedGender" />`;

  basicCode = `<app-radio
  [name]="'gender'"
  [options]="genderOptions"
  [(ngModel)]="selectedGender" />`;

  disabledCode = `<!-- Group Disabled -->
<app-radio
  name="disabled-group"
  [options]="deliveryOptions"
  [disabled]="true"
  [(ngModel)]="selectedDelivery" />

<!-- Option Disabled -->
<app-radio
  name="option-disabled"
  [options]="genderOptions"
  [(ngModel)]="selectedGender" />`;

  reactiveCode = `<!-- TS -->
planControl = new FormControl('pro');

<!-- HTML -->
<app-radio
  name="plan"
  [options]="planOptions"
  [formControl]="planControl" />`;

  propsData = (): RadioProp[] => [
    { name: 'name', type: 'string', description: 'Radio group name (required)' },
    { name: 'options', type: 'RadioOption[]', description: 'Array of { value, label, disabled? }' },
    { name: 'modelValue', type: 'string', description: 'Currently selected value (Signal)' },
    { name: 'legend', type: 'string', description: 'Legend text for the fieldset (screen reader only)' },
    { name: 'onChange', type: 'output<string>', description: 'Emitted when selection changes' }
  ];
}
