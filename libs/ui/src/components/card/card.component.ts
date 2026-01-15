import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="cn(
        'bg-card text-card-foreground rounded-lg transition-shadow',
        'hover:shadow-lg',
        variant() === 'elevated' && 'shadow-md',
        variant() === 'outlined' && 'border border-card-border shadow-none',
        variant() === 'tonal' && 'bg-muted shadow-none',
        padding() === 'none' && 'p-0',
        padding() === 'small' && 'p-3',
        padding() === 'medium' && 'p-5',
        padding() === 'large' && 'p-8'
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
  readonly variant = input<'elevated' | 'outlined' | 'tonal'>('elevated');
  readonly padding = input<'none' | 'small' | 'medium' | 'large'>('medium');
  cn = cn;
}
