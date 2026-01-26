import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, ButtonComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent } from '@apsara/ui';
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
    AlertComponent,
    AlertTitleComponent,
    AlertDescriptionComponent,
    CardComponent,
    TabsComponent,
    CodeSnippetComponent
  ],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="table" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Table</h2>
        <p class="text-muted-foreground">Data table component with flexible template support</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <ng-template #basicHeader>
                <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
              </ng-template>

              <ng-template #basicCell let-user>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-foreground">{{ user.name }}</td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">{{ user.email }}</td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    [class.bg-primary/10]="user.role === 'Admin'"
                    [class.text-primary]="user.role === 'Admin'"
                    [class.bg-muted]="user.role === 'User'"
                    [class.text-muted-foreground]="user.role === 'User'"
                    [class.bg-accent/10]="user.role === 'Editor'"
                    [class.text-accent]="user.role === 'Editor'">
                    {{ user.role }}
                  </span>
                </td>
              </ng-template>

              <app-table [rows]="basicUsers()" [tableHeaderTemplate]="basicHeader" [tableCellTemplate]="basicCell" />
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
                <ng-template #actionsHeader>
                  <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </ng-template>

                <ng-template #actionsCell let-user>
                  <td class="px-4 py-4">
                    <div class="flex items-center">
                      <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span class="text-sm font-medium text-primary">{{ user.name.charAt(0) }}</span>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-foreground">{{ user.name }}</div>
                        <div class="text-sm text-muted-foreground">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      [class.bg-success/10]="user.status === 'Active'"
                      [class.text-success]="user.status === 'Active'"
                      [class.bg-warning/10]="user.status === 'Pending'"
                      [class.text-warning]="user.status === 'Pending'"
                      [class.bg-destructive/10]="user.status === 'Inactive'"
                      [class.text-destructive]="user.status === 'Inactive'">
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end gap-2">
                      <app-button label="Edit" size="sm" variant="plain" />
                      <app-button label="Delete" size="sm" variant="plain" />
                    </div>
                  </td>
                </ng-template>

                <app-table [rows]="usersWithActions()" [tableHeaderTemplate]="actionsHeader" [tableCellTemplate]="actionsCell" />
              </div>
            } @else {
              <app-code-snippet [code]="tableShowcaseCode.actionsCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #propsHeader>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #propsCell let-prop>
          <td class="p-3 text-foreground"><code class="bg-muted px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 text-foreground">{{ prop.type }}</td>
          <td class="p-3 text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="propsHeader" [tableCellTemplate]="propsCell" />
      </div>
    </section>
  `
})
export class TableShowcaseComponent {
  tableShowcaseCode = tableShowcaseCode;
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

  propsData = signal([
    { name: 'rows', type: 'any[]', description: 'Array of data to display' },
    { name: 'tableHeaderTemplate', type: 'TemplateRef<void>', description: 'Template for the table header' },
    { name: 'tableCellTemplate', type: 'TemplateRef<any>', description: 'Template for each table row' },
    { name: '$class', type: 'string', description: 'Custom CSS classes for the table container' }
  ]);

  selectorData = signal([
    { element: 'th', selector: 'table-header-1...N', description: 'Projects content into table header columns' },
    { element: 'tr', selector: 'table-cell-1...N', description: 'Projects content into table body columns' }
  ]);
}
