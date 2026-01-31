import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';

@Component({
  selector: 'app-accordion',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        class="w-full flex items-center justify-between px-4 py-3 bg-muted/50
               hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-colors"
        (click)="onToggle()"
        [attr.aria-expanded]="isOpen()">
        <span class="font-medium text-foreground">{{ title() }}</span>
        <lucide-angular [img]="ChevronDown" [size]="18" class="transition-transform duration-200 text-muted-foreground" [class.rotate-180]="isOpen()" />
      </button>
      @if (isOpen()) {
        <div class="px-4 py-3 bg-card border-t border-border text-card-foreground animate-in slide-in-from-top-1">
          <ng-content />
        </div>
      }
    </div>
  `
})
export class AccordionComponent {
  ChevronDown = ChevronDown;
  title = input<string>('');
  isOpen = input<boolean>(false);
  expanded = output<boolean>();

  onToggle(): void {
    this.expanded.emit(!this.isOpen());
  }

  cn = cn;
}
