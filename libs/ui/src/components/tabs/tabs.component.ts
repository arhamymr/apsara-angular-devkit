import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

interface TabOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col">
      <div class="flex border-b border-[var(--border)]" role="tablist">
        @for (option of options(); track option.value) {
          <button
            type="button"
            role="tab"
            class="px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                   hover:text-[var(--foreground)] hover:border-[var(--border)]
                   text-[var(--dimmed)] border-transparent
                   data-[active]:text-[var(--primary)] data-[active]:border-[var(--primary)]
                   disabled:cursor-not-allowed disabled:opacity-50"
            [attr.data-active]="modelValue() === option.value || ''"
            [disabled]="option.disabled"
            (click)="onSelect(option.value)">
            {{ option.label }}
          </button>
        }
      </div>
      <div class="py-6" role="tabpanel">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
  readonly options = input.required<Array<TabOption>>();
  readonly modelValue = input<string>('');
  readonly ariaLabel = input<string>('Tab options');
  readonly changed = output<string>();

  onSelect(value: string): void {
    this.changed.emit(value);
  }

  cn = cn;
}
