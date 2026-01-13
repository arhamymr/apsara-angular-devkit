import { Component, importProvidersFrom } from '@angular/core';
import { LucideAngularModule, Home, File, Menu, User, Settings } from 'lucide-angular';

@Component({
  selector: 'app-icons-demo',
  standalone: true,
  template: `
    <div class="icons-demo">
      <h2>Lucide Icons Demo</h2>
      
      <div class="icons-grid">
        <div class="icon-item">
          <lucide-angular [img]="HomeIcon" [size]="32"></lucide-angular>
          <span>Home</span>
        </div>
        
        <div class="icon-item">
          <lucide-angular [img]="FileIcon" [size]="32"></lucide-angular>
          <span>File</span>
        </div>
        
        <div class="icon-item">
          <lucide-angular [img]="MenuIcon" [size]="32"></lucide-angular>
          <span>Menu</span>
        </div>
        
        <div class="icon-item">
          <lucide-angular [img]="UserIcon" [size]="32"></lucide-angular>
          <span>User</span>
        </div>
        
        <div class="icon-item">
          <lucide-angular [img]="SettingsIcon" [size]="32"></lucide-angular>
          <span>Settings</span>
        </div>
      </div>
      
      <div class="customization">
        <h3>Customization</h3>
        <lucide-angular [img]="HomeIcon" [size]="48" color="#3b82f6" [strokeWidth]="1.5"></lucide-angular>
        <lucide-angular [img]="FileIcon" [size]="24" color="#ef4444"></lucide-angular>
      </div>
    </div>
  `,
  styles: [`
    .icons-demo {
      padding: 2rem;
      font-family: system-ui, -apple-system, sans-serif;
    }
    
    .icons-demo h2 {
      color: #1f2937;
      margin-bottom: 1.5rem;
    }
    
    .icons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: #f9fafb;
      border-radius: 0.5rem;
      transition: background 0.2s;
    }
    
    .icon-item:hover {
      background: #f3f4f6;
    }
    
    .icon-item span {
      color: #6b7280;
      font-size: 0.875rem;
    }
    
    .customization {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
      background: #f9fafb;
      border-radius: 0.5rem;
    }
    
    .customization h3 {
      color: #1f2937;
      margin: 0;
    }
  `]
})
export class IconsDemoComponent {
  readonly HomeIcon = Home;
  readonly FileIcon = File;
  readonly MenuIcon = Menu;
  readonly UserIcon = User;
  readonly SettingsIcon = Settings;
}