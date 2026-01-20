import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent, ListItemComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { LucideAngularModule, Inbox, Send, File } from 'lucide-angular';

interface ListProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-list-showcase',
  standalone: true,
  imports: [CommonModule, ListComponent, ListItemComponent, CardComponent, TabsComponent, TableComponent, LucideAngularModule, CodeSnippetComponent],
  template: `
    <section id="list" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">List</h2>
        <p class="text-dimmed">A list component for displaying a collection of items</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <app-list>
                <app-list-item [title]="'Inbox'" [subtitle]="'5 new messages'" (clicked)="onItemClick('Inbox')">
                  <lucide-angular [img]="Inbox" leading class="text-gray-400" />
                </app-list-item>
                <app-list-item [title]="'Sent'" [subtitle]="'12 sent items'" (clicked)="onItemClick('Sent')">
                  <lucide-angular [img]="Send" leading class="text-gray-400" />
                </app-list-item>
                <app-list-item [title]="'Drafts'" (clicked)="onItemClick('Drafts')">
                  <lucide-angular [img]="File" leading class="text-gray-400" />
                </app-list-item>
              </app-list>
              <div class="p-4 bg-blue-50 rounded-lg mt-4">
                <p class="text-sm text-blue-600">
                  <strong>Last clicked:</strong> {{ lastClicked() || 'None' }}
                </p>
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
export class ListShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');

  Inbox = Inbox;
  Send = Send;
  File = File;
  lastClicked = signal<string>('');

  installCode = `npm install @apsara/ui/list`;

  importCode = `import { ListComponent, ListItemComponent } from '@apsara/ui/list';`;

  usageCode = `<app-list>
  <app-list-item
    [title]="'Inbox'"
    [subtitle]="'5 new messages'"
    (clicked)="onItemClick($event)">
    <lucide-angular [img]="Inbox" leading />
  </app-list-item>
</app-list>`;

  basicCode = `<app-list>
  <app-list-item [title]="'Inbox'" [subtitle]="'5 new messages'">
    <lucide-angular [img]="Inbox" leading class="text-gray-400" />
  </app-list-item>
  <app-list-item [title]="'Sent'" [subtitle]="'12 sent items'">
    <lucide-angular [img]="Send" leading class="text-gray-400" />
  </app-list-item>
  <app-list-item [title]="'Drafts'">
    <lucide-angular [img]="File" leading class="text-gray-400" />
  </app-list-item>
</app-list>`;

  propsData = (): ListProp[] => [
    { name: 'title', type: 'string', description: 'List item title' },
    { name: 'subtitle', type: 'string', description: 'List item subtitle' },
    { name: 'clicked', type: 'EventEmitter<string>', description: 'Emitted when item is clicked' }
  ];

  onItemClick(item: string): void {
    this.lastClicked.set(item);
  }
}
