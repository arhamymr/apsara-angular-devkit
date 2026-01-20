import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { LucideAngularModule, Mail, Bell, ShoppingCart } from 'lucide-angular';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface BadgeProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-badge-showcase',
  standalone: true,
  imports: [CommonModule, BadgeComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent, LucideAngularModule, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="badge" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Badge</h2>
        <p class="text-dimmed">Display status, counts, or labels with contextual styling</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="variantsTab()" (changed)="variantsTab.set($event)">
          @if (variantsTab() === 'preview') {
            <div class="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4 p-6">
              <div class="flex flex-col items-center gap-2 p-3">
                <app-badge variant="default">Default</app-badge>
                <span class="text-xs text-dimmed">Default</span>
              </div>
              <div class="flex flex-col items-center gap-2 p-3">
                <app-badge variant="secondary">Secondary</app-badge>
                <span class="text-xs text-dimmed">Secondary</span>
              </div>
              <div class="flex flex-col items-center gap-2 p-3">
                <app-badge variant="success">Success</app-badge>
                <span class="text-xs text-dimmed">Success</span>
              </div>
              <div class="flex flex-col items-center gap-2 p-3">
                <app-badge variant="warning">Warning</app-badge>
                <span class="text-xs text-dimmed">Warning</span>
              </div>
              <div class="flex flex-col items-center gap-2 p-3">
                <app-badge variant="destructive">Destructive</app-badge>
                <span class="text-xs text-dimmed">Destructive</span>
              </div>
              <div class="flex flex-col items-center gap-2 p-3">
                <app-badge variant="outline">Outline</app-badge>
                <span class="text-xs text-dimmed">Outline</span>
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
        <h3 class="text-lg font-semibold text-foreground mb-4">With Button</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="buttonTab()" (changed)="buttonTab.set($event)">
            @if (buttonTab() === 'preview') {
              <div class="p-6">
                <div class="flex items-center gap-2">
                  <app-button label="Messages" variant="primary" size="sm" />
                  <app-badge variant="destructive">5</app-badge>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="buttonCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">With Icon</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="iconsTab()" (changed)="iconsTab.set($event)">
            @if (iconsTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-wrap gap-2">
                  <app-badge variant="secondary">
                    <lucide-angular [img]="Mail" [size]="12" class="mr-1" /> 3
                  </app-badge>
                  <app-badge variant="outline">
                    <lucide-angular [img]="Bell" [size]="12" class="mr-1" /> New
                  </app-badge>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="iconsCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Notification Count</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="notificationTab()" (changed)="notificationTab.set($event)">
            @if (notificationTab() === 'preview') {
              <div class="p-6">
                <div class="flex items-center gap-3">
                  <div class="relative">
                    <lucide-angular [img]="Mail" [size]="20" />
                    <app-badge variant="destructive" class="absolute -top-1.5 -right-1.5 !px-1.5 !py-0">99+</app-badge>
                  </div>
                  <div class="relative">
                    <lucide-angular [img]="ShoppingCart" [size]="20" />
                    <app-badge variant="success" class="absolute -top-1.5 -right-1.5 !px-1.5 !py-0">2</app-badge>
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="notificationCode" language="html" />
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
export class BadgeShowcaseComponent {
  Mail = Mail;
  Bell = Bell;
  ShoppingCart = ShoppingCart;
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  variantsTab = signal<string>('preview');
  buttonTab = signal<string>('preview');
  iconsTab = signal<string>('preview');
  notificationTab = signal<string>('preview');

  installCode = `npm install @apsara/ui/badge`;

  importCode = `import { BadgeComponent } from '@apsara/ui/badge';`;

  usageCode = `<app-badge variant="default">Default</app-badge>
<app-badge variant="secondary">Secondary</app-badge>
<app-badge variant="success">Success</app-badge>
<app-badge variant="warning">Warning</app-badge>
<app-badge variant="destructive">Destructive</app-badge>
<app-badge variant="outline">Outline</app-badge>`;

  variantsCode = `<app-badge variant="default">Default</app-badge>
<app-badge variant="secondary">Secondary</app-badge>
<app-badge variant="success">Success</app-badge>
<app-badge variant="warning">Warning</app-badge>
<app-badge variant="destructive">Destructive</app-badge>
<app-badge variant="outline">Outline</app-badge>`;

  buttonCode = `<div class="flex items-center gap-2">
  <app-button label="Messages" variant="primary" size="sm" />
  <app-badge variant="destructive">5</app-badge>
</div>`;

  iconsCode = `<app-badge variant="secondary">
  <lucide-angular [img]="Mail" [size]="12" class="mr-1" /> 3
</app-badge>
<app-badge variant="outline">
  <lucide-angular [img]="Bell" [size]="12" class="mr-1" /> New
</app-badge>`;

  notificationCode = `<div class="relative">
  <lucide-angular [img]="Mail" [size]="20" />
  <app-badge variant="destructive" class="absolute -top-1.5 -right-1.5">99+</app-badge>
</div>`;

  propsData = (): BadgeProp[] => [
    { name: 'variant', type: "'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline'", default: "'default'", description: 'Visual style variant' },
    { name: 'class', type: 'string', description: 'Additional CSS classes' }
  ];
}
