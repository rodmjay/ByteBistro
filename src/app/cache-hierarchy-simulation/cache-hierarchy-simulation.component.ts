import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-cache-hierarchy-simulation',
  standalone: true,
  imports: [],
  templateUrl: './cache-hierarchy-simulation.component.html',
  styleUrl: './cache-hierarchy-simulation.component.css'
})
export class CacheHierarchySimulationComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const simulateButton = document.getElementById('simulateRequest') as HTMLButtonElement;
    const resetButton = document.getElementById('resetSimulation') as HTMLButtonElement;
    const logEl = document.getElementById('log') as HTMLElement;
    
    // Define the memory levels and their hit probabilities.
    // Registers: 90%, L1: 80%, L2: 60%, L3: 40%, Disk: 100%
    const memoryLevels = [
      { id: 'status-registers', name: 'Registers', hitProbability: 0.9 },
      { id: 'status-l1', name: 'L1 Cache', hitProbability: 0.8 },
      { id: 'status-l2', name: 'L2 Cache', hitProbability: 0.6 },
      { id: 'status-l3', name: 'L3 Cache', hitProbability: 0.4 },
      { id: 'status-disk', name: 'Disk', hitProbability: 1.0 }
    ];
    
    // Utility function to log messages.
    function logMessage(message: string): void {
      const p = document.createElement('p');
      p.textContent = message;
      logEl.appendChild(p);
      logEl.scrollTop = logEl.scrollHeight;
    }
    
    // Utility: Delay function.
    function delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Function to reset all memory level statuses.
    function resetStatuses(): void {
      memoryLevels.forEach(level => {
        const statusEl = document.getElementById(level.id) as HTMLElement;
        statusEl.textContent = '—';
      });
    }
    
    // Main function to simulate a memory request.
    async function simulateMemoryRequest(): Promise<void> {
      // Clear previous statuses and log.
      resetStatuses();
      logEl.innerHTML = '';
      
      logMessage("Memory request initiated by CPU.");
      
      // Iterate through each memory level.
      for (const level of memoryLevels) {
        await delay(1000);
        const statusEl = document.getElementById(level.id) as HTMLElement;
        
        const hit = Math.random() < level.hitProbability;
        if (hit) {
          statusEl.textContent = "Hit";
          logMessage(`${level.name}: Hit! Data found.`);
          // Stop processing further levels.
          break;
        } else {
          statusEl.textContent = "Miss";
          logMessage(`${level.name}: Miss.`);
        }
      }
      
      logMessage("Memory request simulation complete.");
    }
    
    // Attach event listeners.
    simulateButton.addEventListener('click', () => {
      simulateMemoryRequest();
    });
    
    resetButton.addEventListener('click', () => {
      resetStatuses();
      logEl.innerHTML = '';
      logMessage("Simulation reset.");
    });
  }
}
