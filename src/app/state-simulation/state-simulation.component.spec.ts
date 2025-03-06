import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateSimulationComponent } from './state-simulation.component';

describe('StateSimulationComponent', () => {
  let component: StateSimulationComponent;
  let fixture: ComponentFixture<StateSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
