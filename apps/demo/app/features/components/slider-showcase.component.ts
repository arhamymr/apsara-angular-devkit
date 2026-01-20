import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { LucideAngularModule, Volume2 } from 'lucide-angular';

interface SliderProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-slider-showcase',
  standalone: true,
  imports: [CommonModule, SliderComponent, CardComponent, TabsComponent, TableComponent, LucideAngularModule, CodeSnippetComponent],
  template: `
    <section id="slider" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Slider</h2>
        <p class="text-dimmed">A slider component for selecting values from a range</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex items-center gap-4">
                <lucide-angular [img]="Volume2" class="text-gray-400" />
                <app-slider
                  [min]="0"
                  [max]="100"
                  [modelValue]="volume()"
                  [showValue]="true"
                  (changed)="onVolumeChange($event)" />
                <lucide-angular [img]="Volume2" class="text-gray-400" />
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Range Selection</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="rangeTab()" (changed)="rangeTab.set($event)">
            @if (rangeTab() === 'preview') {
              <div class="p-6">
                <app-slider
                  [min]="0"
                  [max]="1000"
                  [step]="10"
                  [modelValue]="price()"
                  [showValue]="true"
                  (changed)="onPriceChange($event)" />
              </div>
            } @else {
              <app-code-snippet [code]="rangeCode" language="html" />
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
                <div class="flex flex-col gap-6">
                  <app-slider
                    [modelValue]="30"
                    [size]="'sm'"
                    [showValue]="false" />
                  <app-slider
                    [modelValue]="50"
                    [size]="'md'"
                    [showValue]="false" />
                  <app-slider
                    [modelValue]="70"
                    [size]="'lg'"
                    [showValue]="false" />
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="sizesCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Default</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 border-b border-border text-foreground text-dimmed">{{ prop.type }}</td>
          <td class="p-3 border-b border-border text-foreground text-dimmed">{{ prop.default || '-' }}</td>
          <td class="p-3 border-b border-border text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="tableHeader" [tableCellTemplate]="tableCell" />
      </div>
    </section>
  `
})
export class SliderShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  rangeTab = signal<string>('preview');
  sizesTab = signal<string>('preview');

  Volume2 = Volume2;
  volume = signal(75);
  price = signal(500);

  installCode = `npm install @apsara/ui/slider`;

  importCode = `import { SliderComponent } from '@apsara/ui/slider';`;

  usageCode = `<app-slider
  [min]="0"
  [max]="100"
  [modelValue]="volume"
  [showValue]="true"
  (changed)="onVolumeChange($event)" />`;

  basicCode = `<div class="flex items-center gap-4">
  <lucide-angular [img]="Volume2" />
  <app-slider
    [min]="0"
    [max]="100"
    [modelValue]="volume()"
    [showValue]="true"
    (changed)="onVolumeChange($event)" />
</div>`;

  rangeCode = `<app-slider
  [min]="0"
  [max]="1000"
  [step]="10"
  [modelValue]="price()"
  [showValue]="true"
  (changed)="onPriceChange($event)" />`;

  sizesCode = `<app-slider [modelValue]="30" [size]="'sm'" [showValue]="false" />
<app-slider [modelValue]="50" [size]="'md'" [showValue]="false" />
<app-slider [modelValue]="70" [size]="'lg'" [showValue]="false" />`;

  propsData = (): SliderProp[] => [
    { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
    { name: 'step', type: 'number', default: '1', description: 'Step increment' },
    { name: 'modelValue', type: 'number', description: 'Current value' },
    { name: 'showValue', type: 'boolean', default: 'true', description: 'Shows current value' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Slider size' },
    { name: 'changed', type: 'EventEmitter<number>', description: 'Emitted when value changes' }
  ];

  onVolumeChange(value: number): void {
    this.volume.set(value);
  }

  onPriceChange(value: number): void {
    this.price.set(value);
  }
}
