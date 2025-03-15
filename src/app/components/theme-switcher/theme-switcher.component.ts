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
      background-color: var(--bg-color);
      color: var(--text-color);
      border: 1px solid var(--text-color);
      padding: 5px 10px;
      font-family: var(--font-family, 'Courier New', monospace);
      cursor: pointer;
    }
    
    .theme-select:focus {
      outline: none;
      border-color: var(--text-color);
      box-shadow: 0 0 5px var(--text-color);
    }
    
    .theme-select option {
      background-color: var(--bg-color);
      color: var(--text-color);
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
    
    // Apply theme-specific colors and fonts
    switch (theme) {
      case 'linux':
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--bg-color', '#300a24');
        document.documentElement.style.setProperty('--accent-color', '#ffcc00');
        document.documentElement.style.setProperty('--font-family', "'DejaVu Sans Mono', 'Liberation Mono', monospace");
        break;
      case 'ubuntu':
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--bg-color', '#2d0922');
        document.documentElement.style.setProperty('--accent-color', '#e95420');
        document.documentElement.style.setProperty('--font-family', "'Ubuntu Mono', 'Liberation Mono', monospace");
        break;
      case 'windows':
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--bg-color', '#012456');
        document.documentElement.style.setProperty('--accent-color', '#0078d7');
        document.documentElement.style.setProperty('--font-family', "'Consolas', 'Lucida Console', monospace");
        break;
      case 'macos':
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--bg-color', '#1e1e1e');
        document.documentElement.style.setProperty('--accent-color', '#007aff');
        document.documentElement.style.setProperty('--font-family', "'Menlo', 'Monaco', monospace");
        break;
      case 'matrix':
        document.documentElement.style.setProperty('--text-color', '#00ff41');
        document.documentElement.style.setProperty('--bg-color', '#000000');
        document.documentElement.style.setProperty('--accent-color', '#008f11');
        document.documentElement.style.setProperty('--font-family', "'Source Code Pro', 'Courier New', monospace");
        break;
      case 'amber':
        document.documentElement.style.setProperty('--text-color', '#ffb000');
        document.documentElement.style.setProperty('--bg-color', '#000000');
        document.documentElement.style.setProperty('--accent-color', '#ff9000');
        document.documentElement.style.setProperty('--font-family', "'VT323', 'Courier New', monospace");
        break;
      case 'blue':
        document.documentElement.style.setProperty('--text-color', '#00b7ff');
        document.documentElement.style.setProperty('--bg-color', '#000000');
        document.documentElement.style.setProperty('--accent-color', '#0077ff');
        document.documentElement.style.setProperty('--font-family', "'IBM Plex Mono', 'Courier New', monospace");
        break;
      default: // DOS theme
        document.documentElement.style.setProperty('--text-color', '#00ff00');
        document.documentElement.style.setProperty('--bg-color', '#000000');
        document.documentElement.style.setProperty('--accent-color', '#003300');
        document.documentElement.style.setProperty('--font-family', "'Courier New', monospace");
        break;
    }
    
    // Force Mermaid to re-render with new theme
    setTimeout(() => {
      // Find all Mermaid diagrams and trigger re-rendering
      const mermaidElements = document.querySelectorAll('.mermaid-diagram');
      if (mermaidElements.length > 0) {
        console.log(`Re-rendering ${mermaidElements.length} Mermaid diagrams with new theme`);
        
        // Trigger a custom event that design-pattern components can listen for
        const event = new CustomEvent('themeChanged', { detail: { theme } });
        document.dispatchEvent(event);
        
        // Force browser to repaint
        document.body.style.display = 'none';
        document.body.offsetHeight; // Force reflow
        document.body.style.display = '';
      }
    }, 300);
  }
}
