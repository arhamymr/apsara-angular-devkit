import { Routes } from '@angular/router';
import { HomeComponent, DocsComponent } from './features';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'docs', component: DocsComponent },
  {
    path: 'components',
    loadComponent: () => import('./features/components/components.component')
      .then(m => m.ComponentsShowcaseComponent)
  },
  { path: '**', redirectTo: '' }
];
