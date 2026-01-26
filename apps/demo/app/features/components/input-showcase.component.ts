import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, map, catchError } from 'rxjs';
import { LucideAngularModule, Search } from 'lucide-angular';

interface InputProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-input-showcase',
  standalone: true,
  imports: [CommonModule, InputComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent, FormsModule, ReactiveFormsModule],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="input" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Input</h2>
        <p class="text-muted-foreground">Inputs allow users to enter text into a UI</p>
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
                <p class="text-sm text-muted-foreground mt-2 font-mono">Value: {{ inputValue }}</p>
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
                    <span class="text-xs text-muted-foreground font-medium">Default</span>
                    <app-input label="Default" placeholder="Placeholder" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">With Hint</span>
                    <app-input
                      label="Email"
                      placeholder="Enter email"
                      hint="We'll never share your email" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">With Error</span>
                    <app-input
                      label="Password"
                      type="password"
                      placeholder="Enter password"
                      error="Password must be at least 8 characters" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Disabled</span>
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
                    <span class="text-xs text-muted-foreground font-medium">Text</span>
                    <app-input type="text" label="Text" placeholder="Text input" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Email</span>
                    <app-input type="email" label="Email" placeholder="email@example.com" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Password</span>
                    <app-input type="password" label="Password" placeholder="Enter password" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Number</span>
                    <app-input type="number" label="Quantity" placeholder="0" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Search</span>
                    <app-input type="search" label="Search" placeholder="Search..." />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">URL</span>
                    <app-input type="url" label="Website" placeholder="https://example.com" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Tel</span>
                    <app-input type="tel" label="Phone" placeholder="+1 555 123 4567" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Date</span>
                    <app-input type="date" label="Date" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Time</span>
                    <app-input type="time" label="Time" />
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
        <h3 class="text-lg font-semibold text-foreground mb-4">Form Validation</h3>
        <p class="text-muted-foreground mb-4">
          Input works seamlessly with Angular's Reactive Forms and validators.
        </p>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="validationTab()" (changed)="validationTab.set($event)">
            @if (validationTab() === 'preview') {
              <div class="p-6">
                <form [formGroup]="basicValidationForm" class="space-y-4 max-w-md">
                  <app-input
                    label="Email"
                    type="email"
                    placeholder="email@example.com"
                    [required]="true"
                    [error]="emailError() ?? ''"
                    formControlName="email" />
                  <app-input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    [required]="true"
                    [error]="passwordError() ?? ''"
                    formControlName="password" />
                  <app-input
                    label="Username"
                    placeholder="Enter username"
                    [required]="true"
                    [error]="usernameError() ?? ''"
                    formControlName="username" />
                </form>
              </div>
            } @else {
              <app-code-snippet [code]="validationCode" language="typescript" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Custom Validators</h3>
        <p class="text-muted-foreground mb-4">
          Create your own validators for complex validation rules like password strength.
        </p>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="customValidationTab()" (changed)="customValidationTab.set($event)">
            @if (customValidationTab() === 'preview') {
              <div class="p-6">
                <form [formGroup]="customValidationForm" class="space-y-4 max-w-md">
                  <app-input
                    label="Username"
                    placeholder="Enter username (no spaces)"
                    [required]="true"
                    [error]="usernameCustomError() ?? ''"
                    hint="Username cannot contain spaces"
                    formControlName="username" />
                  <app-input
                    label="Strong Password"
                    type="password"
                    placeholder="Enter strong password"
                    [required]="true"
                    [error]="passwordStrengthError() ?? ''"
                    hint="Must contain uppercase, lowercase, number, and special character"
                    formControlName="strongPassword" />
                </form>
              </div>
            } @else {
              <app-code-snippet [code]="customValidatorCode" language="typescript" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Cross-Field Validation</h3>
        <p class="text-muted-foreground mb-4">
          Validate multiple fields together (e.g., password matching, date ranges).
        </p>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="crossFieldTab()" (changed)="crossFieldTab.set($event)">
            @if (crossFieldTab() === 'preview') {
              <div class="p-6">
                <form [formGroup]="crossFieldForm" class="space-y-4 max-w-md">
                  <app-input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    [required]="true"
                    formControlName="password" />
                  <app-input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm password"
                    [required]="true"
                    [error]="crossFieldError() ?? ''"
                    formControlName="confirmPassword" />
                </form>
              </div>
            } @else {
              <app-code-snippet [code]="crossFieldValidationCode" language="typescript" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Async Validation</h3>
        <p class="text-muted-foreground mb-4">
          Perfect for checking data against server APIs (e.g., unique email, username availability).
        </p>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="asyncValidationTab()" (changed)="asyncValidationTab.set($event)">
            @if (asyncValidationTab() === 'preview') {
              <div class="p-6">
                <form [formGroup]="asyncValidationForm" class="space-y-4 max-w-md">
                  <app-input
                    label="Email"
                    type="email"
                    placeholder="email@example.com"
                    [required]="true"
                    [error]="asyncEmailError() ?? ''"
                    hint="Checking if email is available..."
                    formControlName="email" />
                  @if (isCheckingEmail) {
                    <p class="text-sm text-muted-foreground">Checking email availability...</p>
                  }
                </form>
              </div>
            } @else {
              <app-code-snippet [code]="asyncValidationCode" language="typescript" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">
          Third-Party Integration
          <span class="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">Optional</span>
        </h3>
        <p class="text-muted-foreground mb-4">
          Input works with any validation library. Here's an example with Zod (schema-first validation).
        </p>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="thirdPartyTab()" (changed)="thirdPartyTab.set($event)">
            @if (thirdPartyTab() === 'preview') {
              <div class="p-6">
                <p class="text-sm text-muted-foreground mb-4">
                  Install Zod: <code class="bg-muted px-2 py-1 rounded text-xs">npm install zod</code>
                </p>
                <form [formGroup]="zodForm" class="space-y-4 max-w-md">
                  <app-input
                    label="Email"
                    type="email"
                    placeholder="email@example.com"
                    [required]="true"
                    [error]="zodEmailError() ?? ''"
                    formControlName="email" />
                  <app-input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    [required]="true"
                    [error]="zodPasswordError() ?? ''"
                    formControlName="password" />
                </form>
              </div>
            } @else {
              <app-code-snippet [code]="zodIntegrationCode" language="typescript" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">File Upload</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="fileUploadTab()" (changed)="fileUploadTab.set($event)">
            @if (fileUploadTab() === 'preview') {
              <div class="p-6">
                <app-input
                  type="file"
                  label="Avatar"
                  accept="image/*"
                  hint="Upload your avatar"
                  (fileChange)="onFileChange($event)" />
                @if (selectedFiles.length > 0) {
                  <div class="mt-2 text-sm text-muted-foreground">
                    Selected: {{ getSelectedFilesNames() }}
                  </div>
                }
              </div>
            } @else {
              <app-code-snippet [code]="fileUploadCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Inline Layout</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="inlineLayoutTab()" (changed)="inlineLayoutTab.set($event)">
            @if (inlineLayoutTab() === 'preview') {
              <div class="p-6">
                <app-input
                  label="Search"
                  type="search"
                  placeholder="Search..."
                  orientation="inline"
                  prefixIcon="🔍" />
              </div>
            } @else {
              <app-code-snippet [code]="inlineLayoutCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Required Fields</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="requiredFieldsTab()" (changed)="requiredFieldsTab.set($event)">
            @if (requiredFieldsTab() === 'preview') {
              <div class="p-6">
                <form [formGroup]="requiredForm" class="space-y-4 max-w-md">
                  <app-input
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    [required]="true"
                    hint="Required field"
                    [error]="requiredEmailError() ?? ''"
                    formControlName="email" />
                  <app-input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    [required]="true"
                    hint="Required field"
                    [error]="requiredPasswordError() ?? ''"
                    formControlName="password" />
                </form>
              </div>
            } @else {
              <app-code-snippet [code]="requiredFieldsCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Badge</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="badgeTab()" (changed)="badgeTab.set($event)">
            @if (badgeTab() === 'preview') {
              <div class="p-6">
                <app-input
                  label="Webhook URL"
                  type="url"
                  placeholder="https://api.example.com/webhook"
                  badge="Beta" />
              </div>
            } @else {
              <app-code-snippet [code]="badgeCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Date & Time</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="dateTimeTab()" (changed)="dateTimeTab.set($event)">
            @if (dateTimeTab() === 'preview') {
              <div class="p-6">
                <div class="space-y-4 max-w-md">
                  <app-input type="date" label="Date" hint="Select a date" />
                  <app-input type="datetime-local" label="Date & Time" hint="Select date and time" />
                  <app-input type="time" label="Time" hint="Select a time" />
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="dateTimeCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Custom Styling</h3>
        <p class="text-muted-foreground mb-4">
          Customize input appearance with size, radius, and custom CSS classes.
        </p>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="customStylingTab()" (changed)="customStylingTab.set($event)">
            @if (customStylingTab() === 'preview') {
              <div class="p-6">
                <div class="space-y-4 max-w-md">
                  <div>
                    <span class="text-xs text-muted-foreground font-medium">Small</span>
                    <app-input label="Email" placeholder="email@example.com" size="sm" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground font-medium">Medium (default)</span>
                    <app-input label="Password" placeholder="Enter password" size="md" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground font-medium">Large</span>
                    <app-input label="Username" placeholder="Enter username" size="lg" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground font-medium">Extra Large</span>
                    <app-input label="Phone" placeholder="+1 555 123 4567" size="xl" />
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="customStylingCode" language="html" />
            }
          </app-tabs>
        </app-card>
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Radius Variants</h3>
        <app-card>
          <app-tabs [options]="previewCodeOptions" [modelValue]="radiusTab()" (changed)="radiusTab.set($event)">
            @if (radiusTab() === 'preview') {
              <div class="p-6">
                <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">None</span>
                    <app-input placeholder="No radius" radius="none" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Small</span>
                    <app-input placeholder="Small radius" radius="sm" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Medium (default)</span>
                    <app-input placeholder="Medium radius" radius="md" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Large</span>
                    <app-input placeholder="Large radius" radius="lg" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground font-medium">Full (Pill)</span>
                    <app-input placeholder="Full radius" radius="full" />
                  </div>
                </div>
              </div>
            } @else {
              <app-code-snippet [code]="radiusCode" language="html" />
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
export class InputShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  statesTab = signal<string>('preview');
  typesTab = signal<string>('preview');
  validationTab = signal<string>('preview');
  customValidationTab = signal<string>('preview');
  crossFieldTab = signal<string>('preview');
  asyncValidationTab = signal<string>('preview');
  thirdPartyTab = signal<string>('preview');
  fileUploadTab = signal<string>('preview');
  inlineLayoutTab = signal<string>('preview');
  requiredFieldsTab = signal<string>('preview');
  badgeTab = signal<string>('preview');
  dateTimeTab = signal<string>('preview');
  customStylingTab = signal<string>('preview');
  radiusTab = signal<string>('preview');

  inputValue = '';
  selectedFiles: File[] = [];
  isCheckingEmail = false;

  basicValidationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  customValidationForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      this.noSpacesValidator()
    ]),
    strongPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.passwordStrengthValidator()
    ])
  });

  crossFieldForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: this.passwordsMustMatch() });

  asyncValidationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  zodForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  requiredForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

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
<app-input type="number" label="Quantity" placeholder="0" />
<app-input type="search" label="Search" placeholder="Search..." />
<app-input type="url" label="URL" placeholder="https://example.com" />
<app-input type="tel" label="Phone" placeholder="+1 555 123 4567" />
<app-input type="date" label="Date" />
<app-input type="time" label="Time" />`;

  validationCode = `import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  template: \`
    <form [formGroup]="form">
      <app-input
        label="Email"
        type="email"
        [error]="emailError"
        formControlName="email" />

      <app-input
        label="Password"
        type="password"
        [error]="passwordError"
        formControlName="password" />
    </form>
  \`
})
export class MyComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  get emailError(): string | null {
    const control = this.form.get('email');
    if (control?.hasError('required')) return 'Email is required';
    if (control?.hasError('email')) return 'Please enter a valid email';
    return null;
  }

  get passwordError(): string | null {
    const control = this.form.get('password');
    if (control?.hasError('required')) return 'Password is required';
    if (control?.hasError('minlength')) return 'Password must be 8+ characters';
    return null;
  }
}`;

  customValidatorCode = `function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);

    if (!hasLower || !hasUpper || !hasNumber || !hasSpecial) {
      return { weakPassword: true };
    }
    return null;
  };
}

function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpaces = /\\s/.test(control.value);
    return hasSpaces ? { hasSpaces: true } : null;
  };
}

form = new FormGroup({
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    passwordStrengthValidator()
  ])
});`;

  crossFieldValidationCode = `function passwordsMustMatch(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password !== confirm ? { mismatch: true } : null;
  };
}

form = new FormGroup({
  password: new FormControl('', [Validators.required]),
  confirmPassword: new FormControl('', [Validators.required])
}, { validators: passwordsMustMatch() });`;

  asyncValidationCode = `import { AsyncValidatorFn, of, map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

function uniqueEmailValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);
    return http.get<boolean>(\`/api/check-email?email=\${control.value}\`).pipe(
      map(isUnique => isUnique ? null : { emailExists: true }),
      catchError(() => of(null))
    );
  };
}

form = new FormGroup({
  email: new FormControl('', [
    Validators.required,
    Validators.email
  ], [uniqueEmailValidator(http)])
});`;

  zodIntegrationCode = `// Install: npm install zod
import { z } from 'zod';

// Utility function to wrap Zod as Angular Validator
function zodValidator<T>(schema: z.ZodType<T>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = schema.safeParse(control.value);
    if (result.success) return null;
    return { zodError: result.error };
  };
}

// Define schema
const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

// Use with Angular Forms
form = new FormGroup({
  email: new FormControl('', [zodValidator(userSchema.shape.email)]),
  password: new FormControl('', [zodValidator(userSchema.shape.password)])
});

// Get error message
get zodEmailError(): string | null {
  const control = this.form.get('email');
  const error = control?.getError('zodError');
  if (!error) return null;
  return error.issues[0]?.message || 'Invalid value';
}`;

  fileUploadCode = `<app-input
  type="file"
  label="Avatar"
  accept="image/*"
  hint="Upload your avatar"
  (fileChange)="onFileChange($event)" />`;

  inlineLayoutCode = `<app-input
  label="Search"
  type="search"
  placeholder="Search..."
  orientation="inline"
  classes="w-64" />`;

  requiredFieldsCode = `<app-input
  label="Email"
  type="email"
  [required]="true"
  [error]="emailError"
  classes="w-full"
  formControlName="email" />`;

  badgeCode = `<app-input
  label="Webhook URL"
  type="url"
  badge="Beta"
  placeholder="https://api.example.com/webhook" />`;

  customStylingCode = `<app-input label="Email" placeholder="email@example.com" size="sm" />
<app-input label="Password" placeholder="Enter password" size="md" />
<app-input label="Username" placeholder="Enter username" size="lg" />
<app-input label="Phone" placeholder="+1 555 123 4567" size="xl" />`;

  radiusCode = `<app-input placeholder="No radius" radius="none" />
<app-input placeholder="Small radius" radius="sm" />
<app-input placeholder="Medium radius" radius="md" />
<app-input placeholder="Large radius" radius="lg" />
<app-input placeholder="Full radius (pill)" radius="full" />`;

  dateTimeCode = `<app-input type="date" label="Date" hint="Select a date" />
<app-input type="datetime-local" label="Date & Time" hint="Select date and time" />
<app-input type="time" label="Time" hint="Select a time" />`;

  propsData = (): InputProp[] => [
    { name: 'label', type: 'string', default: "''", description: 'Label text' },
    { name: 'type', type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'time' | 'file'", default: "'text'", description: 'Input type' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input' },
    { name: 'error', type: 'string', default: "''", description: 'Error message text' },
    { name: 'hint', type: 'string', default: "''", description: 'Hint text below input' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Shows required indicator' },
    { name: 'prefixIcon', type: 'string', default: "''", description: 'Icon to display before input' },
    { name: 'accept', type: 'string', default: "''", description: 'Accepted file types (for file inputs)' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple file selection' },
    { name: 'orientation', type: "'vertical' | 'inline'", default: "'vertical'", description: 'Layout orientation' },
    { name: 'badge', type: 'string', default: "''", description: 'Badge text in label' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Input size variant' },
    { name: 'radius', type: "'none' | 'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Border radius variant' },
    { name: 'classes', type: 'string', default: "''", description: 'Custom CSS class name' }
  ];

  readonly emailError = computed<string | null>(() => {
    const control = this.basicValidationForm.get('email');
    if (control?.hasError('required')) return 'Email is required';
    if (control?.hasError('email')) return 'Please enter a valid email address';
    return null;
  });

  readonly passwordError = computed<string | null>(() => {
    const control = this.basicValidationForm.get('password');
    if (control?.hasError('required')) return 'Password is required';
    if (control?.hasError('minlength')) return 'Password must be at least 8 characters';
    return null;
  });

  readonly usernameError = computed<string | null>(() => {
    const control = this.basicValidationForm.get('username');
    if (control?.hasError('required')) return 'Username is required';
    if (control?.hasError('minlength')) return 'Username must be at least 3 characters';
    return null;
  });

  readonly usernameCustomError = computed<string | null>(() => {
    const control = this.customValidationForm.get('username');
    if (control?.hasError('required')) return 'Username is required';
    if (control?.hasError('minlength')) return 'Username must be at least 3 characters';
    if (control?.hasError('hasSpaces')) return 'Username cannot contain spaces';
    return null;
  });

  readonly passwordStrengthError = computed<string | null>(() => {
    const control = this.customValidationForm.get('strongPassword');
    const error = control?.getError('weakPassword');
    if (!error) return null;
    const value = control?.value || '';
    const missing: string[] = [];
    if (!/[a-z]/.test(value)) missing.push('lowercase letter');
    if (!/[A-Z]/.test(value)) missing.push('uppercase letter');
    if (!/[0-9]/.test(value)) missing.push('number');
    if (!/[!@#$%^&*]/.test(value)) missing.push('special character');
    return `Password must contain: ${missing.join(', ')}`;
  });

  readonly crossFieldError = computed<string | null>(() => {
    const group = this.crossFieldForm;
    if (group.hasError('mismatch')) return 'Passwords do not match';
    return null;
  });

  readonly asyncEmailError = computed<string | null>(() => {
    const control = this.asyncValidationForm.get('email');
    if (control?.hasError('required')) return 'Email is required';
    if (control?.hasError('email')) return 'Please enter a valid email';
    return null;
  });

  readonly zodEmailError = computed<string | null>(() => {
    const control = this.zodForm.get('email');
    const error = control?.getError('zodError');
    if (!error) return null;
    return error.issues[0]?.message || 'Invalid value';
  });

  readonly zodPasswordError = computed<string | null>(() => {
    const control = this.zodForm.get('password');
    const error = control?.getError('zodError');
    if (!error) return null;
    return error.issues[0]?.message || 'Invalid value';
  });

  readonly requiredEmailError = computed<string | null>(() => {
    const control = this.requiredForm.get('email');
    if (control?.hasError('required')) return 'Email is required';
    return null;
  });

  readonly requiredPasswordError = computed<string | null>(() => {
    const control = this.requiredForm.get('password');
    if (control?.hasError('required')) return 'Password is required';
    return null;
  });

  onFileChange(files: File[]): void {
    this.selectedFiles = files;
    console.log('Selected files:', files);
  }

  getSelectedFilesNames(): string {
    return this.selectedFiles.map(f => f.name).join(', ');
  }

  private noSpacesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasSpaces = /\s/.test(control.value);
      return hasSpaces ? { hasSpaces: true } : null;
    };
  }

  private passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasLower = /[a-z]/.test(value);
      const hasUpper = /[A-Z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*]/.test(value);

      if (!hasLower || !hasUpper || !hasNumber || !hasSpecial) {
        return { weakPassword: true };
      }
      return null;
    };
  }

  private passwordsMustMatch(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirm = group.get('confirmPassword')?.value;
      return password !== confirm ? { mismatch: true } : null;
    };
  }
}
