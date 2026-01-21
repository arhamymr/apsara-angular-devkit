import { Component, input, output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { LucideAngularModule, LoaderCircle } from 'lucide-angular';

export type ButtonVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'plain';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon';

const buttonVariants = cva(
  [
    'cursor-pointer inline-flex items-center justify-center font-medium rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary ring ring-border inset-shadow-2xs inset-shadow-white/50',
        secondary: 'bg-secondary text-secondary-foreground ring ring-border inset-shadow-2xs inset-shadow-white/15',
        destructive: 'bg-destructive text-destructive-foreground ring ring-border inset-shadow-2xs inset-shadow-white/50',
        outline: 'text-primary ring ring-1 ring-border',
        plain: 'bg-transparent text-primary ring-0 shadow-none',
      },
      size: {
        'xs': 'h-7 px-2 text-xs *:[svg]:size-3',
        'sm': 'h-[34px] px-3 text-sm *:[svg]:size-3.5',
        'md': 'h-[38px] px-4 text-sm *:[svg]:size-4',
        'lg': 'h-[46px] px-[22px] text-sm *:[svg]:size-5',
        'icon': 'h-10 w-10 *:[svg]:size-5',
      },
      block: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <button
      [disabled]="disabled()"
      [class.cursor-not-allowed]="disabled()"
      [class]="cn(
        buttonVariants({
          variant: variant(),
          size: size(),
          block: block()
        })
      )"
      (click)="onClick($event)">

      <ng-content />
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('default');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly block = input<boolean>(false);
  readonly clicked = output<Event>();

  readonly LoaderCircle = LoaderCircle;

  cn = cn;
  buttonVariants = buttonVariants;

  getLoaderSizeClass(): string {
    const sizeMap: Record<ButtonSize, string> = {
      'xs': 'size-3',
      'sm': 'size-3.5',
      'md': 'size-4',
      'lg': 'size-5',
      'icon': 'size-5',
    };
    return sizeMap[this.size()];
  }

  onClick(event: Event): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
}
