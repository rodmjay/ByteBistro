import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeMode } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="theme-toggle" (click)="toggleTheme()">
      {{ currentTheme === 'light' ? '🌙' : '☀️' }}
    </button>
  `,
  styles: [`
    .theme-toggle {
      background: transparent;
      border: 2px solid var(--text-color);
      color: var(--text-color);
      font-size: 1.2rem;
      padding: 0.5rem;
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 100;
      border-radius: 4px;
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  currentTheme: ThemeMode = 'light';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
