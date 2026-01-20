import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent } from '@apsara/ui';
import { LucideAngularModule, Inbox } from 'lucide-angular';

@Component({
  selector: 'app-empty-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent, LucideAngularModule, ButtonComponent],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-[var(--foreground)] mb-1.5">Empty States</h3>
        <p class="text-sm text-[var(--dimmed)]">Placeholder states for empty content</p>
      </div>
      <div class="flex-1 flex items-center justify-center min-h-[200px]">
        <div class="flex flex-col items-center text-center gap-3">
          <lucide-angular [img]="Inbox" [size]="48" />
          <span class="text-base font-semibold text-[var(--foreground)]">No messages yet</span>
          <span class="text-sm text-[var(--dimmed)] max-w-[200px]">Start a conversation by sending a message</span>
          <app-button label="New Message" variant="primary" size="sm" />
        </div>
      </div>
    </app-card>
  `
})
export class EmptyShowcaseComponent {
  Inbox = Inbox;
}
