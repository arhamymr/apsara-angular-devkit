import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { cn } from '../../lib/cn';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-chips',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CdkMenuModule, LucideAngularModule],
  template: `
    <div class="flex flex-wrap gap-2">
      @for (chip of modelValue(); track chip.value) {
        <div
          class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full
                 text-sm text-secondary-foreground"
          [class.opacity-50]="chip.disabled">
          <span>{{ chip.label }}</span>
          @if (!chip.disabled) {
            <button
              class="p-0.5 rounded-full hover:bg-secondary-foreground/10"
              (click)="onRemove(chip)"
              aria-label="Remove {{ chip.label }}">
              <lucide-angular [img]="X" [size]="14" />
            </button>
          }
        </div>
      }
      @if (addable()) {
        <input
          type="text"
          [placeholder]="placeholder()"
          class="px-3 py-1.5 bg-secondary rounded-full text-sm text-secondary-foreground
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          (keydown.enter)="onAdd($event)"
          (keydown.comma)="onAdd($event)" />
      }
    </div>
  `
})
export class ChipsComponent {
  X = X;
  private _modelValue = signal<Array<{ value: string; label: string; disabled?: boolean }>>([]);
  
  modelValue = input<Array<{ value: string; label: string; disabled?: boolean }>>([]);
  placeholder = input<string>('Add a chip');
  addable = input<boolean>(false);
  changed = output<Array<{ value: string; label: string; disabled?: boolean }>>();

  onRemove(chip: { value: string; label: string; disabled?: boolean }): void {
    const updated = this.modelValue().filter(c => c.value !== chip.value);
    this.changed.emit(updated);
  }

  onAdd(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim();
    if (value && !this.modelValue().find(c => c.value === value)) {
      const updated = [...this.modelValue(), { value, label: value }];
      this.changed.emit(updated);
      target.value = '';
    }
  }

  cn = cn;
}
