import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgFor } from '@angular/common';
import { SimulationComponent } from './simulation/simulation.component';
import { ObserverSimulationComponent } from './observer-simulation/observer-simulation.component';
import { StateSimulationComponent } from './state-simulation/state-simulation.component';
import { StrategySimulationComponent } from './strategy-simulation/strategy-simulation.component';
import { DecoratorSimulationComponent } from './decorator-simulation/decorator-simulation.component';
import { CommandSimulationComponent } from './command-simulation/command-simulation.component';
import { DesignPatternComponent } from './components/design-pattern/design-pattern.component';
import { DesignPatternService, DesignPattern } from './services/design-pattern.service';

interface Process {
  id: number;
  group: SVGGElement;
  currentX: number;
  progressBar: SVGRectElement;
  mailbox: string[];
  mailboxElements: SVGCircleElement[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    ButtonModule, 
    NgIf, 
    NgFor,
    SimulationComponent, 
    ObserverSimulationComponent, 
    StateSimulationComponent, 
    StrategySimulationComponent, 
    DecoratorSimulationComponent, 
    CommandSimulationComponent,
    DesignPatternComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  // Title for the design patterns section
  title = 'Software Design Patterns';
  
  // Design patterns loaded from the service
  designPatterns: DesignPattern[] = [];
  
  // Track which design pattern is selected
  selectedPattern = 'scheduler';
  
  constructor(private designPatternService: DesignPatternService) {
    // Load design patterns from the service
    this.designPatterns = this.designPatternService.loadDesignPatterns();
  }

  // Called once the view is initialized
  ngAfterViewInit(): void {
    if (this.selectedPattern === 'scheduler') {
      this.initScheduler();
    }
  }

  // Change selected design pattern and (re)initialize if needed.
  selectPattern(pattern: string): void {
    this.selectedPattern = pattern;
    // If scheduler is selected, wait a tick for the view to update, then initialize
    if (pattern === 'scheduler') {
      setTimeout(() => this.initScheduler(), 0);
    }
    // No initialization needed for simulation and observer components as they handle their own initialization
  }

  // Scheduler visualization code
  initScheduler(): void {
    const svgElement = document.getElementById("svgCanvas");
    if (!svgElement) {
      console.error("SVG Canvas not found!");
      return;
    }
    const svgCanvas = svgElement as unknown as SVGSVGElement;
    
    // Configuration constants
    const numProcesses = 5;
    const processWidth = 80;
    const processHeight = 50;
    const margin = 20;
    const processY = 200; // vertical position for the queue
    const timeSlice = 1000;   // ms for a process to run
    const moveDuration = 500; // ms to animate moving the process
    const messageInterval = 800; // ms interval to randomly send a message

    const processes: Process[] = [];

    // Create process boxes with a label, mailbox area, and a progress bar
    function createQueue(): void {
      for (let i = 0; i < numProcesses; i++) {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        
        // Process box
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", processWidth.toString());
        rect.setAttribute("height", processHeight.toString());
        rect.setAttribute("stroke", "#00ff00");
        rect.setAttribute("fill", "none");
        rect.setAttribute("stroke-width", "2");
        group.appendChild(rect);
        
        // Process id label (centered)
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", (processWidth / 2).toString());
        text.setAttribute("y", (processHeight / 2).toString());
        text.setAttribute("fill", "#00ff00");
        text.setAttribute("font-size", "16");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.textContent = i.toString();
        group.appendChild(text);
        
        // Progress bar (positioned at the bottom)
        const progressBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        progressBar.setAttribute("x", "0");
        progressBar.setAttribute("y", (processHeight - 10).toString());
        progressBar.setAttribute("width", "0");
        progressBar.setAttribute("height", "5");
        progressBar.setAttribute("fill", "#00ff00");
        group.appendChild(progressBar);
        
        // Set initial position in the queue
        const initialX = margin + i * (processWidth + margin);
        group.setAttribute("transform", `translate(${initialX}, ${processY})`);
        
        const processObj: Process = {
          id: i,
          group,
          currentX: initialX,
          progressBar,
          mailbox: [],
          mailboxElements: []
        };
        processes.push(processObj);
        svgCanvas.appendChild(group);
      }
    }

    // Update mailbox display: show each message as a small green circle above the box.
    function updateMailboxDisplay(proc: Process): void {
      proc.mailboxElements.forEach(elem => {
        proc.group.removeChild(elem);
      });
      proc.mailboxElements = [];
      proc.mailbox.forEach((msg, index) => {
        const msgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const offsetX = 10 + index * 15;
        msgCircle.setAttribute("cx", offsetX.toString());
        msgCircle.setAttribute("cy", "-10");
        msgCircle.setAttribute("r", "5");
        msgCircle.setAttribute("fill", "#00ff00");
        proc.group.appendChild(msgCircle);
        proc.mailboxElements.push(msgCircle);
      });
    }

    // Add a message to a process's mailbox and update its display.
    function addMessageToProcess(proc: Process, message: string): void {
      proc.mailbox.push(message);
      updateMailboxDisplay(proc);
    }

    // Animate processing of the mailbox by fading out each message icon sequentially.
    function processMailbox(proc: Process): Promise<void> {
      return new Promise(async (resolve) => {
        if (proc.mailboxElements.length === 0) {
          resolve();
          return;
        }
        for (let i = 0; i < proc.mailboxElements.length; i++) {
          const msgElem = proc.mailboxElements[i];
          await animateMessageProcessing(msgElem);
        }
        proc.mailbox = [];
        proc.mailboxElements = [];
        resolve();
      });
    }

    // Fade-out animation for a message icon over 300ms.
    function animateMessageProcessing(msgElem: SVGCircleElement): Promise<void> {
      return new Promise((resolve) => {
        const duration = 300;
        const startTime = performance.now();
        function step() {
          const elapsed = performance.now() - startTime;
          const t = Math.min(elapsed / duration, 1);
          msgElem.setAttribute("opacity", (1 - t).toString());
          if (t < 1) {
            requestAnimationFrame(step);
          } else {
            if (msgElem.parentNode) {
              msgElem.parentNode.removeChild(msgElem);
            }
            resolve();
          }
        }
        requestAnimationFrame(step);
      });
    }

    // Animate the progress bar for the running (first) process.
    function animateTimeSlice(): Promise<void> {
      return new Promise(resolve => {
        const runningProcess = processes[0];
        let startTime: number | null = null;
        
        function step(timestamp: number) {
          if (startTime === null) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const t = Math.min(elapsed / timeSlice, 1);
          const progressWidth = t * processWidth;
          runningProcess.progressBar.setAttribute("width", progressWidth.toString());
          
          if (t < 1) {
            requestAnimationFrame(step);
          } else {
            runningProcess.progressBar.setAttribute("width", "0");
            resolve();
          }
        }
        
        requestAnimationFrame(step);
      });
    }

    // Animate moving processes to new positions.
    function animateQueueMovement(oldPositions: number[], newPositions: number[]): Promise<void> {
      return new Promise(resolve => {
        const startTime = performance.now();
        
        function step() {
          const elapsed = performance.now() - startTime;
          const t = Math.min(elapsed / moveDuration, 1);
          
          processes.forEach((proc, i) => {
            const newX = oldPositions[i] + (newPositions[i] - oldPositions[i]) * t;
            proc.group.setAttribute("transform", `translate(${newX}, ${processY})`);
          });
          
          if (t < 1) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        }
        
        requestAnimationFrame(step);
      });
    }

    // Main scheduler loop: process messages, animate the time slice, then rotate the queue.
    async function schedulerLoop(): Promise<void> {
      while (true) {
        const runningProcess = processes[0];
        await processMailbox(runningProcess);
        await animateTimeSlice();
        const finishedProcess = processes.shift()!;
        processes.push(finishedProcess);
        const oldPositions = processes.map(proc => proc.currentX);
        const newPositions: number[] = processes.map((_, i) => margin + i * (processWidth + margin));
        await animateQueueMovement(oldPositions, newPositions);
        processes.forEach((proc, i) => {
          proc.currentX = newPositions[i];
        });
      }
    }

    // Randomly send messages to processes.
    function startMessageGenerator(): void {
      setInterval(() => {
        const index = Math.floor(Math.random() * processes.length);
        const proc = processes[index];
        addMessageToProcess(proc, "msg");
      }, messageInterval);
    }

    // Initialize the queue and start the simulation.
    createQueue();
    schedulerLoop();
    startMessageGenerator();
  }
}
