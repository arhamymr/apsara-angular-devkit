import { Component, signal, computed, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Search, X, SearchX, AlertTriangle, Zap, FileText, Heading, Square, CheckSquare, Radio, ToggleLeft, TextSelect, List, Calendar, Clock, Tag, Menu, PanelLeft, AppWindow, ChevronRight, ChevronDown, GitBranch, Smile, Loader, RotateCw, ArrowUpDown, Minus, Grid, Info, Bell, ArrowDownToLine, Box } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { BottomSheetComponent, InputComponent } from '@apsara/ui';

interface ComponentItem {
  id: string;
  title: string;
  icon: any;
  description?: string;
}

interface ComponentCategory {
  name: string;
  items: ComponentItem[];
}

@Component({
  selector: 'app-component-doc-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, LucideAngularModule, FormsModule, BottomSheetComponent, InputComponent],
  template: `
    <div class="flex min-h-[calc(100vh-72px)]">
      <aside class="hidden md:block w-[280px] flex-shrink-0 bg-background border-r overflow-y-auto sticky top-[72px] h-[calc(100vh-72px)]">
        <nav class="py-6 px-0">
          <a routerLink="/components" class="flex items-center gap-2 py-3 px-6 text-[color:var(--foreground-variant,#666)] no-underline text-sm mb-4 hover:text-primary transition-colors duration-150">
            <lucide-angular [img]="ArrowLeft" class="!text-[18px] !w-[18px] !h-[18px]"></lucide-angular>
            <span>Back to Overview</span>
          </a>
          <div class="px-6 mb-6">
            <div class="relative">
              <lucide-angular [img]="Search" class="!text-[18px] !w-[18px] !h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--foreground-variant,#999)]"></lucide-angular>
              <input 
                type="text" 
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)" 
                placeholder="Search components..."
                class="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
              />
              @if (searchQuery()) {
                <button (click)="searchQuery.set('')" class="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-muted rounded-full transition-colors">
                  <lucide-angular [img]="X" class="!text-[14px] !w-[14px] !h-[14px] text-[color:var(--foreground-variant,#999)]"></lucide-angular>
                </button>
              }
            </div>
          </div>
          @if (searchQuery() && filteredCategories().length === 0) {
            <div class="px-6 text-center">
              <lucide-angular [img]="SearchX" class="!text-[48px] !w-[48px] !h-[48px] text-[color:var(--foreground-variant,#ccc)] mb-3"></lucide-angular>
              <p class="text-sm text-[color:var(--foreground-variant,#666)]">No components found</p>
              <p class="text-xs text-[color:var(--foreground-variant,#999)] mt-1">Try a different search term</p>
            </div>
          } @else {
            @for (category of filteredCategories(); track category.name) {
              <div class="mb-6">
                <h3 class="text-xs font-semibold uppercase tracking-wide text-[color:var(--foreground-variant,#666)] px-6 mb-3">{{ category.name }}</h3>
                <ul class="list-none p-0 m-0">
                  @for (item of category.items; track item.id) {
                    <li>
                      <a [routerLink]="'/components/' + item.id"
                          routerLinkActive="bg-card text-primary"
                          class="flex items-center gap-3 py-2.5 px-6 text-[color:var(--foreground,#1a1b1f)] no-underline text-sm transition-all duration-150 hover:bg-primary/10">
                        <lucide-angular [img]="item.icon" class="!text-[20px] !w-[20px] !h-[20px] text-[color:var(--foreground-variant,#666)]"></lucide-angular>
                        <span>{{ item.title }}</span>
                      </a>
                    </li>
                  }
                </ul>
              </div>
            }
          }
          </nav>
      </aside>
      <main class="flex-1 md:p-8 p-4 min-w-0 bg-background">
        <button 
          class="md:hidden flex items-center gap-2 mb-4 text-foreground hover:text-primary transition-colors"
          (click)="openMobileSidebar()"
          aria-label="Open components menu"
          aria-expanded="false"
          id="components-toggle">
          <lucide-angular [img]="Menu" [size]="20" />
          <span class="text-sm font-medium">Components</span>
        </button>
        <router-outlet></router-outlet>
      </main>
    </div>

    <app-bottom-sheet
      id="components-sheet"
      [isOpen]="isMobileSidebarOpen()"
      [hasHandle]="true"
      (closed)="closeMobileSidebar()">
      
      <nav class="py-4 px-0">
        <a routerLink="/components" 
           (click)="closeMobileSidebar()"
           class="flex items-center gap-2 py-3 px-6 text-[color:var(--foreground-variant,#666)] no-underline text-sm mb-4 hover:text-primary transition-colors duration-150">
          <lucide-angular [img]="ArrowLeft" class="!text-[18px] !w-[18px] !h-[18px]"></lucide-angular>
          <span>Back to Overview</span>
        </a>
        
        <div class="px-6 mb-6">
          <div class="relative">
            <app-input
              [ngModel]="searchQuery()"
              (ngModelChange)="searchQuery.set($event)"
              placeholder="Search components..."
              [prefixIcon]="Search"
            />
            @if (searchQuery()) {
              <button (click)="searchQuery.set('')" class="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-muted rounded-full transition-colors z-10">
                <lucide-angular [img]="X" class="!text-[14px] !w-[14px] !h-[14px] text-[color:var(--foreground-variant,#999)]"></lucide-angular>
              </button>
            }
          </div>
        </div>
        
        @if (searchQuery() && filteredCategories().length === 0) {
          <div class="px-6 text-center">
            <lucide-angular [img]="SearchX" class="!text-[48px] !w-[48px] !h-[48px] text-[color:var(--foreground-variant,#ccc)] mb-3"></lucide-angular>
            <p class="text-sm text-[color:var(--foreground-variant,#666)]">No components found</p>
            <p class="text-xs text-[color:var(--foreground-variant,#999)] mt-1">Try a different search term</p>
          </div>
        } @else {
          @for (category of filteredCategories(); track category.name) {
            <div class="mb-6">
              <h3 class="text-xs font-semibold uppercase tracking-wide text-[color:var(--foreground-variant,#666)] px-6 mb-3">{{ category.name }}</h3>
              <ul class="list-none p-0 m-0">
                @for (item of category.items; track item.id) {
                  <li>
                    <a [routerLink]="'/components/' + item.id"
                       (click)="closeMobileSidebar()"
                       routerLinkActive="bg-card text-primary"
                       class="flex items-center gap-3 py-2.5 px-6 text-[color:var(--foreground,#1a1b1f)] no-underline text-sm transition-all duration-150 hover:bg-primary/10">
                      <lucide-angular [img]="item.icon" class="!text-[20px] !w-[20px] !h-[20px] text-[color:var(--foreground-variant,#666)]"></lucide-angular>
                      <span>{{ item.title }}</span>
                    </a>
                  </li>
                }
              </ul>
            </div>
          }
        }
      </nav>
    </app-bottom-sheet>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ComponentDocLayoutComponent {
  readonly ArrowLeft = ArrowLeft;
  readonly Search = Search;
  readonly X = X;
  readonly SearchX = SearchX;
  readonly AlertTriangle = AlertTriangle;
  readonly Zap = Zap;
  readonly FileText = FileText;
  readonly Heading = Heading;
  readonly Square = Square;
  readonly CheckSquare = CheckSquare;
  readonly Radio = Radio;
  readonly ToggleLeft = ToggleLeft;
  readonly TextSelect = TextSelect;
  readonly List = List;
  readonly Calendar = Calendar;
  readonly Clock = Clock;
  readonly Tag = Tag;
  readonly Menu = Menu;
  readonly PanelLeft = PanelLeft;
  readonly AppWindow = AppWindow;
  readonly ChevronRight = ChevronRight;
  readonly ChevronDown = ChevronDown;
  readonly GitBranch = GitBranch;
  readonly Smile = Smile;
  readonly Loader = Loader;
  readonly RotateCw = RotateCw;
  readonly ArrowUpDown = ArrowUpDown;
  readonly Minus = Minus;
  readonly Grid = Grid;
  readonly Info = Info;
  readonly Bell = Bell;
  readonly ArrowDownToLine = ArrowDownToLine;
  readonly Box = Box;

  searchQuery = signal('');
  isMobileSidebarOpen = signal(false);

  openMobileSidebar(): void {
    this.isMobileSidebarOpen.set(true);
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen.set(false);
  }

  @HostListener('window:keydown.esc')
  onEscape(): void {
    if (this.isMobileSidebarOpen()) {
      this.closeMobileSidebar();
    }
  }

  categories = [
    {
      name: 'Form Controls',
      items: [
        { id: 'button', title: 'Button', icon: Square },
        { id: 'checkbox', title: 'Checkbox', icon: CheckSquare },
        { id: 'radio', title: 'Radio', icon: Radio },
        { id: 'button-toggle', title: 'Button Toggle', icon: ToggleLeft },
        { id: 'input', title: 'Input', icon: TextSelect },
        { id: 'select', title: 'Select', icon: List },
        { id: 'autocomplete', title: 'Autocomplete', icon: Search },
        { id: 'datepicker', title: 'Datepicker', icon: Calendar },
        { id: 'timepicker', title: 'Timepicker', icon: Clock },
        { id: 'slider', title: 'Slider', icon: ArrowUpDown },
        { id: 'chips', title: 'Chips', icon: Tag }
      ]
    },
    {
      name: 'Navigation',
      items: [
        { id: 'menu', title: 'Menu', icon: Menu },
        { id: 'sidenav', title: 'Sidenav', icon: PanelLeft },
        { id: 'toolbar', title: 'Toolbar', icon: AppWindow },
        { id: 'tabs', title: 'Tabs', icon: Square },
        { id: 'list', title: 'List', icon: List },
        { id: 'paginator', title: 'Paginator', icon: ChevronRight },
        { id: 'stepper', title: 'Stepper', icon: ArrowUpDown }
      ]
    },
    {
      name: 'Data Display',
      items: [
        { id: 'card', title: 'Card', icon: Square },
        { id: 'table', title: 'Table', icon: Grid },
        { id: 'tree', title: 'Tree', icon: GitBranch },
        { id: 'badge', title: 'Badge', icon: Tag },
        { id: 'icon', title: 'Icon', icon: Smile },
        { id: 'progress-bar', title: 'Progress Bar', icon: Loader },
        { id: 'spinner', title: 'Spinner', icon: RotateCw },
        { id: 'sort-header', title: 'Sort Header', icon: ArrowUpDown },
        { id: 'alert', title: 'Alert', icon: AlertTriangle }
      ]
    },
    {
      name: 'Layout',
      items: [
        { id: 'divider', title: 'Divider', icon: Minus },
        { id: 'grid-list', title: 'Grid List', icon: Grid }
      ]
    },
    {
      name: 'Overlay',
      items: [
        { id: 'dialog', title: 'Dialog', icon: Box },
        { id: 'tooltip', title: 'Tooltip', icon: Info },
        { id: 'sonner', title: 'Sonner', icon: Bell },
        { id: 'bottom-sheet', title: 'Bottom Sheet', icon: ArrowDownToLine }
      ]
    },
    {
      name: 'Utility',
      items: [
        { id: 'ripples', title: 'Ripples', icon: Loader }
      ]
    }
  ];

  filteredCategories = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.categories;

    return this.categories
      .map(category => ({
        ...category,
        items: category.items.filter(
          item => item.title.toLowerCase().includes(query) || item.id.toLowerCase().includes(query)
        )
      }))
      .filter(category => category.items.length > 0);
  });
}
