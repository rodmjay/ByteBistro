import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tcp-simulation',
  imports: [],
  templateUrl: './tcp-simulation.component.html',
  styleUrl: './tcp-simulation.component.css'
})
export class TcpSimulationComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const startButton = document.getElementById('startTCP') as HTMLButtonElement;
    const resetButton = document.getElementById('resetTCP') as HTMLButtonElement;
    const channelEl = document.getElementById('channel') as HTMLElement;
    const logEl = document.getElementById('log') as HTMLElement;
    
    // Utility: Append log messages.
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
    
    // Remove existing packet if any.
    function clearChannel(): void {
      channelEl.innerHTML = "";
    }
    
    // Create a packet element with a label.
    function createPacket(label: string): HTMLElement {
      const packet = document.createElement('div');
      packet.classList.add('packet');
      packet.textContent = label;
      return packet;
    }
    
    // Animate packet moving across the channel.
    // startX: starting left position (in px), endX: ending left position.
    function animatePacket(packet: HTMLElement, startX: number, endX: number): Promise<void> {
      return new Promise(resolve => {
        packet.style.left = startX + "px";
        // Force a reflow to apply the starting position.
        packet.getBoundingClientRect();
        packet.style.left = endX + "px";
        setTimeout(resolve, 1000); // Transition duration
      });
    }
    
    // Main TCP simulation: Three-Way Handshake
    async function runTCPSimulation(): Promise<void> {
      // Clear previous simulation.
      clearChannel();
      logEl.innerHTML = "";
      
      // Create packet element.
      const packet = createPacket("SYN");
      channelEl.appendChild(packet);
      
      // Step 1: Client sends SYN (packet moves from left edge to center).
      logMessage("Client sends SYN.");
      await animatePacket(packet, 0, channelEl.clientWidth / 2 - packet.clientWidth / 2);
      
      // Step 2: Server responds with SYN-ACK.
      logMessage("Server sends SYN-ACK.");
      packet.textContent = "SYN-ACK";
      // Animate packet from center to right edge.
      await animatePacket(packet, channelEl.clientWidth / 2 - packet.clientWidth / 2, channelEl.clientWidth - packet.clientWidth);
      
      // Step 3: Client sends ACK.
      logMessage("Client sends ACK.");
      packet.textContent = "ACK";
      // Animate packet back from right edge to center.
      await animatePacket(packet, channelEl.clientWidth - packet.clientWidth, channelEl.clientWidth / 2 - packet.clientWidth / 2);
      
      logMessage("TCP Three-Way Handshake Completed.");
      // Optionally clear the packet after a delay.
      await delay(1000);
      clearChannel();
    }
    
    // Attach event listeners.
    startButton.addEventListener('click', () => {
      runTCPSimulation();
    });
    
    resetButton.addEventListener('click', () => {
      clearChannel();
      logEl.innerHTML = "";
      logMessage("Simulation reset.");
    });
  }
}
