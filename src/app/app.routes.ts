import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PatternDetailComponent } from './pages/pattern-detail/pattern-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pattern/:id', component: PatternDetailComponent }
];
