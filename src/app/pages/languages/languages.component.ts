import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Programming Languages</h1>
    <p>This section will contain programming languages information.</p>
    <div class="language-list">
      <div class="language-card">
        <h2>JavaScript</h2>
        <p>High-level, interpreted programming language that conforms to the ECMAScript specification.</p>
      </div>
      <div class="language-card">
        <h2>TypeScript</h2>
        <p>Strict syntactical superset of JavaScript that adds optional static typing.</p>
      </div>
      <div class="language-card">
        <h2>Python</h2>
        <p>Interpreted, high-level, general-purpose programming language with dynamic semantics.</p>
      </div>
      <div class="language-card">
        <h2>C#</h2>
        <p>Multi-paradigm programming language developed by Microsoft for the .NET platform.</p>
      </div>
    </div>
  `,
  styles: [`
    h1, h2, p {
      color: #0f0;
    }
    
    .language-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    
    .language-card {
      border: 1px solid #0f0;
      padding: 15px;
      background-color: #111;
    }
    
    .language-card h2 {
      margin-top: 0;
      border-bottom: 1px solid #0f0;
      padding-bottom: 10px;
    }
  `]
})
export class LanguagesComponent {
  // Component logic will go here
}
