import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, RadioComponent } from '@apsara/ui';

@Component({
  selector: 'app-radio-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent, RadioComponent],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-foreground mb-1.5">Radio Group</h3>
        <p class="text-sm text-dimmed">Radio button groups for single selection</p>
      </div>
      <div class="flex-1 flex flex-col gap-4">
        <app-radio 
          [options]="radioOptions" 
          name="plan" 
          (onChange)="onRadioChange($event)" />
      </div>
    </app-card>
  `
})
export class RadioShowcaseComponent {
  radioOptions = [
    { value: 'free', label: 'Free - Perfect for personal projects' },
    { value: 'pro', label: 'Pro - For professional developers' },
    { value: 'team', label: 'Team - For small teams and startups' }
  ];

  onRadioChange(value: string): void {
    console.log('Selected plan:', value);
  }
}
