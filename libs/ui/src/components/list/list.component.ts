import { Component, input, contentChildren, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <ul
      class="space-y-1"
      [class]="cn(orientation() === 'horizontal' ? 'flex items-center gap-1' : '', className())"
      role="list"
      [attr.aria-label]="ariaLabel()">
      @for (item of items(); track $index) {
        <li>
          <ng-content select="[list-item]" />
        </li>
      }
      <ng-content />
    </ul>
  `
})
export class ListComponent {
  orientation = input<'horizontal' | 'vertical'>('vertical');
  ariaLabel = input<string>('List');
  className = input<string>('');
  items = input<number[]>([]);
  cn = cn;
}
