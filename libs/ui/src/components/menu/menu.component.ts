import { Component, input, output, signal, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenuModule, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { cn } from '../../lib/cn';
import { LucideAngularModule, ChevronDown, Menu, Search, Plus, Pencil, Trash2, Settings } from 'lucide-angular';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, CdkMenuModule, CdkMenuTrigger, CdkMenuItem, LucideAngularModule],
  template: `
    @if (trigger()) {
      <button
        [cdkMenuTriggerFor]="menu"
        class="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-foreground
               hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        (cdkMenuOpened)="onMenuOpen()"
        (cdkMenuClosed)="onMenuClose()">
        @if (icon()) {
          <lucide-angular [img]="getIcon(icon())" [size]="18" />
        }
        @if (label()) {
          <span class="text-sm">{{ label() }}</span>
        }
        <lucide-angular [img]="ChevronDown" [size]="18" />
      </button>
    }
    <ng-template #menu>
      <div
        class="py-1 rounded-lg shadow-lg border min-w-[200px] bg-card border-border"
        cdkMenu>
        @for (item of items(); track item.label) {
          @if (item.divider) {
            <div class="h-px my-1 bg-border" role="separator"></div>
          } @else {
            <button
              class="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground"
              cdkMenuItem
              [cdkMenuItemDisabled]="item.disabled"
              (click)="onItemClick(item)">
              @if (item.icon) {
                <lucide-angular [img]="getIcon(item.icon)" [size]="18" />
              }
              <span>{{ item.label }}</span>
              @if (item.shortcut) {
                <span class="ml-auto text-xs text-dimmed">{{ item.shortcut }}</span>
              }
            </button>
          }
        }
      </div>
    </ng-template>
  `
})
export class MenuComponent {
  ChevronDown = ChevronDown;
  items = input<Array<{ label?: string; icon?: string; disabled?: boolean; divider?: boolean; shortcut?: string; value?: unknown }>>([]);
  label = input<string>('');
  icon = input<string>('');
  trigger = input<boolean>(true);
  itemClicked = output<unknown>();

  onMenuOpen(): void {}
  onMenuClose(): void {}

  onItemClick(item: { label?: string; icon?: string; disabled?: boolean; divider?: boolean; shortcut?: string; value?: unknown }): void {
    if (!item.disabled && !item.divider) {
      this.itemClicked.emit(item.value ?? item.label);
    }
  }

  cn = cn;

  getIcon(name: string) {
    const iconMap: Record<string, any> = {
      'chevron-down': ChevronDown,
      'chevron_down': ChevronDown,
      'arrow_drop_down': ChevronDown,
      'menu': Menu,
      'search': Search,
      'plus': Plus,
      'edit': Pencil,
      'delete': Trash2,
      'settings': Settings,
    };
    return iconMap[name] || ChevronDown;
  }
}
