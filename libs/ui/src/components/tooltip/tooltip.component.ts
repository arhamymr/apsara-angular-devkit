import { Component, input, output, signal, TemplateRef, ContentChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { PortalModule, ComponentPortal } from '@angular/cdk/portal';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OverlayModule, PortalModule],
  template: `
    <div
      class="relative inline-block"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (click)="onClick()">
      <ng-content />
      @if (isVisible()) {
        <div
          class="absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-lg
                 whitespace-nowrap"
          [class.bottom-full]="placement() === 'top'"
          [class.left-1/2.transform.-translate-x-1/2.mb-1]="placement() === 'top'"
          [class.top-full]="placement() === 'bottom'"
          [class.left-1/2.transform.-translate-x-1/2.mt-1]="placement() === 'bottom'"
          [class.right-full]="placement() === 'left'"
          [class.top-1/2.transform.-translate-y-1/2.mr-1]="placement() === 'left'"
          [class.left-full]="placement() === 'right'"
          [class.top-1/2.transform.-translate-y-1/2.ml-1]="placement() === 'right'">
          {{ content() }}
        </div>
      }
    </div>
  `
})
export class TooltipComponent {
  content = input<string>('');
  placement = input<'top' | 'bottom' | 'left' | 'right'>('top');
  delay = input<number>(200);
  isVisible = signal(false);
  hideTimeout?: ReturnType<typeof setTimeout>;

  onMouseEnter(): void {
    clearTimeout(this.hideTimeout);
    this.isVisible.set(true);
  }

  onMouseLeave(): void {
    this.hideTimeout = setTimeout(() => {
      this.isVisible.set(false);
    }, this.delay());
  }

  onClick(): void {
    this.isVisible.update(v => !v);
  }

  cn = cn;
}
