import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import mermaid from 'mermaid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-design-pattern',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mermaid-container">
      <div [id]="'mermaid-' + uniqueId" class="mermaid-diagram"></div>
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
    .mermaid-diagram { 
      font-size: 14px; 
      display: inline-block;
      text-align: left;
      color: #0f0;
    }
    :host ::ng-deep .mermaid-diagram svg {
      background-color: transparent !important;
    }
    :host ::ng-deep .mermaid-diagram .label {
      color: #0f0 !important;
      fill: #0f0 !important;
    }
    :host ::ng-deep .mermaid-diagram .node rect, 
    :host ::ng-deep .mermaid-diagram .node circle,
    :host ::ng-deep .mermaid-diagram .node polygon {
      fill: #111 !important;
      stroke: #0f0 !important;
    }
    :host ::ng-deep .mermaid-diagram .edgePath .path {
      stroke: #0f0 !important;
    }
    :host ::ng-deep .mermaid-diagram .edgeLabel {
      color: #0f0 !important;
      background-color: #111 !important;
    }
  `]
})
export class DesignPatternComponent implements AfterViewInit, OnChanges {
  @Input() diagramCode!: string;
  uniqueId = Math.random().toString(36).substring(2, 11);
  
  constructor() {
    // Initialize mermaid with DOS-style theme
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      themeVariables: {
        primaryColor: '#0f0',
        primaryTextColor: '#0f0',
        primaryBorderColor: '#0f0',
        lineColor: '#0f0',
        secondaryColor: '#111',
        tertiaryColor: '#000'
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
    if (element) {
      try {
        // Clear previous content
        element.innerHTML = '';
        
        // Render new diagram
        mermaid.render(`mermaid-svg-${this.uniqueId}`, this.diagramCode)
          .then(result => {
            element.innerHTML = result.svg;
          })
          .catch(error => {
            console.error('Mermaid rendering error:', error);
            element.innerHTML = `<pre style="color: #0f0;">${this.diagramCode}</pre>`;
          });
      } catch (e) {
        console.error('Mermaid rendering error:', e);
        element.innerHTML = `<pre style="color: #0f0;">${this.diagramCode}</pre>`;
      }
    }
  }
}
