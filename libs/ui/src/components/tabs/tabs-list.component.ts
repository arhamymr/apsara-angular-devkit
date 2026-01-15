import { Component, input, output, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';

@Component({
  selector: 'app-tabs-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex border-b border-separator gap-1" role="tablist">
      <ng-content></ng-content>
    </div>
  `
})
export class TabsListComponent {
  readonly value = input.required<string>();

  private tabs = inject(TabsComponent, { optional: true });
}
