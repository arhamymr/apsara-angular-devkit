import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { FormsModule } from '@angular/forms';

interface RadioProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-radio-showcase',
  standalone: true,
  imports: [CommonModule, RadioComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent, FormsModule],
  template: `
    <section id="radio" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Radio</h2>
        <p class="text-dimmed">A radio button component for single selection</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="space-y-6">
                <div>
                  <h4 class="text-sm font-semibold text-dimmed uppercase tracking-wide mb-3">Gender Selection</h4>
                  <app-radio
                    [name]="'gender'"
                    [options]="genderOptions"
                    [(ngModel)]="selectedGender" />
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-dimmed uppercase tracking-wide mb-3">Delivery Speed</h4>
                  <app-radio
                    [name]="'delivery'"
                    [options]="deliveryOptions"
                    [(ngModel)]="selectedDelivery" />
                </div>
              </div>
              <div class="p-4 bg-blue-50 rounded-lg mt-4">
                <p class="text-sm text-blue-600">
                  <strong>Selected Gender:</strong> {{ selectedGender() || 'None' }}
                </p>
                <p class="text-sm text-blue-600">
                  <strong>Selected Delivery:</strong> {{ selectedDelivery() || 'None' }}
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
export class RadioShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');

  selectedGender = signal<string>('female');
  selectedDelivery = signal<string>('standard');

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

  installCode = `npm install @apsara/ui/radio`;

  importCode = `import { RadioComponent } from '@apsara/ui/radio';`;

  usageCode = `<app-radio
  [name]="'gender'"
  [options]="genderOptions"
  [(ngModel)]="selectedGender" />`;

  basicCode = `<app-radio
  [name]="'gender'"
  [options]="genderOptions"
  [(ngModel)]="selectedGender" />

<app-radio
  [name]="'delivery'"
  [options]="deliveryOptions"
  [(ngModel)]="selectedDelivery" />`;

  propsData = (): RadioProp[] => [
    { name: 'name', type: 'string', description: 'Radio group name' },
    { name: 'options', type: 'RadioOption[]', description: 'Array of radio options' },
    { name: 'value', type: 'string', description: 'Currently selected value' },
    { name: 'onChange', type: 'EventEmitter<string>', description: 'Emitted when selection changes' }
  ];
}
