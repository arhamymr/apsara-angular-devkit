import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface ButtonProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-button-showcase',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <section id="button" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Button</h2>
        <p class="text-dimmed">Interactive button component with multiple variants, sizes, and states</p>
      </div>

      <app-card>
        <app-tabs
          [options]="previewCodeOptions"
          [modelValue]="variantsActiveTab()"
          (changed)="variantsActiveTab.set($event)">
          @if (variantsActiveTab() === 'preview') {
            <div class="p-6">
              <div class="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">Primary</span>
                  <app-button label="Primary" variant="primary" />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">Secondary</span>
                  <app-button label="Secondary" variant="secondary" />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">Tertiary</span>
                  <app-button label="Tertiary" variant="tertiary" />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">Danger</span>
                  <app-button label="Danger" variant="danger" />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">Outline</span>
                  <app-button label="Outline" variant="outline" />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">Plain</span>
                  <app-button label="Plain" variant="plain" />
                </div>
              </div>
            </div>
          } @else {
            <div class="p-6">
              <app-code-snippet [code]="variantsCode" language="html" />
            </div>
          }
        </app-tabs>
      </app-card>

      <app-card class="mt-6">
        <app-tabs
          [options]="previewCodeOptions"
          [modelValue]="sizesActiveTab()"
          (changed)="sizesActiveTab.set($event)">
          @if (sizesActiveTab() === 'preview') {
            <div class="p-6">
              <div class="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">XS</span>
                  <app-button label="XS" size="xs" />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">SM</span>
                  <app-button label="SM" size="sm" />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">MD</span>
                  <app-button label="MD" size="md" />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">LG</span>
                  <app-button label="LG" size="lg" />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">Icon</span>
                  <app-button size="icon">
                    <span slot="">add</span>
                  </app-button>
                </div>
              </div>
            </div>
          } @else {
            <div class="p-6">
              <app-code-snippet [code]="sizesCode" language="html" />
            </div>
          }
        </app-tabs>
      </app-card>

      <app-card class="mt-6">
        <app-tabs
          [options]="previewCodeOptions"
          [modelValue]="statesActiveTab()"
          (changed)="statesActiveTab.set($event)">
          @if (statesActiveTab() === 'preview') {
            <div class="p-6">
              <div class="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">Default</span>
                  <app-button label="Default" />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">Disabled</span>
                  <app-button label="Disabled" [disabled]="true" />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">Loading</span>
                  <app-button label="Loading" [loading]="true" />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">Block</span>
                  <app-button label="Block" [block]="true" />
                </div>
              </div>
            </div>
          } @else {
            <div class="p-6">
              <app-code-snippet [code]="statesCode" language="html" />
            </div>
          }
        </app-tabs>
      </app-card>

      <div class="mt-6">
        <h3 class="text-lg font-semibold text-foreground mb-4">Usage</h3>
        <app-code-snippet [code]="buttonImportCode" language="typescript" />
        <app-code-snippet [code]="buttonUsageCode" language="html" />
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <app-table [rows]="propsData()">
          <ng-container table-header>
            <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
            <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
            <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Default</th>
            <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
          </ng-container>
          <ng-container table-cell>
            @for (prop of propsData(); track prop.name) {
              <tr>
                <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
                <td class="p-3 border-b border-border text-foreground">{{ prop.type }}</td>
                <td class="p-3 border-b border-border text-foreground">{{ prop.default }}</td>
                <td class="p-3 border-b border-border text-foreground">{{ prop.description }}</td>
              </tr>
            }
          </ng-container>
        </app-table>
      </div>
    </section>
  `
})
export class ButtonShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  variantsActiveTab = signal<string>('preview');
  sizesActiveTab = signal<string>('preview');
  statesActiveTab = signal<string>('preview');

  buttonImportCode = `import { ButtonComponent } from '@apsara/ui/button';`;

  buttonUsageCode = `<app-button
  label="Click me"
  variant="primary"
  size="md"
  (clicked)="onClick($event)" />`;

  variantsCode = `<app-button label="Primary" variant="primary" />
<app-button label="Secondary" variant="secondary" />
<app-button label="Tertiary" variant="tertiary" />
<app-button label="Danger" variant="danger" />
<app-button label="Outline" variant="outline" />
<app-button label="Plain" variant="plain" />`;

  sizesCode = `<app-button label="XS" size="xs" />
<app-button label="SM" size="sm" />
<app-button label="MD" size="md" />
<app-button label="LG" size="lg" />
<app-button size="icon">
  <span slot="">add</span>
</app-button>`;

  statesCode = `<app-button label="Default" />
<app-button label="Disabled" [disabled]="true" />
<app-button label="Loading" [loading]="true" />
<app-button label="Block" [block]="true" />`;

  propsData = (): ButtonProp[] => [
    { name: 'label', type: 'string', default: "''", description: 'Button text content' },
    { name: 'variant', type: "'primary' | 'secondary' | 'tertiary' | 'danger' | 'outline' | 'plain'", default: "'primary'", description: 'Visual style variant' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'icon'", default: "'md'", description: 'Button size' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading spinner' },
    { name: 'block', type: 'boolean', default: 'false', description: 'Makes button full width' },
    { name: 'pill', type: 'boolean', default: 'false', description: 'Makes button pill shaped' },
    { name: 'clicked', type: 'EventEmitter<Event>', default: '-', description: 'Emitted on button click' }
  ];
}
