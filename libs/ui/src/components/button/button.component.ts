import { Component, input, output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { LucideAngularModule, LoaderCircle } from 'lucide-angular';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'plain' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center font-medium rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary',
          'ring ring-border inset-shadow-2xs inset-shadow-white/50',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'ring ring-border inset-shadow-2xs inset-shadow-white/15',
        ],
        destructive: [
          'bg-destructive text-destructive-foreground',
           'ring ring-border inset-shadow-2xs inset-shadow-white/50',
        ],
        outline: [
          'bg-transparent text-primary',
          'ring-primary-border',
        ],
        plain: [
          'bg-transparent text-primary',
          'ring-0 shadow-none',
        ],
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
      loading: {
        true: 'pointer-events-none opacity-70',
      },
    },
    defaultVariants: {
      variant: 'primary',
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
      [disabled]="disabled() || loading()"
      [class.pointer-events-none]="disabled() || loading()"
      [class.cursor-not-allowed]="disabled() || loading()"
      [class]="cn(
        buttonVariants({
          variant: variant(),
          size: size(),
          block: block(),
          loading: loading()
        })
      )"
      (click)="onClick($event)">

      @if (loading()) {
        <lucide-angular [img]="LoaderCircle" [class]="'animate-spin shrink-0 ' + getLoaderSizeClass()" />
      }

      @if (label()) {
        <span class="[&:has(+_*)]:sr-only">{{ label() }}</span>
      }

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
  readonly label = input<string>('');
  readonly variant = input<ButtonVariant>('primary');
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
