import { Component, input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cn('overflow-x-auto border border-[var(--border)] rounded-lg', $class())">
      <table class="w-full text-sm">
        <thead class="bg-[var(--tertiary)]">
          <tr>
            @if (tableHeaderTemplate()) {
              <ng-container *ngTemplateOutlet="tableHeaderTemplate()" />
            } @else {
              <th class="text-left p-3 bg-[var(--tertiary)] font-semibold text-[var(--dimmed)] text-xs uppercase tracking-wide">Prop</th>
              <th class="text-left p-3 bg-[var(--tertiary)] font-semibold text-[var(--dimmed)] text-xs uppercase tracking-wide">Type</th>
              <th class="text-left p-3 bg-[var(--tertiary)] font-semibold text-[var(--dimmed)] text-xs uppercase tracking-wide">Default</th>
              <th class="text-left p-3 bg-[var(--tertiary)] font-semibold text-[var(--dimmed)] text-xs uppercase tracking-wide">Description</th>
            }
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--border)]">
          @for (row of rows(); track $index) {
            <tr class="hover:bg-[var(--tertiary)]">
              @if (tableCellTemplate()) {
                <ng-container *ngTemplateOutlet="tableCellTemplate(); context: { $implicit: row, index: $index }" />
              } @else {
                <td class="p-3 text-[var(--foreground)]">{{ row }}</td>
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
