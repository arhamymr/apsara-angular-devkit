import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, House, Pencil, Trash2, Plus, Search, Settings, ChevronLeft, ChevronRight, ChevronDown, Menu } from 'lucide-angular';
import { CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface IconProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-icon-showcase',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <section id="icon" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Icon</h2>
        <p class="text-dimmed">Lucide icons for Angular applications</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="sizesTab()" (changed)="sizesTab.set($event)">
          @if (sizesTab() === 'preview') {
            <div class="p-6">
              <div class="space-y-6">
                <div>
                  <span class="text-xs text-dimmed font-medium mb-3 block">Sizes</span>
                  <div class="flex items-center gap-4">
                    <lucide-angular [img]="House" [size]="12" />
                    <lucide-angular [img]="House" [size]="16" />
                    <lucide-angular [img]="House" [size]="20" />
                    <lucide-angular [img]="House" [size]="24" />
                    <lucide-angular [img]="House" [size]="32" />
                  </div>
                </div>
                <div>
                  <span class="text-xs text-dimmed font-medium mb-3 block">Action Icons</span>
                  <div class="flex items-center gap-4">
                    <lucide-angular [img]="Pencil" />
                    <lucide-angular [img]="Trash2" />
                    <lucide-angular [img]="Plus" />
                    <lucide-angular [img]="Search" />
                    <lucide-angular [img]="Settings" />
                  </div>
                </div>
                <div>
                  <span class="text-xs text-dimmed font-medium mb-3 block">Navigation Icons</span>
                  <div class="flex items-center gap-4">
                    <lucide-angular [img]="ChevronLeft" />
                    <lucide-angular [img]="ChevronRight" />
                    <lucide-angular [img]="ChevronDown" />
                    <lucide-angular [img]="Menu" />
                  </div>
                </div>
              </div>
            </div>
          } @else {
            <app-code-snippet [code]="sizesCode" language="html" />
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
export class IconShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  sizesTab = signal<string>('preview');

  House = House;
  Pencil = Pencil;
  Trash2 = Trash2;
  Plus = Plus;
  Search = Search;
  Settings = Settings;
  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;
  ChevronDown = ChevronDown;
  Menu = Menu;

  installCode = `npm install lucide-angular`;

  importCode = `import { LucideAngularModule, Home, User, Settings } from 'lucide-angular';`;

  usageCode = `<lucide-angular [img]="Home" [size]="24" />
<lucide-angular [img]="User" />
<lucide-angular [img]="Settings" class="text-gray-500" />`;

  sizesCode = `<lucide-angular [img]="House" [size]="12" />
<lucide-angular [img]="House" [size]="16" />
<lucide-angular [img]="House" [size]="20" />
<lucide-angular [img]="House" [size]="24" />
<lucide-angular [img]="House" [size]="32" />`;

  propsData = (): IconProp[] => [
    { name: 'img', type: 'Icon', description: 'Icon component to render' },
    { name: 'size', type: 'number', description: 'Icon size in pixels' },
    { name: 'class', type: 'string', description: 'Additional CSS classes' }
  ];
}
