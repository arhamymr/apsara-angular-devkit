import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-list-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div
      class="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors
             hover:bg-gray-100 active:bg-gray-200"
      [class]="cn(hoverable() ? 'hover:bg-gray-100 cursor-pointer' : '', className())"
      [attr.role]="role()"
      (click)="onClick()"
      (keydown)="onKeydown($event)">
      @if (leading()) {
        <span class="flex-shrink-0">
          <ng-content select="[leading]" />
        </span>
      }
      <div class="flex-1 min-w-0">
        @if (title()) {
          <p class="text-sm font-medium text-gray-900 truncate">{{ title() }}</p>
        }
        @if (subtitle()) {
          <p class="text-xs text-gray-500 truncate">{{ subtitle() }}</p>
        }
        <ng-content />
      </div>
      @if (trailing()) {
        <span class="flex-shrink-0">
          <ng-content select="[trailing]" />
        </span>
      }
    </div>
  `
})
export class ListItemComponent {
  title = input<string>('');
  subtitle = input<string>('');
  leading = input<boolean>(true);
  trailing = input<boolean>(false);
  hoverable = input<boolean>(true);
  disabled = input<boolean>(false);
  role = input<string>('listitem');
  className = input<string>('');
  clicked = output<void>();

  onClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onClick();
    }
  }

  cn = cn;
}
