import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent } from '@apsara/ui';

@Component({
  selector: 'app-menu-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-foreground mb-1.5">Dropdown Menu</h3>
        <p class="text-sm text-dimmed">Context menus and dropdowns</p>
      </div>
      <div class="flex-1 flex items-center justify-center min-h-[150px]">
        <div class="flex gap-2">
          <app-button label="File" variant="outline" size="sm" />
          <app-button label="Edit" variant="outline" size="sm" />
          <app-button label="View" variant="outline" size="sm" />
        </div>
      </div>
    </app-card>
  `
})
export class MenuShowcaseComponent {}
