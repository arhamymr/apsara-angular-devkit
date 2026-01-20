import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
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
  imports: [CommonModule, ButtonComponent, CardComponent, TabsComponent, TableComponent, LucideAngularModule, CodeSnippetComponent],
  template: `
    <section id="button" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Button</h2>
        <p class="text-muted-foreground">Interactive button component with multiple variants, sizes, and states</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="mainPreviewTab()" (changed)="mainPreviewTab.set($event)">
          @if (mainPreviewTab() === 'preview') {
            <div class="flex gap-4">
              <div class="flex flex-col gap-2 p-3">
                <app-button label="Primary" variant="primary" />
              </div>
              <div class="flex flex-col gap-2 p-3">
                <app-button label="Secondary" variant="secondary" />
              </div>
              <div class="flex flex-col gap-2 p-3">
                <app-button label="Danger" variant="danger" />
              </div>
              <div class="flex flex-col gap-2 p-3">
                <app-button label="Outline" variant="outline" />
              </div>
              <div class="flex flex-col gap-2 p-3">
                <app-button label="Plain" variant="plain" />
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
                <app-button size="icon" variant="primary">
                  <lucide-angular [img]="Plus" />
                </app-button>
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
 <app-button label="Danger" variant="danger" />
 <app-button label="Outline" variant="outline" />
 <app-button label="Plain" variant="plain" />`;

  sizesCode = `<app-button label="XS" size="xs" />
<app-button label="SM" size="sm" />
<app-button label="MD" size="md" />
<app-button label="LG" size="lg" />
<app-button variant="primary">
  <lucide-angular [img]="Plus" />
</app-button>
                <app-button size="icon" variant="primary">
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
    { name: 'variant', type: "'primary' | 'secondary' | 'destructive' | 'danger' | 'outline' | 'plain'", description: 'Visual style variant' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'icon'", description: 'Button size' },
    { name: 'disabled', type: 'boolean', description: 'Disables the button' },
    { name: 'loading', type: 'boolean', description: 'Shows loading spinner' },
    { name: 'block', type: 'boolean', description: 'Makes button full width' },
    { name: 'clicked', type: 'EventEmitter<Event>', description: 'Emitted on button click' }
  ];
}
