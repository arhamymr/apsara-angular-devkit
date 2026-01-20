import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideToggleComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { FormsModule } from '@angular/forms';

interface SlideToggleProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-slide-toggle-showcase',
  standalone: true,
  imports: [CommonModule, SlideToggleComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent, FormsModule],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="slide-toggle" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Slide Toggle</h2>
        <p class="text-dimmed">A toggle switch component for boolean values</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex flex-col gap-4">
                <app-slide-toggle
                  [label]="'Enable notifications'"
                  [(ngModel)]="notificationsEnabled" />
                <app-slide-toggle
                  [label]="'Dark mode'"
                  [(ngModel)]="darkMode" />
                <app-slide-toggle
                  [label]="'Auto-save'"
                  [(ngModel)]="autoSave" />
              </div>
              <div class="p-4 bg-blue-50 rounded-lg mt-4">
                <p class="text-sm text-blue-600">
                  <strong>Notifications:</strong> {{ notificationsEnabled() ? 'On' : 'Off' }}
                </p>
                <p class="text-sm text-blue-600">
                  <strong>Dark Mode:</strong> {{ darkMode() ? 'On' : 'Off' }}
                </p>
                <p class="text-sm text-blue-600">
                  <strong>Auto-save:</strong> {{ autoSave() ? 'On' : 'Off' }}
                </p>
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Disabled State</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="disabledTab()" (changed)="disabledTab.set($event)">
            @if (disabledTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-col gap-4">
                  <app-slide-toggle
                    [label]="'Disabled (off)'"
                    [checked]="false"
                    [disabled]="true" />
                  <app-slide-toggle
                    [label]="'Disabled (on)'"
                    [checked]="true"
                    [disabled]="true" />
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="disabledCode" language="html" />
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
export class SlideToggleShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  disabledTab = signal<string>('preview');

  notificationsEnabled = signal(true);
  darkMode = signal(false);
  autoSave = signal(true);

  installCode = `npm install @apsara/ui/slide-toggle`;

  importCode = `import { SlideToggleComponent } from '@apsara/ui/slide-toggle';`;

  usageCode = `<app-slide-toggle
  [label]="'Enable notifications'"
  [(ngModel)]="notificationsEnabled" />`;

  basicCode = `<app-slide-toggle
  [label]="'Enable notifications'"
  [(ngModel)]="notificationsEnabled" />
<app-slide-toggle
  [label]="'Dark mode'"
  [(ngModel)]="darkMode" />
<app-slide-toggle
  [label]="'Auto-save'"
  [(ngModel)]="autoSave" />`;

  disabledCode = `<app-slide-toggle
  [label]="'Disabled (off)'"
  [checked]="false"
  [disabled]="true" />
<app-slide-toggle
  [label]="'Disabled (on)'"
  [checked]="true"
  [disabled]="true" />`;

  propsData = (): SlideToggleProp[] => [
    { name: 'label', type: 'string', description: 'Toggle label text' },
    { name: 'checked', type: 'boolean', default: 'false', description: 'Whether toggle is on' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the toggle' },
    { name: 'onChange', type: 'EventEmitter<boolean>', description: 'Emitted when toggle changes' }
  ];
}
