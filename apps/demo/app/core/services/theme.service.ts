import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Type alias for supported theme modes in the application.
 * - 'light': Light mode with bright backgrounds and dark text
 * - 'dark': Dark mode with dark backgrounds and light text
 */
export type Theme = 'light' | 'dark';

/**
 * ThemeService manages the application's theme state with support for:
 * - User preference persistence via localStorage
 * - System preference detection (OS-level dark/light mode)
 * - Manual theme toggling
 * - Browser-only operations (SSR compatible)
 * 
 * This service is a singleton (providedIn: 'root') and uses Angular Signals
 * for reactive state management. The theme changes are automatically applied
 * to the document root element via effects or direct method calls.
 */
@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  /** LocalStorage key used to persist the user's theme preference */
  private readonly STORAGE_KEY = 'apsara-theme';
  
  /** CSS media query string for detecting system-level dark mode preference */
  private readonly SYSTEM_PREFERS_DARK = '(prefers-color-scheme: dark)';

  /**
   * Reactive signal holding the current theme state.
   * Components can read this signal to get the current theme value.
   * The signal automatically notifies subscribers on theme changes.
   */
  readonly theme = signal<Theme>('light');

  /**
   * Constructs the ThemeService and initializes theme state.
   * Only runs browser-specific initialization to avoid SSR issues.
   * 
   * @param platformId - Angular platform identifier to detect browser vs server environment
   */
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Only run browser-specific code when executing in a browser environment.
    // This prevents errors during server-side rendering (SSR) or static site generation.
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
      this.watchSystemPreference();
    }
  }

  /**
   * Initializes the theme based on the following priority:
   * 1. User's stored preference in localStorage (highest priority)
   * 2. System's dark/light mode preference
   * 3. Defaults to 'light' theme
   * 
   * This method is called once during service construction in the browser.
   */
  private initTheme(): void {
    // Attempt to retrieve the user's saved theme preference from localStorage.
    // Returns null if no preference has been stored yet.
    const stored = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    
    // Check if the user's operating system is set to dark mode.
    // window.matchMedia evaluates the CSS media query and returns a MediaQueryList object.
    const prefersDark = window.matchMedia(this.SYSTEM_PREFERS_DARK).matches;

    // Apply theme based on priority order:
    if (stored) {
      // Priority 1: Use the stored user preference
      this.theme.set(stored);
    } else if (prefersDark) {
      // Priority 2: Fall back to system preference if no user override exists
      this.theme.set('dark');
    }
    // Priority 3: Default 'light' is already set in the signal declaration

    // Apply the resolved theme to the DOM
    this.applyTheme(this.theme());
  }

  /**
   * Sets up a listener for system-level theme preference changes.
   * 
   * The listener only activates the system preference when:
   * - The user has NOT manually set a preference (no localStorage entry)
   * 
   * This allows users to override the system theme, but also respect
   * OS-level changes when no explicit preference exists.
   */
  private watchSystemPreference(): void {
    // Create a MediaQueryList object for the dark mode media query.
    // This is more efficient than repeatedly calling matchMedia().
    const mediaQuery = window.matchMedia(this.SYSTEM_PREFERS_DARK);

    // Add an event listener for when the system preference changes
    // (e.g., user switches OS dark/light mode, or toggles it temporarily)
    mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch themes if the user hasn't manually set a preference.
      // Once the user explicitly sets a theme, we respect their choice.
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        // Update the theme signal and apply it to the DOM
        this.theme.set(e.matches ? 'dark' : 'light');
        this.applyTheme(this.theme());
      }
    });
  }

  /**
   * Toggles between light and dark themes.
   * 
   * This is a convenience method that inverts the current theme state.
   * Use this method when implementing a theme toggle button or menu item.
   * 
   * @example
   * // Toggle theme on button click
   * <button (click)="themeService.toggle()">Toggle Theme</button>
   */
  toggle(): void {
    // Determine the opposite theme from the current state
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    // Use the setTheme method to apply the new theme
    this.setTheme(newTheme);
  }

  /**
   * Sets the theme to a specific value and persists the preference.
   * 
   * This method:
   * 1. Updates the reactive theme signal
   * 2. Persists the preference to localStorage for future sessions
   * 3. Applies the theme to the DOM
   * 
   * @param theme - The theme to set ('light' or 'dark')
   * @example
   * // Programmatically set dark mode
   * themeService.setTheme('dark');
   */
  setTheme(theme: Theme): void {
    // Update the reactive signal, triggering any effects or subscribers
    this.theme.set(theme);
    
    // Only access localStorage in browser environments to avoid SSR errors
    if (isPlatformBrowser(this.platformId)) {
      // Persist the user's theme choice so it survives page reloads and sessions
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
    
    // Apply the theme to the document
    this.applyTheme(theme);
  }

  /**
   * Applies the specified theme to the DOM by manipulating CSS classes and attributes.
   * 
   * This method modifies the document root element to reflect the current theme:
   * - Adds/removes the 'dark' CSS class for styling hooks
   * - Sets the 'data-theme' attribute for CSS attribute selectors
   * - Sets the 'color-scheme' property for native browser theme support
   * 
   * @param theme - The theme to apply ('light' or 'dark')
   */
  private applyTheme(theme: Theme): void {
    // Guard clause: Skip DOM manipulation in non-browser environments (SSR)
    if (!isPlatformBrowser(this.platformId)) return;

    // Get references to the document root and body elements
    const html = document.documentElement;
    const body = document.body;

    if (theme === 'dark') {
      // Apply dark theme classes and attributes
      html.classList.add('dark');
      html.setAttribute('data-theme', 'dark');
    } else {
      // Remove dark theme classes and attributes, reverting to light mode
      html.classList.remove('dark');
      html.setAttribute('data-theme', 'light');
    }

    // Set the color-scheme CSS property to inform native browser components
    // about the current theme preference (affects scrollbars, form controls, etc.)
    html.style.colorScheme = theme;
  }
}
