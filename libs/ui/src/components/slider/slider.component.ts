import { Component, input, output, signal, forwardRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-slider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ],
  template: `
    <div
      class="relative h-2 bg-gray-200 rounded-full"
      [class.h-1]="size() === 'sm'"
      [class.h-3]="size() === 'lg'"
      [class.opacity-50]="isDisabled()">
      <div
        class="absolute h-full bg-primary rounded-full transition-all"
        [style.width.%]="percent()"></div>
      <input
        type="range"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="modelValue()"
        (input)="onInput($event)"
        (blur)="onBlur()"
        class="absolute w-full h-full opacity-0 cursor-pointer"
        [disabled]="isDisabled()" />
      <div
        class="absolute w-4 h-4 bg-white border-2 border-[var(--primary)] rounded-full shadow
               transform -translate-x-1/2 transition-all cursor-pointer
               hover:scale-110"
        [style.left.%]="percent()"
        [class.w-3]="size() === 'sm'"
        [class.h-3]="size() === 'sm'"
        [class.w-5]="size() === 'lg'"
        [class.h-5]="size() === 'lg'"
        [class.cursor-not-allowed]="isDisabled()"></div>
    </div>
    @if (showValue()) {
      <div class="flex justify-between mt-2 text-sm text-gray-600">
        <span>{{ min() }}</span>
        <span>{{ modelValue() }}</span>
        <span>{{ max() }}</span>
      </div>
    }
  `
})
export class SliderComponent implements ControlValueAccessor {
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  size = input<'sm' | 'md' | 'lg'>('md');
  showValue = input<boolean>(true);

  modelValue = signal(0);
  private _isDisabled = signal(false);
  changed = output<number>();

  get isDisabled() {
    return this._isDisabled;
  }

  @Input()
  set disabled(value: boolean) {
    this._isDisabled.set(value);
  }

  private _onChange: (value: number) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(value: number): void {
    this.modelValue.set(value ?? 0);
  }

  registerOnChange(fn: (value: number) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    this.modelValue.set(value);
    this._onChange(value);
    this.changed.emit(value);
  }

  onBlur(): void {
    this._onTouched();
  }

  percent(): number {
    const range = this.max() - this.min();
    return ((this.modelValue() - this.min()) / range) * 100;
  }

  cn = cn;
}
