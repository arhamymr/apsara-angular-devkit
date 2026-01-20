import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface RippleProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-ripples-showcase',
  standalone: true,
  imports: [CommonModule, RippleComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <section id="ripple" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Ripple</h2>
        <p class="text-dimmed">A ripple effect component for interactive elements</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex flex-wrap gap-4">
                <app-ripple>
                  <app-button label="Primary" />
                </app-ripple>
                <app-ripple>
                  <app-button label="Secondary" variant="secondary" />
                </app-ripple>
                <app-ripple>
                  <app-button label="Outline" variant="outline" />
                </app-ripple>
                <app-ripple>
                  <app-button label="Danger" variant="danger" />
                </app-ripple>
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Custom Elements</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="customTab()" (changed)="customTab.set($event)">
            @if (customTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-wrap gap-4">
                  <app-ripple>
                    <div class="px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                      Custom Button
                    </div>
                  </app-ripple>
                  <app-ripple>
                    <div class="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                      Another Element
                    </div>
                  </app-ripple>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="customCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Disabled</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="disabledTab()" (changed)="disabledTab.set($event)">
            @if (disabledTab() === 'preview') {
              <div class="p-6">
                <app-ripple [disabled]="true">
                  <app-button label="No Ripple Effect" variant="tertiary" />
                </app-ripple>
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
export class RipplesShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  customTab = signal<string>('preview');
  disabledTab = signal<string>('preview');

  installCode = `npm install @apsara/ui/ripple`;

  importCode = `import { RippleComponent } from '@apsara/ui/ripple';`;

  usageCode = `<app-ripple>
  <app-button label="Click me" />
</app-ripple>`;

  basicCode = `<app-ripple>
  <app-button label="Primary" />
</app-ripple>
<app-ripple>
  <app-button label="Secondary" variant="secondary" />
</app-ripple>`;

  customCode = `<app-ripple>
  <div class="px-6 py-3 bg-blue-600 text-white rounded-lg">
    Custom Button
  </div>
</app-ripple>`;

  disabledCode = `<app-ripple [disabled]="true">
  <app-button label="No Ripple Effect" variant="tertiary" />
</app-ripple>`;

  propsData = (): RippleProp[] => [
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the ripple effect' }
  ];
}
