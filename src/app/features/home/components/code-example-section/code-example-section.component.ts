import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/ui/button/button.component';

@Component({
  selector: 'app-code-example-section',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <section class="code-section">
      <h2 class="section-title">Quick Start Example</h2>
      <p class="section-subtitle">Using the custom Button component</p>

      <div class="code-example">
        <div class="code-preview">
          <div class="preview-row">
            <app-button label="Primary" color="primary" />
            <app-button label="Accent" color="accent" />
            <app-button label="Warn" color="warn" />
          </div>
          <div class="preview-row">
            <app-button label="Outlined" variant="outlined" />
            <app-button label="Soft" variant="soft" />
            <app-button label="Text" variant="text" />
          </div>
        </div>

        <div class="code-snippet">
          <pre><code>&lt;app-button label="Primary" color="primary"&gt;
&lt;/app-button&gt;

&lt;app-button label="Outlined" variant="outlined"&gt;
&lt;/app-button&gt;</code></pre>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .code-section {
      background: #f5f7fa;
      border-radius: 24px;
      padding: 64px 24px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .section-title {
      font-size: 28px;
      font-weight: 600;
      color: #1c1b1f;
      margin: 0 0 8px;
      text-align: center;
    }

    .section-subtitle {
      font-size: 16px;
      color: #616161;
      margin: 0 0 40px;
      text-align: center;
    }

    .code-example {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      align-items: start;
    }

    .code-preview {
      background: white;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .preview-row {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .preview-row:last-child {
      margin-bottom: 0;
    }

    .code-snippet {
      background: #1e1e1e;
      border-radius: 12px;
      padding: 24px;
      overflow-x: auto;
    }

    .code-snippet pre {
      margin: 0;
    }

    .code-snippet code {
      color: #d4d4d4;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 14px;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .code-example {
        grid-template-columns: 1fr;
      }

      .code-preview {
        order: 2;
      }

      .code-snippet {
        order: 1;
      }
    }
  `]
})
export class CodeExampleSectionComponent {}
