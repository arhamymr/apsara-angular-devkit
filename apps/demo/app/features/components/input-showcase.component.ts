import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '@apsara/ui';
import { CardComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

@Component({
  selector: 'app-input-showcase',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, CardComponent, CodeSnippetComponent],
  template: `
    <section id="input" class="component-section">
      <div class="section-header">
        <h2>Input</h2>
        <p>Inputs allow users to enter text into a UI</p>
      </div>

      <app-card>
        <div class="preview-section">
          <h3>Basic Input</h3>
          <div class="preview-grid single-column">
            <app-input
              label="Username"
              placeholder="Enter your username"
              [(ngModel)]="inputValue" />
            <p class="input-value-display">Value: {{ inputValue }}</p>
          </div>
        </div>
      </app-card>

      <app-card>
        <div class="preview-section">
          <h3>States</h3>
          <div class="preview-grid">
            <div class="preview-item">
              <span class="preview-label">Default</span>
              <app-input label="Default" placeholder="Placeholder" />
            </div>
            <div class="preview-item">
              <span class="preview-label">With Hint</span>
              <app-input
                label="Email"
                placeholder="Enter email"
                hint="We'll never share your email" />
            </div>
            <div class="preview-item">
              <span class="preview-label">With Error</span>
              <app-input
                label="Password"
                type="password"
                placeholder="Enter password"
                error="Password must be at least 8 characters"
                [showPassword]="showPassword()" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Disabled</span>
              <app-input
                label="Disabled"
                placeholder="Cannot edit"
                [disabled]="true" />
            </div>
          </div>
        </div>
      </app-card>

      <app-card>
        <div class="preview-section">
          <h3>Input Types</h3>
          <div class="preview-grid">
            <div class="preview-item">
              <span class="preview-label">Text</span>
              <app-input type="text" label="Text" placeholder="Text input" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Email</span>
              <app-input type="email" label="Email" placeholder="email@example.com" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Password</span>
              <app-input
                type="password"
                label="Password"
                placeholder="Enter password"
                [showPassword]="showPassword()"
                (suffixClick)="togglePassword()" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Number</span>
              <app-input type="number" label="Quantity" placeholder="0" />
            </div>
          </div>
        </div>
      </app-card>

      <app-card>
        <div class="preview-section">
          <h3>Required Field</h3>
          <div class="preview-grid single-column">
            <app-input
              label="Full Name"
              placeholder="Enter your full name"
              [required]="true" />
            <span class="hint-text">This field is required</span>
          </div>
        </div>
      </app-card>

      <div class="code-section">
        <h3>Usage</h3>
        <app-code-snippet [code]="inputImportCode" language="typescript" />
        <app-code-snippet [code]="inputUsageCode" language="html" />
      </div>

      <div class="props-section">
        <h3>Props</h3>
        <table class="props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>label</code></td>
              <td>string</td>
              <td>''</td>
              <td>Floating label text</td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td>'text' | 'email' | 'password' | 'number' | 'tel' | 'url'</td>
              <td>'text'</td>
              <td>Input type</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td>string</td>
              <td>''</td>
              <td>Placeholder text</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td>string</td>
              <td>''</td>
              <td>Input value</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Disables the input</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td>string</td>
              <td>''</td>
              <td>Error message text</td>
            </tr>
            <tr>
              <td><code>hint</code></td>
              <td>string</td>
              <td>''</td>
              <td>Hint text below input</td>
            </tr>
            <tr>
              <td><code>required</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Shows required indicator</td>
            </tr>
            <tr>
              <td><code>prefixIcon</code></td>
              <td>string</td>
              <td>''</td>
              <td>Icon before input (emoji/text)</td>
            </tr>
            <tr>
              <td><code>suffixIcon</code></td>
              <td>string</td>
              <td>''</td>
              <td>Icon after input (emoji/text)</td>
            </tr>
            <tr>
              <td><code>showPassword</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Show password toggle button</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`
    .component-section {
      margin-bottom: 64px;
      scroll-margin-top: 80px;
    }

    .section-header {
      margin-bottom: 24px;
    }

    .section-header h2 {
      font-size: 24px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin: 0 0 8px;
    }

    .section-header p {
      font-size: 15px;
      color: var(--color-text-secondary);
      margin: 0;
    }

    .preview-section {
      padding: 24px;
    }

    .preview-section h3 {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-secondary);
      margin: 0 0 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 24px;
    }

    .preview-grid.single-column {
      grid-template-columns: 1fr;
      max-width: 320px;
    }

    .preview-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .preview-label {
      font-size: 12px;
      color: var(--color-text-secondary);
      font-weight: 500;
    }

    .input-value-display {
      font-size: 13px;
      color: var(--color-text-secondary);
      margin: 8px 0 0;
      font-family: monospace;
    }

    .hint-text {
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .code-section {
      margin-top: 24px;
    }

    .code-section h3,
    .props-section h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin: 24px 0 16px;
    }

    .props-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      background: var(--color-bg-card);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }

    .props-table th,
    .props-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid var(--color-border);
    }

    .props-table th {
      background: var(--color-bg-tertiary);
      font-weight: 600;
      color: var(--color-text-secondary);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .props-table td {
      color: var(--color-text-primary);
    }

    .props-table code {
      background: var(--color-bg-tertiary);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
      color: var(--color-text-primary);
    }

    .props-table tr:last-child td {
      border-bottom: none;
    }
  `]
})
export class InputShowcaseComponent {
  inputValue = '';
  showPassword = signal(false);

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  inputImportCode = `import { InputComponent } from '@apsara/ui/input';`;

  inputUsageCode = `<app-input
  label="Email"
  type="email"
  placeholder="Enter your email"
  hint="We'll never share your email"
  [(ngModel)]="email" />`;
}
