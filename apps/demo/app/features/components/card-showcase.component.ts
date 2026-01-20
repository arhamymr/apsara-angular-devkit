import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface CardProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-card-showcase',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <section id="card" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Card</h2>
        <p class="text-dimmed">Cards contain content and actions about a single subject</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="variantsTab()" (changed)="variantsTab.set($event)">
          @if (variantsTab() === 'preview') {
            <div class="p-6">
              <div class="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">Basic Card</span>
                  <app-card>
                    <div class="min-h-[60px] flex items-center justify-center text-dimmed text-sm">Card Content</div>
                  </app-card>
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-dimmed font-medium">With Padding</span>
                  <app-card padding="medium">
                    <div class="min-h-[60px] flex items-center justify-center text-dimmed text-sm">Padded Content</div>
                  </app-card>
                </div>
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Padding Options</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="paddingTab()" (changed)="paddingTab.set($event)">
            @if (paddingTab() === 'preview') {
              <div class="p-6">
                <div class="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6">
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-dimmed font-medium">None</span>
                    <app-card padding="none">
                      <div class="min-h-[60px] flex items-center justify-center text-dimmed text-sm border border-dashed border-border rounded">No Padding</div>
                    </app-card>
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-dimmed font-medium">Small</span>
                    <app-card padding="small">
                      <div class="min-h-[60px] flex items-center justify-center text-dimmed text-sm">Small</div>
                    </app-card>
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-dimmed font-medium">Medium</span>
                    <app-card padding="medium">
                      <div class="min-h-[60px] flex items-center justify-center text-dimmed text-sm">Medium</div>
                    </app-card>
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-dimmed font-medium">Large</span>
                    <app-card padding="large">
                      <div class="min-h-[60px] flex items-center justify-center text-dimmed text-sm">Large</div>
                    </app-card>
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="paddingCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Rich Content</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="richTab()" (changed)="richTab.set($event)">
            @if (richTab() === 'preview') {
              <div class="p-6">
                <app-card>
                  <div class="min-h-[100px]">
                    <h4 class="text-base font-semibold text-foreground mb-2">Card Title</h4>
                    <p class="text-sm text-dimmed mb-4 leading-relaxed">This is a sample card with multiple content elements including headers, text, and actions.</p>
                    <div class="flex gap-2">
                      <app-button label="Action 1" size="sm" />
                      <app-button label="Action 2" size="sm" variant="plain" />
                    </div>
                  </div>
                </app-card>
              </div>
            } @else {
              <app-code-snippet [code]="richCode" language="html" />
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
export class CardShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  variantsTab = signal<string>('preview');
  paddingTab = signal<string>('preview');
  richTab = signal<string>('preview');

  installCode = `npm install @apsara/ui/card`;

  importCode = `import { CardComponent } from '@apsara/ui/card';`;

  usageCode = `<app-card padding="medium">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</app-card>`;

  variantsCode = `<app-card>
  <div class="min-h-[60px] flex items-center justify-center text-dimmed text-sm">Card Content</div>
</app-card>

<app-card padding="medium">
  <div class="min-h-[60px] flex items-center justify-center text-dimmed text-sm">Padded Card</div>
</app-card>`;

  paddingCode = `<app-card padding="none">...</app-card>
<app-card padding="small">...</app-card>
<app-card padding="medium">...</app-card>
<app-card padding="large">...</app-card>`;

  richCode = `<app-card>
  <h4 class="text-base font-semibold text-foreground mb-2">Card Title</h4>
  <p class="text-sm text-dimmed mb-4 leading-relaxed">Card description here.</p>
  <div class="flex gap-2">
    <app-button label="Action 1" size="sm" />
    <app-button label="Action 2" size="sm" variant="plain" />
  </div>
</app-card>`;

  propsData = (): CardProp[] => [
    { name: 'padding', type: "'none' | 'small' | 'medium' | 'large'", default: "'medium'", description: 'Internal padding size' },
    { name: 'class', type: 'string', description: 'Additional CSS classes' }
  ];
}
