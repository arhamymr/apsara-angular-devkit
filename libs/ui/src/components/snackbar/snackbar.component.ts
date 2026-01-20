import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    @if (isOpen()) {
      <div
        class="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border min-w-[300px] max-w-md bg-card border-border"
        role="alert"
        [attr.aria-live]="polite() ? 'polite' : 'assertive'">
        @if (icon()) {
          <i class="material-icons text-sm">{{ icon() }}</i>
        }
        <div class="flex-1">
          @if (title()) {
            <p class="text-sm font-medium text-foreground">{{ title() }}</p>
          }
          @if (message()) {
            <p class="text-sm text-dimmed">{{ message() }}</p>
          }
        </div>
        @if (showClose()) {
          <app-button
            variant="plain"
            size="icon"
            (clicked)="onClose()"
            aria-label="Dismiss">
            <span slot="">close</span>
          </app-button>
        }
        @if (action()) {
          <app-button
            variant="plain"
            size="sm"
            (clicked)="onAction()">
            {{ action() }}
          </app-button>
        }
      </div>
    }
  `
})
export class SnackbarComponent {
  isOpen = input<boolean>(false);
  message = input<string>('');
  title = input<string>('');
  icon = input<string>('');
  action = input<string>('');
  showClose = input<boolean>(true);
  polite = input<boolean>(true);
  duration = input<number>(5000);
  closed = output<void>();
  actionClicked = output<void>();

  private timeout?: ReturnType<typeof setTimeout>;

  ngOnChanges(): void {
    if (this.isOpen() && this.duration() > 0) {
      this.timeout = setTimeout(() => {
        this.onClose();
      }, this.duration());
    }
  }

  onClose(): void {
    this.closed.emit();
  }

  onAction(): void {
    this.actionClicked.emit();
  }

  cn = cn;
}
