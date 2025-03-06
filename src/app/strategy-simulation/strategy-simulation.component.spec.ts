import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategySimulationComponent } from './strategy-simulation.component';

describe('StrategySimulationComponent', () => {
  let component: StrategySimulationComponent;
  let fixture: ComponentFixture<StrategySimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategySimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategySimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
