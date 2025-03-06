import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandSimulationComponent } from './command-simulation.component';

describe('CommandSimulationComponent', () => {
  let component: CommandSimulationComponent;
  let fixture: ComponentFixture<CommandSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandSimulationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
