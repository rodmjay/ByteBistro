import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PatternDetailComponent } from './pages/pattern-detail/pattern-detail.component';
import { ObserverSimulationComponent } from './observer-simulation/observer-simulation.component';
import { StateSimulationComponent } from './state-simulation/state-simulation.component';
import { StrategySimulationComponent } from './strategy-simulation/strategy-simulation.component';
import { DecoratorSimulationComponent } from './decorator-simulation/decorator-simulation.component';
import { CommandSimulationComponent } from './command-simulation/command-simulation.component';
import { SimulationComponent } from './simulation/simulation.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { LanguagesComponent } from './pages/languages/languages.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'patterns', component: HomeComponent },
  { path: 'languages', component: LanguagesComponent },
  { path: 'scheduler', component: SchedulerComponent },
  { path: 'simulation', component: SimulationComponent },
  { path: 'observer', component: ObserverSimulationComponent },
  { path: 'state', component: StateSimulationComponent },
  { path: 'strategy', component: StrategySimulationComponent },
  { path: 'decorator', component: DecoratorSimulationComponent },
  { path: 'command', component: CommandSimulationComponent },
  { path: 'pattern/:id', component: PatternDetailComponent },
  { path: '**', redirectTo: '' }
];
