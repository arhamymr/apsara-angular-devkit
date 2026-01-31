import { Component, input, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="cn('overflow-x-auto border rounded-lg', $class())">
      <table class="w-full text-sm">
        <thead class="bg-muted">
          <tr>
            @if (tableHeaderTemplate()) {
              <ng-container *ngTemplateOutlet="tableHeaderTemplate()" />
            } @else {
              <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Prop</th>
              <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Type</th>
              <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Default</th>
              <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Description</th>
            }
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          @for (row of rows(); track $index) {
            <tr class="hover:bg-muted">
              @if (tableCellTemplate()) {
                <ng-container *ngTemplateOutlet="tableCellTemplate(); context: { $implicit: row, index: $index }" />
              } @else {
                <td class="p-3 text-foreground">{{ row }}</td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    tr {
      display: table-row;
    }
    td, th {
      display: table-cell;
    }
  `]
})
export class TableComponent {
  rows = input<unknown[]>([]);
  $class = input('');
  tableHeaderTemplate = input<TemplateRef<void> | null>(null);
  tableCellTemplate = input<TemplateRef<{ $implicit: unknown; index: number }> | null>(null);
  cn = cn;
}
