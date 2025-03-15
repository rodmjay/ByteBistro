import { Injectable } from '@angular/core';

export interface DesignPattern {
  name: string;
  diagramCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class DesignPatternService {
  
  constructor() { }
  
  /**
   * Process CSV data into design pattern objects with Mermaid diagram code
   * @param csvData The raw CSV data as a string
   * @returns Array of design pattern objects
   */
  processCsvData(csvData: string): DesignPattern[] {
    const patterns: DesignPattern[] = [];
    
    // Skip header row and split into lines
    const lines = csvData.split('\n').slice(1);
    
    lines.forEach(line => {
      if (!line.trim()) return; // Skip empty lines
      
      // Split by comma, but handle commas inside quotes
      const columns = this.parseCSVLine(line);
      
      if (columns.length >= 3) {
        const name = columns[0].trim();
        const elements = columns[1].trim();
        const connections = columns[2].trim();
        
        // Create Mermaid diagram code
        const diagramCode = this.generateMermaidCode(name, elements, connections);
        
        patterns.push({ name, diagramCode });
      }
    });
    
    return patterns;
  }
  
  /**
   * Parse a CSV line handling commas inside quotes
   */
  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add the last column
    result.push(current);
    return result;
  }
  
  /**
   * Generate Mermaid diagram code from pattern elements and connections
   */
  private generateMermaidCode(name: string, elements: string, connections: string): string {
    // Start with graph TD (top-down graph)
    let code = 'graph TD\n';
    
    // Process elements based on pattern
    if (elements.includes('->')) {
      // If elements already contains arrows, format it properly
      const formattedElements = elements
        .replace(/ box/g, '')
        .replace(/ ->/g, '-->')
        .replace(/multiple /g, '')
        .replace(/boxes/g, '')
        .replace(/ /g, '_');
      
      code += `  ${formattedElements}\n`;
    } else if (elements.includes('between')) {
      // Handle special case for Adapter pattern
      code += `  ClassA[Class A]-->Adapter[Adapter]-->ClassB[Class B]\n`;
    } else if (elements.includes('tree')) {
      // Handle special case for Composite pattern
      code += `  Root[Root]-->Component1[Component 1]\n`;
      code += `  Root-->Component2[Component 2]\n`;
      code += `  Component1-->Leaf1[Leaf 1]\n`;
      code += `  Component1-->Leaf2[Leaf 2]\n`;
    } else {
      // For simple nodes, just add them directly
      const nodeName = elements.replace(/'/g, '').replace(/ /g, '_');
      code += `  ${nodeName}\n`;
    }
    
    // Add a comment with the connections description
    code += `  %% ${connections}`;
    
    return code;
  }
  
  /**
   * Load design patterns from the provided CSV file
   * This would typically make an HTTP request, but for this example
   * we'll use the hardcoded CSV data
   */
  loadDesignPatterns(): DesignPattern[] {
    // This would be replaced with an HTTP request in a real application
    const csvData = this.getHardcodedCsvData();
    return this.processCsvData(csvData);
  }
  
  /**
   * Get hardcoded CSV data for design patterns
   * In a real application, this would be replaced with an HTTP request
   */
  private getHardcodedCsvData(): string {
    return `Pattern,Diagram Elements,Connections
Singleton,Single rectangle labeled 'Singleton',"No connections, only one instance"
Factory Method,Factory box -> multiple product boxes,Arrows from factory to products
Abstract Factory,Abstract Factory box -> Factories -> Products,"Arrows from abstract factory to specific factories, then to products"
Builder,Builder box -> Steps -> Product,Arrows showing step-by-step construction
Prototype,Prototype box -> Clones,Arrows from prototype to clones
Adapter,Adapter between two incompatible classes,Adapter connects incompatible classes
Bridge,Abstraction -> Implementation,Abstraction linked to implementation
Composite,Tree structure with components,Tree structure with parent-child relationships
Decorator,Core object -> Multiple decorators,Arrows showing layering of decorators
Facade,Facade -> Multiple subsystems,Facade connects to multiple subsystems
Flyweight,Shared object pool,Objects reused from a shared pool
Proxy,Proxy -> Real subject,Proxy object forwards requests
Chain of Responsibility,Handlers in a sequence,Arrows showing request passing through handlers
Command,Invoker -> Command -> Receiver,Command object connects invoker and receiver
Interpreter,Expression tree,Arrows show parsing of expressions
Iterator,Collection -> Iterators,Arrows showing traversal of a collection
Mediator,Mediator -> Colleagues,Mediator coordinates communication between colleagues
Memento,Originator -> Memento -> Caretaker,Arrows show state saving and restoring
Observer,Subject -> Multiple observers,Subject notifies observers
State,State transitions diagram,Arrows showing state transitions
Strategy,Context -> Multiple strategies,Context selecting different strategies
Template Method,Base class -> Derived implementations,Arrows showing predefined steps
Visitor,Visitor -> Multiple elements,Arrows showing visitor interacting with elements`;
  }
}
