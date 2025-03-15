import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pattern-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pattern-example">
      <h3>Example {{ exampleNumber }}</h3>
      <div class="example-content">
        <p>{{ description || 'Example content will be added here.' }}</p>
        <pre *ngIf="codeSnippet" class="code-snippet">{{ codeSnippet }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .pattern-example {
      margin: 20px 0;
      padding: 15px;
      border: 1px solid var(--text-color);
      background-color: rgba(0, 0, 0, 0.3);
    }
    
    h3 {
      color: var(--text-color);
      margin-top: 0;
      border-bottom: 1px solid var(--text-color);
      padding-bottom: 10px;
    }
    
    .example-content {
      margin-top: 15px;
    }
    
    p {
      color: var(--text-color);
      line-height: 1.5;
    }
    
    .code-snippet {
      background-color: #111;
      padding: 10px;
      border: 1px solid var(--text-color);
      overflow-x: auto;
      color: var(--text-color);
      font-family: 'Courier New', Courier, monospace;
    }
  `]
})
export class PatternExampleComponent {
  @Input() exampleNumber: number = 1;
  @Input() description: string = '';
  @Input() codeSnippet: string = '';
}
