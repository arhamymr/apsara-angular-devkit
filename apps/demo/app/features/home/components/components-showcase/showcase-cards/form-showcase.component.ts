import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, CardComponent, InputComponent, CheckboxComponent, SelectComponent } from '@apsara/ui';

@Component({
  selector: 'app-form-showcase',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, InputComponent, CheckboxComponent, SelectComponent],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-foreground mb-1.5">Payment Form</h3>
        <p class="text-sm text-muted-foreground">Form components with labels, descriptions, and validation</p>
      </div>
        <div class="flex-1 flex flex-col gap-4">
          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-foreground">First Name</label>
              <app-input placeholder="John" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-foreground">Last Name</label>
              <app-input placeholder="Doe" />
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-foreground">Email</label>
            <app-input type="email" placeholder="john@example.com" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-foreground">Plan</label>
            <app-select 
              [options]="planOptions" 
              placeholder="Select a plan" />
          </div>
          <div class="flex items-center">
            <app-checkbox label="Remember me" />
          </div>
          <div class="mt-2">
            <app-button variant="default">Continue</app-button>
          </div>
        </div>
    </app-card>
  `
})
export class FormShowcaseComponent {
  planOptions = [
    { value: 'free', label: 'Free', icon: 'star' },
    { value: 'pro', label: 'Pro', icon: 'workspace_premium' },
    { value: 'enterprise', label: 'Enterprise', icon: 'business' }
  ];
}
