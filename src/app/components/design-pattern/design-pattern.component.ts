import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import mermaid from 'mermaid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-design-pattern',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #mermaidDiv class="mermaid-container">
      <pre class="mermaid" #mermaidEl>{{ diagramCode }}</pre>
    </div>
  `,
  styles: [`
    .mermaid-container { 
      text-align: center; 
      margin: 20px 0; 
      background-color: #111; 
      padding: 10px;
      border: 1px solid #0f0;
    }
    .mermaid { 
      font-size: 14px; 
      display: inline-block;
      text-align: left;
    }
  `]
})
export class DesignPatternComponent implements AfterViewInit {
  @Input() diagramCode!: string;
  @ViewChild('mermaidEl') mermaidEl!: ElementRef;
  
  ngAfterViewInit() {
    // Configure Mermaid with DOS-style theme
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#0f0',
        primaryTextColor: '#0f0',
        primaryBorderColor: '#0f0',
        lineColor: '#0f0',
        secondaryColor: '#111',
        tertiaryColor: '#000'
      }
    });
    
    // Render the diagram
    setTimeout(() => {
      try {
        mermaid.contentLoaded();
      } catch (e) {
        console.error('Mermaid rendering error:', e);
      }
    }, 200);
  }
}
