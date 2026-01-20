import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, SlideToggleComponent } from '@apsara/ui';

@Component({
  selector: 'app-switches-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent, SlideToggleComponent],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-foreground mb-1.5">Switches</h3>
        <p class="text-sm text-dimmed">Toggle switches for settings and preferences</p>
      </div>
        <div class="flex-1 flex flex-col gap-5">
          <div class="flex items-center justify-between py-3 border-b border-border">
            <div class="flex flex-col gap-0.5">
              <span class="text-sm font-medium text-foreground">Email notifications</span>
              <span class="text-xs text-dimmed">Receive email updates about your account</span>
            </div>
            <app-slide-toggle />
          </div>
          <div class="flex items-center justify-between py-3 border-b border-border">
            <div class="flex flex-col gap-0.5">
              <span class="text-sm font-medium text-foreground">Push notifications</span>
              <span class="text-xs text-dimmed">Receive push notifications on your device</span>
            </div>
            <app-slide-toggle [checked]="true" />
          </div>
          <div class="flex items-center justify-between py-3 border-b border-border">
            <div class="flex flex-col gap-0.5">
              <span class="text-sm font-medium text-foreground">Marketing emails</span>
              <span class="text-xs text-dimmed">Receive news about products and features</span>
            </div>
            <app-slide-toggle />
          </div>
          <div class="flex items-center justify-between py-3">
            <div class="flex flex-col gap-0.5">
              <span class="text-sm font-medium text-foreground">Dark mode</span>
              <span class="text-xs text-dimmed">Toggle dark mode appearance</span>
            </div>
            <app-slide-toggle />
          </div>
        </div>
    </app-card>
  `
})
export class SwitchesShowcaseComponent {}
