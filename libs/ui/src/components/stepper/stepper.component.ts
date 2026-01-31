import { Component, input, output, signal, ChangeDetectionStrategy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkStepperModule, CdkStep } from '@angular/cdk/stepper';
import { ButtonComponent } from '../button';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-stepper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CdkStepperModule, ButtonComponent],
  template: `
    <div class="w-full">
      <div class="flex items-center justify-between mb-8">
        @for (step of steps(); track $index) {
          <div class="flex items-center">
              <div class="flex flex-col items-center">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                  [class.bg-primary]="getCurrentStep() >= $index"
                  [class.bg-muted]="getCurrentStep() < $index"
                  [class.text-primary-foreground]="getCurrentStep() >= $index"
                  [class.text-muted-foreground]="getCurrentStep() < $index">
                @if (getCurrentStep() > $index) {
                  <i class="material-icons text-sm">check</i>
                } @else {
                  {{ $index + 1 }}
                }
              </div>
              <span class="text-xs mt-1 text-muted-foreground">{{ step }}</span>
            </div>
            @if ($index < steps().length - 1) {
              <div
                class="w-12 h-0.5 mx-2"
                [class.bg-primary]="getCurrentStep() > $index"
                [class.bg-muted]="getCurrentStep() <= $index"></div>
            }
          </div>
        }
      </div>
      <div class="py-4">
        <ng-content />
      </div>
      <div class="flex justify-between mt-6">
        <app-button
          variant="secondary"
          [disabled]="getCurrentStep() === 0"
          (clicked)="onPrevious()">
          Previous
        </app-button>
        <app-button
          (clicked)="onNext()">
          {{ getCurrentStep() === steps().length - 1 ? 'Finish' : 'Next' }}
        </app-button>
      </div>
    </div>
  `
})
export class StepperComponent {
  steps = input<string[]>([]);
  private _currentStep = signal(0);
  stepChange = output<number>();

  getCurrentStep(): number {
    return this._currentStep();
  }

  currentStep = input<number>(0);

  constructor() {
    effect(() => {
      this._currentStep.set(this.currentStep());
    });
  }

  onNext(): void {
    if (this._currentStep() < this.steps().length - 1) {
      const newStep = this._currentStep() + 1;
      this._currentStep.set(newStep);
      this.stepChange.emit(newStep);
    }
  }

  onPrevious(): void {
    if (this._currentStep() > 0) {
      const newStep = this._currentStep() - 1;
      this._currentStep.set(newStep);
      this.stepChange.emit(newStep);
    }
  }

  cn = cn;
}
