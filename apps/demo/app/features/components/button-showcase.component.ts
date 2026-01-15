import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@apsara/ui';
import { CardComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

@Component({
  selector: 'app-button-showcase',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, CodeSnippetComponent],
  template: `
    <section id="button" class="component-section">
      <div class="section-header">
        <h2>Button</h2>
        <p>Buttons allow users to take actions and make choices with a single tap</p>
      </div>

      <app-card>
        <div class="preview-section">
          <h3>Variants</h3>
          <div class="preview-grid">
            <div class="preview-item">
              <span class="preview-label">Filled</span>
              <app-button label="Filled Button" variant="filled" color="primary" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Outlined</span>
              <app-button label="Outlined Button" variant="outlined" color="primary" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Text</span>
              <app-button label="Text Button" variant="text" color="primary" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Soft</span>
              <app-button label="Soft Button" variant="soft" color="primary" />
            </div>
          </div>
        </div>
      </app-card>

      <app-card>
        <div class="preview-section">
          <h3>Colors</h3>
          <div class="preview-grid">
            <div class="preview-item">
              <span class="preview-label">Primary</span>
              <app-button label="Primary" color="primary" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Accent</span>
              <app-button label="Accent" color="accent" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Success</span>
              <app-button label="Success" color="success" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Warn</span>
              <app-button label="Warn" color="warn" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Neutral</span>
              <app-button label="Neutral" color="neutral" />
            </div>
          </div>
        </div>
      </app-card>

      <app-card>
        <div class="preview-section">
          <h3>Sizes</h3>
          <div class="preview-grid">
            <div class="preview-item">
              <span class="preview-label">Small</span>
              <app-button label="Small" size="small" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Medium</span>
              <app-button label="Medium" size="medium" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Large</span>
              <app-button label="Large" size="large" />
            </div>
          </div>
        </div>
      </app-card>

      <app-card>
        <div class="preview-section">
          <h3>States</h3>
          <div class="preview-grid">
            <div class="preview-item">
              <span class="preview-label">Default</span>
              <app-button label="Default" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Disabled</span>
              <app-button label="Disabled" [disabled]="true" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Loading</span>
              <app-button label="Loading" [loading]="true" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Full Width</span>
              <app-button label="Full Width" [fullWidth]="true" />
            </div>
          </div>
        </div>
      </app-card>

      <div class="code-section">
        <h3>Usage</h3>
        <app-code-snippet [code]="buttonImportCode" language="typescript" />
        <app-code-snippet [code]="buttonUsageCode" language="html" />
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
              <td>Button text content</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td>'filled' | 'outlined' | 'text' | 'soft'</td>
              <td>'filled'</td>
              <td>Visual style variant</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td>'primary' | 'accent' | 'warn' | 'success' | 'neutral'</td>
              <td>'primary'</td>
              <td>Color theme</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>'small' | 'medium' | 'large'</td>
              <td>'medium'</td>
              <td>Button size</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Disables the button</td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Shows loading spinner</td>
            </tr>
            <tr>
              <td><code>fullWidth</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Makes button full width</td>
            </tr>
            <tr>
              <td><code>clicked</code></td>
              <td>EventEmitter&lt;Event&gt;</td>
              <td>-</td>
              <td>Emitted on button click</td>
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
export class ButtonShowcaseComponent {
  buttonImportCode = `import { ButtonComponent } from '@apsara/ui/button';`;

  buttonUsageCode = `<app-button
  label="Click me"
  variant="filled"
  color="primary"
  size="medium"
  (clicked)="onClick($event)" />`;
}
