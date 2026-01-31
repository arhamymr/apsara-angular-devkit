import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="animate-spin text-blue-500"
      [class]="cn(
        sizeClass(),
        'animate-spin'
      )"
      [attr.viewBox]="'0 0 24 24'"
      fill="none"
      [attr.stroke-width]="strokeWidth()">
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  `
})
export class SpinnerComponent {
  size = input<'sm' | 'md' | 'lg'>('md');
  strokeWidth = input<number>(3);

  sizeClass(): string {
    const sizes: Record<string, string> = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    };
    return sizes[this.size() as string] || sizes['md'];
  }

  cn = cn;
}
