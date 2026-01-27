import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { SlideToggleComponent } from '@apsara/ui';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

interface SwitchProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-switch-showcase',
  standalone: true,
  imports: [CommonModule, SlideToggleComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent, FormsModule, ReactiveFormsModule],
  template: `
    <section id="switch" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Switch</h2>
        <p class="text-muted-foreground">A toggle switch component for binary on/off selections</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-foreground">Unchecked</span>
                  <app-slide-toggle [label]="''" />
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-foreground">Checked</span>
                  <app-slide-toggle [checked]="true" [label]="''" />
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-foreground">With Label</span>
                  <app-slide-toggle [label]="'Enable notifications'" [checked]="notificationsEnabled()" (changed)="notificationsEnabled.set($event)" />
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-foreground">Disabled</span>
                  <app-slide-toggle [label]="'Disabled switch'" [disabled]="true" />
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Notification Settings</h3>
        <p class="text-muted-foreground mb-4">A real-world example of using switches for notification preferences</p>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="notificationsTab()" (changed)="notificationsTab.set($event)">
            @if (notificationsTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-col gap-5">
                  <div class="flex items-center justify-between py-3 border-b border-border">
                    <div class="flex flex-col gap-0.5">
                      <span class="text-sm font-medium text-foreground">Email notifications</span>
                      <span class="text-xs text-muted-foreground">Receive email updates about your account</span>
                    </div>
                    <app-slide-toggle
                      [checked]="emailNotifications()"
                      (changed)="emailNotifications.set($event)" />
                  </div>
                  <div class="flex items-center justify-between py-3 border-b border-border">
                    <div class="flex flex-col gap-0.5">
                      <span class="text-sm font-medium text-foreground">Push notifications</span>
                      <span class="text-xs text-muted-foreground">Receive push notifications on your device</span>
                    </div>
                    <app-slide-toggle
                      [checked]="pushNotifications()"
                      (changed)="pushNotifications.set($event)" />
                  </div>
                  <div class="flex items-center justify-between py-3 border-b border-border">
                    <div class="flex flex-col gap-0.5">
                      <span class="text-sm font-medium text-foreground">Marketing emails</span>
                      <span class="text-xs text-muted-foreground">Receive news about products and features</span>
                    </div>
                    <app-slide-toggle
                      [checked]="marketingEmails()"
                      (changed)="marketingEmails.set($event)" />
                  </div>
                  <div class="flex items-center justify-between py-3">
                    <div class="flex flex-col gap-0.5">
                      <span class="text-sm font-medium text-foreground">Dark mode</span>
                      <span class="text-xs text-muted-foreground">Toggle dark mode appearance</span>
                    </div>
                    <app-slide-toggle
                      [checked]="darkMode()"
                      (changed)="darkMode.set($event)" />
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="notificationsCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Disabled State</h3>
        <p class="text-muted-foreground mb-4">Switches can be disabled to prevent user interaction</p>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="disabledTab()" (changed)="disabledTab.set($event)">
            @if (disabledTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-col gap-4">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-foreground">Disabled (unchecked)</span>
                    <app-slide-toggle [label]="'Disabled switch'" [disabled]="true" />
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-foreground">Disabled (checked)</span>
                    <app-slide-toggle [label]="'Disabled checked'" [checked]="true" [disabled]="true" />
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-foreground">With label</span>
                    <app-slide-toggle [label]="'Cannot toggle'" [disabled]="true" />
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="disabledCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Form Integration</h3>
        <p class="text-muted-foreground mb-4">Switches work seamlessly with Angular's Reactive Forms and Template-driven forms</p>
        <app-card>
          <app-tabs [options]="formCodeOptions" [modelValue]="formsTab()" (changed)="formsTab.set($event)">
            @if (formsTab() === 'template-driven') {
              <div class="p-6">
                <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Template-driven Form</h4>
                <form class="space-y-4 max-w-md">
                  <app-slide-toggle
                    label="Enable notifications"
                    [(ngModel)]="templateNotifications"
                    name="notifications" />
                  <app-slide-toggle
                    label="Allow marketing"
                    [(ngModel)]="templateMarketing"
                    name="marketing" />
                  <app-slide-toggle
                    label="Dark mode"
                    [(ngModel)]="templateDarkMode"
                    name="darkMode" />
                  <div class="p-3 bg-muted rounded text-sm">
                    <p class="font-medium mb-2">Form values:</p>
                    <p class="font-mono text-xs">{{ templateFormData() }}</p>
                  </div>
                </form>
              </div>
            } @else if (formsTab() === 'reactive-forms') {
              <div class="p-6">
                <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Reactive Form</h4>
                <form [formGroup]="preferencesForm" class="space-y-4 max-w-md">
                  <app-slide-toggle
                    label="Enable notifications"
                    formControlName="notifications" />
                  <app-slide-toggle
                    label="Allow marketing"
                    formControlName="marketing" />
                  <app-slide-toggle
                    label="Dark mode"
                    formControlName="darkMode" />
                  <div class="p-3 bg-muted rounded text-sm">
                    <p class="font-medium mb-2">Form values:</p>
                    <p class="font-mono text-xs">{{ preferencesForm.value | json }}</p>
                    <p class="font-mono text-xs">Form status: {{ preferencesForm.status }}</p>
                  </div>
                </form>
              </div>
            } @else {
              <app-code-snippet [code]="formsCode" language="typescript" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Conditional State</h3>
        <p class="text-muted-foreground mb-4">Example of conditionally enabling/disabling a switch based on another switch</p>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="conditionalTab()" (changed)="conditionalTab.set($event)">
            @if (conditionalTab() === 'preview') {
              <div class="p-6">
                <div class="flex flex-col gap-4">
                  <div class="flex items-center justify-between">
                    <div class="flex flex-col gap-0.5">
                      <span class="text-sm font-medium text-foreground">Enable advanced features</span>
                      <span class="text-xs text-muted-foreground">Unlocks additional options</span>
                    </div>
                    <app-slide-toggle
                      [checked]="advancedEnabled()"
                      (changed)="onAdvancedChange($event)" />
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex flex-col gap-0.5">
                      <span class="text-sm font-medium text-foreground">Enable debug mode</span>
                      <span class="text-xs text-muted-foreground">Requires advanced features to be enabled</span>
                    </div>
                    <app-slide-toggle
                      [label]="'Debug mode'"
                      [checked]="debugMode()"
                      [disabled]="!advancedEnabled()"
                      (changed)="debugMode.set($event)" />
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="conditionalCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Default</th>
          <th class="text-left p-3 bg-muted font-semibold text-muted-foreground text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 text-foreground"><code class="bg-muted px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 border-b border-border text-foreground text-muted-foreground">{{ prop.type }}</td>
          <td class="p-3 border-b border-border text-foreground text-muted-foreground">{{ prop.default || '-' }}</td>
          <td class="p-3 text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="tableHeader" [tableCellTemplate]="tableCell" />
      </div>
    </section>
  `
})
export class SwitchShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  formCodeOptions = [
    { value: 'template-driven', label: 'Template-driven' },
    { value: 'reactive-forms', label: 'Reactive Forms' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  notificationsTab = signal<string>('preview');
  disabledTab = signal<string>('preview');
  formsTab = signal<string>('template-driven');
  conditionalTab = signal<string>('preview');

  notificationsEnabled = signal(false);
  emailNotifications = signal(false);
  pushNotifications = signal(true);
  marketingEmails = signal(false);
  darkMode = signal(false);

  templateNotifications = signal(false);
  templateMarketing = signal(false);
  templateDarkMode = signal(false);

  advancedEnabled = signal(false);
  debugMode = signal(false);

  preferencesForm = new FormGroup({
    notifications: new FormControl(false),
    marketing: new FormControl(false),
    darkMode: new FormControl(false)
  });

  templateFormData = computed(() => {
    return JSON.stringify({
      notifications: this.templateNotifications(),
      marketing: this.templateMarketing(),
      darkMode: this.templateDarkMode()
    }, null, 2);
  });

  installCode = `npm install @apsara/ui/switch`;

  importCode = `import { SwitchComponent } from '@apsara/ui/switch';`;

  usageCode = `<app-slide-toggle
  label="Enable notifications"
  [checked]="isEnabled"
  (changed)="onChange($event)" />`;

  basicCode = `<app-slide-toggle [label]="''" />
<app-slide-toggle [checked]="true" [label]="''" />
<app-slide-toggle [label]="'Enable notifications'" [checked]="notificationsEnabled()" (changed)="notificationsEnabled.set($event)" />
<app-slide-toggle [label]="'Disabled switch'" [disabled]="true" />`;

  notificationsCode = `<div class="flex flex-col gap-5">
  <div class="flex items-center justify-between py-3 border-b border-border">
    <div class="flex flex-col gap-0.5">
      <span class="text-sm font-medium text-foreground">Email notifications</span>
      <span class="text-xs text-muted-foreground">Receive email updates about your account</span>
    </div>
    <app-slide-toggle
      [checked]="emailNotifications()"
      (changed)="emailNotifications.set($event)" />
  </div>
  <!-- Repeat for other notification types -->
</div>`;

  disabledCode = `<app-slide-toggle [label]="'Disabled switch'" [disabled]="true" />
<app-slide-toggle [label]="'Disabled checked'" [checked]="true" [disabled]="true" />`;

  formsCode = `// Template-driven
import { FormsModule } from '@angular/forms';

@Component({
  template: \`
    <form>
      <app-slide-toggle
        label="Enable notifications"
        [(ngModel)]="notifications"
        name="notifications" />
    </form>
  \`
})
export class MyComponent {
  notifications = false;
}

// Reactive Forms
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  template: \`
    <form [formGroup]="form">
      <app-slide-toggle
        label="Enable notifications"
        formControlName="notifications" />
    </form>
  \`
})
export class MyComponent {
  form = new FormGroup({
    notifications: new FormControl(false)
  });
}`;

  conditionalCode = `import { signal } from '@angular/core';

@Component({
  template: \`
    <div class="flex flex-col gap-4">
      <app-slide-toggle
        label="Enable advanced features"
        [checked]="advancedEnabled()"
        (changed)="onAdvancedChange($event)" />
      
      <app-slide-toggle
        label="Debug mode"
        [checked]="debugMode()"
        [disabled]="!advancedEnabled()"
        (changed)="debugMode.set($event)" />
    </div>
  \`
})
export class MyComponent {
  advancedEnabled = signal(false);
  debugMode = signal(false);

  onAdvancedChange(value: boolean): void {
    this.advancedEnabled.set(value);
    if (!value) {
      this.debugMode.set(false);
    }
  }
}`;

  propsData = (): SwitchProp[] => [
    { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the switch is checked' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the switch' },
    { name: 'label', type: 'string', default: "''", description: 'Label text for the switch' },
    { name: 'changed', type: 'EventEmitter<boolean>', description: 'Emitted when the switch state changes' }
  ];

  onAdvancedChange(value: boolean): void {
    this.advancedEnabled.set(value);
    if (!value) {
      this.debugMode.set(false);
    }
  }
}
