import { Component, input, output, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { LucideAngularModule } from 'lucide-angular';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'time' | 'file';

export type InputSize = 'sm' | 'md' | 'lg' | 'xl';

export type InputRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

const inputVariants = cva(
  [
    'w-full',
    'border-[1.5px]',
    'bg-input',
    'text-foreground',
    'transition-all',
    'box-border',
    'placeholder:text-muted-foreground',
    'focus:outline-none',
    'focus:border-primary',
    'focus:ring-3',
    'focus:ring-[oklch(0.55_0.2_250/0.1)]',
    'disabled:bg-muted',
    'disabled:cursor-not-allowed',
    'disabled:opacity-60',
  ],
  {
    variants: {
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-3.5 py-2.5 text-sm',
        lg: 'px-4 py-3 text-base',
        xl: 'px-5 py-3.5 text-lg'
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full'
      },
      error: {
        true: 'border-destructive focus:ring-[oklch(0.6098_0.244_28.41/0.1)]',
        false: ''
      },
    },
    defaultVariants: {
      size: 'md',
      radius: 'md',
      error: false,
    }
  }
);

export type InputVariantProps = VariantProps<typeof inputVariants>;

@Component({
  selector: 'app-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div [class]="cn('flex flex-col gap-1.5', isInline() && 'flex-row items-center gap-3', disabled() && 'opacity-60')">
      @if (label()) {
        <label [class]="cn('text-sm font-medium text-foreground flex items-center gap-1.5', isInline() && 'min-w-[120px] flex-shrink-0')">
          {{ label() }}
          @if (required()) { <span class="text-destructive">*</span> }
          @if (badge()) { <span class="text-[11px] px-1.5 py-0.5 bg-accent rounded text-accent-foreground font-medium">{{ badge() }}</span> }
        </label>
      }

      <div class="relative flex items-center w-full">
        @if (prefixIcon()) {
          @if (isString(prefixIcon())) {
            <span class="absolute left-1 flex items-center justify-center w-9 h-9 text-muted-foreground text-lg">{{ prefixIcon() }}</span>
          } @else if (isIcon(prefixIcon())) {
            <lucide-angular [img]="prefixIcon()" [size]="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          }
        }

        <input
          [type]="getInputType()"
          [placeholder]="placeholder()"
          [value]="internalValue"
          [disabled]="disabled()"
          [accept]="accept()"
          [multiple]="multiple()"
          [attr.aria-invalid]="!!error()"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
          [class]="cn(
            inputVariants({
              size: size(),
              radius: radius(),
              error: !!error()
            }),
            getInputType() === 'file' && 'px-3 py-2 cursor-pointer',
            (getInputType() === 'date' || getInputType() === 'datetime-local' || getInputType() === 'time') && 'cursor-pointer',
            !!prefixIcon() && 'pl-10',
            isPassword() && 'pr-10',
            classes()
          )" />

        @if (isPassword() && internalValue) {
          <button type="button" class="absolute right-1 bg-transparent border-0 cursor-pointer text-xs px-2 py-1 rounded hover:bg-accent transition-colors text-muted-foreground" (click)="togglePassword()">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        }
      </div>

      @if (error()) {
        <span class="text-xs text-destructive">{{ error() }}</span>
      }

      @if (hint()) {
        <span class="text-xs text-muted-foreground">{{ hint() }}</span>
      }
    </div>
  `
})
export class InputComponent implements ControlValueAccessor {
  readonly label = input<string>('');
  readonly type = input<InputType>('text');
  readonly placeholder = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly error = input<string>('');
  readonly hint = input<string>('');
  readonly required = input<boolean>(false);
  readonly prefixIcon = input<string | any>('');
  readonly accept = input<string>('');
  readonly multiple = input<boolean>(false);
  readonly orientation = input<'vertical' | 'inline'>('vertical');
  readonly badge = input<string>('');
  readonly size = input<InputSize>('md');
  readonly radius = input<InputRadius>('md');
  readonly classes = input<string>('');

  protected showPassword = false;

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  isIcon(value: any): boolean {
    return value != null && !this.isString(value);
  }

  readonly fileChange = output<File[]>();

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  protected internalValue = '';

  cn = cn;
  inputVariants = inputVariants;

  writeValue(value: string): void {
    this.internalValue = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.type === 'file') {
      const files = Array.from(input.files || []);
      this.fileChange.emit(files);
      this.onChange('');
    } else {
      this.onChange(input.value);
      this.internalValue = input.value;
    }
  }

  onBlur(): void {
    this.onTouched();
  }

  onFocus(): void {
  }

  isPassword(): boolean {
    return this.type() === 'password';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  getInputType(): string {
    if (this.isPassword()) {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type();
  }

  isInline(): boolean {
    return this.orientation() === 'inline';
  }
}
