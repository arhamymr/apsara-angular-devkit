import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-6" [class.hidden]="!isActive()">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsPanelComponent {
  readonly value = input.required<string>();

  isActive(): boolean {
    return false;
  }
}
