import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { interval, merge, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-merge-simulation',
  standalone: true,
  templateUrl: './rxjs-merge-simulation.component.html',
  styleUrls: ['./rxjs-merge-simulation.component.css']
})
export class RxjsMergeSimulationComponent implements AfterViewInit, OnDestroy {
  
  private destroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    const startBtn = document.getElementById('startSimulation') as HTMLButtonElement;
    const stopBtn = document.getElementById('stopSimulation') as HTMLButtonElement;
    const logEl = document.getElementById('log') as HTMLElement;
    const destroy$ = this.destroy$; // Store reference to use in inner functions

    // Streams
    // Stream A: emits every 2.5s
    const streamA$ = interval(2500).pipe(
      map(i => ({ stream: 'A', value: i }))
    );
    // Stream B: emits every 1.8s
    const streamB$ = interval(1800).pipe(
      map(i => ({ stream: 'B', value: i }))
    );
    
    // Merge them
    const merged$ = merge(streamA$, streamB$);

    // We'll subscribe/unsubscribe manually with start/stop.
    // When started, we'll animate marbles on each emission.
    let simulationActive = false;
    let sub: Subscription | null = null; // we'll hold onto the subscription

    // Utility: log messages
    function logMessage(msg: string): void {
      const p = document.createElement('p');
      p.textContent = msg;
      logEl.appendChild(p);
      logEl.scrollTop = logEl.scrollHeight;
    }

    // Create a marble in the DOM
    function createMarble(stream: 'A' | 'B' | 'Merged', value: number | string): HTMLElement {
      const marble = document.createElement('div');
      marble.classList.add('marble');
      if (stream === 'A') {
        marble.classList.add('marbleA');
      } else if (stream === 'B') {
        marble.classList.add('marbleB');
      } else {
        marble.classList.add('marbleMerged');
      }
      marble.textContent = value.toString();
      marble.style.left = '0px';
      return marble;
    }

    // Animate marble from left to right in the appropriate line
    function animateMarble(marble: HTMLElement, lineId: string): void {
      const lineEl = document.getElementById(lineId) as HTMLElement;
      if (!lineEl) return;

      // Add the marble at left = 0
      lineEl.appendChild(marble);

      // Force reflow so the starting position is recognized
      marble.getBoundingClientRect();

      // Move to 100% of the line's width minus the marble width
      const lineWidth = lineEl.clientWidth;
      const marbleWidth = 16; // from CSS
      const targetLeft = (lineWidth - marbleWidth) + 'px';
      marble.style.left = targetLeft;

      // Remove marble after transition ends
      setTimeout(() => {
        if (marble.parentNode === lineEl) {
          lineEl.removeChild(marble);
        }
      }, 2000); // matches transition duration
    }

    // Start the simulation: subscribe to merged$.
    function startSimulation(): void {
      if (simulationActive) return;
      simulationActive = true;
      logEl.innerHTML = ''; // clear old logs

      // Subscribe to merged$
      sub = merged$
        .pipe(takeUntil(destroy$))
        .subscribe(({ stream, value }) => {
          // Each emission from A or B is mapped to the merged stream as well
          logMessage(`Emission from Stream ${stream}: value=${value}`);
          
          // Animate a marble on the original line
          const inputMarble = createMarble(stream as 'A' | 'B', value);
          animateMarble(inputMarble, stream === 'A' ? 'streamA' : 'streamB');

          // Also animate a marble on the merged line
          const mergedMarble = createMarble('Merged', value);
          animateMarble(mergedMarble, 'streamMerged');
        });
      logMessage('Simulation started.');
    }

    // Stop the simulation: unsub
    function stopSimulation(): void {
      if (!simulationActive) return;
      simulationActive = false;
      if (sub) {
        sub.unsubscribe();
        sub = null;
      }
      logMessage('Simulation stopped.');
    }

    // Hook up button events
    startBtn.addEventListener('click', () => startSimulation());
    stopBtn.addEventListener('click', () => stopSimulation());
  }

  ngOnDestroy(): void {
    // Cleanup if user navigates away
    this.destroy$.next();
    this.destroy$.complete();
  }
}
