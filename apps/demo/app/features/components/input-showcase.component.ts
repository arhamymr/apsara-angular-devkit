import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { FormsModule } from '@angular/forms';

interface InputProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-input-showcase',
  standalone: true,
  imports: [CommonModule, InputComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent, FormsModule],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="input" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Input</h2>
        <p class="text-dimmed">Inputs allow users to enter text into a UI</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="grid grid-cols-1 max-w-[320px] gap-4">
                <app-input
                  label="Username"
                  placeholder="Enter your username"
                  [(ngModel)]="inputValue" />
                <p class="text-sm text-dimmed mt-2 font-mono">Value: {{ inputValue }}</p>
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
        <h3 class="text-lg font-semibold text-foreground mb-4">States</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="statesTab()" (changed)="statesTab.set($event)">
            @if (statesTab() === 'preview') {
              <div class="p-6">
                <div class="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-dimmed font-medium">Default</span>
                    <app-input label="Default" placeholder="Placeholder" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-dimmed font-medium">With Hint</span>
                    <app-input
                      label="Email"
                      placeholder="Enter email"
                      hint="We'll never share your email" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-dimmed font-medium">With Error</span>
                    <app-input
                      label="Password"
                      type="password"
                      placeholder="Enter password"
                      error="Password must be at least 8 characters"
                      [showPassword]="showPassword()" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-dimmed font-medium">Disabled</span>
                    <app-input
                      label="Disabled"
                      placeholder="Cannot edit"
                      [disabled]="true" />
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="statesCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Input Types</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="typesTab()" (changed)="typesTab.set($event)">
            @if (typesTab() === 'preview') {
              <div class="p-6">
                <div class="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-dimmed font-medium">Text</span>
                    <app-input type="text" label="Text" placeholder="Text input" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-dimmed font-medium">Email</span>
                    <app-input type="email" label="Email" placeholder="email@example.com" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-dimmed font-medium">Password</span>
                    <app-input
                      type="password"
                      label="Password"
                      placeholder="Enter password"
                      [showPassword]="showPassword()"
                      (suffixClick)="togglePassword()" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-dimmed font-medium">Number</span>
                    <app-input type="number" label="Quantity" placeholder="0" />
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="typesCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Default</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 border-b border-border text-foreground text-dimmed">{{ prop.type }}</td>
          <td class="p-3 border-b border-border text-foreground text-dimmed">{{ prop.default || '-' }}</td>
          <td class="p-3 border-b border-border text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="tableHeader" [tableCellTemplate]="tableCell" />
      </div>
    </section>
  `
})
export class InputShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  statesTab = signal<string>('preview');
  typesTab = signal<string>('preview');

  inputValue = '';
  showPassword = signal(false);

  installCode = `npm install @apsara/ui/input`;

  importCode = `import { InputComponent } from '@apsara/ui/input';`;

  usageCode = `<app-input
  label="Email"
  type="email"
  placeholder="Enter your email"
  hint="We'll never share your email"
  [(ngModel)]="email" />`;

  basicCode = `<app-input
  label="Username"
  placeholder="Enter your username"
  [(ngModel)]="inputValue" />`;

  statesCode = `<app-input label="Default" placeholder="Placeholder" />

<app-input
  label="Email"
  placeholder="Enter email"
  hint="We'll never share your email" />

<app-input
  label="Password"
  type="password"
  placeholder="Enter password"
  error="Password must be at least 8 characters" />

<app-input
  label="Disabled"
  placeholder="Cannot edit"
  [disabled]="true" />`;

  typesCode = `<app-input type="text" label="Text" placeholder="Text input" />
<app-input type="email" label="Email" placeholder="email@example.com" />
<app-input type="password" label="Password" placeholder="Enter password" />
<app-input type="number" label="Quantity" placeholder="0" />`;

  propsData = (): InputProp[] => [
    { name: 'label', type: 'string', default: "''", description: 'Floating label text' },
    { name: 'type', type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url'", default: "'text'", description: 'Input type' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text' },
    { name: 'value', type: 'string', default: "''", description: 'Input value' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input' },
    { name: 'error', type: 'string', default: "''", description: 'Error message text' },
    { name: 'hint', type: 'string', default: "''", description: 'Hint text below input' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Shows required indicator' },
    { name: 'showPassword', type: 'boolean', default: 'false', description: 'Show password toggle button' }
  ];

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }
}
