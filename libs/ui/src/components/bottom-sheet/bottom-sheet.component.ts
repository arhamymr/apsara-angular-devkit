import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes slideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

    @keyframes slideDown {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(100%);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    .backdrop-enter {
      animation: fadeIn 200ms ease-out forwards;
    }

    .backdrop-exit {
      animation: fadeOut 200ms ease-out forwards;
    }

    .sheet-enter {
      animation: slideUp 300ms cubic-bezier(0.32, 0.72, 0, 1) forwards;
    }

    .sheet-exit {
      animation: slideDown 300ms cubic-bezier(0.32, 0.72, 0, 1) forwards;
    }
  `],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex items-end justify-center">
        <div
          [class.backdrop-enter]="!isClosing()"
          [class.backdrop-exit]="isClosing()"
          class="fixed inset-0 bg-black/50"
          (click)="onBackdropClick()"
          aria-hidden="true"></div>
        <div
          [class.sheet-enter]="!isClosing()"
          [class.sheet-exit]="isClosing()"
          class="relative w-full bg-background shadow-xl"
          [class]="heightClass()"
          (animationend)="onAnimationEnd()">
          @if (hasHandle()) {
            <div class="flex justify-center pt-3 pb-1">
              <div class="w-12 h-1 bg-muted rounded-full"></div>
            </div>
          }
          @if (title()) {
            <div class="px-4 py-2 border-b border-border">
              <h3 class="font-semibold text-foreground">{{ title() }}</h3>
            </div>
          }
          <div class="px-4 py-4 overflow-y-auto" [class]="contentHeightClass()">
            <ng-content />
          </div>
        </div>
      </div>
    }
  `
})
export class BottomSheetComponent {
  isOpen = input<boolean>(false);
  title = input<string>('');
  hasHandle = input<boolean>(true);
  closeOnBackdropClick = input<boolean>(true);
  height = input<number>(50);
  closed = output<void>();

  protected isClosing = signal(false);

  private validateHeight(value: number): number {
    return Math.max(Math.min(value, 100), 20);
  }

  protected heightClass = computed(() => {
    const percentage = this.validateHeight(this.height());
    return `h-[${percentage}vh]`;
  });

  protected contentHeightClass = computed(() => {
    const percentage = this.validateHeight(this.height());
    const contentHeight = Math.max(percentage - 32, 20);
    return `h-[calc(${contentHeight}vh-8rem)]`;
  });

  onBackdropClick(): void {
    if (this.closeOnBackdropClick()) {
      this.closeWithAnimation();
    }
  }

  closeWithAnimation(): void {
    if (!this.isClosing()) {
      this.isClosing.set(true);
      setTimeout(() => {
        this.closed.emit();
        this.isClosing.set(false);
      }, 300);
    }
  }

  onAnimationEnd(): void {
    if (this.isClosing()) {
      this.closed.emit();
      this.isClosing.set(false);
    }
  }

  cn = cn;
}
