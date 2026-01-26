import { Component, input, output, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <fieldset class="border-0 p-0 m-0">
      <legend class="sr-only">{{ legend() }}</legend>
      @for (option of options(); track option.value) {
        <label class="flex items-center gap-2 cursor-pointer mb-2 last:mb-0" [class.cursor-not-allowed]="isDisabled()">
          <input
            type="radio"
            [name]="name()"
            [value]="option.value"
            [checked]="modelValue() === option.value"
            [disabled]="isDisabled() || option.disabled"
            (change)="onRadioChange(option.value)"
            class="w-4 h-4 border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer
                   disabled:cursor-not-allowed disabled:opacity-50" />
          <span class="text-sm text-gray-700" [class.opacity-50]="isDisabled() || option.disabled">
            {{ option.label }}
          </span>
        </label>
      }
      <ng-content />
    </fieldset>
  `
})
export class RadioComponent implements ControlValueAccessor {
  options = input<Array<{ value: string; label: string; disabled?: boolean }>>([]);
  name = input.required<string>();
  modelValue = signal('');
  legend = input<string>('');
  isDisabled = signal(false);
  onChange = output<string>();

  private _onChange: (value: string) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.modelValue.set(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onRadioChange(value: string): void {
    this.modelValue.set(value);
    this._onChange(value);
    this.onChange.emit(value);
    this._onTouched();
  }

  cn = cn;
}
