import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-simulation',
  imports: [],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.css'
})
export class SimulationComponent implements AfterViewInit {

  simulationRunning = false;

  ngAfterViewInit(): void {
    // Initialize DOM elements after view loads.
    const exampleSelect = document.getElementById("exampleSelect") as HTMLSelectElement;
    const startButton = document.getElementById("startMessage") as HTMLButtonElement;
    const stopButton = document.getElementById("stopMessage") as HTMLButtonElement;
    const messageEl = document.getElementById("message") as HTMLElement;
    const logEl = document.getElementById("log") as HTMLElement;
    
    // Get nodes from the left column (sender is row 0, then handlers)
    const nodeElements = document.querySelectorAll(".left-column .node");
    const nodes: HTMLElement[] = [];
    nodeElements.forEach((el) => nodes.push(el as HTMLElement));
    
    // Get status elements from the middle column (one per row)
    const statusElements = document.querySelectorAll(".middle-column .status");
    
    // Set constant row height (node height + margin)
    const rowHeight = 120;
    
    // Utility: Append a log message.
    function logMessage(msg: string): void {
      const p = document.createElement("p");
      p.textContent = msg;
      logEl.appendChild(p);
      logEl.scrollTop = logEl.scrollHeight;
    }
    
    // Utility: Delay function.
    function delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Animate message movement in the right column to a given row.
    function moveMessageToRow(row: number): Promise<void> {
      return new Promise(resolve => {
        const targetTop = row * rowHeight;
        messageEl.style.top = targetTop + "px";
        setTimeout(resolve, 1000); // match CSS transition duration
      });
    }
    
    // Update node labels based on simulation type.
    function updateNodeLabels(simType: string): void {
      nodes.forEach((node, index) => {
        if (index === 0) {
          node.textContent = "Sender";
        } else {
          if (simType === "chain") {
            node.textContent = `Handler ${index - 1}`;
          } else if (simType === "pipeline") {
            node.textContent = `Middleware ${index - 1}`;
          } else if (simType === "button") {
            node.textContent = `Button Handler ${index - 1}`;
          }
        }
      });
    }
    
    // Main simulation: message emits from sender and moves downward.
    async function runSimulation(simType: string): Promise<void> {
      // Clear log and reset statuses.
      logEl.innerHTML = "";
      statusElements.forEach((el) => (el.textContent = "—"));
      
      // Set message text.
      if (simType === "chain") {
        messageEl.textContent = "Message";
      } else if (simType === "pipeline") {
        messageEl.textContent = "Request";
      } else if (simType === "button") {
        messageEl.textContent = "Click";
      }
      
      // Show message at row 0 (aligned with sender).
      messageEl.classList.remove("hidden");
      messageEl.style.top = "0px";
      logMessage("Sender emits a message.");
      
      // Traverse from row 1 through the nodes.
      for (let i = 1; i < nodes.length; i++) {
        await delay(500);
        logMessage(`Moving to ${nodes[i].textContent}.`);
        await moveMessageToRow(i);
        await delay(500);
        
        // Randomly decide if the node processes the message.
        if (Math.random() < 0.5) {
          messageEl.style.borderColor = "#ff0"; // Yellow indicates handled.
          if (simType === "chain") {
            (statusElements[i] as HTMLElement).textContent = "Handled";
            logMessage(`${nodes[i].textContent} handled the message.`);
          } else if (simType === "pipeline") {
            (statusElements[i] as HTMLElement).textContent = "Halted";
            logMessage(`${nodes[i].textContent} halted the request.`);
          } else if (simType === "button") {
            (statusElements[i] as HTMLElement).textContent = "Consumed";
            logMessage(`${nodes[i].textContent} consumed the click event.`);
          }
          break;
        } else {
          (statusElements[i] as HTMLElement).textContent = "Passed";
          logMessage(`${nodes[i].textContent} passed the message.`);
        }
      }
      
      await delay(1000);
      logMessage("Resetting simulation.");
      messageEl.classList.add("hidden");
      messageEl.style.borderColor = "#0f0"; // Reset border color.
    }
    
    // Continuous simulation loop.
    const simulationLoop = async () => {
      while (this.simulationRunning) {
        await runSimulation(exampleSelect.value);
        await delay(1000);
      }
      logMessage("Simulation stopped.");
    };
    
    // Update labels when the dropdown changes.
    exampleSelect.addEventListener("change", () => {
      updateNodeLabels(exampleSelect.value);
      logEl.innerHTML = "";
      statusElements.forEach((el) => (el.textContent = "—"));
    });
    
    // Start simulation on button click.
    startButton.addEventListener("click", () => {
      if (!this.simulationRunning) {
        this.simulationRunning = true;
        updateNodeLabels(exampleSelect.value);
        simulationLoop();
      }
    });
    
    // Stop simulation on button click.
    stopButton.addEventListener("click", () => {
      this.simulationRunning = false;
    });
    
    // Initialize node labels.
    updateNodeLabels(exampleSelect.value);
  }
}
