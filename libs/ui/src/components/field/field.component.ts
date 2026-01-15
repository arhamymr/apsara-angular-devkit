import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="field">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .field {
      margin-bottom: 16px;
    }
  `]
})
export class FieldComponent {}
