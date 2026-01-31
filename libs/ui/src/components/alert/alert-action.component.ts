import { Component, ChangeDetectionStrategy } from '@angular/core';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-alert-action',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'cn("mt-4 flex flex-wrap gap-2")'
  },
  template: `
    <ng-content />
  `
})
export class AlertActionComponent {
  cn = cn;
}
