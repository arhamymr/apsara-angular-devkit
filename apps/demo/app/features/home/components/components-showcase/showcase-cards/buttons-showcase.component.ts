import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent } from '@apsara/ui';

@Component({
  selector: 'app-buttons-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-foreground mb-1.5">Button Variants</h3>
        <p class="text-sm text-dimmed">Multiple variants, sizes, and states</p>
      </div>
      <div class="flex-1 flex flex-col gap-5">
        <div class="flex flex-wrap gap-2">
          <app-button label="Primary" variant="primary" />
          <app-button label="Secondary" variant="secondary" />
          <app-button label="Tertiary" variant="plain" />
          <app-button label="Danger" variant="danger" />
        </div>
        <div class="flex flex-wrap gap-2">
          <app-button label="Outline" variant="outline" />
          <app-button label="Ghost" variant="plain" />
        </div>
        <div class="flex flex-wrap gap-2 items-center">
          <app-button label="XS" size="xs" variant="primary" />
          <app-button label="SM" size="sm" variant="primary" />
          <app-button label="MD" size="md" variant="primary" />
          <app-button label="LG" size="lg" variant="primary" />
        </div>
        <div class="flex flex-wrap gap-2">
          <app-button label="Loading" variant="primary" [loading]="true" />
          <app-button label="Disabled" variant="primary" [disabled]="true" />
        </div>
      </div>
    </app-card>
  `
})
export class ButtonsShowcaseComponent {}
