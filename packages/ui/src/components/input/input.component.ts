import { Component, input, output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="input-wrapper" [class.disabled]="disabled()" [class.error]="!!error()">
      @if (label()) {
        <label class="label">{{ label() }} @if (required()) { <span class="required">*</span> }</label>
      }

      <div class="input-container">
        @if (prefixIcon()) {
          <span class="icon prefix">{{ prefixIcon() }}</span>
        }

        <input
          [type]="type()"
          [placeholder]="placeholder()"
          [value]="value()"
          [disabled]="disabled()"
          [class.with-prefix]="!!prefixIcon()"
          [class.with-suffix]="!!suffixIcon()"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()" />

        @if (suffixIcon()) {
          <button type="button" class="icon suffix" (click)="onSuffixClick()">
            {{ showPassword() ? 'Hide' : suffixIcon() }}
          </button>
        }
      </div>

      @if (error()) {
        <span class="error-text">{{ error() }}</span>
      }

      @if (hint()) {
        <span class="hint">{{ hint() }}</span>
      }
    </div>
  `,
  styles: [`
    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-family: 'Inter', system-ui, sans-serif;
    }

    .label {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }

    .required {
      color: #ef4444;
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    input {
      width: 100%;
      padding: 10px 14px;
      font-size: 14px;
      border: 1.5px solid #d1d5db;
      border-radius: 8px;
      background: white;
      color: #1f2937;
      transition: all 0.2s;
      box-sizing: border-box;
    }

    input::placeholder {
      color: #9ca3af;
    }

    input:focus {
      outline: none;
      border-color: #1976d2;
      box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
    }

    input:disabled {
      background: #f3f4f6;
      cursor: not-allowed;
      opacity: 0.6;
    }

    input.with-prefix {
      padding-left: 40px;
    }

    input.with-suffix {
      padding-right: 40px;
    }

    .icon {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      color: #6b7280;
      font-size: 18px;
    }

    .icon.prefix {
      left: 4px;
    }

    .icon.suffix {
      right: 4px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .icon.suffix:hover {
      background: #f3f4f6;
    }

    .error-text {
      font-size: 12px;
      color: #ef4444;
    }

    .hint {
      font-size: 12px;
      color: #6b7280;
    }

    .input-wrapper.error input {
      border-color: #ef4444;
    }

    .input-wrapper.error input:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .input-wrapper.disabled {
      opacity: 0.6;
    }
  `]
})
export class InputComponent implements ControlValueAccessor {
  readonly label = input<string>('');
  readonly type = input<InputType>('text');
  readonly placeholder = input<string>('');
  readonly value = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly error = input<string>('');
  readonly hint = input<string>('');
  readonly required = input<boolean>(false);
  readonly prefixIcon = input<string>('');
  readonly suffixIcon = input<string>('');
  readonly showPassword = input<boolean>(false);

  readonly suffixClick = output<void>();

  private _value = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get value(): string {
    return this._value;
  }

  writeValue(value: string): void {
    this._value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handled via signal input
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._value = input.value;
    this.onChange(this._value);
  }

  onBlur(): void {
    this.onTouched();
  }

  onFocus(): void {
    // Optional: handle focus
  }

  onSuffixClick(): void {
    this.suffixClick.emit();
  }
}
