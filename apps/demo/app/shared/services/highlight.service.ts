import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {
  private readonly _theme = signal<string>('github-dark');

  readonly theme = this._theme.asReadonly();

  async highlight(code: string, lang: string): Promise<string> {
    return `<pre class="code-block"><code>${this.escapeHtml(code)}</code></pre>`;
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  setTheme(theme: string): void {
    this._theme.set(theme);
  }
}
