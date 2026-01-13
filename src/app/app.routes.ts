import { Routes } from '@angular/router';
import { HomeComponent, AboutComponent, UsersComponent, SettingsComponent, AuthComponent, DocsComponent } from './features';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users', component: UsersComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'auth/login', component: AuthComponent },
  { path: 'auth/register', component: AuthComponent },
  { path: 'docs', component: DocsComponent },
  { path: '**', redirectTo: '' }
];
