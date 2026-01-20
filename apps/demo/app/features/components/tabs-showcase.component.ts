import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { tabsShowcaseCode } from './tabs-showcase.code';

interface TabsProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-tabs-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabsComponent,
    AlertComponent,
    AlertTitleComponent,
    AlertDescriptionComponent,
    CardComponent,
    TableComponent,
    CodeSnippetComponent
  ],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="tabs" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Tabs</h2>
        <p class="text-dimmed">Navigation tabs component for organizing content into sections</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="accountTab()" (changed)="accountTab.set($event)">
          @if (accountTab() === 'preview') {
            <div class="p-6">
              <div class="lg:w-6/12 w-full">
                <app-tabs
                  [options]="accountOptions"
                  [modelValue]="accountActiveTab()"
                  (changed)="onAccountTabChange($event)">
                  <div class="flex flex-col gap-4">
                    @if (accountActiveTab() === 'account') {
                      <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-1.5">
                          <label class="text-sm font-medium text-foreground">Name</label>
                          <input
                            type="text"
                            class="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your name"
                            [(ngModel)]="accountForm.name" />
                        </div>
                        <div class="flex flex-col gap-1.5">
                          <label class="text-sm font-medium text-foreground">Email</label>
                          <input
                            type="email"
                            class="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your email"
                            [(ngModel)]="accountForm.email" />
                        </div>
                      </div>
                    }
                    @if (accountActiveTab() === 'password') {
                      <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-1.5">
                          <label class="text-sm font-medium text-foreground">Password</label>
                          <input
                            type="password"
                            class="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your password"
                            [(ngModel)]="accountForm.password" />
                        </div>
                        <div class="flex flex-col gap-1.5">
                          <label class="text-sm font-medium text-foreground">Confirm Password</label>
                          <input
                            type="password"
                            class="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Confirm your password"
                            [(ngModel)]="accountForm.confirmPassword" />
                        </div>
                      </div>
                    }
                  </div>
                </app-tabs>
              </div>
            </div>
          } @else {
            <app-code-snippet [code]="tabsShowcaseCode.accountCode" language="html" />
          }
        </app-tabs>
      </app-card>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Installation</h3>
        <app-code-snippet [code]="installCode" language="bash" />
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Usage</h3>
        <app-code-snippet [code]="tabsShowcaseCode.importCode" language="typescript" />
        <app-code-snippet [code]="tabsShowcaseCode.usageCode" language="html" />
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">States</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="statesTab()" (changed)="statesTab.set($event)">
            @if (statesTab() === 'preview') {
              <div class="p-6">
                <div class="lg:w-6/12 w-full">
                  <app-tabs
                    [options]="statesOptions"
                    [modelValue]="statesActiveTab()"
                    (changed)="onStatesTabChange($event)">
                    <div class="flex flex-col gap-4">
                      @if (statesActiveTab() === 'tab1') {
                        <p class="text-sm text-dimmed">This is the active tab content.</p>
                      }
                      @if (statesActiveTab() === 'tab2') {
                        <p class="text-sm text-dimmed">This is another tab content.</p>
                      }
                      @if (statesActiveTab() === 'tab3') {
                        <p class="text-sm text-dimmed">This tab is disabled.</p>
                      }
                    </div>
                  </app-tabs>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="tabsShowcaseCode.statesCode" language="html" />
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
export class TabsShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  accountTab = signal<string>('preview');
  statesTab = signal<string>('preview');
  accountActiveTab = signal<string>('account');
  statesActiveTab = signal<string>('tab1');

  accountOptions = [
    { value: 'account', label: 'Account' },
    { value: 'password', label: 'Password' }
  ];

  statesOptions = [
    { value: 'tab1', label: 'Active Tab' },
    { value: 'tab2', label: 'Another Tab' },
    { value: 'tab3', label: 'Disabled', disabled: true }
  ];

  accountForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  installCode = `npm install @apsara/ui/tabs`;

  onAccountTabChange(value: string) {
    this.accountActiveTab.set(value);
  }

  onStatesTabChange(value: string) {
    this.statesActiveTab.set(value);
  }

  propsData = (): TabsProp[] => [
    { name: 'options', type: 'Array of TabOption', description: 'Array of tab options with value, label, and disabled' },
    { name: 'modelValue', type: 'string', default: "''", description: 'Currently selected tab value' },
    { name: 'ariaLabel', type: 'string', default: "'Tab options'", description: 'Accessibility label' },
    { name: 'changed', type: 'EventEmitter<string>', description: 'Emits when tab selection changes' }
  ];

  tabsShowcaseCode = tabsShowcaseCode;
}
