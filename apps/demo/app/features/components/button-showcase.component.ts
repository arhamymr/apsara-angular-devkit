import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { LucideAngularModule, Plus, ArrowRight, Download } from 'lucide-angular';

interface ButtonProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-button-showcase',
  standalone: true,
  imports: [CommonModule, ButtonComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, LucideAngularModule, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="button" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Button</h2>
        <p class="text-dimmed">Interactive button component with multiple variants, sizes, and states</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="mainPreviewTab()" (changed)="mainPreviewTab.set($event)">
          @if (mainPreviewTab() === 'preview') {
            <div class="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
              <div class="flex flex-col items-center gap-2 p-3">
                <app-button label="Primary" variant="primary" />
                <span class="text-xs text-dimmed">Primary</span>
              </div>
              <div class="flex flex-col items-center gap-2 p-3">
                <app-button label="Secondary" variant="secondary" />
                <span class="text-xs text-dimmed">Secondary</span>
              </div>
              <div class="flex flex-col items-center gap-2 p-3">
                <app-button label="Tertiary" variant="tertiary" />
                <span class="text-xs text-dimmed">Tertiary</span>
              </div>
              <div class="flex flex-col items-center gap-2 p-3">
                <app-button label="Danger" variant="danger" />
                <span class="text-xs text-dimmed">Danger</span>
              </div>
              <div class="flex flex-col items-center gap-2 p-3">
                <app-button label="Outline" variant="outline" />
                <span class="text-xs text-dimmed">Outline</span>
              </div>
              <div class="flex flex-col items-center gap-2 p-3">
                <app-button label="Plain" variant="plain" />
                <span class="text-xs text-dimmed">Plain</span>
              </div>
            </div>
          } @else {
            <app-code-snippet [code]="variantsCode" language="html" />
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Sizes</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="sizesTab()" (changed)="sizesTab.set($event)">
            @if (sizesTab() === 'preview') {
              <div class="flex flex-wrap items-center gap-4 p-3">
                <app-button label="XS" size="xs" />
                <app-button label="SM" size="sm" />
                <app-button label="MD" size="md" />
                <app-button label="LG" size="lg" />
              </div>
            } @else {
              <app-code-snippet [code]="sizesCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">States</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="statesTab()" (changed)="statesTab.set($event)">
            @if (statesTab() === 'preview') {
              <div class="flex flex-wrap items-center gap-4 p-3">
                <app-button label="Default" />
                <app-button label="Disabled" [disabled]="true" />
                <app-button label="Loading" [loading]="true" />
                <app-button label="Block" [block]="true" />
              </div>
            } @else {
              <app-code-snippet [code]="statesCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">With Icons</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="iconsTab()" (changed)="iconsTab.set($event)">
            @if (iconsTab() === 'preview') {
              <div class="flex flex-wrap items-center gap-4 p-3">
                <app-button label="Add" variant="primary">
                  <lucide-angular [img]="Plus" />
                </app-button>
                <app-button label="Next" variant="primary">
                  <lucide-angular [img]="ArrowRight" />
                </app-button>
                <app-button variant="primary">
                  <lucide-angular [img]="Plus" />
                </app-button>
                <app-button label="Download" variant="secondary">
                  <lucide-angular [img]="Download" />
                </app-button>
              </div>
            } @else {
              <app-code-snippet [code]="iconsCode" language="html" />
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
export class ButtonShowcaseComponent {
  Plus = Plus;
  ArrowRight = ArrowRight;
  Download = Download;
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  mainPreviewTab = signal<string>('preview');
  sizesTab = signal<string>('preview');
  statesTab = signal<string>('preview');
  iconsTab = signal<string>('preview');

  installCode = `npm install @apsara/ui/button`;

  importCode = `import { ButtonComponent } from '@apsara/ui/button';`;

  usageCode = `<app-button
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
<app-button label="LG" size="lg" />`;

  statesCode = `<app-button label="Default" />
<app-button label="Disabled" [disabled]="true" />
<app-button label="Loading" [loading]="true" />
<app-button label="Block" [block]="true" />`;

  iconsCode = `<app-button label="Add" variant="primary">
  <lucide-angular [img]="Plus" />
</app-button>

<app-button label="Next" variant="primary">
  <lucide-angular [img]="ArrowRight" />
</app-button>

<app-button variant="primary">
  <lucide-angular [img]="Plus" />
</app-button>`;

  propsData = (): ButtonProp[] => [
    { name: 'label', type: 'string', description: 'Button text content' },
    { name: 'variant', type: "'primary' | 'secondary' | 'tertiary' | 'danger' | 'outline' | 'plain'", description: 'Visual style variant' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", description: 'Button size' },
    { name: 'disabled', type: 'boolean', description: 'Disables the button' },
    { name: 'loading', type: 'boolean', description: 'Shows loading spinner' },
    { name: 'block', type: 'boolean', description: 'Makes button full width' },
    { name: 'clicked', type: 'EventEmitter<Event>', description: 'Emitted on button click' }
  ];
}
