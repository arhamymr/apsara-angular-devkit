import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpansionPanelComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface ExpansionPanelProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-expansion-panel-showcase',
  standalone: true,
  imports: [CommonModule, ExpansionPanelComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <section id="expansion-panel" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Expansion Panel</h2>
        <p class="text-dimmed">A collapsible panel component for showing/hiding content</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex flex-col gap-4">
                <app-expansion-panel
                  title="Getting Started"
                  [isOpen]="panels()['getting-started']()"
                  (expanded)="togglePanel('getting-started', $event)">
                  <p class="text-sm text-gray-600">
                    Welcome to our application! This guide will help you get started quickly.
                    Learn about the basic features and how to navigate through the interface.
                  </p>
                </app-expansion-panel>
                <app-expansion-panel
                  title="Configuration"
                  [isOpen]="panels()['configuration']()"
                  (expanded)="togglePanel('configuration', $event)">
                  <p class="text-sm text-gray-600">
                    Configure your application settings here. You can customize themes,
                    notifications, and user preferences to match your needs.
                  </p>
                </app-expansion-panel>
                <app-expansion-panel
                  title="Advanced Settings"
                  [isOpen]="panels()['advanced']()"
                  (expanded)="togglePanel('advanced', $event)">
                  <p class="text-sm text-gray-600">
                    Advanced users can fine-tune performance settings, API configurations,
                    and integrate with external services using these options.
                  </p>
                </app-expansion-panel>
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
export class ExpansionPanelShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  panels = signal<{ [key: string]: () => boolean }>({
    'getting-started': () => true,
    'configuration': () => false,
    'advanced': () => false
  });

  installCode = `npm install @apsara/ui/expansion-panel`;

  importCode = `import { ExpansionPanelComponent } from '@apsara/ui/expansion-panel';`;

  usageCode = `<app-expansion-panel
  title="Panel Title"
  [isOpen]="isOpen"
  (expanded)="onExpand($event)">
  Panel content goes here
</app-expansion-panel>`;

  basicCode = `<app-expansion-panel
  title="Getting Started"
  [isOpen]="panels()['getting-started']()"
  (expanded)="togglePanel('getting-started', $event)">
  <p class="text-sm text-gray-600">Welcome content here.</p>
</app-expansion-panel>

<app-expansion-panel
  title="Configuration"
  [isOpen]="panels()['configuration']()"
  (expanded)="togglePanel('configuration', $event)">
  <p class="text-sm text-gray-600">Configuration content here.</p>
</app-expansion-panel>`;

  propsData = (): ExpansionPanelProp[] => [
    { name: 'title', type: 'string', description: 'Panel title' },
    { name: 'isOpen', type: 'boolean', description: 'Whether panel is expanded' },
    { name: 'expanded', type: 'EventEmitter<boolean>', description: 'Emitted when expansion state changes' }
  ];

  togglePanel(key: string, expanded: boolean): void {
    this.panels.update(p => ({
      ...p,
      [key]: () => expanded
    }));
  }
}
