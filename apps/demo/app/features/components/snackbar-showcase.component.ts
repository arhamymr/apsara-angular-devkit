import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface SnackbarProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-snackbar-showcase',
  standalone: true,
  imports: [CommonModule, SnackbarComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="snackbar" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Snackbar</h2>
        <p class="text-dimmed">A snackbar component for displaying brief notifications</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex flex-wrap gap-3">
                <app-button label="Show Success" (clicked)="showSnackbar('success')" />
                <app-button label="Show Error" variant="danger" (clicked)="showSnackbar('error')" />
                <app-button label="Show Info" variant="secondary" (clicked)="showSnackbar('info')" />
                <app-button label="Show with Action" variant="plain" (clicked)="showSnackbar('action')" />
              </div>
            </div>
          } @else {
            <app-code-snippet [code]="basicCode" language="html" />
          }
        </app-tabs>
      </app-card>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Installation</h3>
        <app-code-snippet [code]="installCode" language="bash" />
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Usage</h3>
        <app-code-snippet [code]="importCode" language="typescript" />
        <app-code-snippet [code]="usageCode" language="html" />
      </div>

      <app-snackbar
        [isOpen]="snackbarOpen()"
        [title]="snackbarTitle()"
        [message]="snackbarMessage()"
        [icon]="snackbarIcon()"
        [action]="snackbarAction()"
        [duration]="4000"
        (closed)="onSnackbarClose()"
        (actionClicked)="onActionClick()" />

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 text-foreground">{{ prop.type }}</td>
          <td class="p-3 text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="tableHeader" [tableCellTemplate]="tableCell" />
      </div>
    </section>
  `
})
export class SnackbarShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  snackbarOpen = signal(false);
  snackbarTitle = signal('');
  snackbarMessage = signal('');
  snackbarIcon = signal('');
  snackbarAction = signal('');

  installCode = `npm install @apsara/ui/snackbar`;

  importCode = `import { SnackbarComponent } from '@apsara/ui/snackbar';`;

  usageCode = `<app-snackbar
  [isOpen]="isOpen"
  [title]="'Success'"
  [message]="'Changes saved'"
  [duration]="4000"
  (closed)="onClose()" />`;

  basicCode = `<app-button label="Show Success" (clicked)="showSnackbar('success')" />
<app-button label="Show Error" variant="danger" (clicked)="showSnackbar('error')" />
<app-button label="Show Info" variant="secondary" (clicked)="showSnackbar('info')" />

<app-snackbar
  [isOpen]="snackbarOpen()"
  [title]="snackbarTitle()"
  [message]="snackbarMessage()"
  [icon]="snackbarIcon()"
  [action]="snackbarAction()"
  [duration]="4000"
  (closed)="onSnackbarClose()" />`;

  propsData = (): SnackbarProp[] => [
    { name: 'isOpen', type: 'boolean', description: 'Controls snackbar visibility' },
    { name: 'title', type: 'string', description: 'Snackbar title' },
    { name: 'message', type: 'string', description: 'Snackbar message' },
    { name: 'icon', type: 'string', description: 'Icon name' },
    { name: 'action', type: 'string', description: 'Action button text' },
    { name: 'duration', type: 'number', description: 'Display duration in ms' },
    { name: 'closed', type: 'EventEmitter<void>', description: 'Emitted when snackbar closes' },
    { name: 'actionClicked', type: 'EventEmitter<void>', description: 'Emitted when action is clicked' }
  ];

  showSnackbar(type: string): void {
    switch (type) {
      case 'success':
        this.snackbarTitle.set('Success');
        this.snackbarMessage.set('Your changes have been saved.');
        this.snackbarIcon.set('check_circle');
        this.snackbarAction.set('');
        break;
      case 'error':
        this.snackbarTitle.set('Error');
        this.snackbarMessage.set('Something went wrong. Please try again.');
        this.snackbarIcon.set('error');
        this.snackbarAction.set('Retry');
        break;
      case 'info':
        this.snackbarTitle.set('Info');
        this.snackbarMessage.set('New updates are available.');
        this.snackbarIcon.set('info');
        this.snackbarAction.set('');
        break;
      case 'action':
        this.snackbarTitle.set('Reminder');
        this.snackbarMessage.set('You have a meeting in 10 minutes.');
        this.snackbarIcon.set('notifications');
        this.snackbarAction.set('View');
        break;
    }
    this.snackbarOpen.set(true);
  }

  onSnackbarClose(): void {
    this.snackbarOpen.set(false);
  }

  onActionClick(): void {
    console.log('Snackbar action clicked');
  }
}
