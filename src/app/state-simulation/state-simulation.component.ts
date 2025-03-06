import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-state-simulation',
  standalone: true,
  imports: [],
  templateUrl: './state-simulation.component.html',
  styleUrl: './state-simulation.component.css'
})
export class StateSimulationComponent implements AfterViewInit {

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
