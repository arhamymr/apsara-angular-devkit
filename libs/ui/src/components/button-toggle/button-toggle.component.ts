import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-button-toggle',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      class="inline-flex items-center p-1 rounded-lg bg-muted"
      role="group"
      [attr.aria-label]="ariaLabel()">
      @for (option of options(); track option.value) {
        <button
          type="button"
          class="px-3 py-1.5 text-sm font-medium rounded-md transition-all inline-flex items-center justify-center
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                 disabled:opacity-50 disabled:cursor-not-allowed"
          [class.bg-card]="modelValue() === option.value"
          [class.text-foreground]="modelValue() === option.value"
          [class.text-muted-foreground]="modelValue() !== option.value"
          [class.shadow-sm]="modelValue() === option.value"
          [disabled]="option.disabled"
          (click)="onSelect(option.value)">
          @if (option.icon) {
            <lucide-angular [img]="option.icon" [size]="16" [class.mr-2]="!!option.label" />
          }
          {{ option.label }}
        </button>
      }
    </div>
  `
})
export class ButtonToggleComponent {
  options = input<Array<{ value: string; label: string; icon?: any; disabled?: boolean }>>([]);
  modelValue = input<string>('');
  ariaLabel = input<string>('Button toggle options');
  changed = output<string>();

  onSelect(value: string): void {
    this.changed.emit(value);
  }

  cn = cn;
}
