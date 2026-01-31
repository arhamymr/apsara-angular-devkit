import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-field',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
