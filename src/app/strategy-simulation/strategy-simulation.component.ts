import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DesignPatternComponent } from '../components/design-pattern/design-pattern.component';
import { DesignPatternService } from '../services/design-pattern.service';
import { PatternWrapperComponent } from '../components/pattern-wrapper/pattern-wrapper.component';

@Component({
  selector: 'app-strategy-simulation',
  standalone: true,
  imports: [CommonModule, DesignPatternComponent, PatternWrapperComponent],
  template: `
    <app-pattern-wrapper [patternId]="patternId">
      <div class="strategy-simulation">
        <h2>Strategy Pattern Simulation</h2>
        <div class="simulation-container">
          <div class="controls">
            <select id="strategySelect">
              <option value="aggressive">Aggressive Strategy</option>
              <option value="defensive">Defensive Strategy</option>
              <option value="balanced">Balanced Strategy</option>
            </select>
            <button id="executeStrategy" class="btn">Execute Strategy</button>
          </div>
          
          <div class="visualization">
            <div id="context" class="context-box">Idle</div>
          </div>
          
          <div id="log" class="log"></div>
          
          <div class="diagram-container">
            <h2>Strategy Pattern Diagram</h2>
            <app-design-pattern [diagramCode]="diagramCode" [patternId]="patternId"></app-design-pattern>
          </div>
        </div>
      </div>
    </app-pattern-wrapper>
  `,
  styleUrls: ['./strategy-simulation.component.css']
})
export class StrategySimulationComponent implements AfterViewInit {
  diagramCode: string = '';
  patternId: number = 0;
  
  constructor(private designPatternService: DesignPatternService, private router: Router) {
    const pattern = this.designPatternService.getPatternByName('Strategy');
    if (pattern) {
      this.diagramCode = pattern.diagramCode;
      this.patternId = pattern.id || 0;
    }
  }

  ngAfterViewInit(): void {
    const strategySelect = document.getElementById("strategySelect") as HTMLSelectElement;
    const executeButton = document.getElementById("executeStrategy") as HTMLButtonElement;
    const contextEl = document.getElementById("context") as HTMLElement;
    const logEl = document.getElementById("log") as HTMLElement;
    
    // Utility function: log messages
    function logMessage(message: string): void {
      const p = document.createElement("p");
      p.textContent = message;
      logEl.appendChild(p);
      logEl.scrollTop = logEl.scrollHeight;
    }
    
    // Utility function: delay
    function delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Main function to execute the selected strategy
    async function executeStrategy(): Promise<void> {
      // Clear previous logs.
      logEl.innerHTML = "";
      
      // Start with Idle context.
      contextEl.textContent = "Idle";
      contextEl.style.background = "transparent";
      contextEl.style.borderColor = "var(--text-color)";
      logMessage("Context is Idle.");
      
      // Wait before executing.
      await delay(500);
      
      // Get the selected strategy.
      const strategy = strategySelect.value;
      
      // Change state to Processing.
      logMessage("Switching to Processing state...");
      contextEl.textContent = "Processing";
      contextEl.style.borderColor = "var(--button-border)";
      contextEl.style.background = "var(--button-bg)";
      await delay(1000);
      
      // Apply the chosen strategy.
      if (strategy === "aggressive") {
        logMessage("Executing Aggressive strategy.");
        contextEl.textContent = "Aggressive";
        contextEl.style.background = "#f00"; // red
      } else if (strategy === "defensive") {
        logMessage("Executing Defensive strategy.");
        contextEl.textContent = "Defensive";
        contextEl.style.background = "#00f"; // blue
      } else if (strategy === "balanced") {
        logMessage("Executing Balanced strategy.");
        contextEl.textContent = "Balanced";
        contextEl.style.background = "#0f0"; // green
      }
      
      // Reset after showing the result.
      await delay(1500);
      logMessage("Resetting to Idle state.");
      contextEl.textContent = "Idle";
      contextEl.style.background = "transparent";
      contextEl.style.borderColor = "var(--text-color)";
    }
    
    // Attach the event listener.
    executeButton.addEventListener("click", () => {
      executeStrategy();
    });
  }
}
