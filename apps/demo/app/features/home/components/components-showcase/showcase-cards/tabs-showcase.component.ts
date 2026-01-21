import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, TabsComponent, BadgeComponent } from '@apsara/ui';

@Component({
  selector: 'app-tabs-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent, TabsComponent, BadgeComponent],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
      <div class="flex-1 flex flex-col min-h-[150px]">
        <app-tabs
          [options]="tabs"
          [modelValue]="selectedTab()"
          (changed)="selectedTab.set($event)" />
        <div class="py-6" role="tabpanel">
          @switch (selectedTab()) {
            @case ('account') {
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-foreground">Account Settings</h4>
                    <p class="text-xs text-muted-foreground">Manage your personal information</p>
                  </div>
                </div>
                <p class="text-sm text-muted-foreground">
                  Update your profile details, including your name, email address, and profile picture.
                  You can also manage your connected accounts and export your data at any time.
                </p>
                <div class="flex items-center gap-2 pt-2">
                  <app-badge variant="secondary">Profile</app-badge>
                  <app-badge variant="secondary">Email</app-badge>
                  <app-badge variant="secondary">Connected Accounts</app-badge>
                </div>
              </div>
            }
            @case ('security') {
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-foreground">Security & Privacy</h4>
                    <p class="text-xs text-muted-foreground">Protect your account and data</p>
                  </div>
                </div>
                <p class="text-sm text-muted-foreground">
                  Keep your account secure with two-factor authentication, password changes, and
                  active session management. Review your recent login activity for any suspicious behavior.
                </p>
                <div class="flex items-center gap-2 pt-2">
                  <app-badge variant="success">2FA Enabled</app-badge>
                  <app-badge variant="secondary">Password</app-badge>
                  <app-badge variant="secondary">Sessions</app-badge>
                </div>
              </div>
            }
            @case ('notifications') {
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-foreground">Notifications</h4>
                    <p class="text-xs text-muted-foreground">Control how you receive updates</p>
                  </div>
                </div>
                <p class="text-sm text-muted-foreground">
                  Choose your notification preferences for email, push, and in-app alerts.
                  Customize which events trigger notifications and manage your notification frequency.
                </p>
                <div class="flex items-center gap-2 pt-2">
                  <app-badge variant="secondary">Email</app-badge>
                  <app-badge variant="secondary">Push</app-badge>
                  <app-badge variant="secondary">In-App</app-badge>
                </div>
              </div>
            }
            @case ('appearance') {
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-foreground">Appearance</h4>
                    <p class="text-xs text-muted-foreground">Customize the look and feel</p>
                  </div>
                </div>
                <p class="text-sm text-muted-foreground">
                  Personalize your experience by choosing themes, font sizes, and layout preferences.
                  Toggle between light and dark mode, or let the system settings decide automatically.
                </p>
                <div class="flex items-center gap-2 pt-2">
                  <app-badge variant="secondary">Light</app-badge>
                  <app-badge variant="secondary">Dark</app-badge>
                  <app-badge variant="secondary">System</app-badge>
                </div>
              </div>
            }
          }
        </div>
      </div>
    </app-card>
  `
})
export class TabsShowcaseComponent {
  selectedTab = signal<string>('account');

  tabs = [
    { value: 'account', label: 'Account' },
    { value: 'security', label: 'Security' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'appearance', label: 'Appearance' }
  ];
}
