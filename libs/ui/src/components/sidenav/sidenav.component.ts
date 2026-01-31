import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-40 flex">
        <div
          class="fixed inset-0 bg-black/50 transition-opacity"
          (click)="onBackdropClick()"
          aria-hidden="true"></div>
        <div
          class="relative flex flex-col w-64 bg-white shadow-xl transform transition-transform"
          [class.-translate-x-full]="position() === 'left' && !isOpen()"
          [class.translate-x-0]="isOpen()"
          role="navigation"
          [attr.aria-label]="ariaLabel()">
          @if (hasHeader()) {
            <div class="px-4 py-3 border-b border-gray-200">
              <ng-content select="[sidenav-header]" />
            </div>
          }
          <div class="flex-1 overflow-y-auto p-4">
            <ng-content />
          </div>
        </div>
      </div>
    }
  `
})
export class SidenavComponent {
  isOpen = input<boolean>(false);
  position = input<'left' | 'right'>('left');
  mode = input<'over' | 'push' | 'side'>('over');
  ariaLabel = input<string>('Navigation');
  hasHeader = input<boolean>(true);
  closed = output<void>();

  onBackdropClick(): void {
    this.closed.emit();
  }

  cn = cn;
}
