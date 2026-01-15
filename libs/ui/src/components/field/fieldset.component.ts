import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fieldset',
  standalone: true,
  imports: [CommonModule],
  template: `
    <fieldset class="fieldset">
      <ng-content></ng-content>
    </fieldset>
  `,
  styles: [`
    .fieldset {
      border: none;
      padding: 0;
      margin: 0;
      min-width: 0;
    }
  `]
})
export class FieldsetComponent {}
