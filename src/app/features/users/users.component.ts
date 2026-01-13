import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  template: `
    <div class="page-container p-6">
      <h1 class="text-2xl font-semibold mb-2">Users</h1>
      <p class="text-gray-600 mb-6">User management - Coming soon</p>
      <div class="placeholder-card p-8 text-center text-gray-400">
        User management under development
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1200px; margin: 0 auto; padding: 32px; }
    .placeholder-card { background: #f5f5f5; border-radius: 8px; }
  `]
})
export class UsersComponent {}
