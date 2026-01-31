import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-timepicker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <input
        type="time"
        [value]="modelValue()"
        (input)="onInput($event)"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
               disabled:opacity-50 disabled:cursor-not-allowed"
        [disabled]="disabled()" />
    </div>
  `
})
export class TimepickerComponent {
  modelValue = input<string>('12:00');
  disabled = input<boolean>(false);
  changed = output<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.changed.emit(target.value);
  }

  cn = cn;
}
