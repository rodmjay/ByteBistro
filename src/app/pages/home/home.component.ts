import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignPatternComponent } from '../../components/design-pattern/design-pattern.component';
import { DesignPatternService, DesignPattern } from '../../services/design-pattern.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DesignPatternComponent],
  template: `
    <h1>Software Design Patterns</h1>
    <div *ngFor="let pattern of designPatterns; let i = index">
      <h2>{{ pattern.name }}</h2>
      <app-design-pattern [diagramCode]="pattern.diagramCode" [patternId]="i + 1"></app-design-pattern>
    </div>
  `,
  styles: [`
    h1 {
      color: var(--text-color);
      margin-bottom: 20px;
    }
    h2 {
      color: var(--text-color);
      margin-top: 30px;
      margin-bottom: 10px;
    }
  `]
})
export class HomeComponent implements OnInit {
  designPatterns: DesignPattern[] = [];

  constructor(private designPatternService: DesignPatternService) {}

  ngOnInit() {
    this.designPatterns = this.designPatternService.loadDesignPatterns();
  }
}
