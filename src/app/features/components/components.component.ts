import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@apsara/ui/button';
import { CardComponent } from '@apsara/ui/card';
import { InputComponent } from '@apsara/ui/input';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface SidebarItem {
  label: string;
  route: string;
}

interface SidebarCategory {
  name: string;
  items: SidebarItem[];
}

@Component({
  selector: 'app-components-showcase',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ButtonComponent,
    CardComponent,
    InputComponent,
    CodeSnippetComponent
  ],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>Components</h2>
          <p class="sidebar-subtitle">UI Library Documentation</p>
        </div>

        <nav class="sidebar-nav">
          @for (category of categories; track category.name) {
            <div class="category">
              <button
                class="category-header"
                [class.expanded]="expandedCategories().has(category.name)"
                (click)="toggleCategory(category.name)">
                <span class="category-icon">
                  @if (expandedCategories().has(category.name)) {
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  } @else {
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  }
                </span>
                <span class="category-name">{{ category.name }}</span>
              </button>

              @if (expandedCategories().has(category.name)) {
                <ul class="category-items">
                  @for (item of category.items; track item.route) {
                    <li>
                      <a
                        [routerLink]="item.route"
                        routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }">
                        {{ item.label }}
                      </a>
                    </li>
                  }
                </ul>
              }
            </div>
          }
        </nav>
      </aside>

      <main class="content">
        <div class="page-container">
          <header class="page-header">
            <h1>Components</h1>
            <p>A collection of reusable UI components built with Angular signals</p>
          </header>

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
                    <app-button label="Disabled" disabled />
                  </div>
                  <div class="preview-item">
                    <span class="preview-label">Loading</span>
                    <app-button label="Loading" loading />
                  </div>
                  <div class="preview-item">
                    <span class="preview-label">Full Width</span>
                    <app-button label="Full Width" fullWidth />
                  </div>
                </div>
              </div>
            </app-card>

            <div class="code-section">
              <h3>Usage</h3>
              <app-code-snippet
                [code]="buttonImportCode"
                language="typescript" />
              <app-code-snippet
                [code]="buttonUsageCode"
                language="html" />
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
              <app-code-snippet
                [code]="cardImportCode"
                language="typescript" />
              <app-code-snippet
                [code]="cardUsageCode"
                language="html" />
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
                      [showPassword]="showPassword" />
                  </div>
                  <div class="preview-item">
                    <span class="preview-label">Disabled</span>
                    <app-input
                      label="Disabled"
                      placeholder="Cannot edit"
                      disabled />
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
                      [showPassword]="showPassword"
                      (suffixClick)="showPassword = !showPassword" />
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
                    required />
                  <span class="hint-text">This field is required</span>
                </div>
              </div>
            </app-card>

            <div class="code-section">
              <h3>Usage</h3>
              <app-code-snippet
                [code]="inputImportCode"
                language="typescript" />
              <app-code-snippet
                [code]="inputUsageCode"
                language="html" />
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
        </div>
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      min-height: calc(100vh - 64px);
    }

    .sidebar {
      width: 260px;
      background: #f8fafc;
      border-right: 1px solid #e2e8f0;
      position: sticky;
      top: 64px;
      height: calc(100vh - 64px);
      overflow-y: auto;
      flex-shrink: 0;
    }

    .sidebar-header {
      padding: 20px 16px 12px;
      border-bottom: 1px solid #e2e8f0;
    }

    .sidebar-header h2 {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 4px;
    }

    .sidebar-subtitle {
      font-size: 12px;
      color: #64748b;
      margin: 0;
    }

    .sidebar-nav {
      padding: 8px 0;
    }

    .category {
      border-bottom: 1px solid #e2e8f0;
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 10px 16px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      color: #475569;
      text-align: left;
      transition: background 0.15s;
    }

    .category-header:hover {
      background: #e2e8f0;
    }

    .category-header.expanded {
      background: #e2e8f0;
    }

    .category-icon {
      display: flex;
      align-items: center;
      color: #64748b;
    }

    .category-name {
      flex: 1;
    }

    .category-items {
      list-style: none;
      margin: 0;
      padding: 4px 0 4px 36px;
    }

    .category-items li a {
      display: block;
      padding: 8px 12px;
      font-size: 13px;
      color: #64748b;
      text-decoration: none;
      border-radius: 6px;
      transition: background 0.15s, color 0.15s;
    }

    .category-items li a:hover {
      background: #e2e8f0;
      color: #1e293b;
    }

    .category-items li a.active {
      background: #dbeafe;
      color: #1d4ed8;
      font-weight: 500;
    }

    .content {
      flex: 1;
      overflow-y: auto;
    }

    .page-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 32px 40px;
    }

    .page-header {
      margin-bottom: 40px;
    }

    .page-header h1 {
      font-size: 32px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 8px;
    }

    .page-header p {
      font-size: 16px;
      color: #64748b;
      margin: 0;
    }

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
      color: #0f172a;
      margin: 0 0 8px;
    }

    .section-header p {
      font-size: 15px;
      color: #64748b;
      margin: 0;
    }

    .preview-section {
      padding: 24px;
    }

    .preview-section h3 {
      font-size: 14px;
      font-weight: 600;
      color: #475569;
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
      color: #64748b;
      font-weight: 500;
    }

    .card-content {
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #64748b;
      font-size: 13px;
    }

    .card-content.bordered {
      border: 1px dashed #cbd5e1;
      border-radius: 4px;
    }

    .rich-card {
      min-height: 100px;
    }

    .rich-card h4 {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 8px;
    }

    .rich-card p {
      font-size: 14px;
      color: #64748b;
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
      color: #1e293b;
      margin: 24px 0 16px;
    }

    .props-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .props-table th,
    .props-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    .props-table th {
      background: #f8fafc;
      font-weight: 600;
      color: #475569;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .props-table td {
      color: #334155;
    }

    .props-table code {
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
      color: #1e293b;
    }

    .props-table tr:last-child td {
      border-bottom: none;
    }

    .input-value-display {
      font-size: 13px;
      color: #64748b;
      margin: 8px 0 0;
      font-family: monospace;
    }

    .hint-text {
      font-size: 12px;
      color: #64748b;
    }

    @media (max-width: 768px) {
      .sidebar {
        display: none;
      }

      .page-container {
        padding: 24px 16px;
      }
    }
  `]
})
export class ComponentsShowcaseComponent {
  categories: SidebarCategory[] = [
    {
      name: 'Actions',
      items: [
        { label: 'Button', route: '/components#button' }
      ]
    },
    {
      name: 'Layout',
      items: [
        { label: 'Card', route: '/components#card' }
      ]
    },
    {
      name: 'Forms',
      items: [
        { label: 'Input', route: '/components#input' }
      ]
    }
  ];

  expandedCategories = signal<Set<string>>(new Set(['Actions', 'Layout', 'Forms']));

  inputValue = '';
  showPassword = false;

  toggleCategory(categoryName: string): void {
    this.expandedCategories.update(set => {
      const newSet = new Set(set);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  }

  buttonImportCode = `import { ButtonComponent } from '@apsara/ui/button';`;

  buttonUsageCode = `<app-button
  label="Click me"
  variant="filled"
  color="primary"
  size="medium"
  (clicked)="onClick($event)" />`;

  cardImportCode = `import { CardComponent } from '@apsara/ui/card';`;

  cardUsageCode = `<app-card variant="elevated" padding="medium">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</app-card>`;

  inputImportCode = `import { InputComponent } from '@apsara/ui/input';`;

  inputUsageCode = `<app-input
  label="Email"
  type="email"
  placeholder="Enter your email"
  hint="We'll never share your email"
  [(ngModel)]="email" />`;
}
