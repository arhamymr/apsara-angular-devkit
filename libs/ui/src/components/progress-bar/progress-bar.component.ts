import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const progressVariants = cva(
  ['h-full', 'rounded-full', 'transition-all', 'duration-300', 'ease-in-out'],
  {
    variants: {
      color: {
        primary: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        danger: 'bg-red-500',
      },
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'md',
    }
  }
);

export type ProgressVariantProps = VariantProps<typeof progressVariants>;

@Component({
  selector: 'app-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="w-full bg-gray-200 rounded-full overflow-hidden"
      [class.h-1]="size() === 'sm'"
      [class.h-2]="size() === 'md'"
      [class.h-3]="size() === 'lg'"
      [attr.role]="role()"
      [attr.aria-valuenow]="value()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="100"
      [attr.aria-label]="ariaLabel()">
      <div
        [class]="cn(progressVariants({ color: color(), size: size() }))"
        [style.width.%]="value()">
      </div>
    </div>
  `
})
export class ProgressComponent {
  readonly value = input<number>(0);
  readonly max = input<number>(100);
  readonly color = input<'primary' | 'success' | 'warning' | 'danger'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly role = input<'progressbar' | 'none'>('progressbar');
  readonly ariaLabel = input<string>('Progress');

  cn = cn;
  progressVariants = progressVariants;
}
