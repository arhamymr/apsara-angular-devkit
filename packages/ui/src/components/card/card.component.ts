import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [attr.variant]="variant()" [attr.padding]="padding()">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.2s;
    }

    .card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* Variants */
    .card[variant="elevated"] {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .card[variant="outlined"] {
      border: 1px solid #e5e7eb;
      box-shadow: none;
    }

    .card[variant="tonal"] {
      background: #f3f4f6;
      box-shadow: none;
    }

    /* Padding */
    .card[padding="none"] {
      padding: 0;
    }

    .card[padding="small"] {
      padding: 12px;
    }

    .card[padding="medium"] {
      padding: 20px;
    }

    .card[padding="large"] {
      padding: 32px;
    }
  `]
})
export class CardComponent {
  readonly variant = input<'elevated' | 'outlined' | 'tonal'>('elevated');
  readonly padding = input<'none' | 'small' | 'medium' | 'large'>('medium');
}
