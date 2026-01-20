import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { LucideAngularModule, Mail, MessageSquare, Link } from 'lucide-angular';

interface BottomSheetProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-bottom-sheet-showcase',
  standalone: true,
  imports: [CommonModule, BottomSheetComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent, LucideAngularModule, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="bottom-sheet" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Bottom Sheet</h2>
        <p class="text-dimmed">A panel that slides up from the bottom of the screen</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <app-button label="Open Bottom Sheet" (clicked)="openBottomSheet()" />
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

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">With Share Options</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="shareTab()" (changed)="shareTab.set($event)">
            @if (shareTab() === 'preview') {
              <div class="p-6">
                <app-button label="Open Share Sheet" (clicked)="openShareSheet()" />
              </div>
            } @else {
              <app-code-snippet [code]="shareCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <app-bottom-sheet
        [isOpen]="isOpen()"
        title="Share"
        [hasHandle]="true"
        (closed)="onClose()">
        <div class="space-y-4">
          <p class="text-sm text-gray-600">Choose how you want to share this content:</p>
          <div class="grid grid-cols-3 gap-4">
            <button class="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-100">
              <lucide-angular [img]="Mail" class="text-blue-500" />
              <span class="text-sm">Email</span>
            </button>
            <button class="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-100">
              <lucide-angular [img]="MessageSquare" class="text-green-500" />
              <span class="text-sm">Message</span>
            </button>
            <button class="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-100">
              <lucide-angular [img]="Link" class="text-blue-700" />
              <span class="text-sm">Copy Link</span>
            </button>
          </div>
        </div>
      </app-bottom-sheet>

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
export class BottomSheetShowcaseComponent {
  Mail = Mail;
  MessageSquare = MessageSquare;
  Link = Link;
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  shareTab = signal<string>('preview');
  isOpen = signal(false);

  installCode = `npm install @apsara/ui/bottom-sheet`;

  importCode = `import { BottomSheetComponent } from '@apsara/ui/bottom-sheet';`;

  usageCode = `<app-bottom-sheet
  [isOpen]="isOpen"
  title="Share"
  [hasHandle]="true"
  (closed)="onClose()">
  Content goes here
</app-bottom-sheet>`;

  basicCode = `<app-button label="Open Bottom Sheet" (clicked)="openBottomSheet()" />

<app-bottom-sheet
  [isOpen]="isOpen()"
  title="Title"
  [hasHandle]="true"
  (closed)="onClose()">
  Content goes here
</app-bottom-sheet>`;

  shareCode = `<app-bottom-sheet
  [isOpen]="isOpen()"
  title="Share"
  [hasHandle]="true"
  (closed)="onClose()">
  <p class="text-sm text-gray-600">Choose how you want to share:</p>
  <div class="grid grid-cols-3 gap-4">
    <button>Email</button>
    <button>Message</button>
    <button>Copy Link</button>
  </div>
</app-bottom-sheet>`;

  propsData = (): BottomSheetProp[] => [
    { name: 'isOpen', type: 'boolean', description: 'Controls whether the bottom sheet is visible' },
    { name: 'title', type: 'string', description: 'Title displayed in the header' },
    { name: 'hasHandle', type: 'boolean', description: 'Shows a drag handle at the top' },
    { name: 'closed', type: 'EventEmitter<void>', description: 'Emitted when the sheet is closed' }
  ];

  openBottomSheet(): void {
    this.isOpen.set(true);
  }

  openShareSheet(): void {
    this.isOpen.set(true);
  }

  onClose(): void {
    this.isOpen.set(false);
  }
}
