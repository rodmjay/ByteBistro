import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-memory-tlb-simulation',
  templateUrl: './memory-tlb-simulation.component.html',
  styleUrls: ['./memory-tlb-simulation.component.css']
})
export class MemoryTlbSimulationComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const simulateButton = document.getElementById('simulateMemoryRequest') as HTMLButtonElement;
    const resetButton = document.getElementById('resetSimulation') as HTMLButtonElement;
    const logEl = document.getElementById('log') as HTMLElement;
    
    // Define memory stages with IDs, names, and random hit probabilities.
    // TLB: 70% chance to hit, Page Table: always "hits" in the sense it can produce a real address,
    // Cache: 60% chance to hit, Main Memory: 90% chance (or 100% if you prefer no misses),
    // Disk: always hits if reached.
    const stages = [
      { id: 'status-tlb', name: 'TLB', hitProbability: 0.7 },
      { id: 'status-page-table', name: 'Page Table', hitProbability: 1.0 }, // It always can find the mapping eventually
      { id: 'status-cache', name: 'Cache', hitProbability: 0.6 },
      { id: 'status-main-memory', name: 'Main Memory', hitProbability: 0.9 },
      { id: 'status-disk', name: 'Disk', hitProbability: 1.0 }
    ];
    
    // Utility function: log messages.
    function logMessage(message: string): void {
      const p = document.createElement('p');
      p.textContent = message;
      logEl.appendChild(p);
      logEl.scrollTop = logEl.scrollHeight;
    }
    
    // Utility: short delay.
    function delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Reset all statuses to "—".
    function resetStatuses(): void {
      stages.forEach(stage => {
        const statusEl = document.getElementById(stage.id) as HTMLElement;
        statusEl.textContent = '—';
      });
    }
    
    // Simulate a single memory request.
    async function simulateRequest(): Promise<void> {
      resetStatuses();
      logEl.innerHTML = '';
      logMessage("Memory request initiated (Virtual Address).");
      
      // Step 1: TLB check.
      await delay(500);
      const tlbStage = stages[0];
      const tlbStatusEl = document.getElementById(tlbStage.id) as HTMLElement;
      const tlbHit = Math.random() < tlbStage.hitProbability;
      if (tlbHit) {
        tlbStatusEl.textContent = "Hit";
        logMessage("TLB Hit! We have the real address, skip page table.");
        // If TLB hits, skip the page table stage.
      } else {
        tlbStatusEl.textContent = "Miss";
        logMessage("TLB Miss, checking page table...");
        
        // Step 2: Page Table (always "finds" the real address eventually).
        await delay(500);
        const ptStage = stages[1];
        const ptStatusEl = document.getElementById(ptStage.id) as HTMLElement;
        ptStatusEl.textContent = "Used";
        logMessage("Page Table used to translate virtual address -> real address.");
      }
      
      // Step 3: Cache check.
      await delay(500);
      const cacheStage = stages[2];
      const cacheStatusEl = document.getElementById(cacheStage.id) as HTMLElement;
      const cacheHit = Math.random() < cacheStage.hitProbability;
      if (cacheHit) {
        cacheStatusEl.textContent = "Hit";
        logMessage("Cache Hit! Data found in cache.");
        logMessage("Request complete.");
        return;
      } else {
        cacheStatusEl.textContent = "Miss";
        logMessage("Cache Miss, accessing main memory...");
      }
      
      // Step 4: Main Memory check.
      await delay(500);
      const mmStage = stages[3];
      const mmStatusEl = document.getElementById(mmStage.id) as HTMLElement;
      const mmHit = Math.random() < mmStage.hitProbability;
      if (mmHit) {
        mmStatusEl.textContent = "Hit";
        logMessage("Main Memory Hit! Data retrieved.");
        logMessage("Request complete.");
      } else {
        mmStatusEl.textContent = "Miss";
        logMessage("Main Memory Miss, fetching from disk...");
        
        // Step 5: Disk is final fallback, always hits eventually.
        await delay(500);
        const diskStage = stages[4];
        const diskStatusEl = document.getElementById(diskStage.id) as HTMLElement;
        diskStatusEl.textContent = "Hit";
        logMessage("Disk: Data found. Request complete.");
      }
    }
    
    // Attach button listeners.
    simulateButton.addEventListener('click', () => {
      simulateRequest();
    });
    
    resetButton.addEventListener('click', () => {
      resetStatuses();
      logEl.innerHTML = '';
      logMessage("Simulation reset.");
    });
  }
}
