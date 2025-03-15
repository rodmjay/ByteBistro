import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DesignPatternComponent } from '../components/design-pattern/design-pattern.component';
import { DesignPatternService } from '../services/design-pattern.service';
import { PatternWrapperComponent } from '../components/pattern-wrapper/pattern-wrapper.component';

@Component({
  selector: 'app-observer-simulation',
  standalone: true,
  imports: [CommonModule, DesignPatternComponent, PatternWrapperComponent],
  template: `
    <app-pattern-wrapper [patternId]="patternId">
      <div class="observer-simulation">
        <h2>Observer Pattern Simulation</h2>
        <div class="simulation-container">
          <div class="controls">
            <select id="exampleSelect">
              <option value="all">Notify All Observers</option>
              <option value="random">Notify Random Observers</option>
            </select>
            <button id="changeState" class="btn">Change Subject State</button>
            <button id="stopSimulation" class="btn">Stop Simulation</button>
          </div>
          
          <div class="visualization">
            <div id="subject" class="subject">Subject</div>
            <div class="observers-container">
              <div class="observer">Observer 1</div>
              <div class="observer">Observer 2</div>
              <div class="observer">Observer 3</div>
            </div>
          </div>
          
          <div id="log" class="log"></div>
          
          <div class="diagram-container">
            <h2>Observer Pattern Diagram</h2>
            <app-design-pattern [diagramCode]="diagramCode" [patternId]="patternId"></app-design-pattern>
          </div>
        </div>
      </div>
    </app-pattern-wrapper>
  `,
  styleUrls: ['./observer-simulation.component.css']
})
export class ObserverSimulationComponent implements AfterViewInit {
  simulationRunning = false;
  diagramCode: string = '';
  patternId: number = 0;
  
  constructor(private designPatternService: DesignPatternService, private router: Router) {
    const pattern = this.designPatternService.getPatternByName('Observer');
    if (pattern) {
      this.diagramCode = pattern.diagramCode;
      this.patternId = pattern.id || 0;
    }
  }

  ngAfterViewInit(): void {
    const exampleSelect = document.getElementById("exampleSelect") as HTMLSelectElement;
    const changeStateButton = document.getElementById("changeState") as HTMLButtonElement;
    const stopButton = document.getElementById("stopSimulation") as HTMLButtonElement;
    const subjectEl = document.getElementById("subject") as HTMLElement;
    const logEl = document.getElementById("log") as HTMLElement;
    
    // Get all observer elements.
    const observerElements = document.querySelectorAll(".observer");
    const observers: HTMLElement[] = [];
    observerElements.forEach(el => observers.push(el as HTMLElement));
    
    // Utility: Log messages.
    function logMessage(message: string): void {
      const p = document.createElement("p");
      p.textContent = message;
      logEl.appendChild(p);
      logEl.scrollTop = logEl.scrollHeight;
    }
    
    // Utility: Delay function.
    function delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Main simulation loop for Observer Pattern.
    const simulationLoop = async () => {
      while (this.simulationRunning) {
        // Indicate subject state change.
        subjectEl.style.borderColor = "#ff0";
        logMessage("Subject changed state.");
        await delay(500);
        
        const mode = exampleSelect.value; // "all" or "random"
        
        // Notify observers.
        observers.forEach((observer, index) => {
          if (mode === "all") {
            observer.classList.add("notified");
            logMessage(`Observer ${index} notified.`);
          } else if (mode === "random") {
            if (Math.random() < 0.5) {
              observer.classList.add("notified");
              logMessage(`Observer ${index} notified.`);
            } else {
              logMessage(`Observer ${index} not notified.`);
            }
          }
        });
        
        await delay(1500);
        subjectEl.style.borderColor = "#0f0";
        logMessage("Subject reset.");
        observers.forEach(observer => observer.classList.remove("notified"));
        logMessage("Observers reset.");
        await delay(1000);
      }
      logMessage("Simulation stopped.");
    };
    
    // Bind start and stop buttons.
    changeStateButton.addEventListener("click", () => {
      if (!this.simulationRunning) {
        this.simulationRunning = true;
        logEl.innerHTML = ""; // Clear log
        simulationLoop();
      }
    });
    
    stopButton.addEventListener("click", () => {
      this.simulationRunning = false;
    });
  }
}
