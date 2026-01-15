import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-field-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="field-label">
      <ng-content></ng-content>
    </label>
  `,
  styles: [`
    .field-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 6px;
    }
  `]
})
export class FieldLabelComponent {}
