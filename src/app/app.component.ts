import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { SimulationComponent } from './simulation/simulation.component';
import { ObserverSimulationComponent } from './observer-simulation/observer-simulation.component';
import { StateSimulationComponent } from './state-simulation/state-simulation.component';
import { StrategySimulationComponent } from './strategy-simulation/strategy-simulation.component';
import { DecoratorSimulationComponent } from './decorator-simulation/decorator-simulation.component';
import { CommandSimulationComponent } from './command-simulation/command-simulation.component';
import { DesignPatternComponent } from './components/design-pattern/design-pattern.component';
import { DesignPatternService, DesignPattern } from './services/design-pattern.service';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterModule,
    ButtonModule, 
    NgIf,
    NgFor,
    CommonModule,
    SimulationComponent, 
    ObserverSimulationComponent, 
    StateSimulationComponent, 
    StrategySimulationComponent, 
    DecoratorSimulationComponent, 
    CommandSimulationComponent,
    DesignPatternComponent,
    ThemeSwitcherComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Title for the design patterns section
  title = 'Software Design Patterns';
  
  // Design patterns loaded from the service
  designPatterns: DesignPattern[] = [];
  
  // Track expanded state of each category
  categoryExpanded: { [key: string]: boolean } = {
    'utility': false,
    'creational': false,
    'structural': false,
    'behavioral': false
  };
  
  constructor(private designPatternService: DesignPatternService) {
    // Load design patterns from the service
    this.designPatterns = this.designPatternService.loadDesignPatterns();
  }
  
  /**
   * Toggle the expanded state of a category
   * @param category The category to toggle
   */
  toggleCategory(category: string): void {
    this.categoryExpanded[category] = !this.categoryExpanded[category];
  }
  
  /**
   * Get patterns filtered by category
   * @param category The category to filter by
   * @returns Array of design patterns in the specified category
   */
  getPatternsByCategory(category: string): DesignPattern[] {
    return this.designPatterns.filter(pattern => {
      const patternName = pattern.name;
      
      // Categorize patterns based on their names
      const creationalPatterns = ['Singleton', 'Factory Method', 'Abstract Factory', 'Builder', 'Prototype'];
      const structuralPatterns = ['Adapter', 'Bridge', 'Composite', 'Decorator', 'Facade', 'Flyweight', 'Proxy'];
      const behavioralPatterns = [
        'Chain of Responsibility', 'Command', 'Interpreter', 'Iterator', 'Mediator', 
        'Memento', 'Observer', 'State', 'Strategy', 'Template Method', 'Visitor'
      ];
      
      if (category === 'creational') {
        return creationalPatterns.includes(patternName);
      } else if (category === 'structural') {
        return structuralPatterns.includes(patternName);
      } else if (category === 'behavioral') {
        return behavioralPatterns.includes(patternName);
      }
      
      return false;
    });
  }
}
