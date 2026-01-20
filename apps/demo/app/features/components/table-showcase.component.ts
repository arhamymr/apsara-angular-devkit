import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, ButtonComponent, CardComponent, TabsComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { tableShowcaseCode } from './table-showcase.code';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

@Component({
  selector: 'app-table-showcase',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ButtonComponent,
    CardComponent,
    TabsComponent,
    CodeSnippetComponent
  ],
  template: `
    <section id="table" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Table</h2>
        <p class="text-dimmed">Data table component with content projection for flexible layouts</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <app-table [rows]="basicUsers()">
                <th table-header-1 class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Name</th>
                <th table-header-2 class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Email</th>
                <th table-header-3 class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Role</th>

                @for (user of basicUsers(); track user.id) {
                  <ng-container table-cell-1>
                    <span class="px-4 py-4 whitespace-nowrap text-sm text-foreground block">{{ user.name }}</span>
                  </ng-container>
                  <ng-container table-cell-2>
                    <span class="px-4 py-4 whitespace-nowrap text-sm text-dimmed block">{{ user.email }}</span>
                  </ng-container>
                  <ng-container table-cell-3>
                    <span class="px-4 py-4 whitespace-nowrap text-sm text-dimmed block">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        [class.bg-primary/10]="user.role === 'Admin'"
                        [class.text-primary]="user.role === 'Admin'"
                        [class.bg-tertiary]="user.role === 'User'"
                        [class.text-dimmed]="user.role === 'User'"
                        [class.bg-accent/10]="user.role === 'Editor'"
                        [class.text-accent]="user.role === 'Editor'">
                        {{ user.role }}
                      </span>
                    </span>
                  </ng-container>
                }
              </app-table>
            </div>
          } @else {
            <app-code-snippet [code]="tableShowcaseCode.basicCode" language="html" />
          }
        </app-tabs>
      </app-card>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Installation</h3>
        <app-code-snippet [code]="installCode" language="bash" />
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Usage</h3>
        <app-code-snippet [code]="tableShowcaseCode.importCode" language="typescript" />
        <app-code-snippet [code]="tableShowcaseCode.usageCode" language="html" />
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">With Actions</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="actionsTab()" (changed)="actionsTab.set($event)">
            @if (actionsTab() === 'preview') {
              <div class="p-6">
                <app-table [rows]="usersWithActions()">
                  <th table-header-1 class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">User</th>
                  <th table-header-2 class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Status</th>
                  <th table-header-3 class="px-4 py-3 text-right text-xs font-medium text-dimmed uppercase tracking-wider">Actions</th>

                  @for (user of usersWithActions(); track user.id) {
                    <ng-container table-cell-1>
                      <div class="px-4 py-4">
                        <div class="flex items-center">
                          <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span class="text-sm font-medium text-primary">{{ user.name.charAt(0) }}</span>
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-foreground">{{ user.name }}</div>
                            <div class="text-sm text-dimmed">{{ user.email }}</div>
                          </div>
                        </div>
                      </div>
                    </ng-container>
                    <ng-container table-cell-2>
                      <div class="px-4 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          [class.bg-success/10]="user.status === 'Active'"
                          [class.text-success]="user.status === 'Active'"
                          [class.bg-warning/10]="user.status === 'Pending'"
                          [class.text-warning]="user.status === 'Pending'"
                          [class.bg-danger/10]="user.status === 'Inactive'"
                          [class.text-danger]="user.status === 'Inactive'">
                          {{ user.status }}
                        </span>
                      </div>
                    </ng-container>
                    <ng-container table-cell-3>
                      <div class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div class="flex items-center justify-end gap-2">
                          <app-button label="Edit" size="sm" variant="plain" />
                          <app-button label="Delete" size="sm" variant="plain" />
                        </div>
                      </div>
                    </ng-container>
                  }
                </app-table>
              </div>
            } @else {
              <app-code-snippet [code]="tableShowcaseCode.actionsCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Content Projection Selectors</h3>
        <ng-template #selectorsHeader>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Element</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Selector</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #selectorsCell let-selector>
          <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ selector.element }}</code></td>
          <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ selector.selector }}</code></td>
          <td class="p-3 border-b border-border text-foreground">{{ selector.description }}</td>
        </ng-template>
        <app-table [rows]="selectorData()" [tableHeaderTemplate]="selectorsHeader" [tableCellTemplate]="selectorsCell" />
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #propsHeader>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #propsCell let-prop>
          <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 border-b border-border text-foreground text-dimmed">{{ prop.type }}</td>
          <td class="p-3 border-b border-border text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="propsHeader" [tableCellTemplate]="propsCell" />
      </div>
    </section>
  `
})
export class TableShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  actionsTab = signal<string>('preview');

  basicUsers = signal<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Pending', lastLogin: '2024-01-10' }
  ]);

  usersWithActions = signal<User[]>([
    { id: 1, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Mike Brown', email: 'mike@example.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-12' },
    { id: 3, name: 'Emily Davis', email: 'emily@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14' }
  ]);

  installCode = `npm install @apsara/ui/table`;

  selectorData = () => [
    { element: 'Header Cell', selector: 'table-header-1 to table-header-5', description: 'Projected into header row cells (max 5)' },
    { element: 'Body Cell', selector: 'table-cell-1 to table-cell-5', description: 'Projected into each row cells (max 5)' }
  ];

  propsData = () => [
    { name: 'rows', type: 'unknown[]', description: 'Array of data rows to render' }
  ];

  tableShowcaseCode = tableShowcaseCode;
}
