import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-tabs-list',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  template: `
    <nav mat-tab-nav-bar
      class="flex border-b border-border"
      [tabPanel]="tabPanel"
      [animationDuration]="animationDuration()">
      <ng-content></ng-content>
    </nav>
    <mat-tab-nav-panel #tabPanel id="tabs-panel" class="block"></mat-tab-nav-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsListComponent {
  readonly animationDuration = input<'300ms' | '150ms'>('300ms');
}
