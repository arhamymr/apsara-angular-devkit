import { Component, input, output, signal, computed, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cn } from '../../lib/cn';
import { LucideAngularModule, ChevronDown, Check, Menu, Search, X } from 'lucide-angular';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
  icon?: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="relative">
      <button
        type="button"
        class="w-full flex items-center justify-between px-3 py-2 rounded-lg border bg-card text-foreground border-border"
        [disabled]="isDisabled()"
        (click)="onToggle()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-labelledby]="ariaLabelledBy()">
        @if (placeholder() && !selectedLabel()) {
          <span class="text-muted-foreground">{{ placeholder() }}</span>
        }
        @if (selectedLabel()) {
          <span>{{ selectedLabel() }}</span>
        }
        <lucide-angular [img]="ChevronDown" [size]="18" class="transition-transform" [class.rotate-180]="isOpen()" />
      </button>
      @if (isOpen()) {
        <div
          class="absolute z-50 w-full mt-1 py-1 rounded-lg shadow-lg border overflow-auto bg-card border-border max-h-[240px]"
          role="listbox"
          [attr.aria-label]="ariaLabel()">
          @for (option of filteredOptions; track option.value) {
            <button
              type="button"
              class="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground"
              [class.bg-[var(--primary)]]="modelValue() === option.value"
              [class.text-[var(--primary-foreground)]]="modelValue() === option.value"
              [disabled]="option.disabled"
              role="option"
              [attr.aria-selected]="modelValue() === option.value"
              (click)="onSelect(option)">
              @if (option.icon) {
                <lucide-angular [img]="getIcon(option.icon)" [size]="18" />
              }
              <span>{{ option.label }}</span>
              @if (modelValue() === option.value) {
                <lucide-angular [img]="Check" [size]="18" class="ml-auto" />
              }
            </button>
          }
          @if (filteredOptions.length === 0) {
            <div class="px-3 py-2 text-sm text-muted-foreground">{{ noResultsText() }}</div>
          }
        </div>
      }
    </div>
  `
})
export class SelectComponent implements ControlValueAccessor {
  ChevronDown = ChevronDown;
  Check = Check;
  options = input<SelectOption[]>([]);
  placeholder = input<string>('Select an option');
  ariaLabel = input<string>('');
  ariaLabelledBy = input<string>('');
  noResultsText = input<string>('No results found');
  searchEnabled = input<boolean>(false);
  disabled = input<boolean>(false);
  modelValue = signal('');
  isOpen = signal(false);
  searchQuery = signal('');
  internalDisabled = signal(false);
  changed = output<string>();
  opened = output<void>();
  closed = output<void>();

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get filteredOptions(): SelectOption[] {
    let opts = this.options();
    if (this.searchEnabled() && this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      opts = opts.filter(o => o.label.toLowerCase().includes(query));
    }
    return opts;
  }

  selectedLabel(): string {
    const option = this.options().find(o => o.value === this.modelValue());
    return option?.label || '';
  }

  writeValue(value: string): void {
    this.modelValue.set(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }

  isDisabled(): boolean {
    return this.internalDisabled();
  }

  onToggle(): void {
    if (!this.disabled()) {
      this.isOpen.update(v => !v);
      if (this.isOpen()) {
        this.opened.emit();
      } else {
        this.closed.emit();
        this.onTouched();
      }
    }
  }

  onSelect(option: SelectOption): void {
    if (!option.disabled) {
      this.modelValue.set(option.value);
      this.onChange(option.value);
      this.changed.emit(option.value);
      this.isOpen.set(false);
      this.closed.emit();
      this.onTouched();
    }
  }

  cn = cn;

  getIcon(name: string) {
    const iconMap: Record<string, any> = {
      'chevron-down': ChevronDown,
      'chevron_down': ChevronDown,
      'expand_more': ChevronDown,
      'check': Check,
      'menu': Menu,
      'search': Search,
      'arrow_drop_down': ChevronDown,
      'close': X,
    };
    return iconMap[name] || ChevronDown;
  }
}
