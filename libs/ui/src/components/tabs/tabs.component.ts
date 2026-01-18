import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  template: `
    <div class="flex flex-col">
      <ng-content select="app-tabs-list"></ng-content>
      <ng-content select="app-tabs-panel"></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
  readonly defaultValue = input<string>('');
  readonly animationDuration = input<'300ms' | '150ms'>('300ms');
}
