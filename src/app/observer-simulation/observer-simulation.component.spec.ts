import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserverSimulationComponent } from './observer-simulation.component';

describe('ObserverSimulationComponent', () => {
  let component: ObserverSimulationComponent;
  let fixture: ComponentFixture<ObserverSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObserverSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObserverSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
