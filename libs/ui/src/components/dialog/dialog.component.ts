import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ButtonComponent } from '../button';
import { cn } from '../../lib/cn';

export interface DialogOptions {
  width?: string;
  height?: string;
  maxWidth?: string;
  closeOnBackdropClick?: boolean;
}

export interface DialogResult {
  action: 'close' | 'confirm' | 'cancel';
  data?: unknown;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [DialogModule, CommonModule, ButtonComponent],
  template: `
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        [attr.aria-modal]="true"
        [attr.aria-labelledby]="titleId()">
        <div
          class="fixed inset-0 bg-black/50 transition-opacity"
          (click)="onBackdropClick()"
          aria-hidden="true"></div>
        <div
          class="relative bg-card rounded-lg shadow-xl max-h-[90vh] overflow-auto"
          [style.max-width]="width()"
          [style.width]="fullWidth() ? '100%' : width()">
          @if (title()) {
            <div class="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 id="dialog-title" class="text-lg font-semibold text-foreground">{{ title() }}</h2>
              <app-button
                variant="plain"
                size="icon"
                (clicked)="onClose()"
                aria-label="Close dialog">
                <span slot="">close</span>
              </app-button>
            </div>
          }
          <div class="px-6 py-4">
            <ng-content />
          </div>
          @if (showActions()) {
            <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
              <ng-content select="[dialog-actions]" />
            </div>
          }
        </div>
      </div>
    }
  `
})
export class DialogComponent {
  isOpen = input<boolean>(false);
  title = input<string>('');
  width = input<string>('500px');
  fullWidth = input<boolean>(false);
  showActions = input<boolean>(true);
  closeOnBackdropClick = input<boolean>(true);
  closed = output<DialogResult>();

  titleId = input<string>('dialog-title');

  onBackdropClick(): void {
    if (this.closeOnBackdropClick()) {
      this.onClose();
    }
  }

  onClose(): void {
    this.closed.emit({ action: 'close' });
  }

  onConfirm(): void {
    this.closed.emit({ action: 'confirm' });
  }

  onCancel(): void {
    this.closed.emit({ action: 'cancel' });
  }

  cn = cn;
}
