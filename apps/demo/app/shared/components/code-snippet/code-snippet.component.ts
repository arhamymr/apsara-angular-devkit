import { Component, input, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@apsara/ui';
import { IconComponent } from '@apsara/ui';
import { HighlightService } from '../../services/highlight.service';

@Component({
  selector: 'app-code-snippet',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  template: `
    <div class="relative bg-[var(--popover,#f5f5f5)] border border-[var(--border,#e0e0e0)] rounded-lg overflow-hidden my-4">
      @if (isLoading()) {
        <pre class="m-0 p-4 overflow-x-auto text-[color:var(--foreground-variant,#999)]">Loading...</pre>
      } @else if (highlightedCode()) {
        <pre class="m-0 p-4 overflow-x-auto" [innerHTML]="highlightedCode()"></pre>
      } @else {
        <pre class="m-0 p-4 overflow-x-auto"><code class="font-mono text-sm text-[color:var(--foreground)] leading-[1.6] whitespace-pre">{{ code() }}</code></pre>
      }
      <button
        (click)="copyCode()"
        class="absolute top-2 right-2 bg-transparent border-none cursor-pointer p-1 rounded-md transition-colors duration-200 hover:bg-[var(--accent,#f5f5f5)]"
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
  `
})
export class CodeSnippetComponent {
  readonly code = input<string>('');
  readonly language = input<string>('typescript');

  private highlightService = inject(HighlightService);

  highlightedCode = signal<string>('');
  isLoading = signal(false);
  copied = signal(false);

  constructor() {
    effect(async () => {
      const code = this.code();
      const lang = this.language();
      if (code) {
        this.isLoading.set(true);
        try {
          this.highlightedCode.set(await this.highlightService.highlight(code, lang));
        } finally {
          this.isLoading.set(false);
        }
      }
    });

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
