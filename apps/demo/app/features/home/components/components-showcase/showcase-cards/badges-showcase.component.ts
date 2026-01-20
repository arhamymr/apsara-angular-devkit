import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, BadgeComponent } from '@apsara/ui';
import { LucideAngularModule, RefreshCw, Download, Clock } from 'lucide-angular';

@Component({
  selector: 'app-badges-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent, LucideAngularModule],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-foreground mb-1.5">Status Badges</h3>
        <p class="text-sm text-dimmed">Different variants for status indicators</p>
      </div>
      <div class="flex-1 flex flex-col gap-5">
        <div class="flex flex-wrap gap-2">
          <app-badge variant="default">Default</app-badge>
          <app-badge variant="secondary">Secondary</app-badge>
          <app-badge variant="success">Success</app-badge>
          <app-badge variant="warning">Warning</app-badge>
          <app-badge variant="destructive">Danger</app-badge>
        </div>
        <div class="flex flex-wrap gap-2">
          <app-badge variant="outline">Outline</app-badge>
        </div>
        <div class="flex flex-wrap gap-2">
          <app-badge variant="default">
            <lucide-angular [img]="RefreshCw" [size]="14" />
            Syncing
          </app-badge>
          <app-badge variant="secondary">
            <lucide-angular [img]="Download" [size]="14" />
            Updating
          </app-badge>
          <app-badge variant="secondary">
            <lucide-angular [img]="Clock" [size]="14" />
            Loading
          </app-badge>
        </div>
      </div>
    </app-card>
  `
})
export class BadgesShowcaseComponent {
  RefreshCw = RefreshCw;
  Download = Download;
  Clock = Clock;
}
