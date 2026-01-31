import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fieldset-legend',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <legend class="fieldset-legend">
      <ng-content></ng-content>
    </legend>
  `,
  styles: [`
    .fieldset-legend {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      padding: 0;
      margin-bottom: 16px;
    }
  `]
})
export class FieldsetLegendComponent {}
