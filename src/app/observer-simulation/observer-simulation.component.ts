import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-observer-simulation',
  standalone: true,
  imports: [],
  templateUrl: './observer-simulation.component.html',
  styleUrl: './observer-simulation.component.css'
})
export class ObserverSimulationComponent implements AfterViewInit {
  simulationRunning = false;

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
