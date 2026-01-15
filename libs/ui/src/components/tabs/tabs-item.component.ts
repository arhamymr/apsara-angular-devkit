import { Component, input, output, inject, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-tabs-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      role="tab"
      [attr.aria-selected]="isActive()"
      [attr.aria-controls]="panelId"
      [attr.data-active]="isActive()"
      [class]="cn(
        'px-5 py-3 text-sm font-medium transition-colors',
        'mb-px border-b-2 border-transparent cursor-pointer',
        'hover:text-foreground focus-visible:outline-none focus-visible:bg-muted',
        isActive() ? 'text-primary border-primary' : 'text-dimmed'
      )"
      (click)="onClick()">
      <ng-content></ng-content>
    </button>
  `
})
export class TabsItemComponent {
  readonly value = input.required<string>();
  cn = cn;

  private tabs = inject(TabsComponent, { optional: true });

  @HostBinding('attr.id')
  get itemId(): string {
    return `tab-${this.value()}`;
  }

  get panelId(): string {
    return `panel-${this.value()}`;
  }

  isActive(): boolean {
    return this.tabs?.value === this.value();
  }

  onClick(): void {
    if (this.tabs) {
      this.tabs.setValue(this.value());
    }
  }
}
