import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <div class="relative">
        @if (leadingIcon()) {
          <i class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-sm text-dimmed">{{ leadingIcon() }}</i>
        }
        <input
          type="text"
          [placeholder]="placeholder()"
          [value]="query()"
          (input)="onInput($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (keydown)="onKeydown($event)"
          class="w-full px-3 py-2 rounded-lg border bg-card text-foreground border-border"
          [class.pl-10]="leadingIcon()"
          [disabled]="disabled()" />
        @if (loading()) {
          <i class="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-sm animate-spin text-dimmed">sync</i>
        }
      </div>
      @if (isOpen() && filteredOptions.length > 0) {
        <div
          class="absolute z-50 w-full mt-1 py-1 rounded-lg shadow-lg border overflow-auto bg-card border-border max-h-[240px]">
          @for (option of filteredOptions; track option.value) {
            <button
              type="button"
              class="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground"
              [class.bg-accent]="isOptionSelected(option)"
              [disabled]="option.disabled"
              (click)="onSelect(option)"
              (mouseenter)="onOptionHover(option)">
              @if (option.icon) {
                <i class="material-icons text-sm">{{ option.icon }}</i>
              }
              <span>{{ option.label }}</span>
            </button>
          }
        </div>
      }
    </div>
  `
})
export class AutocompleteComponent {
  options = input<Array<{ value: string; label: string; icon?: string; disabled?: boolean }>>([]);
  placeholder = input<string>('Search...');
  disabled = input<boolean>(false);
  leadingIcon = input<string>('');
  loading = input<boolean>(false);
  minChars = input<number>(1);
  query = signal('');
  isOpen = signal(false);
  selectedIndex = signal(-1);
  hoveredOption = signal<{ value: string; label: string; icon?: string; disabled?: boolean } | null>(null);
  optionSelected = output<{ value: string; label: string; icon?: string; disabled?: boolean }>();

  get filteredOptions(): Array<{ value: string; label: string; icon?: string; disabled?: boolean }> {
    const q = this.query().toLowerCase();
    if (q.length < this.minChars()) {
      return [];
    }
    return this.options().filter(o => o.label.toLowerCase().includes(q));
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.query.set(target.value);
    this.selectedIndex.set(-1);
    if (this.query().length >= this.minChars()) {
      this.isOpen.set(true);
    } else {
      this.isOpen.set(false);
    }
  }

  onFocus(): void {
    if (this.query().length >= this.minChars()) {
      this.isOpen.set(true);
    }
  }

  onBlur(): void {
    setTimeout(() => this.isOpen.set(false), 200);
  }

  onKeydown(event: KeyboardEvent): void {
    const options = this.filteredOptions;
    const total = options.length;
    let newIndex = this.selectedIndex();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        newIndex = Math.min(newIndex + 1, total - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        newIndex = Math.max(newIndex - 1, 0);
        break;
      case 'Enter':
        event.preventDefault();
        if (newIndex >= 0 && newIndex < total) {
          this.onSelect(options[newIndex]);
        }
        break;
      case 'Escape':
        this.isOpen.set(false);
        break;
    }

    if (newIndex !== this.selectedIndex()) {
      this.selectedIndex.set(newIndex);
      if (newIndex >= 0) {
        this.hoveredOption.set(options[newIndex]);
      }
    }
  }

  onOptionHover(option: { value: string; label: string; icon?: string; disabled?: boolean }): void {
    this.hoveredOption.set(option);
  }

  isOptionSelected(option: { value: string; label: string; icon?: string; disabled?: boolean }): boolean {
    return this.hoveredOption()?.value === option.value;
  }

  onSelect(option: { value: string; label: string; icon?: string; disabled?: boolean }): void {
    if (!option.disabled) {
      this.query.set(option.label);
      this.isOpen.set(false);
      this.optionSelected.emit(option);
    }
  }

  cn = cn;
}
