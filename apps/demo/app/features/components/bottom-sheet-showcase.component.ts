import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent } from '@aether/ui';
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
  imports: [CommonModule, BottomSheetComponent, ButtonComponent, CardComponent, TabsComponent, TableComponent, LucideAngularModule, CodeSnippetComponent],
  template: `
    <section id="bottom-sheet" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Bottom Sheet</h2>
        <p class="text-muted-foreground">A panel that slides up from the bottom of the screen with configurable height</p>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Default Height (50%)</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="defaultTab()" (changed)="defaultTab.set($event)">
            @if (defaultTab() === 'preview') {
              <div class="p-6">
                <app-button label="Open Default Height (50%)" (clicked)="openDefaultSheet()" />
              </div>
            } @else {
              <app-code-snippet [code]="defaultCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <app-bottom-sheet
        [isOpen]="isDefaultSheetOpen()"
        title="Default Height"
        [hasHandle]="true"
        (closed)="onDefaultSheetClose()">
        <div class="space-y-4">
          <p class="text-sm text-gray-600">This is the default bottom sheet height (50% of viewport).</p>
          <p class="text-sm text-gray-600">No height prop needed - it defaults to 50%.</p>
          <button class="w-full py-2 px-4 bg-primary text-primary-foreground rounded hover:opacity-90">Action Button</button>
        </div>
      </app-bottom-sheet>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">60% Height</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="height60Tab()" (changed)="height60Tab.set($event)">
            @if (height60Tab() === 'preview') {
              <div class="p-6">
                <app-button label="Open 60% Height Sheet" (clicked)="open60Sheet()" />
              </div>
            } @else {
              <app-code-snippet [code]="height60Code" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <app-bottom-sheet
        [isOpen]="is60SheetOpen()"
        title="60% Height"
        [hasHandle]="true"
        [height]="60"
        (closed)="on60SheetClose()">
        <div class="space-y-4">
          <p class="text-sm text-gray-600">This bottom sheet takes up 60% of the viewport height.</p>
          <p class="text-sm text-gray-600">Perfect for displaying moderate amount of content.</p>
          <div class="space-y-2">
            <p class="text-sm text-gray-600">Additional content example:</p>
            <div class="p-3 bg-muted rounded">Item 1</div>
            <div class="p-3 bg-muted rounded">Item 2</div>
            <div class="p-3 bg-muted rounded">Item 3</div>
          </div>
        </div>
      </app-bottom-sheet>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">75% Height</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="height75Tab()" (changed)="height75Tab.set($event)">
            @if (height75Tab() === 'preview') {
              <div class="p-6">
                <app-button label="Open 75% Height Sheet" (clicked)="open75Sheet()" />
              </div>
            } @else {
              <app-code-snippet [code]="height75Code" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <app-bottom-sheet
        [isOpen]="is75SheetOpen()"
        title="75% Height"
        [hasHandle]="true"
        [height]="75"
        (closed)="on75SheetClose()">
        <div class="space-y-4">
          <p class="text-sm text-gray-600">This bottom sheet takes up 75% of the viewport height.</p>
          <p class="text-sm text-gray-600">Great for displaying longer content or forms.</p>
          <div class="space-y-2">
            <div class="p-3 bg-muted rounded">Form Field 1</div>
            <div class="p-3 bg-muted rounded">Form Field 2</div>
            <div class="p-3 bg-muted rounded">Form Field 3</div>
            <div class="p-3 bg-muted rounded">Form Field 4</div>
            <div class="p-3 bg-muted rounded">Form Field 5</div>
          </div>
          <button class="w-full py-2 px-4 bg-primary text-primary-foreground rounded hover:opacity-90">Submit</button>
        </div>
      </app-bottom-sheet>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Full Height (100%)</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="height100Tab()" (changed)="height100Tab.set($event)">
            @if (height100Tab() === 'preview') {
              <div class="p-6">
                <app-button label="Open Full Height Sheet" (clicked)="open100Sheet()" />
              </div>
            } @else {
              <app-code-snippet [code]="height100Code" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <app-bottom-sheet
        [isOpen]="is100SheetOpen()"
        title="Full Height"
        [hasHandle]="true"
        [height]="100"
        (closed)="on100SheetClose()">
        <div class="space-y-4">
          <p class="text-sm text-gray-600">This bottom sheet takes up the full viewport height (100%).</p>
          <p class="text-sm text-gray-600">Maximum height for displaying extensive content.</p>
          <div class="space-y-2">
            <div class="p-3 bg-muted rounded">Content Item 1</div>
            <div class="p-3 bg-muted rounded">Content Item 2</div>
            <div class="p-3 bg-muted rounded">Content Item 3</div>
            <div class="p-3 bg-muted rounded">Content Item 4</div>
            <div class="p-3 bg-muted rounded">Content Item 5</div>
            <div class="p-3 bg-muted rounded">Content Item 6</div>
            <div class="p-3 bg-muted rounded">Content Item 7</div>
            <div class="p-3 bg-muted rounded">Content Item 8</div>
          </div>
          <button class="w-full py-2 px-4 bg-primary text-primary-foreground rounded hover:opacity-90">Save Changes</button>
        </div>
      </app-bottom-sheet>

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
        <h3 class="text-lg font-semibold text-foreground mb-4">Installation</h3>
        <app-code-snippet [code]="installCode" language="bash" />
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Usage</h3>
        <app-code-snippet [code]="importCode" language="typescript" />
        <app-code-snippet [code]="usageCode" language="html" />
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 text-foreground"><code class="bg-muted px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
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

  defaultTab = signal<string>('preview');
  height60Tab = signal<string>('preview');
  height75Tab = signal<string>('preview');
  height100Tab = signal<string>('preview');
  shareTab = signal<string>('preview');
  isOpen = signal(false);
  isDefaultSheetOpen = signal(false);
  is60SheetOpen = signal(false);
  is75SheetOpen = signal(false);
  is100SheetOpen = signal(false);

  installCode = `npm install @aether/ui/bottom-sheet`;

  importCode = `import { BottomSheetComponent } from '@aether/ui/bottom-sheet';`;

  usageCode = `<app-bottom-sheet
  [isOpen]="isOpen"
  title="Share"
  [hasHandle]="true"
  [height]="60"
  (closed)="onClose()">
  Content goes here
</app-bottom-sheet>`;

  defaultCode = `<app-bottom-sheet
  [isOpen]="isOpen()"
  title="Default Height"
  [hasHandle]="true"
  (closed)="onClose()">
  Content (50% height by default)
</app-bottom-sheet>`;

  height60Code = `<app-bottom-sheet
  [isOpen]="isOpen()"
  title="60% Height"
  [hasHandle]="true"
  [height]="60"
  (closed)="onClose()">
  Content at 60% viewport height
</app-bottom-sheet>`;

  height75Code = `<app-bottom-sheet
  [isOpen]="isOpen()"
  title="75% Height"
  [hasHandle]="true"
  [height]="75"
  (closed)="onClose()">
  Content at 75% viewport height
</app-bottom-sheet>`;

  height100Code = `<app-bottom-sheet
  [isOpen]="isOpen()"
  title="Full Height"
  [hasHandle]="true"
  [height]="100"
  (closed)="onClose()">
  Content at full viewport height
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
    { name: 'height', type: 'number', description: 'Height of bottom sheet in viewport height percentage (20-100, default: 50)' },
    { name: 'closed', type: 'EventEmitter<void>', description: 'Emitted when the sheet is closed' }
  ];

  openDefaultSheet(): void {
    this.isDefaultSheetOpen.set(true);
  }

  open60Sheet(): void {
    this.is60SheetOpen.set(true);
  }

  open75Sheet(): void {
    this.is75SheetOpen.set(true);
  }

  open100Sheet(): void {
    this.is100SheetOpen.set(true);
  }

  openShareSheet(): void {
    this.isOpen.set(true);
  }

  onDefaultSheetClose(): void {
    this.isDefaultSheetOpen.set(false);
  }

  on60SheetClose(): void {
    this.is60SheetOpen.set(false);
  }

  on75SheetClose(): void {
    this.is75SheetOpen.set(false);
  }

  on100SheetClose(): void {
    this.is100SheetOpen.set(false);
  }

  onClose(): void {
    this.isOpen.set(false);
  }
}
