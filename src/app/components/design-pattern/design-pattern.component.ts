import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import mermaid from 'mermaid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-design-pattern',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mermaid-container" (click)="navigateToDetails()">
      <div [id]="'mermaid-' + uniqueId" class="mermaid-diagram"></div>
    </div>
  `,
  styles: [`
    .mermaid-container { 
      text-align: center; 
      margin: 20px 0; 
      background-color: #111; 
      padding: 10px;
      border: 1px solid var(--text-color);
      cursor: pointer;
      transition: 0.3s;
    }
    .mermaid-container:hover {
      background-color: #222;
    }
    .mermaid-diagram { 
      font-size: 14px; 
      display: inline-block;
      text-align: left;
      color: var(--text-color);
    }
    :host ::ng-deep .mermaid-diagram svg {
      background-color: transparent !important;
    }
    :host ::ng-deep .mermaid-diagram .label {
      color: var(--text-color) !important;
      fill: var(--text-color) !important;
    }
    :host ::ng-deep .mermaid-diagram .node rect, 
    :host ::ng-deep .mermaid-diagram .node circle,
    :host ::ng-deep .mermaid-diagram .node polygon {
      fill: #111 !important;
      stroke: var(--text-color) !important;
    }
    :host ::ng-deep .mermaid-diagram .edgePath .path {
      stroke: var(--text-color) !important;
    }
    :host ::ng-deep .mermaid-diagram .edgeLabel {
      color: var(--text-color) !important;
      background-color: #111 !important;
    }
  `]
})
export class DesignPatternComponent implements AfterViewInit, OnChanges {
  @Input() diagramCode!: string;
  @Input() patternId!: number;
  uniqueId = Math.random().toString(36).substring(2, 11);
  
  constructor(private router: Router) {
    // Initialize mermaid with theme-compatible settings
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'var(--font-family, "Courier New", monospace)',
      themeVariables: {
        primaryColor: 'var(--text-color)',
        primaryTextColor: 'var(--text-color)',
        primaryBorderColor: 'var(--text-color)',
        lineColor: 'var(--text-color)',
        secondaryColor: '#111',
        tertiaryColor: 'var(--bg-color)',
        fontFamily: 'var(--font-family, "Courier New", monospace)'
      }
    });
  }
  
  ngAfterViewInit() {
    this.renderDiagram();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['diagramCode'] && !changes['diagramCode'].firstChange) {
      setTimeout(() => this.renderDiagram(), 0);
    }
  }
  
  renderDiagram() {
    const element = document.getElementById(`mermaid-${this.uniqueId}`);
    if (element && this.diagramCode) {
      try {
        // Clear previous content
        element.innerHTML = '';
        
        // Add a small delay to ensure the element is ready
        setTimeout(() => {
          try {
            // Check if the diagram code is a class diagram
            const isClassDiagram = this.diagramCode.trim().startsWith('classDiagram');
            
            // Render new diagram
            mermaid.render(`mermaid-svg-${this.uniqueId}`, this.diagramCode)
              .then(result => {
                element.innerHTML = result.svg;
                
                // Apply additional styling for SVG elements
                const svgElement = element.querySelector('svg');
                if (svgElement) {
                  svgElement.style.backgroundColor = 'transparent';
                  svgElement.style.maxWidth = '100%';
                }
              })
              .catch(error => {
                console.error('Mermaid rendering error:', error);
                element.innerHTML = `<pre style="color: var(--text-color);">${this.diagramCode}</pre>`;
              });
          } catch (innerError) {
            console.error('Mermaid inner rendering error:', innerError);
            element.innerHTML = `<pre style="color: var(--text-color);">${this.diagramCode}</pre>`;
          }
        }, 200); // Increased delay for better rendering
      } catch (e) {
        console.error('Mermaid rendering error:', e);
        element.innerHTML = `<pre style="color: var(--text-color);">${this.diagramCode}</pre>`;
      }
    }
  }
  
  navigateToDetails() {
    this.router.navigate(['/pattern', this.patternId]);
  }
}
