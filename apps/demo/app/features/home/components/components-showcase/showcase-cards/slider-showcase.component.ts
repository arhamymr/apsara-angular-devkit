import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, SliderComponent } from '@apsara/ui';

@Component({
  selector: 'app-slider-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent, SliderComponent],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-foreground mb-1.5">Slider</h3>
        <p class="text-sm text-dimmed">Range slider for selecting values</p>
      </div>
        <div class="flex-1 flex flex-col gap-7">
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-primary">{{ sliderValue1() }}</span>
              <span class="text-sm text-foreground">Volume</span>
            </div>
            <app-slider [min]="0" [max]="100" [modelValue]="sliderValue1()" (changed)="sliderValue1.set($event)" />
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-primary">{{ sliderValue2() }}%</span>
              <span class="text-sm text-foreground">Brightness</span>
            </div>
            <app-slider [min]="0" [max]="100" [modelValue]="sliderValue2()" (changed)="sliderValue2.set($event)" />
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-primary">{{ sliderValue3() }}%</span>
              <span class="text-sm text-foreground">Opacity</span>
            </div>
            <app-slider [min]="0" [max]="100" [modelValue]="sliderValue3()" (changed)="sliderValue3.set($event)" />
          </div>
        </div>
    </app-card>
  `
})
export class SliderShowcaseComponent {
  sliderValue1 = signal(50);
  sliderValue2 = signal(75);
  sliderValue3 = signal(30);
}
