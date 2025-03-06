import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-strategy-simulation',
  standalone: true,
  imports: [],
  templateUrl: './strategy-simulation.component.html',
  styleUrl: './strategy-simulation.component.css'
})
export class StrategySimulationComponent implements AfterViewInit {

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
      contextEl.style.borderColor = "#0f0";
      logMessage("Context is Idle.");
      
      // Wait before executing.
      await delay(500);
      
      // Get the selected strategy.
      const strategy = strategySelect.value;
      
      // Change state to Processing.
      logMessage("Switching to Processing state...");
      contextEl.textContent = "Processing";
      contextEl.style.borderColor = "#ff0";
      contextEl.style.background = "#222";
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
      contextEl.style.borderColor = "#0f0";
    }
    
    // Attach the event listener.
    executeButton.addEventListener("click", () => {
      executeStrategy();
    });
  }
}
