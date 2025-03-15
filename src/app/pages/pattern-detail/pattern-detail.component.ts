import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DesignPatternService, DesignPattern } from '../../services/design-pattern.service';
import { DesignPatternComponent } from '../../components/design-pattern/design-pattern.component';

@Component({
  selector: 'app-pattern-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DesignPatternComponent],
  template: `
    <div class="pattern-detail">
      <h1>Pattern Details - {{ pattern?.name || 'Loading...' }}</h1>
      
      <div *ngIf="pattern">
        <app-design-pattern [diagramCode]="pattern.diagramCode" [patternId]="patternIndex"></app-design-pattern>
        <p>More information about the pattern will go here.</p>
      </div>
      
      <button class="back-button" (click)="goBack()">Back to Patterns</button>
    </div>
  `,
  styles: [`
    .pattern-detail {
      padding: 20px;
      color: #0f0;
    }
    h1 {
      color: #0f0;
      margin-bottom: 20px;
    }
    p {
      color: #0f0;
      margin-bottom: 30px;
    }
    .back-button {
      background-color: #000;
      color: #0f0;
      border: 1px solid #0f0;
      padding: 8px 16px;
      cursor: pointer;
      font-family: 'Courier New', Courier, monospace;
    }
    .back-button:hover {
      background-color: #0f0;
      color: #000;
    }
  `]
})
export class PatternDetailComponent implements OnInit {
  patternIndex: number = 0;
  pattern: DesignPattern | undefined;

  constructor(
    private route: ActivatedRoute,
    private designPatternService: DesignPatternService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.patternIndex = parseInt(idParam, 10);
      const patterns = this.designPatternService.loadDesignPatterns();
      this.pattern = patterns[this.patternIndex - 1]; // Adjust for zero-based index
    }
  }

  goBack() {
    window.history.back();
  }
}
