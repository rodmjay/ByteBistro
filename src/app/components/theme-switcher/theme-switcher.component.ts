import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="theme-switcher">
      <select [(ngModel)]="selectedTheme" (change)="changeTheme()" class="theme-select">
        <option value="dos">DOS Theme</option>
        <option value="linux">Linux Terminal</option>
        <option value="ubuntu">Ubuntu Terminal</option>
        <option value="windows">Windows PowerShell</option>
        <option value="macos">macOS Terminal</option>
        <option value="matrix">Matrix Theme</option>
        <option value="amber">Amber Terminal</option>
        <option value="blue">Blue Terminal</option>
      </select>
    </div>
  `,
  styles: [`
    .theme-switcher {
      margin-left: 20px;
    }
    
    .theme-select {
      background-color: #000;
      color: #0f0;
      border: 1px solid #0f0;
      padding: 5px 10px;
      font-family: 'Courier New', monospace;
      cursor: pointer;
    }
    
    .theme-select:focus {
      outline: none;
      border-color: #0f0;
      box-shadow: 0 0 5px #0f0;
    }
    
    .theme-select option {
      background-color: #000;
      color: #0f0;
    }
  `]
})
export class ThemeSwitcherComponent {
  selectedTheme: string = 'dos';
  
  constructor() {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('byteBistroTheme');
    if (savedTheme) {
      this.selectedTheme = savedTheme;
      this.applyTheme(savedTheme);
    }
  }
  
  changeTheme(): void {
    this.applyTheme(this.selectedTheme);
    // Save preference
    localStorage.setItem('byteBistroTheme', this.selectedTheme);
  }
  
  private applyTheme(theme: string): void {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
    
    // Apply theme-specific colors
    switch (theme) {
      case 'linux':
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--bg-color', '#300a24');
        document.documentElement.style.setProperty('--accent-color', '#ffcc00');
        break;
      case 'ubuntu':
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--bg-color', '#2d0922');
        document.documentElement.style.setProperty('--accent-color', '#e95420');
        break;
      case 'windows':
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--bg-color', '#012456');
        document.documentElement.style.setProperty('--accent-color', '#0078d7');
        break;
      case 'macos':
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--bg-color', '#1e1e1e');
        document.documentElement.style.setProperty('--accent-color', '#007aff');
        break;
      case 'matrix':
        document.documentElement.style.setProperty('--text-color', '#00ff41');
        document.documentElement.style.setProperty('--bg-color', '#000000');
        document.documentElement.style.setProperty('--accent-color', '#008f11');
        break;
      case 'amber':
        document.documentElement.style.setProperty('--text-color', '#ffb000');
        document.documentElement.style.setProperty('--bg-color', '#000000');
        document.documentElement.style.setProperty('--accent-color', '#ff9000');
        break;
      case 'blue':
        document.documentElement.style.setProperty('--text-color', '#00b7ff');
        document.documentElement.style.setProperty('--bg-color', '#000000');
        document.documentElement.style.setProperty('--accent-color', '#0077ff');
        break;
      default: // DOS theme
        document.documentElement.style.setProperty('--text-color', '#00ff00');
        document.documentElement.style.setProperty('--bg-color', '#000000');
        document.documentElement.style.setProperty('--accent-color', '#003300');
        break;
    }
  }
}
