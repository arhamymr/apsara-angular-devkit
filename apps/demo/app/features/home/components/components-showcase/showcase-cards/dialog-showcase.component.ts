import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent } from '@apsara/ui';

@Component({
  selector: 'app-dialog-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-foreground mb-1.5">Dialog</h3>
        <p class="text-sm text-dimmed">Modal dialogs for important actions</p>
      </div>
      <div class="flex-1 flex items-center justify-center min-h-[150px]">
        <div class="flex gap-3">
          <app-button label="Delete Account" variant="danger" size="sm" />
          <app-button label="Share" variant="secondary" size="sm" />
          <app-button label="Edit Profile" variant="primary" size="sm" />
        </div>
      </div>
    </app-card>
  `
})
export class DialogShowcaseComponent {}
