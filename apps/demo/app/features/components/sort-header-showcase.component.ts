import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortHeaderComponent, SortEvent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface SortHeaderProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-sort-header-showcase',
  standalone: true,
  imports: [CommonModule, SortHeaderComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="sort-header" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Sort Header</h2>
        <p class="text-dimmed">A sortable table header component</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-3 text-left">
                        <app-sort-header
                          label="Name"
                          column="name"
                          [sortDirection]="sorts()['name']()"
                          (sortChange)="onSortChange($event, 'name')" />
                      </th>
                      <th class="px-4 py-3 text-left">
                        <app-sort-header
                          label="Email"
                          column="email"
                          [sortDirection]="sorts()['email']()"
                          (sortChange)="onSortChange($event, 'email')" />
                      </th>
                      <th class="px-4 py-3 text-left">
                        <app-sort-header
                          label="Role"
                          column="role"
                          [sortDirection]="sorts()['role']()"
                          (sortChange)="onSortChange($event, 'role')" />
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    @for (user of sortedUsers(); track $index) {
                      <tr class="hover:bg-gray-50">
                        <td class="px-4 py-3 text-sm text-gray-900">{{ user.name }}</td>
                        <td class="px-4 py-3 text-sm text-gray-500">{{ user.email }}</td>
                        <td class="px-4 py-3 text-sm text-gray-500">{{ user.role }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
              <div class="p-4 bg-blue-50 rounded-lg mt-4">
                <p class="text-sm text-blue-600">
                  <strong>Last sort:</strong> {{ lastSort() || 'None' }}
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 text-foreground">{{ prop.type }}</td>
          <td class="p-3 text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="tableHeader" [tableCellTemplate]="tableCell" />
      </div>
    </section>
  `
})
export class SortHeaderShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');

  users = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
    { name: 'Alice Brown', email: 'alice@example.com', role: 'Admin' }
  ];

  sorts = signal<{ [key: string]: () => 'asc' | 'desc' | '' }>({
    name: () => '',
    email: () => '',
    role: () => ''
  });
  sortedUsers = signal(this.users);
  lastSort = signal<string>('');

  installCode = `npm install @apsara/ui/sort-header`;

  importCode = `import { SortHeaderComponent, SortEvent } from '@apsara/ui/sort-header';`;

  usageCode = `<app-sort-header
  label="Name"
  column="name"
  [sortDirection]="sorts()['name']()"
  (sortChange)="onSortChange($event, 'name')" />`;

  basicCode = `<table class="w-full">
  <thead>
    <tr>
      <th class="px-4 py-3 text-left">
        <app-sort-header
          label="Name"
          column="name"
          [sortDirection]="sorts()['name']()"
          (sortChange)="onSortChange($event, 'name')" />
      </th>
      <th class="px-4 py-3 text-left">
        <app-sort-header
          label="Email"
          column="email"
          [sortDirection]="sorts()['email']()"
          (sortChange)="onSortChange($event, 'email')" />
      </th>
    </tr>
  </thead>
</table>`;

  propsData = (): SortHeaderProp[] => [
    { name: 'label', type: 'string', description: 'Column header label' },
    { name: 'column', type: 'string', description: 'Column identifier' },
    { name: 'sortDirection', type: "'asc' | 'desc' | ''", description: 'Current sort direction' },
    { name: 'sortChange', type: 'EventEmitter<SortEvent>', description: 'Emitted when sort changes' }
  ];

  onSortChange(event: SortEvent, column: string): void {
    this.sorts.update(s => ({
      ...s,
      [column]: () => event.direction
    }));
    this.lastSort.set(`${column}: ${event.direction || 'none'}`);

    const direction = event.direction;
    if (direction) {
      const sorted = [...this.users].sort((a, b) => {
        const aVal = (a as Record<string, string>)[column].toLowerCase();
        const bVal = (b as Record<string, string>)[column].toLowerCase();
        return direction === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
      this.sortedUsers.set(sorted);
    } else {
      this.sortedUsers.set(this.users);
    }
  }
}
