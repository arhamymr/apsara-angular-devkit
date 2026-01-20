import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface ChipProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-chips-showcase',
  standalone: true,
  imports: [CommonModule, ChipsComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <section id="chips" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Chips</h2>
        <p class="text-dimmed">Chips are compact elements that represent an input, attribute, or action</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex flex-col gap-4">
                <app-chips
                  [modelValue]="tags()"
                  [addable]="true"
                  [placeholder]="'Add a tag...'"
                  (changed)="onTagsChange($event)" />
                <div class="p-4 bg-blue-50 rounded-lg">
                  <p class="text-sm text-blue-600">
                    <strong>Tags:</strong> {{ getTagsString() }}
                  </p>
                </div>
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Removable Tags</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="removableTab()" (changed)="removableTab.set($event)">
            @if (removableTab() === 'preview') {
              <div class="p-6">
                <app-chips
                  [modelValue]="removableTags()"
                  [addable]="false"
                  [placeholder]="'Enter tags'"
                  (changed)="onRemovableTagsChange($event)" />
              </div>
            } @else {
              <app-code-snippet [code]="removableCode" language="html" />
            }
          </app-tabs>
        </app-card>
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
export class ChipsShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  removableTab = signal<string>('preview');

  tags = signal([
    { value: '1', label: 'JavaScript' },
    { value: '2', label: 'TypeScript' },
    { value: '3', label: 'Angular' }
  ]);

  removableTags = signal([
    { value: '1', label: 'React' },
    { value: '2', label: 'Vue' }
  ]);

  installCode = `npm install @apsara/ui/chips`;

  importCode = `import { ChipsComponent } from '@apsara/ui/chips';`;

  usageCode = `<app-chips
  [modelValue]="tags"
  [addable]="true"
  [placeholder]="'Add a tag...'"
  (changed)="onTagsChange($event)" />`;

  basicCode = `<app-chips
  [modelValue]="tags()"
  [addable]="true"
  [placeholder]="'Add a tag...'"
  (changed)="onTagsChange($event)" />`;

  removableCode = `<app-chips
  [modelValue]="removableTags()"
  [addable]="false"
  (changed)="onRemovableTagsChange($event)" />`;

  propsData = (): ChipProp[] => [
    { name: 'modelValue', type: 'Array<{ value: string; label: string }>', description: 'Array of chip items' },
    { name: 'addable', type: 'boolean', description: 'Allows adding new chips' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text for input' },
    { name: 'changed', type: 'EventEmitter<Array>', description: 'Emitted when chips change' }
  ];

  getTagsString(): string {
    const tags = this.tags();
    if (tags.length === 0) return 'None';
    return tags.map(t => t.label).join(', ');
  }

  onTagsChange(tags: Array<{ value: string; label: string }>): void {
    this.tags.set(tags);
  }

  onRemovableTagsChange(tags: Array<{ value: string; label: string }>): void {
    this.removableTags.set(tags);
  }
}
