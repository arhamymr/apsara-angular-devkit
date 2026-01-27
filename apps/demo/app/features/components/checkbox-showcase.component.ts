import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

interface CheckboxProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-checkbox-showcase',
  standalone: true,
  imports: [CommonModule, CheckboxComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent, FormsModule, ReactiveFormsModule],
  template: `
    <section id="checkbox" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Checkbox</h2>
        <p class="text-muted-foreground">A checkbox component for selecting multiple options</p>
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Sizes</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="sizesTab()" (changed)="sizesTab.set($event)">
            @if (sizesTab() === 'preview') {
              <div class="p-6">
                <div class="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Small</span>
                    <app-checkbox size="sm" label="SM size" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Medium (default)</span>
                    <app-checkbox size="md" label="MD size" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Large</span>
                    <app-checkbox size="lg" label="LG size" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Extra Large</span>
                    <app-checkbox size="xl" label="XL size" />
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="sizesCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Colors</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="colorsTab()" (changed)="colorsTab.set($event)">
            @if (colorsTab() === 'preview') {
              <div class="p-6">
                <div class="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Default (Blue)</span>
                    <app-checkbox color="default" label="Default" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Secondary (Gray)</span>
                    <app-checkbox color="secondary" label="Secondary" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Destructive (Red)</span>
                    <app-checkbox color="destructive" label="Destructive" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Success (Green)</span>
                    <app-checkbox color="success" label="Success" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Warning (Yellow)</span>
                    <app-checkbox color="warning" label="Warning" />
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="colorsCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Radius</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="radiusTab()" (changed)="radiusTab.set($event)">
            @if (radiusTab() === 'preview') {
              <div class="p-6">
                <div class="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">None</span>
                    <app-checkbox radius="none" size="lg" label="No radius" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Small</span>
                    <app-checkbox radius="sm" size="lg" label="Small radius" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Medium (default)</span>
                    <app-checkbox radius="md" size="lg" label="Medium radius" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Large</span>
                    <app-checkbox radius="lg" size="lg" label="Large radius" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Full (Pill)</span>
                    <app-checkbox radius="full" size="lg" label="Pill shape" />
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="radiusCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Custom Styling</h3>
        <p class="text-muted-foreground mb-4">
          Use the <code>class</code> prop to apply custom Tailwind CSS classes.
        </p>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="customStylingTab()" (changed)="customStylingTab.set($event)">
            @if (customStylingTab() === 'preview') {
              <div class="p-6">
                <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Custom Border Color</span>
                    <app-checkbox
                      label="Purple border"
                      class="border-purple-400 text-purple-600 focus:ring-purple-500" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Thick Border</span>
                    <app-checkbox
                      label="Border-4"
                      class="border-4"
                      size="lg" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Custom Gap</span>
                    <app-checkbox
                      label="With gap-4"
                      class="gap-4" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Hover Scale</span>
                    <app-checkbox
                      label="Hover scale"
                      class="hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="customStylingCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Form Integration</h3>
        <p class="text-muted-foreground mb-4">
          Checkboxes work seamlessly with Angular's Reactive Forms and Template-driven forms.
        </p>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="formsTab()" (changed)="formsTab.set($event)">
            @if (formsTab() === 'preview') {
              <div class="p-6">
                <form [formGroup]="preferencesForm" class="space-y-4 max-w-md">
                  <p class="text-sm font-medium">Select your preferences:</p>
                  <app-checkbox
                    size="md"
                    label="Receive email notifications"
                    formControlName="email" />
                  <app-checkbox
                    size="md"
                    label="Allow marketing communications"
                    formControlName="marketing" />
                  <app-checkbox
                    size="md"
                    label="Enable dark mode"
                    formControlName="darkMode" />
                  <app-checkbox
                    size="md"
                    label="Allow data collection"
                    formControlName="analytics" />

                  <div class="mt-4 p-3 bg-muted rounded text-sm">
                    <p class="font-medium mb-2">Form values:</p>
                    <p class="font-mono text-xs">{{ preferencesForm.value | json }}</p>
                  </div>
                </form>
              </div>
            } @else {
              <app-code-snippet [code]="formsCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Combined Variants</h3>
        <p class="text-muted-foreground mb-4">
          Mix and match size, color, and radius for different use cases.
        </p>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="combinedTab()" (changed)="combinedTab.set($event)">
            @if (combinedTab() === 'preview') {
              <div class="p-6">
                <div class="space-y-4">
                  <p class="text-xs text-muted-foreground font-medium">Agree to Terms - Large, Destructive, Full Radius</p>
                  <app-checkbox
                    size="xl"
                    color="destructive"
                    radius="full"
                    label="I agree to the terms and conditions" />

                  <p class="text-xs text-muted-foreground font-medium">Newsletter - Medium, Success, Medium Radius</p>
                  <app-checkbox
                    size="md"
                    color="success"
                    radius="md"
                    label="Subscribe to our newsletter" />

                  <p class="text-xs text-muted-foreground font-medium">Analytics - Small, Secondary, None Radius</p>
                  <app-checkbox
                    size="sm"
                    color="secondary"
                    radius="none"
                    label="Enable analytics" />
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="combinedCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Default</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 text-foreground"><code class="bg-muted px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 border-b border-border text-foreground text-muted-foreground">{{ prop.type }}</td>
          <td class="p-3 border-b border-border text-foreground text-muted-foreground">{{ prop.default || '-' }}</td>
          <td class="p-3 text-foreground">{{ prop.description }}</td>
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
  sizesTab = signal<string>('preview');
  colorsTab = signal<string>('preview');
  radiusTab = signal<string>('preview');
  customStylingTab = signal<string>('preview');
  formsTab = signal<string>('preview');
  combinedTab = signal<string>('preview');

  option1 = signal(false);
  option2 = signal(false);
  option3 = signal(false);
  isIndeterminate = signal(false);

  preferencesForm = new FormGroup({
    email: new FormControl(false),
    marketing: new FormControl(false),
    darkMode: new FormControl(false),
    analytics: new FormControl(false)
  });

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

  sizesCode = `<app-checkbox size="sm" label="SM size" />
<app-checkbox size="md" label="MD size" />
<app-checkbox size="lg" label="LG size" />
<app-checkbox size="xl" label="XL size" />`;

  colorsCode = `<app-checkbox color="default" label="Default" />
<app-checkbox color="secondary" label="Secondary" />
<app-checkbox color="destructive" label="Destructive" />
<app-checkbox color="success" label="Success" />
<app-checkbox color="warning" label="Warning" />`;

  radiusCode = `<app-checkbox radius="none" size="lg" label="No radius" />
<app-checkbox radius="sm" size="lg" label="Small radius" />
<app-checkbox radius="md" size="lg" label="Medium radius" />
<app-checkbox radius="lg" size="lg" label="Large radius" />
<app-checkbox radius="full" size="lg" label="Pill shape" />`;

  customStylingCode = `<app-checkbox
  label="Purple border"
  class="border-purple-400 text-purple-600 focus:ring-purple-500" />

<app-checkbox
  label="Border-4"
  class="border-4"
  size="lg" />

<app-checkbox
  label="With gap-4"
  class="gap-4" />

<app-checkbox
  label="Hover scale"
  class="hover:scale-110 transition-transform" />`;

  formsCode = `import { FormGroup, FormControl } from '@angular/forms';

@Component({
  template: \`
    <form [formGroup]="form">
      <app-checkbox label="Email" formControlName="email" />
      <app-checkbox label="Marketing" formControlName="marketing" />
      <app-checkbox label="Dark Mode" formControlName="darkMode" />
    </form>
  \`
})
export class MyComponent {
  form = new FormGroup({
    email: new FormControl(false),
    marketing: new FormControl(false),
    darkMode: new FormControl(false)
  });
}`;

  combinedCode = `<app-checkbox
  size="xl"
  color="destructive"
  radius="full"
  label="I agree to the terms and conditions" />

<app-checkbox
  size="md"
  color="success"
  radius="md"
  label="Subscribe to our newsletter" />

<app-checkbox
  size="sm"
  color="secondary"
  radius="none"
  label="Enable analytics" />`;

  propsData = (): CheckboxProp[] => [
    { name: 'label', type: 'string', description: 'Checkbox label text' },
    { name: 'checked', type: 'boolean', description: 'Whether the checkbox is checked' },
    { name: 'disabled', type: 'boolean', description: 'Disables the checkbox' },
    { name: 'isIndeterminate', type: 'boolean', description: 'Shows indeterminate state' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Checkbox size variant' },
    { name: 'color', type: "'default' | 'secondary' | 'destructive' | 'success' | 'warning'", default: "'default'", description: 'Color variant for checkbox' },
    { name: 'radius', type: "'none' | 'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Border radius variant' },
    { name: 'class', type: 'string', default: "''", description: 'Custom CSS classes to apply' },
    { name: 'onChange', type: 'EventEmitter<boolean>', description: 'Emitted when checked state changes' }
  ];

  onSelectAll(value: boolean): void {
    this.option1.set(value);
    this.option2.set(value);
    this.option3.set(value);
    this.isIndeterminate.set(false);
  }
}
