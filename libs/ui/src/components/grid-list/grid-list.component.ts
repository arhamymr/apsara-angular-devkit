import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-grid-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div
      class="grid gap-4"
      [style.grid-template-columns]="'repeat(' + cols() + ', minmax(0, 1fr))'"
      [class]="className()">
      <ng-content />
    </div>
  `
})
export class GridListComponent {
  cols = input<number>(2);
  rowHeight = input<string>('200px');
  gap = input<string>('1rem');
  className = input<string>('');

  cn = cn;
}
