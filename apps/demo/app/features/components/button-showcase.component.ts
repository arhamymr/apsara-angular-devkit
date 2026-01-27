import { Component, signal, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { LucideAngularModule, Plus, ArrowRight, Download, LoaderCircle } from 'lucide-angular';

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
                <app-button variant="default">Primary</app-button>
              </div>
              <div class="flex flex-col gap-2 p-3">
                <app-button variant="secondary">Secondary</app-button>
              </div>
              <div class="flex flex-col gap-2 p-3">
                <app-button variant="destructive">Destructive</app-button>
              </div>
              <div class="flex flex-col gap-2 p-3">
                <app-button variant="outline">Outline</app-button>
              </div>
              <div class="flex flex-col gap-2 p-3">
                <app-button variant="plain">Plain</app-button>
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
                <app-button size="xs">XS</app-button>
                <app-button size="sm">SM</app-button>
                <app-button size="md">MD</app-button>
                <app-button size="lg">LG</app-button>
                <app-button size="icon" variant="default">
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
                <app-button>Default</app-button>
                <app-button [disabled]="true">Disabled</app-button>
                <app-button><lucide-angular [img]="LoaderCircle" [class]="'animate-spin mr-2'" />Loading</app-button>
                <app-button [block]="true">Block</app-button>
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
                <app-button variant="default">
                  <lucide-angular [img]="Plus" />Add
                </app-button>
                <app-button variant="default">
                  <lucide-angular [img]="ArrowRight" />Next
                </app-button>
                <app-button variant="default">
                  <lucide-angular [img]="Plus" />
                </app-button>
                <app-button variant="secondary">
                  <lucide-angular [img]="Download" class="mr-1" />Download
                </app-button>
              </div>
            } @else {
              <app-code-snippet [code]="iconsCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Custom Class</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="customClassTab()" (changed)="customClassTab.set($event)">
            @if (customClassTab() === 'preview') {
              <div class="flex flex-wrap items-center gap-4 p-3">
                <app-button class="hover:scale-105 transition-transform">Custom Scale</app-button>
                <app-button variant="secondary" class="rotate-90">Rotated</app-button>
                <app-button variant="outline" class="border-2 border-dashed">Dashed Border</app-button>
                <app-button class="bg-green-600 hover:bg-green-700 text-white">Green Color</app-button>
                <app-button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Gradient</app-button>
              </div>
            } @else {
              <app-code-snippet [code]="customClassCode" language="html" />
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
  private readonly viewportScroller = inject(ViewportScroller);
  Plus = Plus;
  ArrowRight = ArrowRight;
  Download = Download;
  LoaderCircle = LoaderCircle;
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  mainPreviewTab = signal<string>('preview');
  sizesTab = signal<string>('preview');
  statesTab = signal<string>('preview');
  iconsTab = signal<string>('preview');
  customClassTab = signal<string>('preview');

  installCode = `npm install @apsara/ui/button`;

  importCode = `import { ButtonComponent } from '@apsara/ui/button';`;

  usageCode = `<app-button variant="default" (clicked)="onClick($event)">
  Click me
</app-button>`;

  variantsCode = `<app-button variant="default">Primary</app-button>
<app-button variant="secondary">Secondary</app-button>
<app-button variant="destructive">Destructive</app-button>
<app-button variant="outline">Outline</app-button>
<app-button variant="plain">Plain</app-button>`;

  sizesCode = `<app-button size="xs">XS</app-button>
<app-button size="sm">SM</app-button>
<app-button size="md">MD</app-button>
<app-button size="lg">LG</app-button>
<app-button size="icon" variant="default">
  <lucide-angular [img]="Plus" />
</app-button>`;

  statesCode = `<app-button>Default</app-button>
<app-button [disabled]="true">Disabled</app-button>
<app-button>
  <lucide-angular [img]="LoaderCircle" [class]="'animate-spin'" />Loading
</app-button>
<app-button [block]="true">Block</app-button>`;

  iconsCode = `<app-button variant="default">
  <lucide-angular [img]="Plus" />Add
</app-button>

<app-button variant="default">
  <lucide-angular [img]="ArrowRight" />Next
</app-button>

<app-button variant="default">
  <lucide-angular [img]="Plus" />
</app-button>`;

  customClassCode = `<app-button class="hover:scale-105 transition-transform">Custom Scale</app-button>
<app-button variant="secondary" class="rotate-90">Rotated</app-button>
<app-button variant="outline" class="border-dashed">Dashed Border</app-button>
<app-button class="bg-green-600 hover:bg-green-700 text-white">Green Color</app-button>
<app-button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Gradient</app-button>`;

  propsData = (): ButtonProp[] => [
    { name: 'variant', type: "'default' | 'secondary' | 'destructive' | 'outline' | 'plain'", description: 'Visual style variant' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'icon'", description: 'Button size' },
    { name: 'disabled', type: 'boolean', description: 'Disables the button' },
    { name: 'block', type: 'boolean', description: 'Makes button full width' },
    { name: 'class', type: 'string', description: 'Custom CSS classes to apply' },
    { name: 'clicked', type: 'EventEmitter<Event>', description: 'Emitted on button click' }
  ];

  scrollTo(id: string) {
    this.viewportScroller.scrollToAnchor(id);
  }
}
