import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'outline' | 'plain';
export type ButtonSize = 'xs' | 'xs-icon' | 'sm' | 'sm-icon' | 'md' | 'icon' | 'lg' | 'lg-icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [attr.data-variant]="variant()"
      [attr.data-disabled]="disabled() || loading()"
      [attr.data-popup-open]="popupOpen()"
      [disabled]="disabled() || loading()"
      [class.pill]="pill()"
      [class.block]="block()"
      [class.progress]="loading()"
      [class]="cn(
        'relative font-medium select-none inline-flex justify-center items-center gap-2.5 transition-colors',
        'after:absolute after:inset-0 after:bg-white/15 after:opacity-0',
        'hover:after:opacity-100 active:after:opacity-100',
        'data-popup-open:after:opacity-100 after:transition-opacity',
        'focus:outline-0 focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:opacity-70 disabled:pointer-events-none',
        'data-disabled:opacity-70 data-disabled:pointer-events-none',
        'ring ring-border inset-shadow-2xs shadow outline-primary',
        getSizeClass(),
        getVariantClass()
      )"
      (click)="onClick($event)">

      @if (loading()) {
        <span class="before:size-4.5 before:bg-spinner before:-mr-7 before:opacity-0 before:scale-20 before:transition-[opacity,scale,margin-right]"></span>
      }

      @if (label()) {
        <span class="label relative">{{ label() }}</span>
      }

      <ng-content select="[slot]" />
    </button>
  `,
  styles: [`
    .btn.progress .label {
      opacity: 0;
      transform: scale(0);
      margin-right: 28px;
    }

    .pill {
      border-radius: 9999px;
    }
    .pill::after {
      border-radius: 9999px;
    }

    .block {
      width: 100%;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

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
  readonly pill = input<boolean>(false);
  readonly block = input<boolean>(false);
  readonly popupOpen = input<boolean | undefined>(undefined);
  readonly clicked = output<Event>();
  cn = cn;

  getSizeClass(): string {
    const sizeMap: Record<ButtonSize, string> = {
      'xs': 'h-7 px-2 text-xs rounded-xs [&>svg]:size-3.5',
      'xs-icon': 'size-7 rounded-xs [&>svg]:size-3.5',
      'sm': 'h-[34px] px-3 text-sm rounded-sm [&>svg]:size-4',
      'sm-icon': 'size-[34px] rounded-sm [&>svg]:size-4',
      'md': 'h-[38px] px-4 text-sm rounded-md [&>svg]:size-[18px]',
      'icon': 'size-[38px] rounded-md [&>svg]:size-[18px]',
      'lg': 'h-[46px] px-[22px] text-sm rounded-lg [&>svg]:size-[18px]',
      'lg-icon': 'size-[46px] rounded-lg [&>svg]:size-[18px]'
    };
    return sizeMap[this.size()];
  }

  getVariantClass(): string {
    const variantMap: Record<ButtonVariant, string> = {
      'primary': 'bg-primary text-primary-foreground ring-primary-border',
      'secondary': 'bg-secondary text-secondary-foreground ring-secondary-border',
      'tertiary': 'bg-tertiary text-tertiary-foreground ring-tertiary-border',
      'danger': 'bg-danger text-danger-foreground ring-danger-border',
      'outline': 'bg-transparent text-foreground ring-border',
      'plain': 'bg-transparent text-foreground ring-0 shadow-none'
    };
    return variantMap[this.variant()];
  }

  onClick(event: Event): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
}
