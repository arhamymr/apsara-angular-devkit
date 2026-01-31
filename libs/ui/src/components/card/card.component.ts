import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div
      [class]="cn(
        'bg-card border rounded-2xl transition-shadow',
        padding() === 'none' && 'p-0',
        padding() === 'small' && 'p-3',
        padding() === 'medium' && 'p-5',
        padding() === 'large' && 'p-8',
        align() === 'start' && 'text-start',
        align() === 'center' && 'text-center',
        align() === 'end' && 'text-end'
      )">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardComponent {
  readonly padding = input<'none' | 'small' | 'medium' | 'large'>('medium');
  readonly align = input<'start' | 'center' | 'end'>('start');
  cn = cn;
}
