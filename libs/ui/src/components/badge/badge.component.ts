import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-blue-500 text-white',
        secondary: 'border-transparent bg-gray-100 text-gray-900',
        destructive: 'border-transparent bg-red-500 text-white',
        outline: 'text-gray-900 border-gray-200',
        success: 'border-transparent bg-green-500 text-white',
        warning: 'border-transparent bg-yellow-500 text-gray-900',
      },
    },
    defaultVariants: { variant: 'default' }
  }
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="cn(badgeVariants({ variant: variant() }))">
      <ng-content />
    </span>
  `
})
export class BadgeComponent {
  variant = input<BadgeVariantProps['variant']>('default');
  cn = cn;
  badgeVariants = badgeVariants;
}
