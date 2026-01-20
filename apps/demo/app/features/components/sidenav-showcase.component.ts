import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { LucideAngularModule, LayoutDashboard, Users, Settings } from 'lucide-angular';

interface SidenavProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-sidenav-showcase',
  standalone: true,
  imports: [CommonModule, SidenavComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent, LucideAngularModule, CodeSnippetComponent],
  template: `
    <section id="sidenav" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Sidenav</h2>
        <p class="text-dimmed">A side navigation component for app layouts</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <div class="p-4">
                  <app-button
                    label="Toggle Sidenav"
                    variant="primary"
                    (clicked)="toggleSidenav()" />
                </div>
                <app-sidenav
                  [isOpen]="isOpen()"
                  [position]="'left'"
                  [hasHeader]="true"
                  (closed)="closeSidenav()">
                  <div sidenav-header>
                    <h3 class="font-semibold text-gray-900">Menu</h3>
                  </div>
                  <div class="space-y-1">
                    <button class="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                      <lucide-angular [img]="LayoutDashboard" class="text-sm" />
                      Dashboard
                    </button>
                    <button class="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                      <lucide-angular [img]="Users" class="text-sm" />
                      Users
                    </button>
                    <button class="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                      <lucide-angular [img]="Settings" class="text-sm" />
                      Settings
                    </button>
                  </div>
                </app-sidenav>
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
export class SidenavShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');

  LayoutDashboard = LayoutDashboard;
  Users = Users;
  Settings = Settings;
  isOpen = signal(false);

  installCode = `npm install @apsara/ui/sidenav`;

  importCode = `import { SidenavComponent } from '@apsara/ui/sidenav';`;

  usageCode = `<app-sidenav
  [isOpen]="isOpen()"
  [position]="'left'"
  [hasHeader]="true"
  (closed)="closeSidenav()">
  <div sidenav-header>
    <h3 class="font-semibold">Menu</h3>
  </div>
  <div class="space-y-1">
    <button>Dashboard</button>
    <button>Settings</button>
  </div>
</app-sidenav>`;

  basicCode = `<app-button label="Toggle Sidenav" (clicked)="toggleSidenav()" />

<app-sidenav
  [isOpen]="isOpen()"
  [position]="'left'"
  [hasHeader]="true"
  (closed)="closeSidenav()">
  <div sidenav-header>
    <h3 class="font-semibold text-gray-900">Menu</h3>
  </div>
  <div class="space-y-1">
    <button class="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
      Dashboard
    </button>
    <button class="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
      Settings
    </button>
  </div>
</app-sidenav>`;

  propsData = (): SidenavProp[] => [
    { name: 'isOpen', type: 'boolean', description: 'Controls sidenav visibility' },
    { name: 'position', type: "'left' | 'right'", description: 'Sidenav position' },
    { name: 'hasHeader', type: 'boolean', description: 'Shows header slot' },
    { name: 'closed', type: 'EventEmitter<void>', description: 'Emitted when sidenav closes' }
  ];

  toggleSidenav(): void {
    this.isOpen.update(v => !v);
  }

  closeSidenav(): void {
    this.isOpen.set(false);
  }
}
