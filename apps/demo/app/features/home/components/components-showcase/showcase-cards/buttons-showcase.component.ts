import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@apsara/ui';

@Component({
  selector: 'app-buttons-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-foreground mb-1.5">Button</h3>
        <p class="text-sm text-muted-foreground">Interactive button component</p>
      </div>
    </app-card>
  `
})
export class ButtonsShowcaseComponent {}
