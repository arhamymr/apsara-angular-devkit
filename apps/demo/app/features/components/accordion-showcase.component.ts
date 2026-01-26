import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface AccordionProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-accordion-showcase',
  standalone: true,
  imports: [CommonModule, AccordionComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="accordion" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Accordion</h2>
        <p class="text-muted-foreground">A vertically stacked set of interactive headings that each reveal a section of content.</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex flex-col gap-4">
                <app-accordion
                  title="Getting Started"
                  [isOpen]="panels()['getting-started']()"
                  (expanded)="togglePanel('getting-started', $event)">
                  <p class="text-sm text-muted-foreground">
                    Welcome to our application! This guide will help you get started quickly.
                    Learn about the basic features and how to navigate through the interface.
                  </p>
                </app-accordion>
                <app-accordion
                  title="Configuration"
                  [isOpen]="panels()['configuration']()"
                  (expanded)="togglePanel('configuration', $event)">
                  <p class="text-sm text-muted-foreground">
                    Configure your application settings here. You can customize themes,
                    notifications, and user preferences to match your needs.
                  </p>
                </app-accordion>
                <app-accordion
                  title="Advanced Settings"
                  [isOpen]="panels()['advanced']()"
                  (expanded)="togglePanel('advanced', $event)">
                  <p class="text-sm text-muted-foreground">
                    Advanced users can fine-tune performance settings, API configurations,
                    and integrate with external services using these options.
                  </p>
                </app-accordion>
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
export class AccordionShowcaseComponent {
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

  installCode = `npm install @apsara/ui/accordion`;

  importCode = `import { AccordionComponent } from '@apsara/ui/accordion';`;

  usageCode = `<app-accordion
  title="Panel Title"
  [isOpen]="isOpen"
  (expanded)="onExpand($event)">
  Panel content goes here
</app-accordion>`;

  basicCode = `<app-accordion
  title="Getting Started"
  [isOpen]="panels()['getting-started']()"
  (expanded)="togglePanel('getting-started', $event)">
  <p class="text-sm text-muted-foreground">Welcome content here.</p>
</app-accordion>

<app-accordion
  title="Configuration"
  [isOpen]="panels()['configuration']()"
  (expanded)="togglePanel('configuration', $event)">
  <p class="text-sm text-muted-foreground">Configuration content here.</p>
</app-accordion>`;

  propsData = (): AccordionProp[] => [
    { name: 'title', type: 'string', description: 'Accordion title' },
    { name: 'isOpen', type: 'boolean', description: 'Whether accordion is expanded' },
    { name: 'expanded', type: 'output<boolean>', description: 'Emitted when expansion state changes' }
  ];

  togglePanel(key: string, expanded: boolean): void {
    this.panels.update(p => ({
      ...p,
      [key]: () => expanded
    }));
  }
}
