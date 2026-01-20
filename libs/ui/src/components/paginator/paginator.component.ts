import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div
      class="flex items-center justify-between px-4 py-3 border-t"
      [class]="cn('gap-4', className())">
      <div class="flex items-center gap-2">
        <span class="text-sm text-dimmed">
          {{ startItem() }}-{{ endItem() }} of {{ totalItems() }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <app-button
          variant="outline"
          size="icon"
          [disabled]="isFirstPage()"
          (clicked)="onPrevious()"
          aria-label="Previous page">
          <span slot="">chevron_left</span>
        </app-button>
        <span class="text-sm text-dimmed">
          Page {{ currentPage() }} of {{ totalPages() }}
        </span>
        <app-button
          variant="outline"
          size="icon"
          [disabled]="isLastPage()"
          (clicked)="onNext()"
          aria-label="Next page">
          <span slot="">chevron_right</span>
        </app-button>
      </div>
    </div>
  `
})
export class PaginatorComponent {
  pageSize = input<number>(10);
  pageIndex = input<number>(0);
  length = input<number>(0);
  className = input<string>('');
  pageChange = output<{ pageIndex: number; pageSize: number }>();

  totalItems(): number {
    return this.length();
  }

  totalPages(): number {
    return Math.ceil(this.length() / this.pageSize()) || 1;
  }

  currentPage(): number {
    return this.pageIndex() + 1;
  }

  startItem(): number {
    return this.pageIndex() * this.pageSize() + 1;
  }

  endItem(): number {
    return Math.min((this.pageIndex() + 1) * this.pageSize(), this.length());
  }

  isFirstPage(): boolean {
    return this.pageIndex() === 0;
  }

  isLastPage(): boolean {
    return this.pageIndex() >= this.totalPages() - 1;
  }

  onPrevious(): void {
    if (!this.isFirstPage()) {
      const newIndex = this.pageIndex() - 1;
      this.pageChange.emit({ pageIndex: newIndex, pageSize: this.pageSize() });
    }
  }

  onNext(): void {
    if (!this.isLastPage()) {
      const newIndex = this.pageIndex() + 1;
      this.pageChange.emit({ pageIndex: newIndex, pageSize: this.pageSize() });
    }
  }

  cn = cn;
}
