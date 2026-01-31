import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent, CardComponent, TabsComponent, TableComponent } from '@aether/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { LucideAngularModule, Volume2 } from 'lucide-angular';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

interface SliderProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-slider-showcase',
  standalone: true,
  imports: [CommonModule, SliderComponent, CardComponent, TabsComponent, TableComponent, LucideAngularModule, CodeSnippetComponent, FormsModule, ReactiveFormsModule],
  template: `
    <section id="slider" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Slider</h2>
        <p class="text-muted-foreground">A slider component for selecting values from a range</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex items-center gap-4">
                <lucide-angular [img]="Volume2" class="text-gray-400" />
                <app-slider
                  [(ngModel)]="volume"
                  [min]="0"
                  [max]="100"
                  [showValue]="true" />
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
                  [(ngModel)]="price"
                  [min]="0"
                  [max]="1000"
                  [step]="10"
                  [showValue]="true" />
              </div>
            } @else {
              <app-code-snippet [code]="rangeCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Disabled State</h3>
        <p class="text-muted-foreground mb-4">Sliders can be disabled to prevent user interaction</p>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="disabledTab()" (changed)="disabledTab.set($event)">
            @if (disabledTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-col gap-6">
                  <div>
                    <span class="text-xs text-muted-foreground font-medium mb-2 block">Disabled (value 30)</span>
                    <app-slider [ngModel]="30" [disabled]="true" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground font-medium mb-2 block">Disabled (value 70)</span>
                    <app-slider [ngModel]="70" [disabled]="true" [showValue]="false" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground font-medium mb-2 block">Disabled with custom range</span>
                    <app-slider [ngModel]="50" [min]="20" [max]="80" [disabled]="true" />
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="disabledCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Form Integration</h3>
        <p class="text-muted-foreground mb-4">Sliders work seamlessly with Angular's Reactive Forms and Template-driven forms</p>
        
        <app-card class="mb-4">
          <app-tabs [options]="previewCodeOptions" [modelValue]="reactiveFormTab()" (changed)="reactiveFormTab.set($event)">
            @if (reactiveFormTab() === 'preview') {
              <div class="p-6">
                <form [formGroup]="volumeForm" class="space-y-4">
                  <app-slider formControlName="volume" [min]="0" [max]="100" [showValue]="true" />
                  <div class="text-sm text-muted-foreground">
                    Form value: {{ volumeForm.value.volume }}
                  </div>
                </form>
              </div>
            } @else {
              <app-code-snippet [code]="reactiveFormCode" language="typescript" />
            }
          </app-tabs>
        </app-card>

        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="templateFormTab()" (changed)="templateFormTab.set($event)">
            @if (templateFormTab() === 'preview') {
              <div class="p-6">
                <form>
                  <app-slider [(ngModel)]="templateVolume" name="volume" [min]="0" [max]="100" [showValue]="true" />
                </form>
                <div class="text-sm text-muted-foreground mt-2">
                  Value: {{ templateVolume() }}
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="templateFormCode" language="html" />
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
                  <div>
                    <span class="text-xs text-muted-foreground font-medium mb-2 block">Small</span>
                    <app-slider [ngModel]="30" [size]="'sm'" [showValue]="false" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground font-medium mb-2 block">Medium</span>
                    <app-slider [ngModel]="50" [size]="'md'" [showValue]="false" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground font-medium mb-2 block">Large</span>
                    <app-slider [ngModel]="70" [size]="'lg'" [showValue]="false" />
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Default</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 text-foreground"><code class="bg-muted px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 text-foreground">{{ prop.type }}</td>
          <td class="p-3 text-foreground">{{ prop.default || '-' }}</td>
          <td class="p-3 text-foreground">{{ prop.description }}</td>
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
  disabledTab = signal<string>('preview');
  reactiveFormTab = signal<string>('preview');
  templateFormTab = signal<string>('preview');
  sizesTab = signal<string>('preview');

  Volume2 = Volume2;
  volume = 75;
  price = 500;
  templateVolume = signal(50);

  volumeForm = new FormGroup({
    volume: new FormControl(75)
  });

  installCode = `npm install @aether/ui/slider`;

  importCode = `import { SliderComponent } from '@aether/ui/slider';
import { FormsModule } from '@angular/forms';`;

  usageCode = `<app-slider
  [(ngModel)]="volume"
  [min]="0"
  [max]="100"
  [showValue]="true" />`;

  basicCode = `<div class="flex items-center gap-4">
  <lucide-angular [img]="Volume2" />
  <app-slider
    [(ngModel)]="volume"
    [min]="0"
    [max]="100"
    [showValue]="true" />
</div>`;

  rangeCode = `<app-slider
  [(ngModel)]="price"
  [min]="0"
  [max]="1000"
  [step]="10"
  [showValue]="true" />`;

  disabledCode = `<app-slider [ngModel]="30" [disabled]="true" />
<app-slider [ngModel]="70" [disabled]="true" [showValue]="false" />
<app-slider [ngModel]="50" [min]="20" [max]="80" [disabled]="true" />`;

  reactiveFormCode = `import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

export class MyComponent {
  volumeForm = new FormGroup({
    volume: new FormControl(75)
  });
}`;

  templateFormCode = `import { FormsModule } from '@angular/forms';

export class MyComponent {
  volume = 50;
}

// In template:
<form>
  <app-slider [(ngModel)]="volume" name="volume" />
</form>`;

  sizesCode = `<app-slider [ngModel]="30" [size]="'sm'" [showValue]="false" />
<app-slider [ngModel]="50" [size]="'md'" [showValue]="false" />
<app-slider [ngModel]="70" [size]="'lg'" [showValue]="false" />`;

  propsData = (): SliderProp[] => [
    { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
    { name: 'step', type: 'number', default: '1', description: 'Step increment' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the slider' },
    { name: 'showValue', type: 'boolean', default: 'true', description: 'Shows current value below slider' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Slider size variant' },
    { name: 'changed', type: 'EventEmitter<number>', description: 'Emitted when value changes' }
  ];
}
