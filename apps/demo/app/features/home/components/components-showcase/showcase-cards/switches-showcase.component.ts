import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, SlideToggleComponent } from '@apsara/ui';

@Component({
  selector: 'app-switches-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent, SlideToggleComponent],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
        <div class="flex-1 flex flex-col gap-5">
          <div class="flex items-center justify-between py-3 border-b border-border">
            <div class="flex flex-col gap-0.5">
              <span class="text-sm font-medium text-foreground">Email notifications</span>
              <span class="text-xs text-muted-foreground">Receive email updates about your account</span>
            </div>
            <app-slide-toggle
              [checked]="emailNotifications()"
              (changed)="emailNotifications.set($event)" />
          </div>
          <div class="flex items-center justify-between py-3 border-b border-border">
            <div class="flex flex-col gap-0.5">
              <span class="text-sm font-medium text-foreground">Push notifications</span>
              <span class="text-xs text-muted-foreground">Receive push notifications on your device</span>
            </div>
            <app-slide-toggle
              [checked]="pushNotifications()"
              (changed)="pushNotifications.set($event)" />
          </div>
          <div class="flex items-center justify-between py-3 border-b border-border">
            <div class="flex flex-col gap-0.5">
              <span class="text-sm font-medium text-foreground">Marketing emails</span>
              <span class="text-xs text-muted-foreground">Receive news about products and features</span>
            </div>
            <app-slide-toggle
              [checked]="marketingEmails()"
              (changed)="marketingEmails.set($event)" />
          </div>
          <div class="flex items-center justify-between py-3">
            <div class="flex flex-col gap-0.5">
              <span class="text-sm font-medium text-foreground">Dark mode</span>
              <span class="text-xs text-muted-foreground">Toggle dark mode appearance</span>
            </div>
            <app-slide-toggle
              [checked]="darkMode()"
              (changed)="darkMode.set($event)" />
          </div>
        </div>
    </app-card>
  `
})
export class SwitchesShowcaseComponent {
  emailNotifications = signal(false);
  pushNotifications = signal(true);
  marketingEmails = signal(false);
  darkMode = signal(false);
}
