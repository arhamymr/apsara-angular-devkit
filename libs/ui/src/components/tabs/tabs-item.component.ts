import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatTabLink } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs-item',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatTabLink, RouterModule],
  template: `
    <a mat-tab-link
      class="px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer focus:outline-none
             hover:text-primary disabled:cursor-not-allowed disabled:opacity-50
             border-transparent text-dimmed
             [&.mat-mdc-tab-active]:text-primary [&.mat-mdc-tab-active]:border-primary">
      <ng-content></ng-content>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsItemComponent {
  readonly value = input.required<string>();
  readonly disabled = input<boolean>(false);
}
