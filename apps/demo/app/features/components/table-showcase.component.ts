import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableHeaderDirective, TableCellDirective, ButtonComponent } from '@apsara/ui';
import { CardComponent } from '@apsara/ui';
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
    TableHeaderDirective,
    TableCellDirective,
    ButtonComponent,
    CardComponent,
    CodeSnippetComponent
  ],
  template: `
    <section id="table" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Table</h2>
        <p class="text-dimmed">Data table component with content projection for flexible layouts</p>
      </div>

      <app-card>
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-dimmed uppercase tracking-wide">Basic Table</h3>
            <div class="flex gap-1 bg-tertiary rounded-lg p-1">
              <button
                class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
                [class.bg-card]="basicTab() === 'preview'"
                [class.text-foreground]="basicTab() === 'preview'"
                [class.text-dimmed]="basicTab() !== 'preview'"
                [class.shadow-sm]="basicTab() === 'preview'"
                (click)="setBasicTab('preview')">
                Preview
              </button>
              <button
                class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
                [class.bg-card]="basicTab() === 'code'"
                [class.text-foreground]="basicTab() === 'code'"
                [class.text-dimmed]="basicTab() !== 'code'"
                [class.shadow-sm]="basicTab() === 'code'"
                (click)="setBasicTab('code')">
                Code
              </button>
            </div>
          </div>

          @if (basicTab() === 'preview') {
            <app-table [rows]="basicUsers()">
              <th table-header class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Name</th>
              <th table-header class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Email</th>
              <th table-header class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Role</th>

              @for (user of basicUsers(); track user.id) {
                <td table-cell class="px-4 py-4 whitespace-nowrap text-sm text-foreground">{{ user.name }}</td>
                <td table-cell class="px-4 py-4 whitespace-nowrap text-sm text-dimmed">{{ user.email }}</td>
                <td table-cell class="px-4 py-4 whitespace-nowrap text-sm text-dimmed">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    [class.bg-primary/10]="user.role === 'Admin'"
                    [class.text-primary]="user.role === 'Admin'"
                    [class.bg-tertiary]="user.role === 'User'"
                    [class.text-dimmed]="user.role === 'User'"
                    [class.bg-accent/10]="user.role === 'Editor'"
                    [class.text-accent]="user.role === 'Editor'">
                    {{ user.role }}
                  </span>
                </td>
              }
            </app-table>
          } @else {
            <app-code-snippet [code]="tableShowcaseCode.basicCode" language="html" />
          }
        </div>
      </app-card>

      <app-card class="mt-6">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-dimmed uppercase tracking-wide">With Actions</h3>
            <div class="flex gap-1 bg-tertiary rounded-lg p-1">
              <button
                class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
                [class.bg-card]="actionsTab() === 'preview'"
                [class.text-foreground]="actionsTab() === 'preview'"
                [class.text-dimmed]="actionsTab() !== 'preview'"
                [class.shadow-sm]="actionsTab() === 'preview'"
                (click)="setActionsTab('preview')">
                Preview
              </button>
              <button
                class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
                [class.bg-card]="actionsTab() === 'code'"
                [class.text-foreground]="actionsTab() === 'code'"
                [class.text-dimmed]="actionsTab() !== 'code'"
                [class.shadow-sm]="actionsTab() === 'code'"
                (click)="setActionsTab('code')">
                Code
              </button>
            </div>
          </div>

          @if (actionsTab() === 'preview') {
            <app-table [rows]="usersWithActions()">
              <th table-header class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">User</th>
              <th table-header class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Status</th>
              <th table-header class="px-4 py-3 text-right text-xs font-medium text-dimmed uppercase tracking-wider">Actions</th>

              @for (user of usersWithActions(); track user.id) {
                <td table-cell class="px-4 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span class="text-sm font-medium text-primary">{{ user.name.charAt(0) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-foreground">{{ user.name }}</div>
                      <div class="text-sm text-dimmed">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td table-cell class="px-4 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    [class.bg-success/10]="user.status === 'Active'"
                    [class.text-success]="user.status === 'Active'"
                    [class.bg-warning/10]="user.status === 'Pending'"
                    [class.text-warning]="user.status === 'Pending'"
                    [class.bg-danger/10]="user.status === 'Inactive'"
                    [class.text-danger]="user.status === 'Inactive'">
                    {{ user.status }}
                  </span>
                </td>
                <td table-cell class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <app-button label="Edit" size="sm" variant="plain" />
                    <app-button label="Delete" size="sm" variant="plain" />
                  </div>
                </td>
              }
            </app-table>
          } @else {
            <app-code-snippet [code]="tableShowcaseCode.actionsCode" language="html" />
          }
        </div>
      </app-card>

      <app-card class="mt-6">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-dimmed uppercase tracking-wide">Dashboard Metrics</h3>
            <div class="flex gap-1 bg-tertiary rounded-lg p-1">
              <button
                class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
                [class.bg-card]="metricsTab() === 'preview'"
                [class.text-foreground]="metricsTab() === 'preview'"
                [class.text-dimmed]="metricsTab() !== 'preview'"
                [class.shadow-sm]="metricsTab() === 'preview'"
                (click)="setMetricsTab('preview')">
                Preview
              </button>
              <button
                class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
                [class.bg-card]="metricsTab() === 'code'"
                [class.text-foreground]="metricsTab() === 'code'"
                [class.text-dimmed]="metricsTab() !== 'code'"
                [class.shadow-sm]="metricsTab() === 'code'"
                (click)="setMetricsTab('code')">
                Code
              </button>
            </div>
          </div>

          @if (metricsTab() === 'preview') {
            <app-table [rows]="metrics()">
              <th table-header class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Metric</th>
              <th table-header class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Value</th>
              <th table-header class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Change</th>
              <th table-header class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Status</th>

              @for (metric of metrics(); track metric.name) {
                <td table-cell class="px-4 py-4 whitespace-nowrap text-sm font-medium text-foreground">{{ metric.name }}</td>
                <td table-cell class="px-4 py-4 whitespace-nowrap text-sm text-foreground">{{ metric.value }}</td>
                <td table-cell class="px-4 py-4 whitespace-nowrap text-sm"
                  [class.text-success]="metric.change.startsWith('+')"
                  [class.text-danger]="metric.change.startsWith('-')">
                  {{ metric.change }}
                </td>
                <td table-cell class="px-4 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    [class.bg-success/10]="metric.status === 'Good'"
                    [class.text-success]="metric.status === 'Good'"
                    [class.bg-warning/10]="metric.status === 'Warning'"
                    [class.text-warning]="metric.status === 'Warning'"
                    [class.bg-danger/10]="metric.status === 'Critical'"
                    [class.text-danger]="metric.status === 'Critical'">
                    {{ metric.status }}
                  </span>
                </td>
              }
            </app-table>
          } @else {
            <app-code-snippet [code]="tableShowcaseCode.metricsCode" language="html" />
          }
        </div>
      </app-card>

      <app-card class="mt-6">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-dimmed uppercase tracking-wide">Recent Orders</h3>
            <div class="flex gap-1 bg-tertiary rounded-lg p-1">
              <button
                class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
                [class.bg-card]="ordersTab() === 'preview'"
                [class.text-foreground]="ordersTab() === 'preview'"
                [class.text-dimmed]="ordersTab() !== 'preview'"
                [class.shadow-sm]="ordersTab() === 'preview'"
                (click)="setOrdersTab('preview')">
                Preview
              </button>
              <button
                class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
                [class.bg-card]="ordersTab() === 'code'"
                [class.text-foreground]="ordersTab() === 'code'"
                [class.text-dimmed]="ordersTab() !== 'code'"
                [class.shadow-sm]="ordersTab() === 'code'"
                (click)="setOrdersTab('code')">
                Code
              </button>
            </div>
          </div>

          @if (ordersTab() === 'preview') {
            <app-table [rows]="orders()">
              <th table-header class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Order ID</th>
              <th table-header class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Customer</th>
              <th table-header class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Date</th>
              <th table-header class="px-4 py-3 text-right text-xs font-medium text-dimmed uppercase tracking-wider">Amount</th>
              <th table-header class="px-4 py-3 text-left text-xs font-medium text-dimmed uppercase tracking-wider">Status</th>

              @for (order of orders(); track order.id) {
                <td table-cell class="px-4 py-4 whitespace-nowrap text-sm font-medium text-foreground">#{{ order.id }}</td>
                <td table-cell class="px-4 py-4 whitespace-nowrap text-sm text-foreground">{{ order.customer }}</td>
                <td table-cell class="px-4 py-4 whitespace-nowrap text-sm text-dimmed">{{ order.date }}</td>
                <td table-cell class="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-foreground">{{ order.amount }}</td>
                <td table-cell class="px-4 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    [class.bg-success/10]="order.status === 'Delivered'"
                    [class.text-success]="order.status === 'Delivered'"
                    [class.bg-primary/10]="order.status === 'Processing'"
                    [class.text-primary]="order.status === 'Processing'"
                    [class.bg-warning/10]="order.status === 'Shipped'"
                    [class.text-warning]="order.status === 'Shipped'"
                    [class.bg-danger/10]="order.status === 'Cancelled'"
                    [class.text-danger]="order.status === 'Cancelled'">
                    {{ order.status }}
                  </span>
                </td>
              }
            </app-table>
          } @else {
            <app-code-snippet [code]="tableShowcaseCode.ordersCode" language="html" />
          }
        </div>
      </app-card>

      <div class="mt-6">
        <h3 class="text-lg font-semibold text-foreground mb-4">Usage</h3>
        <app-code-snippet [code]="tableShowcaseCode.importCode" language="typescript" />
        <app-code-snippet [code]="tableShowcaseCode.usageCode" language="html" />
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-semibold text-foreground mb-4">Directives</h3>
        <table class="w-full border-collapse text-sm bg-card rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr>
              <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Directive</th>
              <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Selector</th>
              <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">TableHeaderDirective</code></td>
              <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">[table-header]</code></td>
              <td class="p-3 border-b border-border text-foreground">Marks content as table header cell</td>
            </tr>
            <tr>
              <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">TableCellDirective</code></td>
              <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">[table-cell]</code></td>
              <td class="p-3 border-b border-border text-foreground">Marks content as table cell, projected into each row</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <table class="w-full border-collapse text-sm bg-card rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr>
              <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
              <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
              <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Default</th>
              <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">rows</code></td>
              <td class="p-3 border-b border-border text-foreground">unknown[]</td>
              <td class="p-3 border-b border-border text-foreground">[]</td>
              <td class="p-3 border-b border-border text-foreground">Array of data rows to render</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class TableShowcaseComponent {
  basicTab = signal<'preview' | 'code'>('preview');
  actionsTab = signal<'preview' | 'code'>('preview');
  metricsTab = signal<'preview' | 'code'>('preview');
  ordersTab = signal<'preview' | 'code'>('preview');

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

  metrics = signal([
    { name: 'Total Revenue', value: '$48,352', change: '+12.5%', status: 'Good' },
    { name: 'Active Users', value: '2,845', change: '+8.2%', status: 'Good' },
    { name: 'Conversion Rate', value: '3.24%', change: '-0.4%', status: 'Warning' },
    { name: 'Avg. Order Value', value: '$85.50', change: '+15.3%', status: 'Good' },
    { name: 'Cart Abandonment', value: '68.5%', change: '+2.1%', status: 'Critical' }
  ]);

  orders = signal([
    { id: 1001, customer: 'Alice Cooper', date: 'Jan 15, 2024', amount: '$124.99', status: 'Delivered' },
    { id: 1002, customer: 'Bob Martin', date: 'Jan 14, 2024', amount: '$89.50', status: 'Processing' },
    { id: 1003, customer: 'Carol White', date: 'Jan 14, 2024', amount: '$215.00', status: 'Shipped' },
    { id: 1004, customer: 'David Lee', date: 'Jan 13, 2024', amount: '$67.25', status: 'Cancelled' },
    { id: 1005, customer: 'Eva Green', date: 'Jan 12, 2024', amount: '$156.75', status: 'Delivered' }
  ]);

  setBasicTab(tab: 'preview' | 'code') {
    this.basicTab.set(tab);
  }

  setActionsTab(tab: 'preview' | 'code') {
    this.actionsTab.set(tab);
  }

  setMetricsTab(tab: 'preview' | 'code') {
    this.metricsTab.set(tab);
  }

  setOrdersTab(tab: 'preview' | 'code') {
    this.ordersTab.set(tab);
  }

  tableShowcaseCode = tableShowcaseCode;
}
