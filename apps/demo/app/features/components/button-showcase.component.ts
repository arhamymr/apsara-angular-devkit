import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, CardComponent } from '@apsara/ui';
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
              <span class="preview-label">Primary</span>
              <app-button label="Primary" variant="primary" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Secondary</span>
              <app-button label="Secondary" variant="secondary" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Tertiary</span>
              <app-button label="Tertiary" variant="tertiary" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Danger</span>
              <app-button label="Danger" variant="danger" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Outline</span>
              <app-button label="Outline" variant="outline" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Plain</span>
              <app-button label="Plain" variant="plain" />
            </div>
          </div>
        </div>
      </app-card>

      <app-card>
        <div class="preview-section">
          <h3>Sizes</h3>
          <div class="preview-grid">
            <div class="preview-item">
              <span class="preview-label">XS</span>
              <app-button label="XS" size="xs" />
            </div>
            <div class="preview-item">
              <span class="preview-label">SM</span>
              <app-button label="SM" size="sm" />
            </div>
            <div class="preview-item">
              <span class="preview-label">MD</span>
              <app-button label="MD" size="md" />
            </div>
            <div class="preview-item">
              <span class="preview-label">LG</span>
              <app-button label="LG" size="lg" />
            </div>
            <div class="preview-item">
              <span class="preview-label">Icon</span>
              <app-button size="icon">
                <span slot="">+</span>
              </app-button>
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
              <span class="preview-label">Block</span>
              <app-button label="Block" [block]="true" />
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
              <td>'primary' | 'secondary' | 'tertiary' | 'danger' | 'outline' | 'plain'</td>
              <td>'primary'</td>
              <td>Visual style variant</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>'xs' | 'sm' | 'md' | 'lg' | 'icon'</td>
              <td>'md'</td>
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
              <td><code>block</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Makes button full width</td>
            </tr>
            <tr>
              <td><code>pill</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Makes button pill shaped</td>
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
      color: var(--color-foreground);
      margin: 0 0 8px;
    }

    .section-header p {
      font-size: 15px;
      color: var(--color-dimmed);
      margin: 0;
    }

    .preview-section {
      padding: 24px;
    }

    .preview-section h3 {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-dimmed);
      margin: 0 0 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .preview-label {
      font-size: 12px;
      color: var(--color-dimmed);
      font-weight: 500;
    }

    .code-section h3,
    .props-section h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-foreground);
      margin: 24px 0 16px;
    }

    .props-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      background: var(--color-card);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow);
    }

    .props-table th,
    .props-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid var(--color-border);
    }

    .props-table th {
      background: var(--color-muted);
      font-weight: 600;
      color: var(--color-dimmed);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .props-table td {
      color: var(--color-foreground);
    }

    .props-table code {
      background: var(--color-muted);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
      color: var(--color-foreground);
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
  variant="primary"
  size="md"
  (clicked)="onClick($event)" />`;
}
