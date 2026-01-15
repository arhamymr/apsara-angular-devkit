import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-tabs-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      role="tabpanel"
      [attr.id]="panelId"
      [attr.aria-labelledby]="itemId"
      [hidden]="!isActive()"
      [class]="cn('py-6', !isActive() && 'hidden')">
      <ng-content></ng-content>
    </div>
  `
})
export class TabsPanelComponent {
  readonly value = input.required<string>();
  cn = cn;

  private tabs = inject(TabsComponent, { optional: true });

  get panelId(): string {
    return `panel-${this.value()}`;
  }

  get itemId(): string {
    return `tab-${this.value()}`;
  }

  isActive(): boolean {
    return this.tabs?.value === this.value();
  }
}
