import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@apsara/ui';
import { CardComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

@Component({
  selector: 'app-card-showcase',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, CodeSnippetComponent],
  template: `
    <section id="card" class="component-section">
      <div class="section-header">
        <h2>Card</h2>
        <p>Cards contain content and actions about a single subject</p>
      </div>

      <app-card>
        <div class="preview-section">
          <h3>Variants</h3>
          <div class="preview-grid">
            <div class="preview-item">
              <span class="preview-label">Elevated</span>
              <app-card variant="elevated">
                <div class="card-content">Elevated Card</div>
              </app-card>
            </div>
            <div class="preview-item">
              <span class="preview-label">Outlined</span>
              <app-card variant="outlined">
                <div class="card-content">Outlined Card</div>
              </app-card>
            </div>
            <div class="preview-item">
              <span class="preview-label">Tonal</span>
              <app-card variant="tonal">
                <div class="card-content">Tonal Card</div>
              </app-card>
            </div>
          </div>
        </div>
      </app-card>

      <app-card>
        <div class="preview-section">
          <h3>Padding</h3>
          <div class="preview-grid">
            <div class="preview-item">
              <span class="preview-label">None</span>
              <app-card padding="none">
                <div class="card-content bordered">No Padding</div>
              </app-card>
            </div>
            <div class="preview-item">
              <span class="preview-label">Small</span>
              <app-card padding="small">
                <div class="card-content">Small Padding</div>
              </app-card>
            </div>
            <div class="preview-item">
              <span class="preview-label">Medium</span>
              <app-card padding="medium">
                <div class="card-content">Medium Padding</div>
              </app-card>
            </div>
            <div class="preview-item">
              <span class="preview-label">Large</span>
              <app-card padding="large">
                <div class="card-content">Large Padding</div>
              </app-card>
            </div>
          </div>
        </div>
      </app-card>

      <app-card>
        <div class="preview-section">
          <h3>Rich Content</h3>
          <app-card variant="elevated">
            <div class="rich-card">
              <h4>Card Title</h4>
              <p>This is a sample card with multiple content elements including headers, text, and actions.</p>
              <div class="card-actions">
                <app-button label="Action 1" size="small" />
                <app-button label="Action 2" size="small" variant="text" />
              </div>
            </div>
          </app-card>
        </div>
      </app-card>

      <div class="code-section">
        <h3>Usage</h3>
        <app-code-snippet [code]="cardImportCode" language="typescript" />
        <app-code-snippet [code]="cardUsageCode" language="html" />
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
              <td><code>variant</code></td>
              <td>'elevated' | 'outlined' | 'tonal'</td>
              <td>'elevated'</td>
              <td>Visual style variant</td>
            </tr>
            <tr>
              <td><code>padding</code></td>
              <td>'none' | 'small' | 'medium' | 'large'</td>
              <td>'medium'</td>
              <td>Internal padding size</td>
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

    .card-content {
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-secondary);
      font-size: 13px;
    }

    .card-content.bordered {
      border: 1px dashed var(--color-border-secondary);
      border-radius: 4px;
    }

    .rich-card {
      min-height: 100px;
    }

    .rich-card h4 {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin: 0 0 8px;
    }

    .rich-card p {
      font-size: 14px;
      color: var(--color-text-secondary);
      margin: 0 0 16px;
      line-height: 1.5;
    }

    .card-actions {
      display: flex;
      gap: 8px;
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
export class CardShowcaseComponent {
  cardImportCode = `import { CardComponent } from '@apsara/ui/card';`;

  cardUsageCode = `<app-card variant="elevated" padding="medium">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</app-card>`;
}
