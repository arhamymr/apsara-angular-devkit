import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CheckboxComponent } from '@apsara/ui';

@Component({
  selector: 'app-checkbox-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent, CheckboxComponent],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-foreground mb-1.5">Checkbox Cards</h3>
        <p class="text-sm text-dimmed">Checkbox inputs with card-style layout</p>
      </div>
        <div class="flex-1 flex flex-col gap-3">
          <div class="flex items-center gap-3 p-4 border border-border rounded-md">
            <app-checkbox label="Basic Plan - $9/mo" />
          </div>
          <div class="flex items-center gap-3 p-4 border border-border rounded-md">
            <app-checkbox label="Pro Plan - $19/mo" />
          </div>
          <div class="flex items-center gap-3 p-4 border border-border rounded-md">
            <app-checkbox label="Enterprise - $49/mo" />
          </div>
        </div>
    </app-card>
  `
})
export class CheckboxShowcaseComponent {}
