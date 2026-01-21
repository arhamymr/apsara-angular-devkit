import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, AlertTitleComponent, AlertDescriptionComponent, AlertActionComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface AlertProp {
  component: string;
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-alert-showcase',
  standalone: true,
  imports: [CommonModule, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, AlertActionComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="alert" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Alert</h2>
        <p class="text-muted-foreground">Displays a callout for user attention with multiple variants</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="variantsTab()" (changed)="variantsTab.set($event)">
          @if (variantsTab() === 'preview') {
            <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-6">
              <div class="flex flex-col gap-2">
                <span class="text-xs text-muted-foreground font-medium">Default</span>
                <app-alert>
                  <app-alert-title>Alert Title</app-alert-title>
                  <app-alert-description>Alert description goes here.</app-alert-description>
                  <app-alert-action>
                    <app-button variant="default" size="sm">Action</app-button>
                  </app-alert-action>
                </app-alert>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-xs text-muted-foreground font-medium">Info</span>
                <app-alert variant="info">
                  <app-alert-title>Payment failed</app-alert-title>
                  <app-alert-description>Check your card details and try again.</app-alert-description>
                  <app-alert-action>
                    <app-button variant="default" size="sm">Retry</app-button>
                  </app-alert-action>
                </app-alert>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-xs text-muted-foreground font-medium">Success</span>
                <app-alert variant="success">
                  <app-alert-title>Success</app-alert-title>
                  <app-alert-description>Your changes have been saved successfully.</app-alert-description>
                  <app-alert-action>
                    <app-button variant="default" size="sm">View</app-button>
                  </app-alert-action>
                </app-alert>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-xs text-muted-foreground font-medium">Warning</span>
                <app-alert variant="warning">
                  <app-alert-title>Warning</app-alert-title>
                  <app-alert-description>Some features may not work as expected.</app-alert-description>
                  <app-alert-action>
                    <app-button variant="outline" size="sm">Dismiss</app-button>
                  </app-alert-action>
                </app-alert>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-xs text-muted-foreground font-medium">Danger</span>
                <app-alert variant="danger">
                  <app-alert-title>Error</app-alert-title>
                  <app-alert-description>Message deleted successfully. This action cannot be undone.</app-alert-description>
                  <app-alert-action>
                    <app-button variant="destructive" size="sm">Undo</app-button>
                  </app-alert-action>
                </app-alert>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-xs text-muted-foreground font-medium">Tertiary</span>
                <app-alert variant="tertiary">
                  <app-alert-title>Note</app-alert-title>
                  <app-alert-description>Some useful information here.</app-alert-description>
                  <app-alert-action>
                    <app-button variant="plain" size="sm">Learn more</app-button>
                  </app-alert-action>
                </app-alert>
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Alert Components</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="descriptionTab()" (changed)="descriptionTab.set($event)">
            @if (descriptionTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-muted-foreground font-medium">With Description</span>
                  <app-alert variant="info">
                    <app-alert-title>Payment failed</app-alert-title>
                    <app-alert-description>Check your card details and try again. Your payment could not be processed due to insufficient funds.</app-alert-description>
                  </app-alert>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="descriptionCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">With Action</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="actionTab()" (changed)="actionTab.set($event)">
            @if (actionTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-muted-foreground font-medium">With Action</span>
                  <app-alert variant="success">
                    <app-alert-title>Changes saved</app-alert-title>
                    <app-alert-description>Your profile has been updated successfully.</app-alert-description>
                    <app-alert-action>
                      <app-button variant="plain" size="sm">Undo</app-button>
                    </app-alert-action>
                  </app-alert>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="actionCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Component</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Default</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 text-foreground"><code class="bg-muted px-1.5 py-0.5 rounded text-xs">{{ prop.component }}</code></td>
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
export class AlertShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  variantsTab = signal<string>('preview');
  descriptionTab = signal<string>('preview');
  actionTab = signal<string>('preview');

  installCode = `npm install @apsara/ui/alert`;

  importCode = `import { 
  AlertComponent, 
  AlertTitleComponent, 
  AlertDescriptionComponent, 
  AlertActionComponent 
} from '@apsara/ui/alert';`;

  usageCode = `<app-alert variant="info">
  <app-alert-title>Alert Title</app-alert-title>
  <app-alert-description>
    Alert description goes here.
  </app-alert-description>
  <app-alert-action>
    <app-button>Action</app-button>
  </app-alert-action>
</app-alert>`;

  variantsCode = `<app-alert>
  <app-alert-title>Alert Title</app-alert-title>
  <app-alert-description>Alert description goes here.</app-alert-description>
  <app-alert-action>
    <app-button variant="default" size="sm">Action</app-button>
  </app-alert-action>
</app-alert>

<app-alert variant="info">
  <app-alert-title>Payment failed</app-alert-title>
  <app-alert-description>Check your card details and try again.</app-alert-description>
  <app-alert-action>
    <app-button variant="default" size="sm">Retry</app-button>
  </app-alert-action>
</app-alert>

<app-alert variant="success">
  <app-alert-title>Success</app-alert-title>
  <app-alert-description>Your changes have been saved successfully.</app-alert-description>
  <app-alert-action>
    <app-button variant="default" size="sm">View</app-button>
  </app-alert-action>
</app-alert>

<app-alert variant="warning">
  <app-alert-title>Warning</app-alert-title>
  <app-alert-description>Some features may not work as expected.</app-alert-description>
  <app-alert-action>
    <app-button variant="outline" size="sm">Dismiss</app-button>
  </app-alert-action>
</app-alert>

  <app-alert variant="danger">
  <app-alert-title>Error</app-alert-title>
  <app-alert-description>Message deleted successfully.</app-alert-description>
  <app-alert-action>
    <app-button variant="destructive" size="sm">Undo</app-button>
  </app-alert-action>
</app-alert>

<app-alert variant="tertiary">
  <app-alert-title>Note</app-alert-title>
  <app-alert-description>Some useful information here.</app-alert-description>
  <app-alert-action>
    <app-button variant="plain" size="sm">Learn more</app-button>
  </app-alert-action>
</app-alert>`;

  descriptionCode = `<app-alert variant="info">
  <app-alert-title>Payment failed</app-alert-title>
  <app-alert-description>
    Check your card details and try again. 
    Your payment could not be processed due to insufficient funds.
  </app-alert-description>
</app-alert>`;

  actionCode = `<app-alert variant="success">
  <app-alert-title>Changes saved</app-alert-title>
  <app-alert-description>Your profile has been updated successfully.</app-alert-description>
  <app-alert-action>
    <app-button variant="plain" size="sm">Undo</app-button>
  </app-alert-action>
</app-alert>`;

  propsData = (): AlertProp[] => [
    { component: 'Alert', name: 'variant', type: "'default' | 'info' | 'success' | 'warning' | 'danger' | 'tertiary'", default: "'default'", description: 'Visual style variant' },
    { component: 'Alert', name: 'class', type: 'string', description: 'Additional CSS classes' },
    { component: 'AlertTitle', name: '-', type: '-', description: 'Title content for the alert' },
    { component: 'AlertDescription', name: '-', type: '-', description: 'Description content for the alert' },
    { component: 'AlertAction', name: '-', type: '-', description: 'Action container for buttons' }
  ];
}
