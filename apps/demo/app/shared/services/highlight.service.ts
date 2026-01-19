import { Injectable, signal } from '@angular/core';
import { codeToHtml } from 'shiki';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {
  private readonly _theme = signal<string>('github-dark');

  readonly theme = this._theme.asReadonly();

  async highlight(code: string, lang: string): Promise<string> {
    return codeToHtml(code, {
      lang,
      theme: this._theme()
    });
  }

  setTheme(theme: string): void {
    this._theme.set(theme);
  }
}
