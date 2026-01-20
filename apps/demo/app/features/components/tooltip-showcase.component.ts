import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { LucideAngularModule, Plus, Trash2, Settings } from 'lucide-angular';

interface TooltipProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-tooltip-showcase',
  standalone: true,
  imports: [CommonModule, TooltipComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent, LucideAngularModule, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="tooltip" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Tooltip</h2>
        <p class="text-dimmed">A tooltip component for showing contextual information</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="placementsTab()" (changed)="placementsTab.set($event)">
          @if (placementsTab() === 'preview') {
            <div class="p-6">
              <div class="flex flex-wrap gap-4 items-center justify-center py-8">
                <app-tooltip content="Tooltip on top" placement="top">
                  <app-button label="Top" />
                </app-tooltip>
                <app-tooltip content="Tooltip on bottom" placement="bottom">
                  <app-button label="Bottom" />
                </app-tooltip>
                <app-tooltip content="Tooltip on left" placement="left">
                  <app-button label="Left" />
                </app-tooltip>
                <app-tooltip content="Tooltip on right" placement="right">
                  <app-button label="Right" />
                </app-tooltip>
              </div>
            </div>
          } @else {
            <app-code-snippet [code]="placementsCode" language="html" />
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
        <h3 class="text-lg font-semibold text-foreground mb-4">With Icons</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="iconsTab()" (changed)="iconsTab.set($event)">
            @if (iconsTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-wrap gap-4">
                  <app-tooltip content="Add item" placement="top">
                    <button class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                      <lucide-angular [img]="Plus" />
                    </button>
                  </app-tooltip>
                  <app-tooltip content="Delete item" placement="top">
                    <button class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                      <lucide-angular [img]="Trash2" />
                    </button>
                  </app-tooltip>
                  <app-tooltip content="Settings" placement="top">
                    <button class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                      <lucide-angular [img]="Settings" />
                    </button>
                  </app-tooltip>
                </div>
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
export class TooltipShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  placementsTab = signal<string>('preview');
  iconsTab = signal<string>('preview');

  Plus = Plus;
  Trash2 = Trash2;
  Settings = Settings;

  installCode = `npm install @apsara/ui/tooltip`;

  importCode = `import { TooltipComponent } from '@apsara/ui/tooltip';`;

  usageCode = `<app-tooltip content="Tooltip text" placement="top">
  <app-button label="Hover me" />
</app-tooltip>`;

  placementsCode = `<app-tooltip content="Tooltip on top" placement="top">
  <app-button label="Top" />
</app-tooltip>
<app-tooltip content="Tooltip on bottom" placement="bottom">
  <app-button label="Bottom" />
</app-tooltip>
<app-tooltip content="Tooltip on left" placement="left">
  <app-button label="Left" />
</app-tooltip>
<app-tooltip content="Tooltip on right" placement="right">
  <app-button label="Right" />
</app-tooltip>`;

  iconsCode = `<app-tooltip content="Add item" placement="top">
  <button class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
    <lucide-angular [img]="Plus" />
  </button>
</app-tooltip>
<app-tooltip content="Delete item" placement="top">
  <button class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
    <lucide-angular [img]="Trash2" />
  </button>
</app-tooltip>`;

  propsData = (): TooltipProp[] => [
    { name: 'content', type: 'string', description: 'Tooltip content text' },
    { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Tooltip placement' }
  ];
}
