import { Routes } from '@angular/router';
import { TabsShowcaseComponent } from './tabs-showcase.component';

export const COMPONENTS_SHOWCASE_ROUTES: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'tabs', component: TabsShowcaseComponent }
];
