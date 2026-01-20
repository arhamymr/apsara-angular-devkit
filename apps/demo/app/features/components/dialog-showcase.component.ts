import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface DialogProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-dialog-showcase',
  standalone: true,
  imports: [CommonModule, DialogComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <section id="dialog" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Dialog</h2>
        <p class="text-dimmed">A modal dialog component for focused interactions</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex flex-wrap gap-3">
                <app-button label="Open Simple Dialog" (clicked)="openDialog('simple')" />
                <app-button label="Open Form Dialog" variant="secondary" (clicked)="openDialog('form')" />
                <app-button label="Open Confirmation" variant="danger" (clicked)="openDialog('confirm')" />
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

      <app-dialog
        [isOpen]="dialogs()['simple']()"
        title="Simple Dialog"
        (closed)="onDialogClose('simple', $event)">
        <p class="text-sm text-gray-600">
          This is a simple dialog with a title and content.
          You can close it by clicking the X button or clicking outside.
        </p>
      </app-dialog>

      <app-dialog
        [isOpen]="dialogs()['form']()"
        title="Form Dialog"
        (closed)="onDialogClose('form', $event)">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter your name" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter your email" />
          </div>
        </div>
        <div dialog-actions class="flex gap-3">
          <app-button label="Cancel" variant="tertiary" (clicked)="onDialogClose('form', { action: 'cancel' })" />
          <app-button label="Submit" (clicked)="onDialogClose('form', { action: 'confirm' })" />
        </div>
      </app-dialog>

      <app-dialog
        [isOpen]="dialogs()['confirm']()"
        title="Confirm Delete"
        (closed)="onDialogClose('confirm', $event)">
        <p class="text-sm text-gray-600">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div dialog-actions class="flex gap-3">
          <app-button label="Cancel" variant="tertiary" (clicked)="onDialogClose('confirm', { action: 'cancel' })" />
          <app-button label="Delete" variant="danger" (clicked)="onDialogClose('confirm', { action: 'confirm' })" />
        </div>
      </app-dialog>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 border-b border-border text-foreground text-dimmed">{{ prop.type }}</td>
          <td class="p-3 border-b border-border text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="tableHeader" [tableCellTemplate]="tableCell" />
      </div>
    </section>
  `
})
export class DialogShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  dialogs = signal<{ [key: string]: () => boolean }>({
    simple: () => false,
    form: () => false,
    confirm: () => false
  });
  lastAction = signal<string>('');

  installCode = `npm install @apsara/ui/dialog`;

  importCode = `import { DialogComponent } from '@apsara/ui/dialog';`;

  usageCode = `<app-dialog
  [isOpen]="isOpen"
  title="Dialog Title"
  (closed)="onClose()">
  Dialog content goes here
</app-dialog>`;

  basicCode = `<app-button label="Open Dialog" (clicked)="openDialog()" />

<app-dialog
  [isOpen]="dialogs()['simple']()"
  title="Simple Dialog"
  (closed)="onDialogClose('simple', $event)">
  <p class="text-sm text-gray-600">Dialog content here.</p>
</app-dialog>`;

  propsData = (): DialogProp[] => [
    { name: 'isOpen', type: 'boolean', description: 'Controls dialog visibility' },
    { name: 'title', type: 'string', description: 'Dialog title' },
    { name: 'closed', type: 'EventEmitter<DialogResult>', description: 'Emitted when dialog closes' }
  ];

  openDialog(key: string): void {
    this.dialogs.update(d => ({ ...d, [key]: () => true }));
  }

  onDialogClose(key: string, result: { action: string }): void {
    this.dialogs.update(d => ({ ...d, [key]: () => false }));
    this.lastAction.set(`${result.action} (${key})`);
  }
}
