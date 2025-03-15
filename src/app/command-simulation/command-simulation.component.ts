import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DesignPatternComponent } from '../components/design-pattern/design-pattern.component';
import { DesignPatternService } from '../services/design-pattern.service';

interface Command {
  name: string;
  execute(): void;
  undo?(): void;
}

@Component({
  selector: 'app-command-simulation',
  standalone: true,
  imports: [CommonModule, DesignPatternComponent],
  templateUrl: './command-simulation.component.html',
  styleUrl: './command-simulation.component.css'
})
export class CommandSimulationComponent implements AfterViewInit {
  private commandQueue: Command[] = [];
  diagramCode: string = '';
  patternId: number = 0;
  
  constructor(private designPatternService: DesignPatternService, private router: Router) {
    const pattern = this.designPatternService.getPatternByName('Command');
    if (pattern) {
      this.diagramCode = pattern.diagramCode;
      this.patternId = pattern.id || 0;
    }
  }

  ngAfterViewInit(): void {
    const addStartButton = document.getElementById("addStart") as HTMLButtonElement;
    const addStopButton = document.getElementById("addStop") as HTMLButtonElement;
    const addResetButton = document.getElementById("addReset") as HTMLButtonElement;
    const executeButton = document.getElementById("executeCommands") as HTMLButtonElement;
    const undoButton = document.getElementById("undoCommand") as HTMLButtonElement;
    const clearButton = document.getElementById("clearQueue") as HTMLButtonElement;
    const commandQueueEl = document.getElementById("commandQueue") as HTMLUListElement;
    const logEl = document.getElementById("log") as HTMLElement;

    // Utility: Append log message.
    function logMessage(message: string): void {
      const p = document.createElement("p");
      p.textContent = message;
      logEl.appendChild(p);
      logEl.scrollTop = logEl.scrollHeight;
    }

    // Utility: Update the command queue display.
    const updateQueueDisplay = (): void => {
      commandQueueEl.innerHTML = "";
      this.commandQueue.forEach((cmd: Command, index: number) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${cmd.name}`;
        commandQueueEl.appendChild(li);
      });
    };

    // Create command instances.
    function createStartCommand(): Command {
      return {
        name: "Start",
        execute: () => {
          logMessage("Executing Start Command: System starting...");
        },
        undo: () => {
          logMessage("Undoing Start Command: System start canceled.");
        }
      };
    }

    function createStopCommand(): Command {
      return {
        name: "Stop",
        execute: () => {
          logMessage("Executing Stop Command: System stopping...");
        },
        undo: () => {
          logMessage("Undoing Stop Command: System stop canceled.");
        }
      };
    }

    function createResetCommand(): Command {
      return {
        name: "Reset",
        execute: () => {
          logMessage("Executing Reset Command: System resetting...");
        },
        undo: () => {
          logMessage("Undoing Reset Command: System reset undone.");
        }
      };
    }

    // Event listeners to add commands to the queue.
    addStartButton.addEventListener("click", () => {
      const cmd = createStartCommand();
      this.commandQueue.push(cmd);
      logMessage("Added Start Command to queue.");
      updateQueueDisplay();
    });

    addStopButton.addEventListener("click", () => {
      const cmd = createStopCommand();
      this.commandQueue.push(cmd);
      logMessage("Added Stop Command to queue.");
      updateQueueDisplay();
    });

    addResetButton.addEventListener("click", () => {
      const cmd = createResetCommand();
      this.commandQueue.push(cmd);
      logMessage("Added Reset Command to queue.");
      updateQueueDisplay();
    });

    // Execute all commands in the queue.
    executeButton.addEventListener("click", () => {
      logMessage("Executing all commands...");
      while (this.commandQueue.length > 0) {
        const cmd = this.commandQueue.shift();
        cmd?.execute();
      }
      updateQueueDisplay();
    });

    // Undo the last command in the queue.
    undoButton.addEventListener("click", () => {
      if (this.commandQueue.length > 0) {
        const cmd = this.commandQueue.pop();
        if (cmd?.undo) {
          cmd.undo();
        } else {
          logMessage(`Command ${cmd?.name} cannot be undone.`);
        }
        updateQueueDisplay();
      } else {
        logMessage("No commands to undo.");
      }
    });

    // Clear the command queue.
    clearButton.addEventListener("click", () => {
      this.commandQueue = [];
      logMessage("Command queue cleared.");
      updateQueueDisplay();
    });
  }
}
