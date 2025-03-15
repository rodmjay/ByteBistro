import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DesignPatternComponent } from '../components/design-pattern/design-pattern.component';
import { DesignPatternService } from '../services/design-pattern.service';
import { PatternWrapperComponent } from '../components/pattern-wrapper/pattern-wrapper.component';

@Component({
  selector: 'app-state-simulation',
  standalone: true,
  imports: [CommonModule, DesignPatternComponent, PatternWrapperComponent],
  template: `
    <app-pattern-wrapper [patternId]="patternId">
      <div class="state-simulation">
        <h2>State Pattern Simulation</h2>
        <div class="simulation-container">
          <div class="controls">
            <button id="changeState" class="btn">Change State</button>
          </div>
          
          <div class="visualization">
            <div id="stateBox" class="state-box">Idle</div>
          </div>
          
          <div id="log" class="log"></div>
          
          <div class="diagram-container">
            <h2>State Pattern Diagram</h2>
            <app-design-pattern [diagramCode]="diagramCode" [patternId]="patternId"></app-design-pattern>
          </div>
        </div>
      </div>
    </app-pattern-wrapper>
  `,
  styleUrls: ['./state-simulation.component.css']
})
export class StateSimulationComponent implements AfterViewInit {
  diagramCode: string = '';
  patternId: number = 0;
  
  constructor(private designPatternService: DesignPatternService, private router: Router) {
    const pattern = this.designPatternService.getPatternByName('State');
    if (pattern) {
      this.diagramCode = pattern.diagramCode;
      this.patternId = pattern.id || 0;
    }
  }

  ngAfterViewInit(): void {
    const stateBox = document.getElementById('stateBox') as HTMLElement;
    const changeStateButton = document.getElementById('changeState') as HTMLButtonElement;
    const logEl = document.getElementById('log') as HTMLElement;

    // Utility function to log messages.
    function logMessage(message: string): void {
      const p = document.createElement('p');
      p.textContent = message;
      logEl.appendChild(p);
      logEl.scrollTop = logEl.scrollHeight;
    }

    // Utility delay function.
    function delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Main function to change states.
    async function changeState(): Promise<void> {
      logMessage("Transition: Idle → Processing");
      stateBox.textContent = "Processing";
      stateBox.style.backgroundColor = "#222"; // Dim background for processing.
      stateBox.style.borderColor = "#ff0"; // Yellow border for emphasis.
      await delay(1000);

      // Randomly decide outcome: 60% success, 40% error.
      const isSuccess = Math.random() < 0.6;
      if (isSuccess) {
        logMessage("Transition: Processing → Success");
        stateBox.textContent = "Success";
        stateBox.style.backgroundColor = "#0f0"; // Green indicates success.
      } else {
        logMessage("Transition: Processing → Error");
        stateBox.textContent = "Error";
        stateBox.style.backgroundColor = "#f00"; // Red indicates error.
      }
      
      await delay(1500);
      logMessage("Resetting to Idle");
      stateBox.textContent = "Idle";
      stateBox.style.backgroundColor = "transparent";
      stateBox.style.borderColor = "#0f0"; // Reset border color.
    }

    // Attach the change state event.
    changeStateButton.addEventListener('click', () => {
      changeState();
    });
  }
}
