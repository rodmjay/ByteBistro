import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DesignPatternService, DesignPattern } from '../../services/design-pattern.service';
import { DesignPatternComponent } from '../../components/design-pattern/design-pattern.component';
import { PatternWrapperComponent } from '../../components/pattern-wrapper/pattern-wrapper.component';

@Component({
  selector: 'app-pattern-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DesignPatternComponent, PatternWrapperComponent],
  template: `
    <app-pattern-wrapper [patternId]="patternIndex">
      <div *ngIf="pattern">
        <app-design-pattern [diagramCode]="pattern.diagramCode" [patternId]="patternIndex"></app-design-pattern>
        <p>More information about the pattern will go here.</p>
      </div>
    </app-pattern-wrapper>
  `,
  styles: [`
    p {
      color: var(--text-color);
      margin-bottom: 30px;
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
