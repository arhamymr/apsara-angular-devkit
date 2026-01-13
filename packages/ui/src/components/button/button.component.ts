import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'soft';
export type ButtonColor = 'primary' | 'accent' | 'warn' | 'success' | 'neutral';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [attr.variant]="variant()"
      [attr.size]="size()"
      [attr.color]="color()"
      [disabled]="disabled() || loading()"
      [class.loading]="loading()"
      [class.full-width]="fullWidth()"
      class="btn"
      (click)="onClick($event)">

      @if (loading()) {
        <span class="spinner-wrapper">
          <svg class="spinner" viewBox="0 0 24 24">
            <circle class="path" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"/>
          </svg>
        </span>
      }

      @if (label()) {
        <span class="label">{{ label() }}</span>
      }
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: none;
      border-radius: 8px;
      font-family: 'Inter', system-ui, sans-serif;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .btn:disabled, .btn.loading {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .btn:focus-visible {
      outline: 2px solid var(--btn-primary);
      outline-offset: 2px;
    }

    /* Sizes */
    .btn[size="small"] {
      height: 32px;
      padding: 0 12px;
      font-size: 13px;
    }

    .btn[size="medium"] {
      height: 40px;
      padding: 0 16px;
      font-size: 14px;
    }

    .btn[size="large"] {
      height: 48px;
      padding: 0 24px;
      font-size: 16px;
    }

    /* Filled Variant */
    .btn[variant="filled"][color="primary"] {
      background: #1976d2;
      color: white;
    }
    .btn[variant="filled"][color="primary"]:hover:not(:disabled) { background: #1565c0; }

    .btn[variant="filled"][color="accent"] {
      background: #ff4081;
      color: white;
    }
    .btn[variant="filled"][color="accent"]:hover:not(:disabled) { background: #f50057; }

    .btn[variant="filled"][color="warn"] {
      background: #f44336;
      color: white;
    }
    .btn[variant="filled"][color="warn"]:hover:not(:disabled) { background: #e53935; }

    .btn[variant="filled"][color="success"] {
      background: #4caf50;
      color: white;
    }
    .btn[variant="filled"][color="success"]:hover:not(:disabled) { background: #43a047; }

    .btn[variant="filled"][color="neutral"] {
      background: #616161;
      color: white;
    }
    .btn[variant="filled"][color="neutral"]:hover:not(:disabled) { background: #424242; }

    /* Outlined Variant */
    .btn[variant="outlined"] {
      background: transparent;
      border: 1.5px solid currentColor;
    }
    .btn[variant="outlined"][color="primary"] {
      color: #1976d2;
      border-color: #1976d2;
    }
    .btn[variant="outlined"][color="accent"] {
      color: #ff4081;
      border-color: #ff4081;
    }
    .btn[variant="outlined"][color="warn"] {
      color: #f44336;
      border-color: #f44336;
    }
    .btn[variant="outlined"][color="success"] {
      color: #4caf50;
      border-color: #4caf50;
    }
    .btn[variant="outlined"][color="neutral"] {
      color: #616161;
      border-color: #616161;
    }

    /* Text Variant */
    .btn[variant="text"] {
      background: transparent;
    }
    .btn[variant="text"][color="primary"] { color: #1976d2; }
    .btn[variant="text"][color="accent"] { color: #ff4081; }
    .btn[variant="text"][color="warn"] { color: #f44336; }
    .btn[variant="text"][color="success"] { color: #4caf50; }
    .btn[variant="text"][color="neutral"] { color: #616161; }

    /* Soft Variant */
    .btn[variant="soft"][color="primary"] {
      background: rgba(25, 118, 210, 0.1);
      color: #1976d2;
    }
    .btn[variant="soft"][color="accent"] {
      background: rgba(255, 64, 129, 0.1);
      color: #ff4081;
    }
    .btn[variant="soft"][color="warn"] {
      background: rgba(244, 67, 54, 0.1);
      color: #f44336;
    }
    .btn[variant="soft"][color="success"] {
      background: rgba(76, 175, 80, 0.1);
      color: #4caf50;
    }
    .btn[variant="soft"][color="neutral"] {
      background: rgba(97, 97, 97, 0.1);
      color: #616161;
    }

    .full-width {
      width: 100%;
    }

    .spinner-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .spinner {
      width: 18px;
      height: 18px;
      animation: rotate 2s linear infinite;
    }

    .path {
      stroke: currentColor;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }

    .label {
      font-weight: 500;
    }

    @keyframes rotate {
      100% { transform: rotate(360deg); }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  `]
})
export class ButtonComponent {
  readonly label = input<string>('');
  readonly variant = input<ButtonVariant>('filled');
  readonly color = input<ButtonColor>('primary');
  readonly size = input<ButtonSize>('medium');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
  readonly clicked = output<Event>();

  onClick(event: Event): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
}
