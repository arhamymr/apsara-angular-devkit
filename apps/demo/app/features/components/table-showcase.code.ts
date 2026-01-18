export const tableShowcaseCode = {
  importCode: `import { TableComponent, TableHeaderDirective, TableCellDirective } from '@apsara/ui/table';`,

  usageCode: `<app-table [rows]="users()">
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Name</th>
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Email</th>
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Role</th>

  @for (user of users(); track user.id) {
    <td table-cell class="px-4 py-4 text-sm">{{ user.name }}</td>
    <td table-cell class="px-4 py-4 text-sm">{{ user.email }}</td>
    <td table-cell class="px-4 py-4 text-sm">{{ user.role }}</td>
  }
</app-table>`,

  basicCode: `<app-table [rows]="users()">
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Name</th>
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Email</th>
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Role</th>

  @for (user of users(); track user.id) {
    <td table-cell class="px-4 py-4 whitespace-nowrap text-sm">{{ user.name }}</td>
    <td table-cell class="px-4 py-4 whitespace-nowrap text-sm">{{ user.email }}</td>
    <td table-cell class="px-4 py-4 whitespace-nowrap text-sm">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
        {{ user.role }}
      </span>
    </td>
  }
</app-table>`,

  actionsCode: `<app-table [rows]="users()">
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">User</th>
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Status</th>
  <th table-header class="px-4 py-3 text-right text-xs font-medium uppercase">Actions</th>

  @for (user of users(); track user.id) {
    <td table-cell class="px-4 py-4">
      <div class="flex items-center">
        <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span class="text-sm font-medium text-primary">{{ user.name.charAt(0) }}</span>
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium">{{ user.name }}</div>
          <div class="text-sm text-dimmed">{{ user.email }}</div>
        </div>
      </div>
    </td>
    <td table-cell class="px-4 py-4">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
        {{ user.status }}
      </span>
    </td>
    <td table-cell class="px-4 py-4 text-right">
      <app-button label="Edit" size="sm" variant="plain" />
      <app-button label="Delete" size="sm" variant="plain" />
    </td>
  }
</app-table>`,

  metricsCode: `<app-table [rows]="metrics()">
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Metric</th>
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Value</th>
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Change</th>
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Status</th>

  @for (metric of metrics(); track metric.name) {
    <td table-cell class="px-4 py-4 whitespace-nowrap text-sm font-medium">{{ metric.name }}</td>
    <td table-cell class="px-4 py-4 whitespace-nowrap text-sm">{{ metric.value }}</td>
    <td table-cell class="px-4 py-4 whitespace-nowrap text-sm" [class.text-success]="metric.change.startsWith('+')">
      {{ metric.change }}
    </td>
    <td table-cell class="px-4 py-4">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
        {{ metric.status }}
      </span>
    </td>
  }
</app-table>`,

  ordersCode: `<app-table [rows]="orders()">
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Order ID</th>
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Customer</th>
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Date</th>
  <th table-header class="px-4 py-3 text-right text-xs font-medium uppercase">Amount</th>
  <th table-header class="px-4 py-3 text-left text-xs font-medium uppercase">Status</th>

  @for (order of orders(); track order.id) {
    <td table-cell class="px-4 py-4 whitespace-nowrap text-sm font-medium">#{{ order.id }}</td>
    <td table-cell class="px-4 py-4 whitespace-nowrap text-sm">{{ order.customer }}</td>
    <td table-cell class="px-4 py-4 whitespace-nowrap text-sm">{{ order.date }}</td>
    <td table-cell class="px-4 py-4 whitespace-nowrap text-sm text-right">{{ order.amount }}</td>
    <td table-cell class="px-4 py-4">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
        {{ order.status }}
      </span>
    </td>
  }
</app-table>`
};
