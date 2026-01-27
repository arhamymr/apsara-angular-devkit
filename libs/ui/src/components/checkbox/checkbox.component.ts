import { Component, input, output, forwardRef, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

export type CheckboxSize = 'sm' | 'md' | 'lg' | 'xl';
export type CheckboxColor = 'default' | 'secondary' | 'destructive' | 'success' | 'warning';
export type CheckboxRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

const checkboxVariants = cva(
  [
    'cursor-pointer transition-all focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ],
  {
    variants: {
      size: {
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
        xl: 'w-6 h-6',
      },
      color: {
        default: 'border-gray-300 text-primary focus:ring-primary',
        secondary: 'border-gray-300 text-gray-600 focus:ring-gray-500',
        destructive: 'border-red-300 text-red-600 focus:ring-red-500',
        success: 'border-green-300 text-green-600 focus:ring-green-500',
        warning: 'border-yellow-300 text-yellow-600 focus:ring-yellow-500',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'default',
      radius: 'md',
    }
  }
);

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <label class="flex items-center gap-2 cursor-pointer" [class.cursor-not-allowed]="isDisabled()">
      <input
        type="checkbox"
        [checked]="isChecked()"
        [disabled]="isDisabled()"
        [indeterminate]="isIndeterminate()"
        (change)="onCheckboxChange($event)"
        (blur)="onBlur()"
        [class]="cn(
          checkboxVariants({
            size: size(),
            color: color(),
            radius: radius()
          }),
          class()
        )" />
      @if (label()) {
        <span
          class="text-gray-700"
          [class.opacity-50]="isDisabled()"
          [class]="getLabelSizeClasses()">
          {{ label() }}
        </span>
      }
      <ng-content />
    </label>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  label = input<string>('');
  isIndeterminate = input<boolean>(false);
  readonly size = input<CheckboxSize>('md');
  readonly color = input<CheckboxColor>('default');
  readonly radius = input<CheckboxRadius>('md');
  readonly class = input<string>('');
  private _isDisabled = signal(false);
  private _isChecked = signal(false);
  onChange = output<boolean>();

  get isDisabled() { return this._isDisabled; }
  get isChecked() { return this._isChecked; }

  @Input()
  set disabled(value: boolean) {
    this._isDisabled.set(value);
  }

  @Input()
  set checked(value: boolean) {
    this._isChecked.set(value);
  }

  private _onChange: (value: boolean) => void = () => { };
  private _onTouched: () => void = () => { };

  writeValue(value: boolean): void {
    this._isChecked.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    this._isChecked.set(checked);
    this._onChange(checked);
    this.onChange.emit(checked);
  }

  onBlur(): void {
    this._onTouched();
  }

  getLabelSizeClasses(): string {
    const sizeMap: Record<CheckboxSize, string> = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    };
    return sizeMap[this.size()];
  }

  cn = cn;
  checkboxVariants = checkboxVariants;
}
