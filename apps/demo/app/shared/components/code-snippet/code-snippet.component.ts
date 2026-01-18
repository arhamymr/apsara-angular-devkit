import { Component, input, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@apsara/ui';
import { IconComponent } from '@apsara/ui';

@Component({
  selector: 'app-code-snippet',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  template: `
    <div class="code-snippet">
      <pre class="code-content"><code>{{ code() }}</code></pre>
      <button
        (click)="copyCode()"
        class="copy-btn"
        [attr.aria-label]="copied() ? 'Copied' : 'Copy code'">
        <app-button size="icon" [variant]="copied() ? 'primary' : 'plain'">
          @if (copied()) {
            <app-icon name="check" size="sm" />
          } @else {
            <app-icon name="content_copy" size="sm" />
          }
        </app-button>
      </button>
    </div>
  `,
  styles: [`
    .code-snippet {
      position: relative;
      background: var(--popover);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      margin: 16px 0;
    }

    .code-content {
      margin: 0;
      padding: 16px;
      overflow-x: auto;
    }

    code {
      font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
      font-size: 14px;
      color: var(--foreground);
      line-height: 1.6;
      white-space: pre;
    }

    .copy-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: var(--radius);
      transition: background-color 0.2s;
    }

    .copy-btn:hover {
      background-color: var(--accent);
    }

    :host ::ng-deep {
      .keyword { color: #569cd6; }
      .string { color: #ce9178; }
      .number { color: #b5cea8; }
      .comment { color: #6a9955; }
      .type { color: #0; }
      .function { color: #dcdcaa; }
      .variable { color: #9cdcfe; }
      .operator { color: #d4d4d4; }
      .tag { color: #569cd6; }
      .attr-name { color: #9cdcfe; }
      .attr-value { color: #ce9178; }
    }
  `]
})
export class CodeSnippetComponent {
  readonly code = input<string>('');
  readonly language = input<string>('typescript');

  copied = signal(false);

  constructor() {
    effect(() => {
      if (this.copied()) {
        setTimeout(() => {
          this.copied.set(false);
        }, 2000);
      }
    });
  }

  async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
}
