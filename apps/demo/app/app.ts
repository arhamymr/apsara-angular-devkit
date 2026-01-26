import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent, FooterComponent } from './shared/components';
import { SonnerComponent } from '@apsara/ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SonnerComponent],
  template: `
    <app-navbar />
    <main class="app-container">
      <router-outlet />
    </main>
    <app-footer />
    <app-sonner />
  `,
  styleUrl: './app.css'
})
export class App {}
