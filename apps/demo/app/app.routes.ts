import { Routes } from '@angular/router';
import { HomeComponent, DocsOverviewComponent, DocsLayoutComponent } from './features';
import { NotFoundComponent } from './features/home/not-found.component';
import { ComponentsOverviewComponent } from './features/components/components-overview.component';
import { ComponentDocLayoutComponent } from './features/components/component-doc-layout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'docs', component: DocsOverviewComponent },
    {
    path: 'docs',
    component: DocsLayoutComponent,
    children: [
      { path: 'getting-started', loadComponent: () => import('./features/docs/getting-started.component').then(m => m.GettingStartedComponent) },
      { path: 'theming', loadComponent: () => import('./features/docs/theming.component').then(m => m.ThemingComponent) },
      { path: 'cli', loadComponent: () => import('./features/docs/cli.component').then(m => m.CliComponent) },
      { path: 'guides', loadComponent: () => import('./features/docs/guides.component').then(m => m.GuidesComponent) },
      { path: 'icons', loadComponent: () => import('./features/docs/icons.component').then(m => m.IconsComponent) },
      { path: 'resources', loadComponent: () => import('./features/docs/resources.component').then(m => m.ResourcesComponent) }
    ]
  },
  { path: 'components', component: ComponentsOverviewComponent },
  {
    path: 'components',
    component: ComponentDocLayoutComponent,
    children: [
      { path: 'button', loadComponent: () => import('./features/components/button-showcase.component').then(m => m.ButtonShowcaseComponent) },
      { path: 'alert', loadComponent: () => import('./features/components/alert-showcase.component').then(m => m.AlertShowcaseComponent) },
      { path: 'card', loadComponent: () => import('./features/components/card-showcase.component').then(m => m.CardShowcaseComponent) },
      { path: 'input', loadComponent: () => import('./features/components/input-showcase.component').then(m => m.InputShowcaseComponent) },
      { path: 'tabs', loadComponent: () => import('./features/components/tabs-showcase.component').then(m => m.TabsShowcaseComponent) },
      { path: 'checkbox', loadComponent: () => import('./features/components/checkbox-showcase.component').then(m => m.CheckboxShowcaseComponent) },
      { path: 'radio', loadComponent: () => import('./features/components/radio-showcase.component').then(m => m.RadioShowcaseComponent) },
      { path: 'slide-toggle', loadComponent: () => import('./features/components/slide-toggle-showcase.component').then(m => m.SlideToggleShowcaseComponent) },
      { path: 'button-toggle', loadComponent: () => import('./features/components/button-toggle-showcase.component').then(m => m.ButtonToggleShowcaseComponent) },
      { path: 'select', loadComponent: () => import('./features/components/select-showcase.component').then(m => m.SelectShowcaseComponent) },
      { path: 'autocomplete', loadComponent: () => import('./features/components/autocomplete-showcase.component').then(m => m.AutocompleteShowcaseComponent) },
      { path: 'datepicker', loadComponent: () => import('./features/components/datepicker-showcase.component').then(m => m.DatepickerShowcaseComponent) },
      { path: 'timepicker', loadComponent: () => import('./features/components/timepicker-showcase.component').then(m => m.TimepickerShowcaseComponent) },
      { path: 'slider', loadComponent: () => import('./features/components/slider-showcase.component').then(m => m.SliderShowcaseComponent) },
      { path: 'chips', loadComponent: () => import('./features/components/chips-showcase.component').then(m => m.ChipsShowcaseComponent) },
      { path: 'badge', loadComponent: () => import('./features/components/badge-showcase.component').then(m => m.BadgeShowcaseComponent) },
      { path: 'icon', loadComponent: () => import('./features/components/icon-showcase.component').then(m => m.IconShowcaseComponent) },
      { path: 'progress-bar', loadComponent: () => import('./features/components/progress-bar-showcase.component').then(m => m.ProgressBarShowcaseComponent) },
      { path: 'spinner', loadComponent: () => import('./features/components/spinner-showcase.component').then(m => m.SpinnerShowcaseComponent) },
      { path: 'toolbar', loadComponent: () => import('./features/components/toolbar-showcase.component').then(m => m.ToolbarShowcaseComponent) },
      { path: 'list', loadComponent: () => import('./features/components/list-showcase.component').then(m => m.ListShowcaseComponent) },
      { path: 'menu', loadComponent: () => import('./features/components/menu-showcase.component').then(m => m.MenuShowcaseComponent) },
      { path: 'sidenav', loadComponent: () => import('./features/components/sidenav-showcase.component').then(m => m.SidenavShowcaseComponent) },
      { path: 'table', loadComponent: () => import('./features/components/table-showcase.component').then(m => m.TableShowcaseComponent) },
      { path: 'tree', loadComponent: () => import('./features/components/tree-showcase.component').then(m => m.TreeShowcaseComponent) },
      { path: 'paginator', loadComponent: () => import('./features/components/paginator-showcase.component').then(m => m.PaginatorShowcaseComponent) },
      { path: 'expansion-panel', loadComponent: () => import('./features/components/expansion-panel-showcase.component').then(m => m.ExpansionPanelShowcaseComponent) },
      { path: 'dialog', loadComponent: () => import('./features/components/dialog-showcase.component').then(m => m.DialogShowcaseComponent) },
      { path: 'tooltip', loadComponent: () => import('./features/components/tooltip-showcase.component').then(m => m.TooltipShowcaseComponent) },
      { path: 'snackbar', loadComponent: () => import('./features/components/snackbar-showcase.component').then(m => m.SnackbarShowcaseComponent) },
      { path: 'bottom-sheet', loadComponent: () => import('./features/components/bottom-sheet-showcase.component').then(m => m.BottomSheetShowcaseComponent) },
      { path: 'divider', loadComponent: () => import('./features/components/divider-showcase.component').then(m => m.DividerShowcaseComponent) },
      { path: 'grid-list', loadComponent: () => import('./features/components/grid-list-showcase.component').then(m => m.GridListShowcaseComponent) },
      { path: 'stepper', loadComponent: () => import('./features/components/stepper-showcase.component').then(m => m.StepperShowcaseComponent) },
      { path: 'sort-header', loadComponent: () => import('./features/components/sort-header-showcase.component').then(m => m.SortHeaderShowcaseComponent) },
      { path: 'ripples', loadComponent: () => import('./features/components/ripples-showcase.component').then(m => m.RipplesShowcaseComponent) }
    ]
  },
  { path: '**', component: NotFoundComponent }
];
