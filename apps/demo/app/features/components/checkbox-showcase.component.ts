import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { FormsModule } from '@angular/forms';

interface CheckboxProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-checkbox-showcase',
  standalone: true,
  imports: [CommonModule, CheckboxComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent, FormsModule],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="checkbox" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Checkbox</h2>
        <p class="text-dimmed">A checkbox component for selecting multiple options</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
                <div class="flex flex-col gap-3">
                  <app-checkbox [label]="'Accept terms and conditions'" />
                  <app-checkbox [label]="'Subscribe to newsletter'" [checked]="true" />
                  <app-checkbox [label]="'Disabled option'" [disabled]="true" />
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Indeterminate State</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="indeterminateTab()" (changed)="indeterminateTab.set($event)">
            @if (indeterminateTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-col gap-4">
                  <app-checkbox
                    [label]="'Select all'"
                    [isIndeterminate]="isIndeterminate()"
                    (onChange)="onSelectAll($event)" />
                  <div class="pl-6 space-y-2">
                    <app-checkbox [label]="'Option 1'" [(ngModel)]="option1" />
                    <app-checkbox [label]="'Option 2'" [(ngModel)]="option2" />
                    <app-checkbox [label]="'Option 3'" [(ngModel)]="option3" />
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="indeterminateCode" language="html" />
            }
          </app-tabs>
        </app-card>
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
export class CheckboxShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  indeterminateTab = signal<string>('preview');

  option1 = signal(false);
  option2 = signal(false);
  option3 = signal(false);
  isIndeterminate = signal(false);

  installCode = `npm install @apsara/ui/checkbox`;

  importCode = `import { CheckboxComponent } from '@apsara/ui/checkbox';`;

  usageCode = `<app-checkbox
  label="Accept terms"
  [checked]="isChecked"
  (onChange)="onChange($event)" />`;

  basicCode = `<app-checkbox [label]="'Accept terms and conditions'" />
<app-checkbox [label]="'Subscribe to newsletter'" [checked]="true" />
<app-checkbox [label]="'Disabled option'" [disabled]="true" />`;

  indeterminateCode = `<app-checkbox
  [label]="'Select all'"
  [isIndeterminate]="true"
  (onChange)="onSelectAll($event)" />
<div class="pl-6">
  <app-checkbox [label]="'Option 1'" [(ngModel)]="option1" />
  <app-checkbox [label]="'Option 2'" [(ngModel)]="option2" />
  <app-checkbox [label]="'Option 3'" [(ngModel)]="option3" />
</div>`;

  propsData = (): CheckboxProp[] => [
    { name: 'label', type: 'string', description: 'Checkbox label text' },
    { name: 'checked', type: 'boolean', description: 'Whether the checkbox is checked' },
    { name: 'disabled', type: 'boolean', description: 'Disables the checkbox' },
    { name: 'isIndeterminate', type: 'boolean', description: 'Shows indeterminate state' },
    { name: 'onChange', type: 'EventEmitter<boolean>', description: 'Emitted when checked state changes' }
  ];

  onSelectAll(value: boolean): void {
    this.option1.set(value);
    this.option2.set(value);
    this.option3.set(value);
    this.isIndeterminate.set(false);
  }
}
