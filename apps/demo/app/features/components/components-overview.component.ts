import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, AlertTriangle, Zap, FileText, Type, Smartphone, CheckSquare, Circle, ToggleLeft, ToggleRight, TextCursorInput, List, Search, Calendar, Clock, ChevronDown, Menu, ArrowRight, Grid, Table, Heart, Tag, RefreshCw, Minus, Maximize2, Info, Bell, ArrowDown, Palette, Terminal, Book, ExternalLink } from 'lucide-angular';

interface ComponentItem {
  id: string;
  title: string;
  icon: string;
  description?: string;
}

interface ComponentCategory {
  name: string;
  items: ComponentItem[];
}

@Component({
  selector: 'app-components-overview',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  template: `
    <div class="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header class="text-center bg-[var(--surface)] border-b border-[var(--border)] px-8 py-16">
        <h1 class="text-[2.5rem] font-medium mb-4 text-[var(--foreground)]">Components</h1>
        <p class="text-[1.125rem] text-[var(--dimmed)] max-w-[600px] mx-auto leading-relaxed">
          A comprehensive library of accessible, customizable, and performant UI components
        </p>
      </header>

      <main class="max-w-[1400px] mx-auto pt-16">
        @for (category of categories; track category.name) {
          <section class="mb-14">
            <h2 class="text-[1.25rem] font-medium text-[var(--foreground)] mb-6 pb-3 border-b border-[var(--border)]">
              {{ category.name }}
            </h2>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
              @for (item of category.items; track item.id) {
                <a
                  [routerLink]="'/components/' + item.id"
                  class="group flex items-start gap-4 p-5 bg-[var(--card)] border border-[var(--card-border)] rounded-xl no-underline text-inherit transition-all duration-200 hover:border-[var(--primary)] hover:shadow-lg hover:-translate-y-0.5">
                  <div class="flex items-center justify-center size-12 bg-[var(--accent)] rounded-xl flex-shrink-0">
                    <lucide-angular [img]="getIcon(item.icon)" class="text-[var(--primary)]" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-base font-medium mb-0.5 text-[var(--foreground)]">{{ item.title }}</h3>
                    @if (item.description) {
                      <p class="text-sm text-[var(--dimmed)] leading-relaxed m-0">{{ item.description }}</p>
                    }
                  </div>
                  <lucide-angular [img]="ArrowRight" class="text-[var(--dimmed)] text-xs self-center opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
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
  AlertTriangle = AlertTriangle;
  Zap = Zap;
  FileText = FileText;
  Type = Type;
  Smartphone = Smartphone;
  CheckSquare = CheckSquare;
  Circle = Circle;
  ToggleLeft = ToggleLeft;
  ToggleRight = ToggleRight;
  TextCursorInput = TextCursorInput;
  List = List;
  Search = Search;
  Calendar = Calendar;
  Clock = Clock;
  ChevronDown = ChevronDown;
  Menu = Menu;
  ArrowRight = ArrowRight;
  Grid = Grid;
  Table = Table;
  Heart = Heart;
  Tag = Tag;
  RefreshCw = RefreshCw;
  Minus = Minus;
  Maximize2 = Maximize2;
  Info = Info;
  Bell = Bell;
  ArrowDown = ArrowDown;
  Palette = Palette;
  Terminal = Terminal;
  Book = Book;
  ExternalLink = ExternalLink;

  getIcon(name: string) {
    const iconMap: Record<string, any> = {
      'alertTriangle': AlertTriangle,
      'zap': Zap,
      'fileText': FileText,
      'type': Type,
      'smartphone': Smartphone,
      'checkSquare': CheckSquare,
      'circle': Circle,
      'toggleLeft': ToggleLeft,
      'toggleRight': ToggleRight,
      'textCursorInput': TextCursorInput,
      'list': List,
      'autocomplete': Search,
      'calendar': Calendar,
      'clock': Clock,
      'chevronDown': ChevronDown,
      'menu': Menu,
      'arrowRight': ArrowRight,
      'grid': Grid,
      'table': Table,
      'accountTree': List,
      'localOffer': Tag,
      'heart': Heart,
      'refreshCw': RefreshCw,
      'horizontalRule': Minus,
      'pictureInPicture': Maximize2,
      'info': Info,
      'bell': Bell,
      'verticalAlignBottom': ArrowDown,
      'palette': Palette,
      'terminal': Terminal,
      'book': Book,
      'externalLink': ExternalLink,
    };
    return iconMap[name] || Zap;
  }

  categories: ComponentCategory[] = [
    {
      name: 'Alert',
      items: [
        { id: 'alert', title: 'Alert', icon: 'alertTriangle', description: 'Feedback and notifications' }
      ]
    },
    {
      name: 'Form Controls',
      items: [
        { id: 'button', title: 'Button', icon: 'smartphone', description: 'Trigger actions and events' },
        { id: 'checkbox', title: 'Checkbox', icon: 'checkSquare', description: 'Multi-selection control' },
        { id: 'radio', title: 'Radio', icon: 'circle', description: 'Single selection from options' },
        { id: 'slide-toggle', title: 'Slide Toggle', icon: 'toggleLeft', description: 'On/off binary switch' },
        { id: 'button-toggle', title: 'Button Toggle', icon: 'toggleRight', description: 'Grouped exclusive buttons' },
        { id: 'input', title: 'Input', icon: 'textCursorInput', description: 'Text field for user entry' },
        { id: 'select', title: 'Select', icon: 'list', description: 'Dropdown selection control' },
        { id: 'autocomplete', title: 'Autocomplete', icon: 'autocomplete', description: 'Searchable dropdown' },
        { id: 'datepicker', title: 'Datepicker', icon: 'calendar', description: 'Date selection input' },
        { id: 'timepicker', title: 'Timepicker', icon: 'clock', description: 'Time selection input' },
        { id: 'slider', title: 'Slider', icon: 'list', description: 'Range selection control' },
        { id: 'chips', title: 'Chips', icon: 'type', description: 'Compact elements selection' }
      ]
    },
    {
      name: 'Navigation',
      items: [
        { id: 'menu', title: 'Menu', icon: 'menu', description: 'Collapsible navigation list' },
        { id: 'sidenav', title: 'Sidenav', icon: 'list', description: 'Side navigation panel' },
        { id: 'toolbar', title: 'Toolbar', icon: 'grid', description: 'Header action bar' },
        { id: 'tabs', title: 'Tabs', icon: 'list', description: 'Tabbed navigation' },
        { id: 'list', title: 'List', icon: 'list', description: 'Vertical list of items' },
        { id: 'paginator', title: 'Paginator', icon: 'arrowRight', description: 'Navigation controls for data' },
        { id: 'stepper', title: 'Stepper', icon: 'list', description: 'Progress through steps' },
        { id: 'expansion-panel', title: 'Expansion Panel', icon: 'chevronDown', description: 'Collapsible content panel' }
      ]
    },
    {
      name: 'Data Display',
      items: [
        { id: 'card', title: 'Card', icon: 'grid', description: 'Container for content' },
        { id: 'table', title: 'Table', icon: 'table', description: 'Tabular data display' },
        { id: 'tree', title: 'Tree', icon: 'list', description: 'Hierarchical data structure' },
        { id: 'badge', title: 'Badge', icon: 'tag', description: 'Status indicator' },
        { id: 'icon', title: 'Icon', icon: 'heart', description: 'Visual symbol representation' },
        { id: 'progress-bar', title: 'Progress Bar', icon: 'list', description: 'Linear progress indicator' },
        { id: 'spinner', title: 'Spinner', icon: 'refreshCw', description: 'Loading indicator' },
        { id: 'sort-header', title: 'Sort Header', icon: 'list', description: 'Column sorting control' }
      ]
    },
    {
      name: 'Layout',
      items: [
        { id: 'divider', title: 'Divider', icon: 'horizontalRule', description: 'Horizontal line separator' },
        { id: 'grid-list', title: 'Grid List', icon: 'grid', description: 'Grid-based layout' }
      ]
    },
    {
      name: 'Overlay',
      items: [
        { id: 'dialog', title: 'Dialog', icon: 'pictureInPicture', description: 'Modal popup window' },
        { id: 'tooltip', title: 'Tooltip', icon: 'info', description: 'Informational tooltip' },
        { id: 'snackbar', title: 'Snackbar', icon: 'bell', description: 'Brief notification' },
        { id: 'bottom-sheet', title: 'Bottom Sheet', icon: 'verticalAlignBottom', description: 'Slide-up panel' }
      ]
    },
    {
      name: 'Utility',
      items: [
        { id: 'ripples', title: 'Ripples', icon: 'list', description: 'Ripple interaction effect' }
      ]
    }
  ];
}
