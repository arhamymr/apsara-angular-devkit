import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface AutocompleteProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-autocomplete-showcase',
  standalone: true,
  imports: [CommonModule, AutocompleteComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="autocomplete" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Autocomplete</h2>
        <p class="text-dimmed">Input field with suggestions dropdown for quick selection</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="max-w-md">
                <app-autocomplete
                  [options]="searchOptions"
                  [placeholder]="'Search for a programming language...'"
                  (optionSelected)="onLanguageSelect($event)" />
              </div>
              <div class="mt-4 p-4 bg-card rounded-lg border border-border">
                <p class="text-sm text-foreground">
                  <strong>Selected Language:</strong> {{ selectedLanguage() || 'None' }}
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
        <h3 class="text-lg font-semibold text-foreground mb-4">With Icons</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="iconsTab()" (changed)="iconsTab.set($event)">
            @if (iconsTab() === 'preview') {
              <div class="p-6">
                <div class="max-w-md">
                  <app-autocomplete
                    [options]="searchOptions"
                    [placeholder]="'Search with icons...'"
                    [leadingIcon]="'search'"
                    (optionSelected)="onLanguageSelect($event)" />
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="iconsCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Disabled</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="disabledTab()" (changed)="disabledTab.set($event)">
            @if (disabledTab() === 'preview') {
              <div class="p-6">
                <div class="max-w-md">
                  <app-autocomplete
                    [options]="searchOptions"
                    [placeholder]="'Disabled autocomplete'"
                    [disabled]="true" />
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="disabledCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Default</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 text-foreground">{{ prop.type }}</td>
          <td class="p-3 text-foreground">{{ prop.default || '-' }}</td>
          <td class="p-3 text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="tableHeader" [tableCellTemplate]="tableCell" />
      </div>
    </section>
  `
})
export class AutocompleteShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  iconsTab = signal<string>('preview');
  disabledTab = signal<string>('preview');

  selectedLanguage = signal<string>('');

  installCode = `npm install @apsara/ui/autocomplete`;

  importCode = `import { AutocompleteComponent } from '@apsara/ui/autocomplete';`;

  usageCode = `<app-autocomplete
  [options]="options"
  [placeholder]="'Search...'"
  (optionSelected)="onSelect($event)" />`;

  basicCode = `<app-autocomplete
  [options]="searchOptions"
  [placeholder]="'Search for a programming language...'"
  (optionSelected)="onLanguageSelect($event)" />`;

  iconsCode = `<app-autocomplete
  [options]="searchOptions"
  [placeholder]="'Search with icons...'"
  [leadingIcon]="'search'"
  (optionSelected)="onLanguageSelect($event)" />`;

  disabledCode = `<app-autocomplete
  [options]="searchOptions"
  [placeholder]="'Disabled autocomplete'"
  [disabled]="true" />`;

  searchOptions = [
    { value: 'javascript', label: 'JavaScript', icon: 'code' },
    { value: 'typescript', label: 'TypeScript', icon: 'code' },
    { value: 'python', label: 'Python', icon: 'code' },
    { value: 'java', label: 'Java', icon: 'code' },
    { value: 'csharp', label: 'C#', icon: 'code' },
    { value: 'cpp', label: 'C++', icon: 'code' },
    { value: 'go', label: 'Go', icon: 'code' },
    { value: 'rust', label: 'Rust', icon: 'code' },
    { value: 'ruby', label: 'Ruby', icon: 'code' },
    { value: 'php', label: 'PHP', icon: 'code' }
  ];

  onLanguageSelect(option: { value: string; label: string }): void {
    this.selectedLanguage.set(option.label);
  }

  propsData = (): AutocompleteProp[] => [
    { name: 'options', type: 'Array<{ value: string; label: string; icon?: string }>', description: 'Array of options to display' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text for the input' },
    { name: 'leadingIcon', type: 'string', description: 'Icon name to display at the start' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the autocomplete' },
    { name: 'optionSelected', type: 'EventEmitter<{ value: string; label: string }>', description: 'Emitted when an option is selected' }
  ];
}
