import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, AlertTriangle, Zap, FileText, Heading, Square, CheckSquare, Radio, ToggleLeft, TextCursorInput, List, Search, Calendar, Clock, ChevronDown, Menu, ArrowRight, Grid, Tag, RefreshCw, Minus, Maximize2, Info, Bell, ArrowDown, Palette, Terminal, Book, ExternalLink, PanelLeft, AppWindow, ChevronRight, GitBranch, Smile, Loader, RotateCw, ArrowUpDown, ArrowDownToLine, Box } from 'lucide-angular';
import { CardComponent } from '@apsara/ui';

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
  selector: 'app-components-overview',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, CardComponent],
  template: `
    <div class="min-h-screen bg-background text-foreground">
      <app-card padding="large" align="center" class="w-full mx-auto px-6 mb-16">
        <h1 class="text-[2.5rem] mb-4 text-foreground">Components</h1>
        <p class="text-[1.125rem] text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
          A comprehensive library of accessible, customizable, and performant UI components
        </p>
      </app-card>

      <main class="max-w-[1400px] mx-auto px-6">
        @for (category of categories; track category.name) {
          <section class="mb-14">
            <h2 class="text-[1.25rem] font-medium text-foreground mb-6 pb-3 border-b border-border">
              {{ category.name }}
            </h2>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
              @for (item of category.items; track item.id) {
                <a
                  [routerLink]="'/components/' + item.id"
                  class="group flex items-start gap-4 p-5 bg-card border border-border rounded-xl no-underline text-inherit transition-all duration-200 hover:border-primary hover:shadow-lg hover:-translate-y-0.5">
                  <div class="flex items-center justify-center size-12 bg-accent rounded-xl flex-shrink-0">
                    <lucide-angular [img]="item.icon" class="text-primary" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-base font-medium mb-0.5 text-foreground">{{ item.title }}</h3>
                    @if (item.description) {
                      <p class="text-sm text-muted-foreground leading-relaxed m-0">{{ item.description }}</p>
                    }
                  </div>
                  <lucide-angular [img]="ArrowRight" class="text-muted-foreground text-xs self-center opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </a>
              }
            </div>
          </section>
        }
      </main>
    </div>
  `
})
export class ComponentsOverviewComponent {
  readonly AlertTriangle = AlertTriangle;
  readonly Zap = Zap;
  readonly FileText = FileText;
  readonly Heading = Heading;
  readonly Square = Square;
  readonly CheckSquare = CheckSquare;
  readonly Radio = Radio;
  readonly ToggleLeft = ToggleLeft;
  readonly TextCursorInput = TextCursorInput;
  readonly List = List;
  readonly Search = Search;
  readonly Calendar = Calendar;
  readonly Clock = Clock;
  readonly ChevronDown = ChevronDown;
  readonly Menu = Menu;
  readonly ArrowRight = ArrowRight;
  readonly Grid = Grid;
  readonly Tag = Tag;
  readonly RefreshCw = RefreshCw;
  readonly Minus = Minus;
  readonly Maximize2 = Maximize2;
  readonly Info = Info;
  readonly Bell = Bell;
  readonly ArrowDown = ArrowDown;
  readonly Palette = Palette;
  readonly Terminal = Terminal;
  readonly Book = Book;
  readonly ExternalLink = ExternalLink;
  readonly PanelLeft = PanelLeft;
  readonly AppWindow = AppWindow;
  readonly ChevronRight = ChevronRight;
  readonly GitBranch = GitBranch;
  readonly Smile = Smile;
  readonly Loader = Loader;
  readonly RotateCw = RotateCw;
  readonly ArrowUpDown = ArrowUpDown;
  readonly ArrowDownToLine = ArrowDownToLine;
  readonly Box = Box;

  categories: ComponentCategory[] = [
    {
      name: 'Form Controls',
      items: [
        { id: 'button', title: 'Button', icon: Square, description: 'Trigger actions and events' },
        { id: 'checkbox', title: 'Checkbox', icon: CheckSquare, description: 'Multi-selection control' },
        { id: 'radio', title: 'Radio', icon: Radio, description: 'Single selection from options' },
        { id: 'switch', title: 'Switch', icon: ToggleLeft, description: 'On/off binary toggle' },
        { id: 'button-toggle', title: 'Button Toggle', icon: ToggleLeft, description: 'Grouped exclusive buttons' },
        { id: 'input', title: 'Input', icon: TextCursorInput, description: 'Text field for user entry' },
        { id: 'select', title: 'Select', icon: List, description: 'Dropdown selection control' },
        { id: 'autocomplete', title: 'Autocomplete', icon: Search, description: 'Searchable dropdown' },
        { id: 'datepicker', title: 'Datepicker', icon: Calendar, description: 'Date selection input' },
        { id: 'timepicker', title: 'Timepicker', icon: Clock, description: 'Time selection input' },
        { id: 'slider', title: 'Slider', icon: ArrowUpDown, description: 'Range selection control' },
        { id: 'chips', title: 'Chips', icon: Tag, description: 'Compact elements selection' }
      ]
    },
    {
      name: 'Navigation',
      items: [
        { id: 'menu', title: 'Menu', icon: Menu, description: 'Collapsible navigation list' },
        { id: 'sidenav', title: 'Sidenav', icon: PanelLeft, description: 'Side navigation panel' },
        { id: 'toolbar', title: 'Toolbar', icon: AppWindow, description: 'Header action bar' },
        { id: 'tabs', title: 'Tabs', icon: Square, description: 'Tabbed navigation' },
        { id: 'list', title: 'List', icon: List, description: 'Vertical list of items' },
        { id: 'paginator', title: 'Paginator', icon: ChevronRight, description: 'Navigation controls for data' },
        { id: 'stepper', title: 'Stepper', icon: ArrowUpDown, description: 'Progress through steps' }
      ]
    },
    {
      name: 'Data Display',
      items: [
        { id: 'card', title: 'Card', icon: Square, description: 'Container for content' },
        { id: 'table', title: 'Table', icon: Grid, description: 'Tabular data display' },
        { id: 'tree', title: 'Tree', icon: GitBranch, description: 'Hierarchical data structure' },
        { id: 'badge', title: 'Badge', icon: Tag, description: 'Status indicator' },
        { id: 'icon', title: 'Icon', icon: Smile, description: 'Visual symbol representation' },
        { id: 'progress-bar', title: 'Progress Bar', icon: Loader, description: 'Linear progress indicator' },
        { id: 'spinner', title: 'Spinner', icon: RotateCw, description: 'Loading indicator' },
        { id: 'alert', title: 'Alert', icon: AlertTriangle, description: 'Feedback and notifications' }
      ]
    },
    {
      name: 'Layout',
      items: [
        { id: 'divider', title: 'Divider', icon: Minus, description: 'Horizontal line separator' },
        { id: 'grid-list', title: 'Grid List', icon: Grid, description: 'Grid-based layout' }
      ]
    },
    {
      name: 'Overlay',
      items: [
        { id: 'dialog', title: 'Dialog', icon: Box, description: 'Modal popup window' },
        { id: 'tooltip', title: 'Tooltip', icon: Info, description: 'Informational tooltip' },
        { id: 'sonner', title: 'Sonner', icon: Bell, description: 'An opinionated toast component for Angular' },
        { id: 'bottom-sheet', title: 'Bottom Sheet', icon: ArrowDownToLine, description: 'Slide-up panel' }
      ]
    },
    {
      name: 'Utility',
      items: [
        { id: 'ripples', title: 'Ripples', icon: Loader, description: 'Ripple interaction effect' }
      ]
    }
  ];
}
