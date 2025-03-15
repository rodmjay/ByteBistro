import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DesignPatternService, DesignPattern } from '../../services/design-pattern.service';
import { PatternExampleComponent } from '../pattern-example/pattern-example.component';

@Component({
  selector: 'app-pattern-wrapper',
  standalone: true,
  imports: [CommonModule, PatternExampleComponent],
  template: `
    <div class="pattern-wrapper">
      <div class="pattern-header">
        <h1>{{ pattern?.name || 'Loading...' }}</h1>
      </div>
      
      <div class="pattern-tabs">
        <div class="tab-headers">
          <div 
            class="tab-header" 
            [class.active]="activeTab === 'diagram'"
            (click)="activeTab = 'diagram'">
            Diagram
          </div>
          <div 
            class="tab-header" 
            [class.active]="activeTab === 'example1'"
            (click)="activeTab = 'example1'">
            Example 1
          </div>
          <div 
            class="tab-header" 
            [class.active]="activeTab === 'example2'"
            (click)="activeTab = 'example2'">
            Example 2
          </div>
        </div>
        
        <div class="tab-content">
          <div *ngIf="activeTab === 'diagram'" class="tab-pane">
            <ng-content></ng-content>
          </div>
          <div *ngIf="activeTab === 'example1'" class="tab-pane">
            <app-pattern-example 
              [exampleNumber]="1"
              [description]="'This is an example implementation of the ' + pattern?.name + ' pattern.'"
              [codeSnippet]="exampleOneCode">
            </app-pattern-example>
          </div>
          <div *ngIf="activeTab === 'example2'" class="tab-pane">
            <app-pattern-example 
              [exampleNumber]="2"
              [description]="'Another example showing a different use case for the ' + pattern?.name + ' pattern.'"
              [codeSnippet]="exampleTwoCode">
            </app-pattern-example>
          </div>
        </div>
      </div>
      
      <div class="pattern-navigation">
        <button 
          [disabled]="!previousPatternId" 
          (click)="navigateToPrevious()" 
          class="nav-btn">
          &lt; Last Pattern
        </button>
        <button (click)="goBack()" class="back-btn">Back to Patterns</button>
        <button 
          [disabled]="!nextPatternId" 
          (click)="navigateToNext()" 
          class="nav-btn">
          Next Pattern &gt;
        </button>
      </div>
    </div>
  `,
  styles: [`
    .pattern-wrapper {
      padding: 20px;
      color: var(--text-color);
    }
    
    .pattern-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    h1 {
      color: var(--text-color);
      margin: 0;
    }
    
    .pattern-tabs {
      margin-bottom: 20px;
    }
    
    .tab-headers {
      display: flex;
      border-bottom: 1px solid var(--text-color);
    }
    
    .tab-header {
      padding: 10px 20px;
      cursor: pointer;
      border: 1px solid var(--text-color);
      border-bottom: none;
      margin-right: 5px;
      background-color: #111;
    }
    
    .tab-header.active {
      background-color: #222;
      border-bottom: 1px solid #222;
      position: relative;
      top: 1px;
    }
    
    .tab-content {
      border: 1px solid var(--text-color);
      border-top: none;
      padding: 20px;
      background-color: #111;
    }
    
    .tab-pane {
      min-height: 300px;
    }
    
    .pattern-navigation {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }
    
    .nav-btn, .back-btn {
      background-color: #000;
      color: var(--text-color);
      border: 1px solid var(--text-color);
      padding: 8px 16px;
      cursor: pointer;
      font-family: 'Courier New', Courier, monospace;
    }
    
    .nav-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .nav-btn:hover:not(:disabled), .back-btn:hover {
      background-color: var(--text-color);
      color: #000;
    }
  `]
})
export class PatternWrapperComponent implements OnInit {
  @Input() patternId!: number;
  pattern: DesignPattern | undefined;
  nextPatternId: number | null = null;
  previousPatternId: number | null = null;
  activeTab: string = 'diagram';
  exampleOneCode: string = '// Example code will be added here\nfunction example() {\n  console.log("Example 1");\n}';
  exampleTwoCode: string = '// Another example\nclass Example {\n  constructor() {\n    console.log("Example 2");\n  }\n}';
  
  constructor(
    private router: Router,
    private designPatternService: DesignPatternService
  ) {}
  
  ngOnInit() {
    this.loadPattern();
  }
  
  loadPattern() {
    // Find current pattern
    this.pattern = this.designPatternService.getPatternById(this.patternId);
    
    // Find previous pattern in the same category
    this.previousPatternId = this.designPatternService.getPreviousPatternId(this.patternId);
    
    // Find next pattern in the same category
    this.nextPatternId = this.designPatternService.getNextPatternId(this.patternId);
  }
  
  navigateToNext() {
    if (this.nextPatternId) {
      this.router.navigate(['/pattern', this.nextPatternId]);
    }
  }
  
  navigateToPrevious() {
    if (this.previousPatternId) {
      this.router.navigate(['/pattern', this.previousPatternId]);
    }
  }
  
  goBack() {
    window.history.back();
  }
}
