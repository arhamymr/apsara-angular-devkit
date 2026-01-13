import { Component, input, output } from '@angular/core';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'soft';
export type ButtonColor = 'primary' | 'accent' | 'warn' | 'success' | 'neutral';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [attr.variant]="variant()"
      [attr.size]="size()"
      [attr.color]="color()"
      [disabled]="disabled() || loading()"
      [class.loading]="loading()"
      [class.full-width]="fullWidth()"
      class="custom-button"
      (click)="onClick($event)">

      @if (loading()) {
        <span class="spinner-wrapper">
          <svg class="spinner" viewBox="0 0 24 24">
            <circle class="path" cx="12" cy="12" r="10" fill="none" stroke-width="3"/>
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
      --btn-primary: #1976d2;
      --btn-primary-hover: #1565c0;
      --btn-primary-active: #0d47a1;
      --btn-accent: #ff4081;
      --btn-accent-hover: #f50057;
      --btn-accent-active: #c51162;
      --btn-warn: #f44336;
      --btn-warn-hover: #e53935;
      --btn-warn-active: #d32f2f;
      --btn-success: #4caf50;
      --btn-success-hover: #43a047;
      --btn-success-active: #388e3c;
      --btn-neutral: #616161;
      --btn-neutral-hover: #424242;
      --btn-neutral-active: #212121;
    }

    .custom-button {
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
      text-decoration: none;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
        pointer-events: none;
      }

      &:disabled, &.loading {
        cursor: not-allowed;
        opacity: 0.6;
      }

      &:focus-visible {
        outline: 2px solid var(--btn-primary);
        outline-offset: 2px;
      }
    }

    [size="small"] {
      height: 32px;
      padding: 0 12px;
      font-size: 13px;
    }

    [size="medium"] {
      height: 40px;
      padding: 0 16px;
      font-size: 14px;
    }

    [size="large"] {
      height: 48px;
      padding: 0 24px;
      font-size: 16px;
    }

    [variant="filled"] {
      &[color="primary"] {
        background: var(--btn-primary);
        color: white;
        &:hover:not(:disabled) { background: var(--btn-primary-hover); }
        &:active:not(:disabled) { background: var(--btn-primary-active); }
      }
      &[color="accent"] {
        background: var(--btn-accent);
        color: white;
        &:hover:not(:disabled) { background: var(--btn-accent-hover); }
        &:active:not(:disabled) { background: var(--btn-accent-active); }
      }
      &[color="warn"] {
        background: var(--btn-warn);
        color: white;
        &:hover:not(:disabled) { background: var(--btn-warn-hover); }
        &:active:not(:disabled) { background: var(--btn-warn-active); }
      }
      &[color="success"] {
        background: var(--btn-success);
        color: white;
        &:hover:not(:disabled) { background: var(--btn-success-hover); }
        &:active:not(:disabled) { background: var(--btn-success-active); }
      }
      &[color="neutral"] {
        background: var(--btn-neutral);
        color: white;
        &:hover:not(:disabled) { background: var(--btn-neutral-hover); }
        &:active:not(:disabled) { background: var(--btn-neutral-active); }
      }
    }

    [variant="outlined"] {
      background: transparent;
      border: 1.5px solid currentColor;

      &[color="primary"] {
        color: var(--btn-primary);
        &:hover:not(:disabled) { background: rgba(25, 118, 210, 0.08); }
        &:active:not(:disabled) { background: rgba(25, 118, 210, 0.16); }
      }
      &[color="accent"] {
        color: var(--btn-accent);
        &:hover:not(:disabled) { background: rgba(255, 64, 129, 0.08); }
        &:active:not(:disabled) { background: rgba(255, 64, 129, 0.16); }
      }
      &[color="warn"] {
        color: var(--btn-warn);
        &:hover:not(:disabled) { background: rgba(244, 67, 54, 0.08); }
        &:active:not(:disabled) { background: rgba(244, 67, 54, 0.16); }
      }
      &[color="success"] {
        color: var(--btn-success);
        &:hover:not(:disabled) { background: rgba(76, 175, 80, 0.08); }
        &:active:not(:disabled) { background: rgba(76, 175, 80, 0.16); }
      }
      &[color="neutral"] {
        color: var(--btn-neutral);
        &:hover:not(:disabled) { background: rgba(97, 97, 97, 0.08); }
        &:active:not(:disabled) { background: rgba(97, 97, 97, 0.16); }
      }
    }

    [variant="text"] {
      background: transparent;
      color: var(--btn-primary);
      &:hover:not(:disabled) { background: rgba(25, 118, 210, 0.08); }
      &:active:not(:disabled) { background: rgba(25, 118, 210, 0.16); }

      &[color="accent"] { color: var(--btn-accent); &:hover:not(:disabled) { background: rgba(255, 64, 129, 0.08); } }
      &[color="warn"] { color: var(--btn-warn); &:hover:not(:disabled) { background: rgba(244, 67, 54, 0.08); } }
      &[color="success"] { color: var(--btn-success); &:hover:not(:disabled) { background: rgba(76, 175, 80, 0.08); } }
      &[color="neutral"] { color: var(--btn-neutral); &:hover:not(:disabled) { background: rgba(97, 97, 97, 0.08); } }
    }

    [variant="soft"] {
      background: rgba(25, 118, 210, 0.1);
      color: var(--btn-primary);
      &:hover:not(:disabled) { background: rgba(25, 118, 210, 0.16); }
      &:active:not(:disabled) { background: rgba(25, 118, 210, 0.24); }

      &[color="accent"] {
        background: rgba(255, 64, 129, 0.1);
        color: var(--btn-accent);
        &:hover:not(:disabled) { background: rgba(255, 64, 129, 0.16); }
      }
      &[color="warn"] {
        background: rgba(244, 67, 54, 0.1);
        color: var(--btn-warn);
        &:hover:not(:disabled) { background: rgba(244, 67, 54, 0.16); }
      }
      &[color="success"] {
        background: rgba(76, 175, 80, 0.1);
        color: var(--btn-success);
        &:hover:not(:disabled) { background: rgba(76, 175, 80, 0.16); }
      }
      &[color="neutral"] {
        background: rgba(97, 97, 97, 0.1);
        color: var(--btn-neutral);
        &:hover:not(:disabled) { background: rgba(97, 97, 97, 0.16); }
      }
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
      width: 20px;
      height: 20px;
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
