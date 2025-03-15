import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private themeMode = new BehaviorSubject<ThemeMode>(this.getInitialThemeMode());

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  private getInitialThemeMode(): ThemeMode {
    // Check if user has previously selected a theme
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme as ThemeMode;
    }
    
    // Otherwise, use system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private initializeTheme(): void {
    const currentTheme = this.themeMode.getValue();
    this.applyTheme(currentTheme);
  }

  private applyTheme(theme: ThemeMode): void {
    this.renderer.removeClass(document.body, 'light-mode');
    this.renderer.removeClass(document.body, 'dark-mode');
    this.renderer.addClass(document.body, `${theme}-mode`);
    localStorage.setItem('theme-mode', theme);
  }

  toggleTheme(): void {
    const newTheme = this.themeMode.getValue() === 'light' ? 'dark' : 'light';
    this.themeMode.next(newTheme);
    this.applyTheme(newTheme);
  }

  getCurrentTheme(): Observable<ThemeMode> {
    return this.themeMode.asObservable();
  }
}
