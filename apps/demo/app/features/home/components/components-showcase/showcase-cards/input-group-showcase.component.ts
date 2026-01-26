import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, InputComponent } from '@apsara/ui';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-input-group-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent, InputComponent, LucideAngularModule],
  template: `
    <app-card class="flex-1 flex flex-col h-full">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-foreground mb-1.5">Input Group</h3>
        <p class="text-sm text-muted-foreground">
          
        </p>
      </div>
        <div class="flex-1 flex flex-col gap-4">
          <div class="flex items-center border border-border rounded-md bg-input overflow-hidden">
            <span class="flex items-center justify-center px-3 text-sm text-muted-foreground bg-secondary h-[38px] border-r border-border">
              <lucide-angular [img]="Search" [size]="16" />
            </span>
            <app-input placeholder="Search..." />
          </div>
          <div class="flex items-center border border-border rounded-md bg-input overflow-hidden">
            <app-input placeholder="Username" />
            <span class="flex items-center justify-center px-3 text-sm text-muted-foreground bg-secondary h-[38px] border-l border-border">
              @gmail.com
            </span>
          </div>
          <div class="flex items-center border border-border rounded-md bg-input overflow-hidden">
            <span class="flex items-center justify-center px-3 text-sm text-muted-foreground bg-secondary h-[38px] border-r border-border">
              $
            </span>
            <app-input type="number" placeholder="0.00" />
            <span class="flex items-center justify-center px-3 text-sm text-muted-foreground bg-secondary h-[38px] border-l border-border">
              .00
            </span>
          </div>
          <div class="flex items-center border border-border rounded-md bg-input overflow-hidden">
            <app-input placeholder="Search packages..." />
          </div>
        </div>
    </app-card>
  `
})
export class InputGroupShowcaseComponent {
  Search = Search;
}
