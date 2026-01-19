import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

export type { VariantProps as ButtonVariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  [
    'relative font-medium select-none inline-flex justify-center items-center gap-2.5 transition-colors cursor-pointer',
    'after:absolute after:inset-0 after:bg-black/5 after:opacity-0 hover:after:opacity-100 active:after:opacity-100 data-popup-open:after:opacity-100 after:transition-opacity',
    'focus:outline-0 focus-visible:outline-2 focus-visible:outline-offset-2',
    'disabled:opacity-70 disabled:pointer-events-none data-disabled:opacity-70 data-disabled:pointer-events-none',
    'ring ring-[var(--border)] inset-shadow-2xs inset-shadow-white/15 shadow-sm',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground **:[svg]:[color:var(--primary-foreground)]',
          'ring-primary-border outline-primary',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground **:[svg]:[color:var(--secondary-foreground)]',
          'ring-secondary-border outline-secondary',
        ],
        tertiary: [
          'bg-tertiary text-tertiary-foreground **:[svg]:[color:var(--tertiary-foreground)]',
          'ring-tertiary-border outline-tertiary] inset-shadow-white/15',
        ],
        danger: [
          'bg-danger text-danger-foreground **:[svg]:[color:var(--danger-foreground)]',
          'ring-danger-border outline-danger',
        ],
        outline: [
          'bg-transparent text-[var(--foreground)] **:[svg]:[color:var(--foreground)]',
          'ring-[var(--border)]',
        ],
        plain: [
          'bg-transparent text-[var(--foreground)] **:[svg]:[color:var(--foreground)]',
          'ring-0 shadow-none',
        ],
      },
      size: {
        'xs': 'h-7 px-2 text-xs *:[svg]:size-3',
        'xs-icon': 'size-7 *:[svg]:size-3',
        'sm': 'h-[34px] px-3 text-sm *:[svg]:size-3.5',
        'sm-icon': 'size-[34px] *:[svg]:size-3.5',
        'md': 'h-[38px] px-4 text-sm *:[svg]:size-4',
        'icon': 'size-[38px] *:[svg]:size-4',
        'lg': 'h-[46px] px-[22px] text-sm *:[svg]:size-5',
        'lg-icon': 'size-[46px] *:[svg]:size-5',
      },
      rounded: {
        none: 'rounded-none [&]:after:rounded-none',
        sm: 'rounded-sm [&]:after:rounded-sm',
        md: 'rounded-md [&]:after:rounded-md',
        lg: 'rounded-lg [&]:after:rounded-lg',
        xl: 'rounded-xl [&]:after:rounded-xl',
        '2xl': 'rounded-2xl [&]:after:rounded-2xl',
        full: 'rounded-full [&]:after:rounded-full',
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
      rounded: 'md',
    },
  },
);

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [disabled]="disabled() || loading()"
      [class.pointer-events-none]="disabled() || loading()"
      [class.cursor-not-allowed]="disabled() || loading()"
      [class]="cn(
        buttonVariants({
          variant: variant(),
          size: size(),
          rounded: rounded(),
          block: block(),
          loading: loading()
        })
      )"
      (click)="onClick($event)">

      @if (loading()) {
        <svg class="animate-spin shrink-0 p-px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" [class.size-3]="size() === 'xs' || size() === 'xs-icon'" [class.size-3.5]="size() === 'sm' || size() === 'sm-icon'" [class.size-4]="size() === 'md' || size() === 'icon'" [class.size-5]="size() === 'lg' || size() === 'lg-icon'">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      }

      @if (label()) {
        <span class="[&:has(+_*)]:sr-only" [class.invisible]="loading()">{{ label() }}</span>
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
  readonly variant = input<VariantProps<typeof buttonVariants>['variant']>('primary');
  readonly size = input<VariantProps<typeof buttonVariants>['size']>('md');
  readonly rounded = input<VariantProps<typeof buttonVariants>['rounded']>('md');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly block = input<boolean>(false);
  readonly popupOpen = input<boolean | undefined>(undefined);
  readonly clicked = output<Event>();

  cn = cn;
  buttonVariants = buttonVariants;

  onClick(event: Event): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
}
