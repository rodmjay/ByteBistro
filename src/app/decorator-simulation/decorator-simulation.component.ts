import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DesignPatternComponent } from '../components/design-pattern/design-pattern.component';
import { DesignPatternService } from '../services/design-pattern.service';
import { PatternWrapperComponent } from '../components/pattern-wrapper/pattern-wrapper.component';

@Component({
  selector: 'app-decorator-simulation',
  standalone: true,
  imports: [CommonModule, DesignPatternComponent, PatternWrapperComponent],
  template: `
    <app-pattern-wrapper [patternId]="patternId">
      <div class="decorator-simulation">
        <h2>Decorator Pattern Simulation</h2>
        <div class="simulation-container">
          <div class="controls">
            <select id="decoratorSelect">
              <option value="shadow">Shadow Decorator</option>
              <option value="rounded">Rounded Decorator</option>
              <option value="colored">Colored Decorator</option>
            </select>
            <button id="applyDecorator" class="btn">Apply Decorator</button>
            <button id="resetDecorator" class="btn">Reset</button>
          </div>
          
          <div class="visualization">
            <div id="coreComponent" class="core-component">Core Component</div>
          </div>
          
          <div id="log" class="log"></div>
          
          <div class="diagram-container">
            <h2>Decorator Pattern Diagram</h2>
            <app-design-pattern [diagramCode]="diagramCode" [patternId]="patternId"></app-design-pattern>
          </div>
        </div>
      </div>
    </app-pattern-wrapper>
  `,
  styleUrls: ['./decorator-simulation.component.css']
})
export class DecoratorSimulationComponent implements AfterViewInit {
  diagramCode: string = '';
  patternId: number = 0;
  
  constructor(private designPatternService: DesignPatternService, private router: Router) {
    const pattern = this.designPatternService.getPatternByName('Decorator');
    if (pattern) {
      this.diagramCode = pattern.diagramCode;
      this.patternId = pattern.id || 0;
    }
  }

  ngAfterViewInit(): void {
    const decoratorSelect = document.getElementById('decoratorSelect') as HTMLSelectElement;
    const applyButton = document.getElementById('applyDecorator') as HTMLButtonElement;
    const resetButton = document.getElementById('resetDecorator') as HTMLButtonElement;
    const coreComponent = document.getElementById('coreComponent') as HTMLElement;
    const logEl = document.getElementById('log') as HTMLElement;

    // Utility function to log messages.
    function logMessage(message: string): void {
      const p = document.createElement('p');
      p.textContent = message;
      logEl.appendChild(p);
      logEl.scrollTop = logEl.scrollHeight;
    }

    // Clear all decorator classes from the core component.
    function resetDecorators(): void {
      coreComponent.classList.remove('shadow', 'rounded', 'colored');
    }

    // Main function to apply the selected decorator.
    function applyDecorator(): void {
      // Reset first.
      resetDecorators();
      
      const decorator = decoratorSelect.value;
      logMessage(`Applying decorator: ${decorator}`);
      
      if (decorator === 'shadow') {
        coreComponent.classList.add('shadow');
      } else if (decorator === 'rounded') {
        coreComponent.classList.add('rounded');
      } else if (decorator === 'colored') {
        coreComponent.classList.add('colored');
      }
      
      logMessage(`Decorator ${decorator} applied.`);
    }
    
    // Attach event listeners to buttons.
    applyButton.addEventListener('click', () => {
      applyDecorator();
    });
    
    resetButton.addEventListener('click', () => {
      resetDecorators();
      logMessage('Decorators reset.');
    });
  }
}
