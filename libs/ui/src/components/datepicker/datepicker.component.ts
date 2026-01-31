import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';
import { LucideAngularModule, Calendar, ChevronLeft, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="relative">
      <div class="relative">
        <input
          type="text"
          [placeholder]="placeholder()"
          [value]="formattedDate()"
          (click)="onToggle()"
          (input)="onManualInput($event)"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                 disabled:opacity-50 disabled:cursor-not-allowed"
          [disabled]="disabled()" />
        <button
          type="button"
          class="absolute right-2 top-1/2 -translate-y-1/2 p-1"
          (click)="onToggle()"
          [disabled]="disabled()">
          <lucide-angular [img]="Calendar" [size]="18" class="text-gray-400" />
        </button>
      </div>
      @if (isOpen()) {
        <div class="absolute z-50 mt-1 p-4 bg-white rounded-lg shadow-lg border border-gray-200 w-[280px]">
          <div class="flex items-center justify-between mb-4">
            <button
              class="p-1 rounded hover:bg-gray-100"
              (click)="onPreviousMonth()">
              <lucide-angular [img]="ChevronLeft" [size]="18" />
            </button>
            <span class="font-medium text-gray-900">
              {{ currentMonth() }}
            </span>
            <button
              class="p-1 rounded hover:bg-gray-100"
              (click)="onNextMonth()">
              <lucide-angular [img]="ChevronRight" [size]="18" />
            </button>
          </div>
          <div class="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
            @for (day of weekDays; track day) {
              <span>{{ day }}</span>
            }
          </div>
          <div class="grid grid-cols-7 gap-1">
            @for (day of calendarDays(); track $index) {
              <button
                class="w-8 h-8 text-sm rounded-lg
                       hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                       disabled:opacity-50 disabled:cursor-not-allowed"
                [class.bg-primary]="isSelectedDate(day)"
                [class.text-white]="isSelectedDate(day)"
                [class.text-gray-300]="!day"
                [class.cursor-default]="!day"
                [disabled]="!day || isDisabledDate(day)"
                (click)="onSelectDate(day)">
                {{ day ? day.getDate() : '' }}
              </button>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class DatepickerComponent {
  Calendar = Calendar;
  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;
  placeholder = input<string>('Select date');
  disabled = input<boolean>(false);
  minDate = input<Date | null>(null);
  maxDate = input<Date | null>(null);
  modelValue = signal<Date | null>(null);
  isOpen = signal(false);
  currentMonth = signal('');
  changed = output<Date | null>();
  opened = output<void>();
  closed = output<void>();

  private currentDate = new Date();

  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  constructor() {
    this.updateCurrentMonth();
  }

  updateCurrentMonth(): void {
    const month = this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    this.currentMonth.set(month);
  }

  calendarDays(): (Date | null)[] {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }

  formattedDate(): string {
    const date = this.modelValue();
    if (!date) return '';
    return date.toLocaleDateString();
  }

  isSelectedDate(day: Date | null): boolean {
    if (!day || !this.modelValue()) return false;
    return day.toDateString() === this.modelValue()?.toDateString();
  }

  isDisabledDate(day: Date): boolean {
    const min = this.minDate();
    const max = this.maxDate();
    if (min && day < min) return true;
    if (max && day > max) return true;
    return false;
  }

  onToggle(): void {
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }

  onPreviousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCurrentMonth();
  }

  onNextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCurrentMonth();
  }

  onSelectDate(day: Date | null): void {
    if (day && !this.isDisabledDate(day)) {
      this.modelValue.set(day);
      this.changed.emit(day);
      this.isOpen.set(false);
      this.closed.emit();
    }
  }

  onManualInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const date = new Date(target.value);
    if (!isNaN(date.getTime())) {
      this.modelValue.set(date);
      this.changed.emit(date);
    }
  }

  cn = cn;
}
