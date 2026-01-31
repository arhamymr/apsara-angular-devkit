import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-divider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="cn(
        'w-full border-t border-gray-200',
        orientation() === 'vertical' ? 'h-full border-t-0 border-r w-px' : '',
        className()
      )"
      [attr.role]="role()"
      [attr.aria-orientation]="orientation() === 'vertical' ? 'vertical' : undefined">
      <ng-content />
    </div>
  `
})
export class DividerComponent {
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  role = input<'separator' | 'none'>('separator');
  className = input<string>('');
  cn = cn;
}
