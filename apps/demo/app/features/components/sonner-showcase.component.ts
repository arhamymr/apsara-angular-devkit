import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, AlertTitleComponent, AlertDescriptionComponent, ButtonComponent, CardComponent, TabsComponent, toast } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

@Component({
  selector: 'app-sonner-showcase',
  standalone: true,
  imports: [CommonModule, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, ButtonComponent, CardComponent, TabsComponent, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="sonner" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Sonner</h2>
        <p class="text-muted-foreground">An opinionated toast component for Angular.</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex flex-wrap gap-3">
                <app-button (clicked)="showToast('default')">Default</app-button>
                <app-button (clicked)="showToast('description')">Description</app-button>
                <app-button variant="secondary" (clicked)="showToast('success')">Success</app-button>
                <app-button variant="secondary" (clicked)="showToast('info')">Info</app-button>
                <app-button variant="secondary" (clicked)="showToast('warning')">Warning</app-button>
                <app-button variant="destructive" (clicked)="showToast('error')">Error</app-button>
                <app-button variant="outline" (clicked)="showToast('action')">Action</app-button>
                <app-button variant="outline" (clicked)="showToast('promise')">Promise</app-button>
              </div>
            </div>
          } @else {
            <app-code-snippet [code]="basicCode" language="typescript" />
          }
        </app-tabs>
      </app-card>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Installation</h3>
        <app-code-snippet [code]="installCode" language="bash" />
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Usage</h3>
        <app-code-snippet [code]="usageCode" language="typescript" />
      </div>
    </section>
  `
})
export class SonnerShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');

  installCode = `npm install ngx-sonner`;

  usageCode = `import { Component } from '@angular/core';
import { toast } from 'ngx-sonner'; // or from @apsara/ui

@Component({...})
export class MyComponent {
  showToast() {
    toast('My first toast');
  }
}`;

  basicCode = `toast('Event has been created');

toast.message('Event has been created', {
  description: 'Monday, January 3rd at 6:00pm',
});

toast.success('Event has been created');

toast.info('Event has been created');

toast.warning('Event has been created');

toast.error('Event has not been created');

toast('Event has been created', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo')
  },
});

toast.promise(promise, {
  loading: 'Loading...',
  success: (data) => {
    return \`\${data.name} toast has been added\`;
  },
  error: 'Error',
});
`;

  showToast(type: string): void {
    switch (type) {
      case 'default':
        toast('Event has been created');
        break;
      case 'description':
        toast.message('Event has been created', {
          description: 'Monday, January 3rd at 6:00pm',
        });
        break;
      case 'success':
        toast.success('Event has been created');
        break;
      case 'info':
        toast.info('Event has been created');
        break;
      case 'warning':
        toast.warning('Event has been created');
        break;
      case 'error':
        toast.error('Event has not been created');
        break;
      case 'action':
        toast('Event has been created', {
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo')
          },
        });
        break;
      case 'promise':
        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
        toast.promise(promise, {
          loading: 'Loading...',
          success: (data: any) => {
            return `${data.name} toast has been added`;
          },
          error: 'Error',
        });
        break;
    }
  }
}
