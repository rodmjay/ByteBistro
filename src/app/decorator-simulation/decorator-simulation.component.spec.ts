import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorSimulationComponent } from './decorator-simulation.component';

describe('DecoratorSimulationComponent', () => {
  let component: DecoratorSimulationComponent;
  let fixture: ComponentFixture<DecoratorSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecoratorSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecoratorSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
